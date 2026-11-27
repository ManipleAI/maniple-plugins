# Maniple for Claude Code

Maniple governs the applications that people across an organisation build with AI coding agents. This plugin lets you start and continue your Maniple applications from Claude Code, while your organisation's standards, approvals and budgets apply to the work.

It adds the skills `start`, `new` and `doctor`, and connects Claude Code to your organisation's own Maniple through its MCP server. You sign in to Maniple in your browser; the plugin holds no credentials and sends nothing anywhere but your organisation's Maniple.

## Setup

Install it from the plugin directory, or with `/plugin install maniple@maniple-plugins` after `/plugin marketplace add ManipleAI/maniple-plugins`. Claude Code asks for your Maniple address when you install it (later: `/plugin configure maniple`). Then sign in when Claude Code asks, and type `/maniple:start`.

Your platform team can tell you your Maniple address, for example `https://maniple.example.com`.

## What the plugin runs and sends

- **Network:** only your organisation's Maniple, at the address you give. The MCP server is `<address>/mcp`; sign-in is OAuth with PKCE in your browser, and your coding agent stores the resulting token.
- **Tools it calls:** Maniple's own MCP tools, for example to list your applications, create one, get its setup link or explain a refusal. Each call acts as you and Maniple applies its own rules to it.
- **Commands the skills may ask your agent to run:** `curl` to check that the address answers like a Maniple (`connect`); your agent's own command to add the MCP server and sign in (`connect`); `git remote get-url origin` to find the application for this folder (`start`); and `maniple doctor` if the Maniple command is installed (`doctor`). Your agent asks before running commands, as its settings say.
- **Nothing else:** no hooks, no scripts, no telemetry, and nothing sent to the publisher of this plugin. See the privacy policy below.

Privacy: https://github.com/ManipleAI/maniple-plugins/blob/main/PRIVACY.md · Terms: https://github.com/ManipleAI/maniple-plugins/blob/main/TERMS.md · Support: https://github.com/ManipleAI/maniple-plugins/issues
