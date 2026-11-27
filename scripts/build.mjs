// Builds every package in this repository from one source, so each coding
// agent is told the same thing. Run: node scripts/build.mjs
//
// Maniple runs one installation per organisation, each at its own address.
// No package here holds an address. Each one gets it from the person when it
// is installed or first used:
// - Claude Code asks for it at install (userConfig);
// - Cursor's admins set it once for the organisation (plugin variables);
// - Codex, GitHub Copilot, Factory Droid, Kiro and Mistral Vibe run the
//   `connect` skill, which asks for it and registers Maniple's MCP server
//   with the agent's own command.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const VERSION = "1.0.7";
const DESCRIPTION =
  "Start and continue your Maniple applications from your coding agent, governed by your organisation's standards.";
const AUTHOR = { name: "Maniple", url: "https://maniple.ai" };
const HOMEPAGE = "https://maniple.ai";
const REPOSITORY = "https://github.com/ManipleAI/maniple-plugins";
const PRIVACY = `${REPOSITORY}/blob/main/PRIVACY.md`;
const TERMS = `${REPOSITORY}/blob/main/TERMS.md`;
const KEYWORDS = ["maniple", "governance", "citizen-developer", "mcp"];
const LICENSE = "MIT";

const out = (rel, body) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, typeof body === "string" ? body : JSON.stringify(body, null, 2) + "\n");
};
const clean = (rel) => fs.rmSync(path.join(ROOT, rel), { recursive: true, force: true });

// ── The skills ──────────────────────────────────────────────────────────────

const GOVERNED = "`.maniple/hooks/desktop-hook.js` or `.claude/hooks/desktop-hook.js`";

// What to do when the maniple MCP server is not there yet, per kind of package.
const MISSING = {
  claude:
    "If there is no MCP server named maniple, Maniple's address was not set when the plugin was installed: tell me to run `/plugin configure maniple` and enter my organisation's Maniple address (my platform team knows it), then ask you again.",
  cursor:
    "If there is no MCP server named maniple, my organisation's Cursor admin has not set Maniple's address yet: tell me to ask them to set MANIPLE_URL for the Maniple plugin (Cursor dashboard → Plugins → Configure).",
  connect:
    "Check whether a server named maniple is set up, with the agent's own list (Codex  codex mcp list ; Copilot CLI  copilot mcp list ; Droid  droid mcp list ; Kiro  ~/.kiro/settings/mcp.json ; Vibe  ~/.vibe/config.toml , section mcp_servers ), because a server waiting for sign-in shows no tools. If there is no MCP server named maniple, connect this agent to Maniple first, by following this plugin's `connect` skill, then carry on. If there is one but none of its tools are available to you, it is waiting for my sign-in: do not run `connect` again, tell me how to sign in (below).",
};

const SIGN_IN = {
  claude:
    "If Maniple asks you to sign in, tell me how, and only the way that fits where you run (run  echo $CLAUDE_CODE_ENTRYPOINT  to see): in Claude Desktop (claude-desktop), Plugins in the sidebar → Maniple → Connectors → maniple → Connect, then I click Allow in Maniple and type the command again; in a terminal, type /mcp, choose maniple and sign in, then run this again.",
  other:
    "If Maniple asks you to sign in, or its tools are not available yet, tell me to sign in. Sign in with the way that fits the agent you are: Codex, run  codex mcp login maniple ; GitHub Copilot CLI, start  copilot  (not  copilot -p ) and sign in to maniple when it asks, or use  /mcp ; Factory Droid, run  droid mcp auth ; Kiro CLI, start  kiro-cli chat --v3  and press Ctrl+Y when it says maniple requires OAuth; Kiro IDE, the MCP Servers panel; Mistral Vibe, sign-in happens during  vibe mcp add ; any other agent, sign in to the MCP server named maniple in its MCP settings. My browser then opens Maniple, I sign in there if asked, and Maniple asks me to allow the agent: I click Allow. Then I ask you again.",
};

function start(kind) {
  return `---
name: start
description: Start or continue a Maniple application in this folder
argument-hint: "[what you want to build]"
---

${MISSING[kind]}

Use Maniple's tools (the maniple MCP server) to work out which Maniple application this folder is, in this order, and never guess:

1. If \`.maniple/application.json\` exists here, it names the application. If ${GOVERNED} is here too, the folder is already governed by Maniple: say so and carry on with what I asked. If not, get its setup link (get_setup_link) and follow the instructions it returns.
2. Otherwise, if this folder is a git repository, pass the output of \`git remote get-url origin\` to find_application. A match is the application to continue: get its setup link.
3. Otherwise list my applications (list_my_applications) and ask me whether I mean one of them or want a new one. Wait for my answer.
4. For a new one, list the application types I can build (list_application_types), show them to me with their descriptions and let me choose. Then agree a name and a short description with me, create it (create_application), get its setup link and follow its instructions.

When I want to try what you built, ask Maniple for a test link (try_application) and give it to me.

${SIGN_IN[kind === "claude" ? "claude" : "other"]}

What I want: $ARGUMENTS
`;
}

