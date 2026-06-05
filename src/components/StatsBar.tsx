/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { Language } from "../types";
import { TRANSLATIONS } from "../translations";
import { Globe, Disc, Award, Sparkles, Music } from "lucide-react";

interface StatsBarProps {
  language: Language;
}

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  prefix: string;
  icon: any;
  labelKey: keyof typeof TRANSLATIONS;
}

export function StatsBar({ language }: StatsBarProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  
  // Numerical values state
  const [countries, setCountries] = useState(0);
  const [albums, setAlbums] = useState(0);
  const [since, setSince] = useState(1900); // start closer for 1997
  const [aol, setAol] = useState(0);
  const [shows, setShows] = useState(0);

  const t = (key: keyof typeof TRANSLATIONS) => TRANSLATIONS[key][language];

  const stats: StatItem[] = [
    {
      id: "countries",
      target: 40,
      suffix: "+",
      prefix: "",
      icon: Globe,
      labelKey: "statsCountries",
    },
    {
      id: "albums",
      target: 11,
      suffix: "",
      prefix: "",
      icon: Disc,
      labelKey: "statsAlbums",
    },
    {
      id: "since",
      target: 1997,
      suffix: "",
      prefix: "",
      icon: Award,
      labelKey: "statsSince",
    },
    {
      id: "aol",
      target: 180,
      suffix: "+",
      prefix: "",
      icon: Sparkles,
      labelKey: "statsAol",
    },
    {
      id: "shows",
      target: 4,
      suffix: "",
      prefix: "",
      icon: Music,
      labelKey: "statsPunjabShows",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasTriggered]);

  useEffect(() => {
    if (!hasTriggered) return;

    // Linear interpolation animation over 1.5 seconds (60 frames/sec approx 90 steps total)
    const DURATION = 1500;
    const FRAMES = 60;
    const STEP_MS = DURATION / FRAMES;
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / FRAMES;

      // Ease out quad formula
      const easeProgress = 1 - (1 - progress) * (1 - progress);

      setCountries(Math.floor(easeProgress * 40));
      setAlbums(Math.floor(easeProgress * 11));
      setSince(1900 + Math.floor(easeProgress * (1997 - 1900)));
      setAol(Math.floor(easeProgress * 180));
      setShows(Math.floor(easeProgress * 4));

      if (currentFrame >= FRAMES) {
        clearInterval(timer);
        // Ensure accurate final states
        setCountries(40);
        setAlbums(11);
        setSince(1997);
        setAol(180);
        setShows(4);
      }
    }, STEP_MS);

    return () => clearInterval(timer);
  }, [hasTriggered]);

  const valueSelector = (id: string): string => {
    switch (id) {
      case "countries":
        return countries.toString();
      case "albums":
        return albums.toString();
      case "since":
        return since.toString();
      case "aol":
        return aol.toString();
      case "shows":
        return shows.toString();
      default:
        return "0";
    }
  };

  return (
    <div
      ref={containerRef}
      id="stats-bar-section"
      className="relative z-20 w-full bg-gradient-to-r from-[#FF6B35] via-[#E15A27] to-[#D4AF37] shadow-xl py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5 text-center text-[#FDF6EC]">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                id={`stat-item-${stat.id}`}
                className="flex flex-col items-center p-3 rounded-2xl bg-black/10 backdrop-blur-xs transition-transform duration-300 hover:scale-105"
              >
                <div className="rounded-full bg-white/20 p-3 mb-3 border border-white/10 shadow-inner">
                  <Icon className="h-6 w-6 text-[#FDF6EC]" />
                </div>
                
                <span className="font-serif text-3xl font-extrabold sm:text-4xl select-none">
                  {stat.prefix}
                  {valueSelector(stat.id)}
                  {stat.suffix}
                </span>
                
                <span className="mt-1 text-[11px] font-bold tracking-widest text-[#FDF6EC]/85 uppercase font-sans">
                  {t(stat.labelKey)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
