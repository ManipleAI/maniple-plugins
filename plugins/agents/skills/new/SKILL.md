---
name: new
description: Start a new Maniple application in this folder
argument-hint: "[what you want to build]"
---

Check whether a server named maniple is set up, with the agent's own list (Codex  codex mcp list ; Copilot CLI  copilot mcp list ; Droid  droid mcp list ; Kiro  ~/.kiro/settings/mcp.json ; Vibe  ~/.vibe/config.toml , section mcp_servers ), because a server waiting for sign-in shows no tools. If there is no MCP server named maniple, connect this agent to Maniple first, by following this plugin's `connect` skill, then carry on. If there is one but none of its tools are available to you, it is waiting for my sign-in: do not run `connect` again, tell me how to sign in (below).

I want a new Maniple application. First check this folder for `.maniple/application.json`: if it names an application already, tell me and stop.

Otherwise list the application types I can build (list_application_types, from the maniple MCP server), show them to me with their descriptions and let me choose. Then agree a name and a short description with me, create it (create_application), get its setup link (get_setup_link) and follow its instructions exactly.

If Maniple asks you to sign in, or its tools are not available yet, tell me to sign in. Sign in with the way that fits the agent you are: Codex, run  codex mcp login maniple ; GitHub Copilot CLI, start  copilot  (not  copilot -p ) and sign in to maniple when it asks, or use  /mcp ; Factory Droid, run  droid mcp auth ; Kiro CLI, start  kiro-cli chat --v3  and press Ctrl+Y when it says maniple requires OAuth; Kiro IDE, the MCP Servers panel; Mistral Vibe, sign-in happens during  vibe mcp add ; any other agent, sign in to the MCP server named maniple in its MCP settings. My browser then opens Maniple, I sign in there if asked, and Maniple asks me to allow the agent: I click Allow. Then I ask you again.

What I want: $ARGUMENTS
