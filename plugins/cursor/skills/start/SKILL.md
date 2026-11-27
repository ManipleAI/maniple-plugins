---
name: start
description: Start or continue a Maniple application in this folder
argument-hint: "[what you want to build]"
---

If there is no MCP server named maniple, my organisation's Cursor admin has not set Maniple's address yet: tell me to ask them to set MANIPLE_URL for the Maniple plugin (Cursor dashboard → Plugins → Configure).

Use Maniple's tools (the maniple MCP server) to work out which Maniple application this folder is, in this order, and never guess:

1. If `.maniple/application.json` exists here, it names the application. If `.maniple/hooks/desktop-hook.js` or `.claude/hooks/desktop-hook.js` is here too, the folder is already governed by Maniple: say so and carry on with what I asked. If not, get its setup link (get_setup_link) and follow the instructions it returns.
2. Otherwise, if this folder is a git repository, pass the output of `git remote get-url origin` to find_application. A match is the application to continue: get its setup link.
3. Otherwise list my applications (list_my_applications) and ask me whether I mean one of them or want a new one. Wait for my answer.
4. For a new one, list the application types I can build (list_application_types), show them to me with their descriptions and let me choose. Then agree a name and a short description with me, create it (create_application), get its setup link and follow its instructions.

When I want to try what you built, ask Maniple for a test link (try_application) and give it to me.

If Maniple asks you to sign in, or its tools are not available yet, tell me to sign in. Sign in with the way that fits the agent you are: Claude Code, run  /mcp  and choose maniple; Codex, run  codex mcp login maniple ; GitHub Copilot CLI, start  copilot  (not  copilot -p ) and sign in to maniple when it asks, or use  /mcp ; Factory Droid, run  droid mcp auth ; Kiro CLI, start  kiro-cli chat --v3  and press Ctrl+Y when it says maniple requires OAuth; Kiro IDE, the MCP Servers panel; Mistral Vibe, sign-in happens during  vibe mcp add ; any other agent, sign in to the MCP server named maniple in its MCP settings. My browser then opens Maniple, I sign in there if asked, and Maniple asks me to allow the agent: I click Allow. Then I ask you again.

What I want: $ARGUMENTS
