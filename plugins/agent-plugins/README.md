# Maniple for Kiro and Mistral Vibe

Maniple governs the applications that people across an organisation build with AI coding agents. This plugin lets you start and continue your Maniple applications from Kiro and Mistral Vibe, while your organisation's standards, approvals and budgets apply to the work.

It adds the skills `start`, `new` and `doctor`, and connects Kiro and Mistral Vibe to your organisation's own Maniple through its MCP server. You sign in to Maniple in your browser; the plugin holds no credentials and sends nothing anywhere but your organisation's Maniple.

## Setup

Kiro: Powers → Add Custom Power → Import power from GitHub, with this folder's address. Mistral Vibe: copy this folder to `~/.vibe/plugins/maniple` and run `/reload-plugins`. Then ask the agent to use the Maniple `connect` skill with your Maniple address, sign in when asked, and use `start`.

Your platform team can tell you your Maniple address, for example `https://maniple.example.com`.

Privacy: https://maniple.ai/legal/privacy · Terms: https://maniple.ai/legal/terms · Support: https://github.com/ManipleAI/maniple-plugins/issues
