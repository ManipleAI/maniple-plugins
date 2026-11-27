# Maniple plugins for coding agents

Maniple governs the applications that people across an organisation build with
AI coding agents: which agents and models they may use, the standards the work
must follow, approvals, budgets and going live. These plugins let a person
start and continue their Maniple applications from the coding agent they
already use.

Each plugin adds the skills `start`, `new` and `doctor`, and connects the agent
to **your organisation's own Maniple** through its MCP server, at
`<your Maniple address>/mcp`. You sign in to Maniple in your browser. The
plugins hold no credentials and send nothing anywhere but your organisation's
Maniple. Your platform team can tell you your Maniple address, for example
`https://maniple.example.com`.

## Install

| Agent | Install | Your Maniple address |
|---|---|---|
| **Claude Code** (and Claude Desktop) | `/plugin marketplace add ManipleAI/maniple-plugins`, then `/plugin install maniple@maniple-plugins` | Asked when you install (`/plugin configure maniple` to change it) |
| **Codex** | `codex plugin marketplace add ManipleAI/maniple-plugins`, then `codex plugin add maniple@maniple-plugins` | Ask Codex to use the Maniple `connect` skill |
| **GitHub Copilot CLI** | `copilot plugin marketplace add ManipleAI/maniple-plugins`, then `copilot plugin install maniple@maniple-plugins` | Ask Copilot to use the Maniple `connect` skill |
| **GitHub Copilot in VS Code** | Add `ManipleAI/maniple-plugins` as an agent plugin marketplace (`chat.plugins.marketplaces`) and install Maniple | Ask Copilot to use the Maniple `connect` skill |
| **Factory Droid** | `droid plugin marketplace add ManipleAI/maniple-plugins`, then `droid plugin install maniple@maniple-plugins` | Ask Droid to use the Maniple `connect` skill |
| **Cursor** | Install Maniple from this repository's Cursor marketplace | Your Cursor admin sets `MANIPLE_URL` once (dashboard → Plugins → Configure) |
| **Kiro** | Powers → Add Custom Power → Import power from GitHub: `https://github.com/ManipleAI/maniple-plugins/tree/main/plugins/agent-plugins` | Ask Kiro to use the Maniple `connect` skill |
| **Mistral Vibe** | Copy `plugins/agent-plugins` to `~/.vibe/plugins/maniple`, then `/reload-plugins` | Ask Vibe to use the Maniple `connect` skill |

Then sign in when the agent asks, and use `start` (in Claude Code:
`/maniple:start`).

Your organisation's Maniple also offers these plugins itself, with its address
already filled in, under **Configure → Coding agents**. Platform teams can
install them for everyone from there.

## What is in this repository

| Folder | For |
|---|---|
| `plugins/claude-code` | Claude Code and Claude Desktop |
| `plugins/agents` | Codex, GitHub Copilot (CLI and VS Code), Factory Droid |
| `plugins/cursor` | Cursor |
| `plugins/agent-plugins` | Kiro and Mistral Vibe (the Agent Plugins format) |

Every package is built from one source by `node scripts/build.mjs`, and
`node scripts/check.mjs` checks them. Change `scripts/build.mjs`, never the
built files.

## Licence

MIT. See [LICENSE](LICENSE). Report security issues as described in
[SECURITY.md](SECURITY.md).

[Privacy policy](PRIVACY.md) · [Terms of use](TERMS.md) · [Security](SECURITY.md) · [Support](https://github.com/ManipleAI/maniple-plugins/issues)
