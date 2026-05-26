const path = require('path');
const fs = require('fs');

function ensureReportDir() {
  const reportDir = path.resolve(__dirname, '..', 'playwright-report');
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir, { recursive: true });
  return reportDir;
}

function timestampedFilename(prefix) {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const ts = `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  return `${prefix}_${ts}.xlsx`;
}

function createExportPath(prefix = 'Export') {
  const dir = ensureReportDir();
  const name = timestampedFilename(prefix);
  return path.join(dir, name);
}

module.exports = { ensureReportDir, createExportPath };

