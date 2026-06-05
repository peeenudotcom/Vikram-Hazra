/**
 * Vikram Hazra Punjab Tour 2026 — Google Sheets Backend
 * ======================================================
 * SETUP INSTRUCTIONS:
 *
 * 1. Go to https://sheets.google.com and create a new spreadsheet.
 *    Name it: "Vikram Hazra Tour 2026 Registrations"
 *
 * 2. Copy the Spreadsheet ID from the URL:
 *    https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
 *    Paste it into SPREADSHEET_ID below.
 *
 * 3. In the spreadsheet, go to Extensions → Apps Script
 *    (or visit https://script.google.com)
 *
 * 4. Delete the default code and paste this entire file.
 *
 * 5. Click Deploy → New Deployment
 *    - Type: Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    Click Deploy → Copy the Web App URL
 *
 * 6. Paste that URL into RegisterForm.tsx:
 *    const GOOGLE_SHEETS_WEBAPP_URL = "https://script.google.com/macros/s/YOUR_ID/exec"
 *
 * 7. Done! Every registration now saves a row to your Google Sheet.
 *    You can also share the sheet with your team for live monitoring.
 * ======================================================
 */

const SPREADSHEET_ID = "YOUR_SPREADSHEET_ID_HERE";
const SHEET_NAME     = "Registrations";

// Column headers (must match the order in appendRow below)
const HEADERS = [
  "Timestamp",
  "Pass ID",
  "City",
  "Date",
  "Venue",
  "Full Name",
  "Mobile",
  "City / Village",
  "Attendees",
  "Language",
  "Submitted At (ISO)"
];

/**
 * Handles POST requests from the registration form.
 * Returns JSON: { status: "success", passId: "..." }
 */
function doPost(e) {
  try {
    const params = e.parameter;

    // Basic required field check
    const required = ["passId", "city", "fullName", "mobile", "village", "attendees"];
    for (const field of required) {
      if (!params[field]) {
        return jsonResponse({ status: "error", message: `Missing field: ${field}` });
      }
    }

    const sheet = getOrCreateSheet();
    const now   = new Date();

    sheet.appendRow([
      Utilities.formatDate(now, "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss"),
      params.passId      || "",
      params.city        || "",
      params.date        || "",
      params.venue       || "",
      params.fullName    || "",
      params.mobile      || "",
      params.village     || "",
      params.attendees   || "1",
      params.language    || "en",
      params.submittedAt || now.toISOString()
    ]);

    return jsonResponse({ status: "success", passId: params.passId });

  } catch (err) {
    console.error("doPost error:", err);
    return jsonResponse({ status: "error", message: err.message });
  }
}

/**
 * Handles GET requests — returns a simple health check JSON.
 */
function doGet() {
  return jsonResponse({
    status: "ok",
    message: "Vikram Hazra Tour 2026 Registration API is live.",
    sheet: SHEET_NAME
  });
}

/**
 * Gets the sheet by name, or creates it with headers if it doesn't exist.
 */
function getOrCreateSheet() {
  const ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  let   sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Write header row with bold formatting
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setValues([HEADERS]);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#1A1A2E");
    headerRange.setFontColor("#D4AF37");
    sheet.setFrozenRows(1);
    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, HEADERS.length);
  }

  return sheet;
}

/**
 * Helper: returns a JSON ContentService response with CORS headers.
 */
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