function newApp(kind) {
  return `---
name: new
description: Start a new Maniple application in this folder
argument-hint: "[what you want to build]"
---

${MISSING[kind]}

I want a new Maniple application. First check this folder for \`.maniple/application.json\`: if it names an application already, tell me and stop.

Otherwise list the application types I can build (list_application_types, from the maniple MCP server), show them to me with their descriptions and let me choose. Then agree a name and a short description with me, create it (create_application), get its setup link (get_setup_link) and follow its instructions exactly.

${SIGN_IN[kind === "claude" ? "claude" : "other"]}

What I want: $ARGUMENTS
`;
}

function doctor(kind) {
  return `---
name: doctor
description: Check that Maniple works in this folder, and why the last step was refused
---

${MISSING[kind]}

Check that Maniple works here. If the \`maniple\` command is installed, run \`maniple doctor\` and show me its report. If it is not, check the folder yourself: \`.maniple/application.json\` names the application and ${GOVERNED} means Maniple's hooks govern it; then call application_status (maniple MCP server). Do not ask me to install anything: nothing else is needed.

Then call explain_refusal (maniple MCP server) and tell me in plain words why the last step was refused, if one was, and what to do about it.
`;
}

const CONNECT = `---
name: connect
description: Connect this coding agent to your organisation's Maniple
argument-hint: "[your Maniple address, for example https://maniple.example.com]"
---

Connect this coding agent to my organisation's Maniple. Do each step yourself; only ask me for the address.

1. **The address.** Check whether a server named maniple is set up, with the agent's own list (Codex  codex mcp list ; Copilot CLI  copilot mcp list ; Droid  droid mcp list ; Kiro  ~/.kiro/settings/mcp.json ; Vibe  ~/.vibe/config.toml , section mcp_servers ), because a server waiting for sign-in shows no tools. If it is already set up, keep it, do not ask for an address, and go to step 4. Otherwise use the one I gave here, if any: $ARGUMENTS. Otherwise ask me for it (for example \`https://maniple.example.com\`); my platform team knows it. Drop any trailing slash and any path. Maniple's MCP server is at \`<address>/mcp\`.
2. **Check it is a Maniple.** Run \`curl -s -o /dev/null -w "%{http_code}" -X POST <address>/mcp\`. It must answer \`401\` (Maniple asks for a sign-in). Anything else: tell me the address did not answer as a Maniple, and stop.
3. **Add the MCP server named \`maniple\`**, with the command for the agent you are:
   - Codex: \`codex mcp add maniple --url <address>/mcp\`, then \`codex mcp login maniple\`.
   - GitHub Copilot CLI: \`copilot mcp add --transport http maniple <address>/mcp\`.
   - GitHub Copilot in VS Code: \`code --add-mcp '{"name":"maniple","type":"http","url":"<address>/mcp"}'\`.
   - Factory Droid: \`droid mcp add maniple <address>/mcp --type http\`.
   - Kiro: if \`kiro-cli\` is installed, \`kiro-cli mcp add --name maniple --url <address>/mcp --scope global\`; otherwise add \`"maniple": {"url": "<address>/mcp"}\` under \`mcpServers\` in \`~/.kiro/settings/mcp.json\` (create the file as \`{"mcpServers": {}}\` if it is not there; keep every other server in it).
   - Mistral Vibe: tell me to run \`vibe mcp add maniple --url <address>/mcp\` in my terminal (it opens my browser to sign in while it adds the server), then to restart Vibe.
   - Any other agent: tell me the address \`<address>/mcp\` and ask me to add it as an HTTP MCP server named maniple in the agent's MCP settings.
   If a server named maniple is already there with another address, tell me both addresses and ask before replacing it.
4. **Sign in.** Tell me to sign in to the MCP server named maniple. Sign in with the way that fits the agent you are: Codex, run  codex mcp login maniple ; GitHub Copilot CLI, start  copilot  (not  copilot -p ) and sign in to maniple when it asks, or use  /mcp ; Factory Droid, run  droid mcp auth ; Kiro CLI, start  kiro-cli chat --v3  and press Ctrl+Y when it says maniple requires OAuth; Kiro IDE, the MCP Servers panel; Mistral Vibe, sign-in happens during  vibe mcp add ; any other agent, sign in to the MCP server named maniple in its MCP settings. My browser opens my Maniple, I sign in there if asked, and Maniple asks me to allow the agent: I click Allow. Some agents only see a new server in a new session: if you cannot see it, tell me to start one.
5. Then tell me I can say "start" (or use the \`start\` skill) to start or continue a Maniple application in this folder.
`;

