---
name: doctor
description: Check that Maniple works in this folder, and why the last step was refused
---

Check whether a server named maniple is set up, with the agent's own list (Codex  codex mcp list ; Copilot CLI  copilot mcp list ; Droid  droid mcp list ; Kiro  ~/.kiro/settings/mcp.json ; Vibe  ~/.vibe/config.toml , section mcp_servers ), because a server waiting for sign-in shows no tools. If there is no MCP server named maniple, connect this agent to Maniple first, by following this plugin's `connect` skill, then carry on. If there is one but none of its tools are available to you, it is waiting for my sign-in: do not run `connect` again, tell me how to sign in (below).

Check that Maniple works here. If the `maniple` command is installed, run `maniple doctor` and show me its report. If it is not, check the folder yourself: `.maniple/application.json` names the application and `.maniple/hooks/desktop-hook.js` or `.claude/hooks/desktop-hook.js` means Maniple's hooks govern it; then call application_status (maniple MCP server). Do not ask me to install anything: nothing else is needed.

Then call explain_refusal (maniple MCP server) and tell me in plain words why the last step was refused, if one was, and what to do about it.
