---
name: new
description: Start a new Maniple application in this folder
argument-hint: "[what you want to build]"
---

If there is no MCP server named maniple, my organisation's Cursor admin has not set Maniple's address yet: tell me to ask them to set MANIPLE_URL for the Maniple plugin (Cursor dashboard → Plugins → Configure).

I want a new Maniple application. First check this folder for `.maniple/application.json`: if it names an application already, tell me and stop.

Otherwise list the application types I can build (list_application_types, from the maniple MCP server), show them to me with their descriptions and let me choose. Then agree a name and a short description with me, create it (create_application), get its setup link (get_setup_link) and follow its instructions exactly.

If Maniple asks you to sign in, tell me to sign in to the MCP server named maniple in this agent's MCP settings. My browser then opens Maniple, I sign in there if asked, and Maniple asks me to allow the agent: I click Allow. Then I ask you again.

What I want: $ARGUMENTS