function skills(dir, kind, withConnect) {
  out(`${dir}/skills/start/SKILL.md`, start(kind));
  out(`${dir}/skills/new/SKILL.md`, newApp(kind));
  out(`${dir}/skills/doctor/SKILL.md`, doctor(kind));
  if (withConnect) out(`${dir}/skills/connect/SKILL.md`, CONNECT);
}

const README = (who, setup) => `# Maniple for ${who}

Maniple governs the applications that people across an organisation build with AI coding agents. This plugin lets you start and continue your Maniple applications from ${who}, while your organisation's standards, approvals and budgets apply to the work.

It adds the skills \`start\`, \`new\` and \`doctor\`, and connects ${who} to your organisation's own Maniple through its MCP server. You sign in to Maniple in your browser; the plugin holds no credentials and sends nothing anywhere but your organisation's Maniple.

## Setup

${setup}

Your platform team can tell you your Maniple address, for example \`https://maniple.example.com\`.

## What the plugin runs and sends

- **Network:** only your organisation's Maniple, at the address you give. The MCP server is \`<address>/mcp\`; sign-in is OAuth with PKCE in your browser, and your coding agent stores the resulting token.
- **Tools it calls:** Maniple's own MCP tools, for example to list your applications, create one, get its setup link or explain a refusal. Each call acts as you and Maniple applies its own rules to it.
- **Commands the skills may ask your agent to run:** \`curl\` to check that the address answers like a Maniple (\`connect\`); your agent's own command to add the MCP server and sign in (\`connect\`); \`git remote get-url origin\` to find the application for this folder (\`start\`); and \`maniple doctor\` if the Maniple command is installed (\`doctor\`). Your agent asks before running commands, as its settings say.
- **Nothing else:** no hooks, no scripts, no telemetry, and nothing sent to the publisher of this plugin. See the privacy policy below.

Privacy: ${PRIVACY} · Terms: ${TERMS} · Support: ${REPOSITORY}/issues
`;

// ── The packages ────────────────────────────────────────────────────────────

for (const d of ["plugins", ".claude-plugin", ".agents", ".github/plugin", ".factory-plugin", ".cursor-plugin", "dist"]) clean(d);

// Claude Code (and Claude Desktop): asks for the address at install.
out("plugins/claude-code/.claude-plugin/plugin.json", {
  name: "maniple",
  displayName: "Maniple",
  version: VERSION,
  description: DESCRIPTION,
  author: AUTHOR,
  homepage: HOMEPAGE,
  repository: REPOSITORY,
  license: LICENSE,
  keywords: KEYWORDS,
  icon: "assets/icon.png",
  privacyPolicyUrl: PRIVACY,
  termsOfServiceUrl: TERMS,
  supportUrl: `${REPOSITORY}/issues`,
  documentationUrl: `${REPOSITORY}#readme`,
  userConfig: {
    maniple_url: {
      type: "string",
      title: "Your Maniple address",
      description: "Your organisation's Maniple, for example https://maniple.example.com",
      required: true,
    },
  },
  mcpServers: { maniple: { type: "http", url: "${user_config.maniple_url}/mcp" } },
});
skills("plugins/claude-code", "claude", false);
out(
  "plugins/claude-code/README.md",
  README(
    "Claude Code",
    "Install it from the plugin directory, or with `/plugin install maniple@maniple-plugins` after `/plugin marketplace add ManipleAI/maniple-plugins`. Claude Code asks for your Maniple address when you install it (later: `/plugin configure maniple`). Then sign in when Claude Code asks, and type `/maniple:start`."
  )
);

// Codex, GitHub Copilot (CLI and VS Code), Factory Droid: the connect skill.
out("plugins/agents/.claude-plugin/plugin.json", {
  name: "maniple",
  displayName: "Maniple",
  version: VERSION,
  description: DESCRIPTION,
  author: AUTHOR,
  homepage: HOMEPAGE,
  repository: REPOSITORY,
  license: LICENSE,
  keywords: KEYWORDS,
});
skills("plugins/agents", "connect", true);
out(
  "plugins/agents/README.md",
  README(
    "your coding agent",
    "Install the plugin (see the repository's README for your agent), then ask the agent to use the Maniple `connect` skill with your Maniple address. It registers Maniple's MCP server with the agent's own command; then sign in when asked and use `start`."
  )
);

