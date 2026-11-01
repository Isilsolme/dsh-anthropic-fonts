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
    "dsh-anthropic-fonts": "^0.3.0"
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

## Interaction with DSH's own font settings

DSH 0.2 added **Text font** / **Code font** fields under *Settings → Appearance*.
The plugin targets the **empty (default)** state of those fields: a value typed
there is written as an inline custom property on `body`, which outranks the
plugin's stylesheet, so body and code text fall back to your font (the
conversation serif is still owned by the plugin). Leave both fields empty to use
the plugin's typefaces.

## Compatibility & permissions

| Field | Declared in | Value |
|---|---|---|
| DSH range (enforced by DSH) | `engines.dsh` | `>=0.1.0-rc.7 <0.3.0` |
| DSH range (docs / market display) | `dsh.compatibility.dsh` | `>=0.1.0-rc.7 <0.3.0` |
| DSH per release | `dsh.compatibility.dshReleases` | see below |
| Node.js | `engines.node` | `>=22` |
| Profile | `dsh.compatibility.profiles`, `dsh.client.platform` | `web` |

Since 0.2, DSH runs a compatibility preflight before starting a profile and
**disables** any plugin row whose `engines.dsh` (or `@deepseek-ai/dsh*` peer
range) is unmet. Declaring `engines.dsh` makes an out-of-range install fail
loudly instead of silently doing nothing.

`dshReleases` records every DSH release as `compatible`, `incompatible`, or
`unknown`. **Only releases actually smoke-tested in a disposable profile are
marked `compatible`**; releases covered by the range but not individually tested
stay `unknown` — a range is never presented as verified evidence.

Smoke-tested releases (disposable profile, `DSH_HOME` pointed at a temp
directory, never the real profile):

| DSH release | install | start | uninstall |
|---|---|---|---|
| 0.1.5-alpha.2 | ✅ | ✅ | ✅ |
| 0.1.5-rc.1 | ✅ | ✅ | ✅ |
| 0.1.5-rc.2 | ✅ | ✅ | ✅ |
| 0.2.1-rc.5 | ✅ | ✅ | ✅ |

0.2.1-rc.5 additionally got an in-browser acceptance check: computed styles were
read from the live page — interface `--dsw-font-family` resolves to Anthropic
Sans; the Markdown container, h1–h4, p, strong, em and tables resolve to
Anthropic Serif; inline code and code blocks resolve to Anthropic Mono — while
sizes, line heights and weights stay identical to the DSH defaults
(h1 21px/700/30px, body 14px/24px, tables 13px/22px, …).

How each release was checked:

```sh
DSH_HOME=/tmp/dsh-smoke dsh plugin --profile web add /path/to/dsh-anthropic-fonts  # install
DSH_HOME=/tmp/dsh-smoke dsh --profile web --dump-config                            # entry anthropic-fonts in the composed tree
DSH_HOME=/tmp/dsh-smoke dsh --profile web --port 39123 --no-open                   # start, prints the served URL
DSH_HOME=/tmp/dsh-smoke dsh plugin --profile web remove dsh-anthropic-fonts        # uninstall
```

Covered: dependency installed into the profile, bundle appended to
`dsh.profile.bundles`, bundle patch inserting entry `anthropic-fonts` (and not
disabled by the compatibility preflight), the web server binding and serving a
page whose boot payload registers `dsh-anthropic-fonts/client.js`, and full
removal of both the dependency and the bundle row. **Not covered**: an
independent security audit.

**Permissions**: the client half injects a single `<style>` element into
`document.head`; no file, network, command, or credential access. The host half
(`lib/index.js`) is empty.

After a new DSH release: re-run the four steps in a disposable profile, add that
release to `dsh.compatibility.dshReleases` as `compatible`, bump this plugin's
SemVer, and push.

## How it works

Since DSH 0.2 the typography tokens come in two layers:

- `--dsh-font-family-{text,code}` is the single source of truth (the *Text font*
  / *Code font* settings write exactly these);
- the theme derives `--dsw-font-family` / `--ds-font-family-code` from them on
  `body`, and every other typography token references those two.

The plugin therefore overrides the `--dsh-*` layer. **Writing only
`--dsw-font-family` stopped working in 0.2**: the derivation rule on `body`
overrides the inherited `:root` value, which is why the plugin appeared to fall
back to the default fonts after the 0.2.1 update. 0.1.x has no `--dsh-*` layer
and reads `--dsw-font-family` directly, so both sets are written.

The serif conversation text comes from the Markdown shorthand tokens. In 0.2.x
Markdown body and headings use `font: var(--dsw-font-markdown-h1)` style
shorthands with the family already baked in, so the standalone
`--dsw-font-markdown-*-font-family` tokens are no longer read by any selector.
The plugin rebuilds those shorthands from the host's own `-font-style` /
`-font-weight` / `-font-size` / `-line-height` components, swapping only the
family: sizes, line heights and weights keep following DSH (including the size
settings), with DSH defaults as fallbacks so 0.1.x keeps working too.

The code font goes through `--dsh-font-family-code` / `--ds-font-family-code`;
the terminal font (`--dsh-font-family-terminal`) is out of scope.

The injected `<style>` is owned by the client fiber and removed on uninstall.

## Structure

- `lib/index.js` — host half (empty; the effect is browser-only)
- `lib/client.js` — client half (injects the font CSS variable overrides)
- `cordis.patch.yml` — bundle patch inserting the plugin row
- `fonts/` — the three Latin font files

## Credits

Font stack modeled on [`blaxisomu/typora_claude`](https://github.com/blaxisomu/typora_claude) (Anthropic Web fonts for Latin, Source Han for CJK).

## License

MIT
