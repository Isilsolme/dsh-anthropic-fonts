# dsh-anthropic-fonts

Apply Anthropic's typefaces to the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI:

- **Interface** (sidebar, headings, buttons, settings): `Anthropic Sans Web Text`
- **Model conversation** (Markdown body / headings / tables): `Anthropic Serif Web Text`
- **Code blocks** stay monospace.

CJK text falls back to `Anthropic Sans SC` / `Anthropic Serif SC`.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![dsh-plugin](https://img.shields.io/badge/dsh-plugin-web--ui-3964fe.svg)](https://github.com/deepseek-ai/deepseek-harness)

## Prerequisites

Install the fonts locally (otherwise the browser falls back to system fonts):

- `Anthropic Sans Web Text`
- `Anthropic Serif Web Text`
- (optional, CJK) `Anthropic Sans SC`, `Anthropic Serif SC`

## Install

A standard `dsh` bundle plugin — the same shape as
[`dsh-whale-animation`](https://github.com/LeemanCheung/dsh-whale-animation)
and the [`dsh-toolkit`](https://github.com/omdsh-dev/dsh-toolkit) collection.

### CLI (recommended)

```sh
# local checkout
dsh plugin --profile web add "C:/path/to/dsh-anthropic-fonts"
# or from GitHub
dsh plugin --profile web add "github:you/dsh-anthropic-fonts"
```

`dsh plugin add` runs `pnpm add` inside the profile and auto-appends the
bundle to `dsh.profile.bundles`. Restart the web surface afterwards.

### Manual

```jsonc
// ~/.dsh/profiles/web/package.json
{
  "dependencies": {
    "dsh-anthropic-fonts": "link:C:/path/to/dsh-anthropic-fonts"
  },
  "dsh": {
    "profile": {
      "bundles": [
        "@deepseek-ai/dsh-base",
        "@deepseek-ai/dsh-web-app",
        "dsh-anthropic-fonts"
      ]
    }
  }
}
```

then:

```sh
cd ~/.dsh/profiles/web && pnpm install
```

## Uninstall / toggle off

```sh
dsh plugin --profile web remove dsh-anthropic-fonts
```

(or remove it from `dependencies` and `bundles`, then `pnpm install`).
Restart to restore the default fonts.

## How it works

Overrides the DSH typography tokens: `--dsw-font-family` (UI) and the non-code
`--dsw-font-markdown-*` tokens (conversation body). The injected `<style>` is
owned by the client fiber and removed on uninstall.

## Structure

- `lib/index.js` — host half (empty; the effect is browser-only)
- `lib/client.js` — client half (injects the font CSS variable overrides)
- `cordis.patch.yml` — bundle patch inserting the plugin row

## License

MIT
