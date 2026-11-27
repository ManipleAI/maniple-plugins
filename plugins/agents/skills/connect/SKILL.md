---
name: connect
description: Connect this coding agent to your organisation's Maniple
argument-hint: "[your Maniple address, for example https://maniple.example.com]"
---

Connect this coding agent to my organisation's Maniple. Do each step yourself; only ask me for the address.

1. **The address.** Check whether a server named maniple is set up, with the agent's own list (Codex  codex mcp list ; Copilot CLI  copilot mcp list ; Droid  droid mcp list ; Kiro  ~/.kiro/settings/mcp.json ; Vibe  ~/.vibe/plugins/maniple/mcp.json ), because a server waiting for sign-in shows no tools. If it is already set up, keep it, do not ask for an address, and go to step 4. Otherwise use the one I gave here, if any: $ARGUMENTS. Otherwise ask me for it (for example `https://maniple.example.com`); my platform team knows it. Drop any trailing slash and any path. Maniple's MCP server is at `<address>/mcp`.
2. **Check it is a Maniple.** Run `curl -s -o /dev/null -w "%{http_code}" -X POST <address>/mcp`. It must answer `401` (Maniple asks for a sign-in). Anything else: tell me the address did not answer as a Maniple, and stop.
3. **Add the MCP server named `maniple`**, with the command for the agent you are:
   - Codex: `codex mcp add maniple --url <address>/mcp`, then `codex mcp login maniple`.
   - GitHub Copilot CLI: `copilot mcp add --transport http maniple <address>/mcp`.
   - GitHub Copilot in VS Code: `code --add-mcp '{"name":"maniple","type":"http","url":"<address>/mcp"}'`.
   - Factory Droid: `droid mcp add maniple <address>/mcp --type http`.
   - Kiro: add `"maniple": {"url": "<address>/mcp"}` under `mcpServers` in `~/.kiro/settings/mcp.json` (create the file as `{"mcpServers": {}}` if it is not there; keep every other server in it).
   - Mistral Vibe: write `~/.vibe/plugins/maniple/mcp.json` (or `$VIBE_HOME/plugins/maniple/mcp.json`) as `{"$schema": "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json", "mcpServers": {"maniple": {"type": "streamable-http", "url": "<address>/mcp"}}}`, then tell me to run `/reload-plugins`.
   - Any other agent: tell me the address `<address>/mcp` and ask me to add it as an HTTP MCP server named maniple in the agent's MCP settings.
   If a server named maniple is already there with another address, tell me both addresses and ask before replacing it.
4. **Sign in.** Tell me to sign in to the MCP server named maniple. Sign in with the way that fits the agent you are: Codex, run  codex mcp login maniple ; GitHub Copilot CLI, start  copilot  (not  copilot -p ) and sign in to maniple when it asks, or use  /mcp ; Factory Droid, run  droid mcp auth ; any other agent, sign in to the MCP server named maniple in its MCP settings. My browser opens my Maniple, I sign in there if asked, and Maniple asks me to allow the agent: I click Allow. Some agents only see a new server in a new session: if you cannot see it, tell me to start one.
5. Then tell me I can say "start" (or use the `start` skill) to start or continue a Maniple application in this folder.
