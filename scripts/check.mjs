// Checks the built packages: every JSON file parses, every package has its
// manifest, skills and licence, nothing names a particular Maniple
// installation, and no email address or personal name is in any tracked file.
// Run: node scripts/check.mjs (exits 1 on a problem).
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const problems = [];
const files = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], { cwd: ROOT, encoding: "utf8" })
  .split("\n")
  .filter(Boolean);

// Words that must appear nowhere, kept as hashes so this file does not
// publish them either (lowercase sha256, first 16 hex characters).
const FORBIDDEN_WORDS = new Set(["ec187a17a1a662a4","8d787259baf0c7bd","8bdcb2906ab9b34f","daa18028995e4b5e"]);
const hash = (w) => createHash("sha256").update(w.toLowerCase()).digest("hex").slice(0, 16);

const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
// One installation's address: any host under maniple.ai other than the site itself.
const INSTALLATION = /\b[a-z0-9-]+(\.[a-z0-9-]+)*\.maniple\.(ai|demo)\b/gi;

for (const rel of files) {
  if (!fs.existsSync(path.join(ROOT, rel))) continue;
  if (/\.(png|jpg|jpeg|gif|ico)$/i.test(rel)) continue;
  const text = fs.readFileSync(path.join(ROOT, rel), "utf8");
  if (rel.endsWith(".json")) {
    try {
      JSON.parse(text);
    } catch (e) {
      problems.push(`${rel}: not valid JSON (${e.message})`);
    }
  }
  for (const m of text.match(EMAIL) ?? []) problems.push(`${rel}: an email address (${m})`);
  for (const m of text.match(INSTALLATION) ?? []) problems.push(`${rel}: one installation's address (${m})`);
  for (const w of text.split(/[^A-Za-z]+/)) if (w.length > 3 && FORBIDDEN_WORDS.has(hash(w))) problems.push(`${rel}: a forbidden word`);
}

const need = {
  "plugins/claude-code": [".claude-plugin/plugin.json", "skills/start/SKILL.md", "skills/new/SKILL.md", "skills/doctor/SKILL.md", "LICENSE", "README.md", "assets/icon.png"],
  "plugins/agents": [".claude-plugin/plugin.json", "skills/connect/SKILL.md", "skills/start/SKILL.md", "LICENSE", "README.md"],
  "plugins/cursor": [".cursor-plugin/plugin.json", "mcp.json", "skills/start/SKILL.md", "LICENSE", "README.md", "assets/icon.png"],
  "plugins/agent-plugins": ["plugin.json", "skills/connect/SKILL.md", "skills/start/SKILL.md", "LICENSE", "README.md"],
};
for (const [dir, list] of Object.entries(need)) {
  for (const f of list) if (!fs.existsSync(path.join(ROOT, dir, f))) problems.push(`${dir}: missing ${f}`);
}
for (const f of ["PRIVACY.md", "TERMS.md", "SECURITY.md", "LICENSE"]) if (!fs.existsSync(path.join(ROOT, f))) problems.push(`${f} missing`);
for (const m of [".claude-plugin", ".agents/plugins", ".github/plugin", ".factory-plugin", ".cursor-plugin"]) {
  if (!fs.existsSync(path.join(ROOT, m, "marketplace.json"))) problems.push(`${m}/marketplace.json missing`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`ok: ${files.length} files checked`);