// Cursor: the organisation's admins set the address once.
out("plugins/cursor/.cursor-plugin/plugin.json", {
  name: "maniple",
  version: VERSION,
  description: DESCRIPTION,
  author: { name: AUTHOR.name },
  homepage: HOMEPAGE,
  repository: REPOSITORY,
  license: LICENSE,
  keywords: KEYWORDS,
  logo: "assets/icon.png",
  variables: {
    type: "object",
    properties: {
      MANIPLE_URL: {
        type: "string",
        title: "Maniple address",
        description: "Your organisation's Maniple, for example https://maniple.example.com",
      },
    },
    required: ["MANIPLE_URL"],
  },
});
out("plugins/cursor/mcp.json", { mcpServers: { maniple: { type: "http", url: "${MANIPLE_URL}/mcp" } } });
skills("plugins/cursor", "cursor", false);
out(
  "plugins/cursor/README.md",
  README(
    "Cursor",
    "Your organisation's Cursor admin installs the plugin and sets `MANIPLE_URL` to your Maniple address (Cursor dashboard → Plugins → Configure). Then sign in to the maniple MCP server in Cursor Settings → MCP, and ask Cursor to start a Maniple application."
  )
);

// Kiro and Mistral Vibe: the Agent Plugins format, with the connect skill.
out("plugins/agent-plugins/plugin.json", {
  $schema: "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
  name: "maniple",
  version: VERSION,
  description: DESCRIPTION,
  author: AUTHOR,
  homepage: HOMEPAGE,
  repository: REPOSITORY,
  license: LICENSE,
  keywords: KEYWORDS,
});
skills("plugins/agent-plugins", "connect", true);
out(
  "plugins/agent-plugins/README.md",
  README(
    "Kiro and Mistral Vibe",
    "Kiro: Powers → Add Custom Power → Import power from GitHub, with this folder's address. Mistral Vibe: copy this folder to `~/.vibe/plugins/maniple` and run `/reload-plugins`. Then ask the agent to use the Maniple `connect` skill with your Maniple address, sign in when asked, and use `start`."
  )
);

for (const dir of ["plugins/claude-code", "plugins/cursor"]) {
  fs.mkdirSync(path.join(ROOT, dir, "assets"), { recursive: true });
  fs.copyFileSync(path.join(ROOT, "assets/icon.png"), path.join(ROOT, dir, "assets/icon.png"));
}
for (const dir of ["plugins/claude-code", "plugins/agents", "plugins/cursor", "plugins/agent-plugins"]) {
  fs.copyFileSync(path.join(ROOT, "LICENSE"), path.join(ROOT, dir, "LICENSE"));
}

// ── The marketplaces: this repository is one for each agent ─────────────────

const owner = { name: "Maniple", url: "https://maniple.ai" };
const MARKET = "Maniple for your coding agent: start and continue your Maniple applications, governed by your organisation's standards.";
const entry = (source) => ({ name: "maniple", source, description: DESCRIPTION, version: VERSION });
out(".claude-plugin/marketplace.json", { name: "maniple-plugins", owner, description: MARKET, plugins: [entry("./plugins/claude-code")] });
out(".agents/plugins/marketplace.json", { name: "maniple-plugins", owner, description: MARKET, plugins: [entry("./plugins/agents")] });
out(".github/plugin/marketplace.json", { name: "maniple-plugins", owner, description: MARKET, plugins: [entry("./plugins/agents")] });
out(".factory-plugin/marketplace.json", { name: "maniple-plugins", owner, description: MARKET, plugins: [entry("./plugins/agents")] });
out(".cursor-plugin/marketplace.json", {
  name: "maniple-plugins",
  owner: { name: "Maniple" },
  metadata: { description: "Maniple for Cursor" },
  plugins: [{ name: "maniple", source: "plugins/cursor", description: DESCRIPTION }],
});

console.log("built", VERSION);

// ── Upload packages (dist/, not committed; attached to a GitHub release) ─────
// Codex's portal takes a ZIP of a Claude-format plugin with no MCP server and
// no userConfig: the shared package is exactly that.
import { execFileSync as run } from "node:child_process";
fs.mkdirSync(path.join(ROOT, "dist"), { recursive: true });
const zip = (name, dir) => run("zip", ["-q", "-r", "-X", path.join(ROOT, "dist", name), "."], { cwd: path.join(ROOT, dir) });
zip(`maniple-codex-${VERSION}.zip`, "plugins/agents");
zip(`maniple-agent-plugins-${VERSION}.zip`, "plugins/agent-plugins");
zip(`maniple-claude-code-${VERSION}.zip`, "plugins/claude-code");
console.log("packages in dist/");
