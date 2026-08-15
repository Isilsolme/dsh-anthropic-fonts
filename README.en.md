# dsh-anthropic-fonts

Apply Anthropic's typefaces to the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web UI:

- **Interface** (sidebar, headings, buttons, settings): `Anthropic Sans Web Text`
- **Model conversation** (Markdown body / headings / tables): `Anthropic Serif Web Text`
- **Code blocks** stay monospace.

CJK text falls back to the Source Han family (`Noto Sans SC` / `Source Han Sans SC` / `Noto Serif SC`), then to system fonts.

## Fonts

The `fonts/` directory ships the two Latin fonts; install them for the best English / code rendering:

| Font | File | Role |
|---|---|---|
| Anthropic Sans Web Text | `fonts/AnthropicSansWebText.ttf` | Interface |
| Anthropic Serif Web Text | `fonts/AnthropicSerifWebText.ttf` | Conversation |

Install: double-click each `.ttf` on Windows → **Install**; on macOS use **Font Book**.

Chinese needs no extra install — it falls back to the Source Han fonts (Noto Sans/Serif SC, Source Han), then to system CJK fonts.

## Install

A standard `dsh` bundle plugin — the same shape as
[`dsh-whale-animation`](https://github.com/LeemanCheung/dsh-whale-animation).

### CLI (recommended)

```sh
dsh plugin --profile web add "github:Isilsolme/dsh-anthropic-fonts"
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
- `fonts/` — the two Latin font files

## Credits

Font stack modeled on [`blaxisomu/typora_claude`](https://github.com/blaxisomu/typora_claude) (Anthropic Web fonts for Latin, Source Han for CJK).

## License

MIT
