---
name: doctor
description: Check that Maniple works in this folder, and why the last step was refused
---

If there is no MCP server named maniple, my organisation's Cursor admin has not set Maniple's address yet: tell me to ask them to set MANIPLE_URL for the Maniple plugin (Cursor dashboard → Plugins → Configure).

Check that Maniple works here. If the `maniple` command is installed, run `maniple doctor` and show me its report. If it is not, check the folder yourself: `.maniple/application.json` names the application and `.maniple/hooks/desktop-hook.js` or `.claude/hooks/desktop-hook.js` means Maniple's hooks govern it; then call application_status (maniple MCP server). Do not ask me to install anything: nothing else is needed.

Then call explain_refusal (maniple MCP server) and tell me in plain words why the last step was refused, if one was, and what to do about it.
