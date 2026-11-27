---
name: start
description: Start or continue a Maniple application in this folder
argument-hint: "[what you want to build]"
---

If there is no MCP server named maniple, Maniple's address was not set when the plugin was installed: tell me to run `/plugin configure maniple` and enter my organisation's Maniple address (my platform team knows it), then ask you again.

Use Maniple's tools (the maniple MCP server) to work out which Maniple application this folder is, in this order, and never guess:

1. If `.maniple/application.json` exists here, it names the application. If `.maniple/hooks/desktop-hook.js` or `.claude/hooks/desktop-hook.js` is here too, the folder is already governed by Maniple: say so and carry on with what I asked. If not, get its setup link (get_setup_link) and follow the instructions it returns.
2. Otherwise, if this folder is a git repository, pass the output of `git remote get-url origin` to find_application. A match is the application to continue: get its setup link.
3. Otherwise list my applications (list_my_applications) and ask me whether I mean one of them or want a new one. Wait for my answer.
4. For a new one, list the application types I can build (list_application_types), show them to me with their descriptions and let me choose. Then agree a name and a short description with me, create it (create_application), get its setup link and follow its instructions.

When I want to try what you built, ask Maniple for a test link (try_application) and give it to me.

If Maniple asks you to sign in, tell me how, and only the way that fits where you run (run  echo $CLAUDE_CODE_ENTRYPOINT  to see): in Claude Desktop (claude-desktop), Plugins in the sidebar → Maniple → Connectors → maniple → Connect, then I click Allow in Maniple and type the command again; in a terminal, type /mcp, choose maniple and sign in, then run this again.

What I want: $ARGUMENTS
