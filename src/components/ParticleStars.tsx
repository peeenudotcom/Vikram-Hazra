/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";

export function ParticleStars() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track state for resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle types
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      alpha: number;
      fadeSpeed: number;
      color: string; // "gold", "saffron", "white"
      angle?: number;
      spin?: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 90;

    // Helper to generate a particle
    const createParticle = (isInit = false): Particle => {
      const colors = [
        "rgba(212, 175, 55, ",  // Gold
        "rgba(255, 107, 53, ",  // Saffron
        "rgba(244, 167, 185, ", // Lotus pink
        "rgba(253, 246, 236, "  // Ivory/White
      ];
      const colorSelector = Math.random();
      let color = colors[3]; // Fallback ivory
      if (colorSelector < 0.3) {
        color = colors[0]; // Gold
      } else if (colorSelector < 0.6) {
        color = colors[1]; // Saffron
      } else if (colorSelector < 0.8) {
        color = colors[2]; // Lotus pink
      }

      return {
        x: Math.random() * width,
        y: isInit ? Math.random() * height : height + 10,
        size: Math.random() * 2 + 0.5,
        speedY: -(Math.random() * 0.7 + 0.2), // Rising slowly
        speedX: (Math.random() - 0.5) * 0.4,   // Drifting side to side
        alpha: Math.random() * 0.6 + 0.2,
        fadeSpeed: Math.random() * 0.002 + 0.001,
        color,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02
      };
    };

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle dark blue sky gradients if desired, but index.css has the midnight background
      
      particles.forEach((p, idx) => {
        // Move
        p.y += p.speedY;
        p.x += p.speedX;
        
        if (p.angle !== undefined && p.spin !== undefined) {
          p.angle += p.spin;
          p.x += Math.sin(p.angle) * 0.15; // gentle wave motion
        }

        // Wrap around sides
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Reset if it goes off top or fades out
        p.alpha -= p.fadeSpeed;
        if (p.y < -10 || p.alpha <= 0) {
          particles[idx] = createParticle(false);
          return;
        }

        // Draw glowing particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;

        // Glow effect for a few larger particles
        if (p.size > 1.8) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color.includes("212, 175, 55") 
            ? "#D4AF37" 
            : p.color.includes("255, 107, 53") 
            ? "#FF6B35" 
            : "#F4A7B9";
        }
        
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="devotional-celestial-canvas"
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-65"
    />
  );
}
