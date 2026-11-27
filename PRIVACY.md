# Privacy policy: Maniple plugins for coding agents

Last updated: 27 November 2026

This policy covers the plugins in this repository for Claude Code, Codex, GitHub Copilot, Cursor, Factory Droid, Kiro and Mistral Vibe ("the plugins").

## What the plugins are

Each plugin is a set of instructions (skills) for your coding agent, plus, in some packages, the settings for one MCP server. The plugins contain no code that runs on its own and include no analytics, telemetry or tracking.

## Where your data goes

- **To your organisation's own Maniple, and nowhere else.** You give the plugin your organisation's Maniple address when you install it, or when the `connect` skill asks for it. The plugins send requests only to that address.
- **Maniple, the company that publishes these plugins, receives nothing from them.** Your organisation runs its own Maniple. What you create there (applications, requests, approvals) is stored and processed by that installation, under your organisation's agreement and policies.
- **Sign-in happens in your browser, on your organisation's Maniple.** It uses OAuth with PKCE. Your coding agent keeps the resulting token in its own storage, under its own rules. The plugins never see or store your password.
- **Your coding agent's own provider** (for example Anthropic, OpenAI, GitHub, Cursor, Factory, AWS or Mistral) processes your prompts and the tool results under its own privacy policy. These plugins change nothing about that.

## What your organisation's Maniple may process

When you use the plugin, the Maniple your organisation runs may process:
- your account identity;
- the applications you create or continue, and the folder information you ask the agent to share (for example the git remote, to find an application);
- the requests you make and the decisions on them.

Questions about that data go to your organisation's Maniple administrators.

## Changes and contact

Changes to this policy are made in this repository, and its history shows every change. Questions: open an issue at https://github.com/ManipleAI/maniple-plugins/issues. Security reports: see [SECURITY.md](SECURITY.md).
