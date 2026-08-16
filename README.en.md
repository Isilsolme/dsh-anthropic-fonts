# dsh-anthropic-fonts

[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)

Apply Anthropic's typefaces to the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI:

- **Interface** (sidebar, headings, buttons, settings): `Anthropic Sans Web Text`
- **Model conversation** (Markdown body / headings / tables): `Anthropic Serif Web Text`
- **Code / code blocks**: `Anthropic Mono Variable`

CJK text falls back to the Source Han family (`Noto Sans SC` / `Source Han Sans SC` / `Noto Serif SC`), then to system fonts.

## Fonts

> **Important: the plugin does not bundle fonts.** The npm package does not ship
> font files; install the fonts below manually, then refresh / restart the web
> surface for the change to take effect.

The plugin references three Anthropic Latin typefaces (install them for the best
English / code rendering):

| Font | Role | Where to get it |
|---|---|---|
| Anthropic Sans Web Text | Interface | Download from [`fonts/`](fonts/), or extract from a Claude app |
| Anthropic Serif Web Text | Conversation | Download from [`fonts/`](fonts/), or extract from a Claude app |
| Anthropic Mono Variable | Code | Download from [`fonts/`](fonts/), or extract from a Claude app |

Install: double-click each `.ttf` on Windows → **Install**; on macOS use **Font Book**. Then **refresh / restart** the web surface.

> The fonts are proprietary to Anthropic, for personal use only, and are **not**
> covered by the MIT license (see the font notice in [LICENSE](LICENSE)).

Chinese needs no extra install — it falls back to the Source Han fonts (Noto Sans/Serif SC, Source Han), then to system CJK fonts.

## Install

A standard `dsh` bundle plugin — the same shape as
[`dsh-whale-animation`](https://github.com/LeemanCheung/dsh-whale-animation).

### CLI (recommended)

Published on npm — install in one command:

```sh
dsh plugin --profile web add dsh-anthropic-fonts
```

or from GitHub:

```sh
dsh plugin --profile web add "github:Isilsolme/dsh-anthropic-fonts"
```

`dsh plugin add` runs `pnpm add` inside the profile and auto-appends the
bundle to `dsh.profile.bundles`. Restart the web surface afterwards.

> ⚠️ After installing the plugin you **still need to install the font files
> manually** (see "Fonts" above) — the npm package does not ship them.

### Manual

```jsonc
// ~/.dsh/profiles/web/package.json
{
  "dependencies": {
    "dsh-anthropic-fonts": "^0.2.0"
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

> For local development you can instead use
> `"dsh-anthropic-fonts": "link:C:/path/to/dsh-anthropic-fonts"` to point at a
> local checkout.

## Uninstall / toggle off

```sh
dsh plugin --profile web remove dsh-anthropic-fonts
```

(or remove it from `dependencies` and `bundles`, then `pnpm install`).
Restart to restore the default fonts.

## How it works

Overrides only the **font-family** part of the DSH typography tokens:
`--dsw-font-family` (UI) and the non-code `--dsw-font-markdown-*-font-family`
tokens (conversation body), keeping DSH's official font sizes and line heights;
code font goes through `--ds-font-family-code`. The injected `<style>` is
owned by the client fiber and removed on uninstall.

## Structure

- `lib/index.js` — host half (empty; the effect is browser-only)
- `lib/client.js` — client half (injects the font CSS variable overrides)
- `cordis.patch.yml` — bundle patch inserting the plugin row
- `fonts/` — the three Latin font files

## Credits

Font stack modeled on [`blaxisomu/typora_claude`](https://github.com/blaxisomu/typora_claude) (Anthropic Web fonts for Latin, Source Han for CJK).

## License

MIT
