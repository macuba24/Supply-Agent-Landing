import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const localeDir = path.join(root, "public", "locales");

const checks = [
  {
    locale: "de",
    file: path.join(localeDir, "de", "common.json"),
    banned: [
      /\bdownload\b/i,
      /\bsupplier audit\b/i,
      /\bliability\b/i,
      /\btraceability\b/i,
      /\bparo de línea\b/i,
      /\bresponsabilidad civil\b/i,
    ],
  },
  {
    locale: "en",
    file: path.join(localeDir, "en", "common.json"),
    banned: [
      /\bkrisen\b/i,
      /\blieferkette\b/i,
      /\bschutzschild\b/i,
      /\bserien-?gau\b/i,
      /\banfragen\b/i,
      /\bherunterladen\b/i,
      /\bparo de línea\b/i,
      /\bresponsabilidad civil\b/i,
    ],
  },
  {
    locale: "es",
    file: path.join(localeDir, "es", "common.json"),
    banned: [
      /\bkrisen\b/i,
      /\blieferkette\b/i,
      /\bschutzschild\b/i,
      /\bserien-?gau\b/i,
      /\banfragen\b/i,
      /\bherunterladen\b/i,
      /\bsupplier audit\b/i,
      /\bliability\b/i,
      /\btraceability\b/i,
    ],
  },
];

const failures = [];

for (const check of checks) {
  if (!fs.existsSync(check.file)) {
    failures.push(`[${check.locale}] missing file: ${check.file}`);
    continue;
  }

  const content = fs.readFileSync(check.file, "utf8");
  for (const pattern of check.banned) {
    if (pattern.test(content)) {
      failures.push(`[${check.locale}] contains forbidden term matching ${pattern}`);
    }
  }
}

if (failures.length) {
  console.error("i18n mix check failed:");
  for (const line of failures) {
    console.error(`- ${line}`);
  }
  process.exit(1);
}

console.log("i18n mix check passed.");
