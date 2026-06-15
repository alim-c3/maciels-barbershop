# Continue local sessions from any device with Remote Control

> Continue a local Claude Code session from your phone, tablet, or any browser using Remote Control. Works with claude.ai/code and the Claude mobile app.

> **Note:** Remote Control is in research preview and available on all plans. On Team and Enterprise, it is off by default until an admin enables the Remote Control toggle in [Claude Code admin settings](https://claude.ai/admin-settings/claude-code).

Remote Control connects [claude.ai/code](https://claude.ai/code) or the Claude app for [iOS](https://apps.apple.com/us/app/claude-by-anthropic/id6473753684) and [Android](https://play.google.com/store/apps/details?id=com.anthropic.claude) to a Claude Code session running on your machine. Start a task at your desk, then pick it up from your phone on the couch or a browser on another computer.

When you start a Remote Control session on your machine, Claude keeps running locally the entire time, so nothing moves to the cloud. With Remote Control you can:

- **Use your full local environment remotely**: your filesystem, MCP servers, tools, and project configuration all stay available, and typing `@` autocompletes file paths from your local project
- **Work from both surfaces at once**: the conversation stays in sync across all connected devices, so you can send messages from your terminal, browser, and phone interchangeably
- **Survive interruptions**: if your laptop sleeps or your network drops, the session reconnects automatically when your machine comes back online

> **Note:** Remote Control requires Claude Code v2.1.51 or later. Check your version with `claude --version`.

---

## Requirements

Before using Remote Control, confirm that your environment meets these conditions:

- **Subscription**: available on Pro, Max, Team, and Enterprise plans. API keys are not supported. On Team and Enterprise, an admin must first enable the Remote Control toggle in [Claude Code admin settings](https://claude.ai/admin-settings/claude-code).
- **Authentication**: run `claude` and use `/login` to sign in through claude.ai if you haven't already.
- **Workspace trust**: run `claude` in your project directory at least once to accept the workspace trust dialog.

---

## Start a Remote Control session

### Server mode

Navigate to your project directory and run:

```bash
claude remote-control
```

The process stays running in your terminal in server mode, waiting for remote connections. It displays a session URL you can use to connect from another device, and you can press spacebar to show a QR code for quick access from your phone.

Available flags:

| Flag | Description |
|------|-------------|
| `--name "My Project"` | Set a custom session title visible in the session list at claude.ai/code. |
| `--remote-control-session-name-prefix <prefix>` | Prefix for auto-generated session names. Defaults to your machine's hostname. Set `CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX` for the same effect. |
| `--spawn <mode>` | How the server creates sessions: `same-dir` (default), `worktree` (each session gets its own git worktree), or `session` (single-session mode). Press `w` at runtime to toggle between `same-dir` and `worktree`. |
| `--capacity <N>` | Maximum number of concurrent sessions. Default is 32. |
| `--verbose` | Show detailed connection and session logs. |
| `--sandbox` / `--no-sandbox` | Enable or disable sandboxing for filesystem and network isolation. Off by default. |

### Interactive session

To start a normal interactive Claude Code session with Remote Control enabled:

```bash
claude --remote-control
# or with a session name:
claude --remote-control "My Project"
```

A Remote Control indicator (`/rc active`) stays in the footer while the connection is up. Select it with the down arrow key and press Enter to open a status panel with the session URL and QR code.

### From an existing session

If you're already in a Claude Code session, run:

```
/remote-control
# or with a name:
/remote-control My Project
```

This starts a Remote Control session that carries over your current conversation history.

### VS Code

In the Claude Code VS Code extension, type `/remote-control` or `/rc` in the prompt box. A banner appears showing connection status with an **Open in browser** link.

---

## Connect from another device

Once a Remote Control session is active:

- **Open the session URL** in any browser to go directly to the session on [claude.ai/code](https://claude.ai/code).
- **Scan the QR code** shown alongside the session URL to open it in the Claude app. With `claude remote-control`, press spacebar to toggle the QR code display.
- **Open [claude.ai/code](https://claude.ai/code) or the Claude app** and find the session by name. Remote Control sessions show a computer icon with a green status dot when online.

The session title is chosen in this order:

1. The name you passed to `--name`, `--remote-control`, or `/remote-control`
2. The title you set with `/rename`
3. The last meaningful message in existing conversation history
4. An auto-generated name like `myhost-graceful-unicorn`

### Enable Remote Control for all sessions

Run `/config` inside Claude Code and set **Enable Remote Control for all sessions** to `true` to activate it automatically for every interactive session.

---

## Connection and security

Your local Claude Code session makes outbound HTTPS requests only and never opens inbound ports on your machine. All traffic travels through the Anthropic API over TLS. The connection uses multiple short-lived credentials, each scoped to a single purpose and expiring independently.

---

## Mobile push notifications

When Remote Control is active, Claude can send push notifications to your phone (requires Claude Code v2.1.110 or later).

**Setup:**

1. Install the Claude app for [iOS](https://apps.apple.com/us/app/claude-by-anthropic/id6473753684) or [Android](https://play.google.com/store/apps/details?id=com.anthropic.claude).
2. Sign in with the same account and organization you use for Claude Code.
3. Accept the notification permission prompt from the OS.
4. In your terminal, run `/config` and enable **Push when Claude decides**.

**Troubleshooting notifications:**

- If `/config` shows **No mobile registered**, open the Claude app to refresh its push token.
- On iOS, check that Focus modes aren't suppressing the Claude app under Settings → Notifications → Claude.
- On Android, exempt the Claude app from battery optimization in system settings.

---

## Limitations

- **One remote session per interactive process**: outside of server mode, each Claude Code instance supports one remote session at a time. Use server mode to run multiple concurrent sessions from a single process.
- **Local process must keep running**: if you close the terminal or stop the `claude` process, the session ends.
- **Extended network outage**: if your machine can't reach the network for more than ~10 minutes, the session times out.
- **Ultraplan disconnects Remote Control**: starting an ultraplan session disconnects any active Remote Control session.
- **Some commands are local-only**: `/plugin` and `/resume` work only from the local CLI. `/compact`, `/clear`, `/context`, `/usage`, `/mcp`, and others work from mobile and web.

---

## Troubleshooting

### "Remote Control requires a claude.ai subscription"
You're not authenticated with a claude.ai account. Run `claude auth login` and choose the claude.ai option. If `ANTHROPIC_API_KEY` is set, unset it first.

### "Remote Control requires a full-scope login token"
You're using a long-lived token from `claude setup-token` or `CLAUDE_CODE_OAUTH_TOKEN`. Run `claude auth login` to get a full-scope session token.

### "Unable to determine your organization for Remote Control eligibility"
Your cached account information is stale. Run `claude auth login` to refresh it.

### "Remote Control is not yet enabled for your account"
Check for these environment variables and unset them: `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`, `DISABLE_TELEMETRY`, `CLAUDE_CODE_USE_BEDROCK`, `CLAUDE_CODE_USE_VERTEX`, `CLAUDE_CODE_USE_FOUNDRY`. Then run `/logout` followed by `/login`.

### "Remote Control is disabled by your organization's policy"
Run `/status` to check your login method. Possible causes:
- Authenticated with an API key or Console account instead of claude.ai OAuth
- Team/Enterprise admin hasn't enabled it at [claude.ai/admin-settings/claude-code](https://claude.ai/admin-settings/claude-code)
- Organization has a data retention/compliance configuration incompatible with Remote Control
- IT administrator has disabled it via managed settings

### "Remote credentials fetch failed"
Re-run with `--verbose` to see the full error:

```bash
claude remote-control --verbose
```

Common causes: not signed in, network/proxy blocking outbound HTTPS on port 443, or an inactive subscription.

---

## Remote Control vs Claude Code on the web

| | Remote Control | Claude Code on the web |
|---|---|---|
| Claude runs on | Your machine | Anthropic cloud |
| Local MCP servers available | Yes | No |
| Local filesystem access | Yes | Cloud only |
| Best for | Steering in-progress local work from another device | Starting tasks without local setup |

---

## Related resources

- [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web.md): run sessions in Anthropic-managed cloud environments
- [Ultraplan](https://code.claude.com/docs/en/ultraplan.md): launch a cloud planning session from your terminal
- [Channels](https://code.claude.com/docs/en/channels.md): forward Telegram, Discord, or iMessage into a session
- [Authentication](https://code.claude.com/docs/en/authentication.md): set up `/login` and manage credentials
- [CLI reference](https://code.claude.com/docs/en/cli-reference.md): full list of flags and commands
- [Security](https://code.claude.com/docs/en/security.md): how Remote Control sessions fit into the Claude Code security model
- [Data usage](https://code.claude.com/docs/en/data-usage.md): what data flows through the Anthropic API during local and remote sessions
