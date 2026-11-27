---
name: new
description: Start a new Maniple application in this folder
argument-hint: "[what you want to build]"
---

If there is no MCP server named maniple, Maniple's address was not set when the plugin was installed: tell me to run `/plugin configure maniple` and enter my organisation's Maniple address (my platform team knows it), then ask you again.

I want a new Maniple application. First check this folder for `.maniple/application.json`: if it names an application already, tell me and stop.

Otherwise list the application types I can build (list_application_types, from the maniple MCP server), show them to me with their descriptions and let me choose. Then agree a name and a short description with me, create it (create_application), get its setup link (get_setup_link) and follow its instructions exactly.

If Maniple asks you to sign in, tell me how, and only the way that fits where you run (run  echo $CLAUDE_CODE_ENTRYPOINT  to see): in Claude Desktop (claude-desktop), Plugins in the sidebar → Maniple → Connectors → maniple → Connect, then I click Allow in Maniple and type the command again; in a terminal, type /mcp, choose maniple and sign in, then run this again.

What I want: $ARGUMENTS
