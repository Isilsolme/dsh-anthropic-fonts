# dsh-anthropic-fonts

给 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web 界面换上 Anthropic 字体：

- **界面**（侧栏、标题、按钮、设置）：`Anthropic Sans Web Text`
- **模型对话**（Markdown 正文 / 标题 / 表格）：`Anthropic Serif Web Text`
- **代码块**保持等宽字体不变。

中文回退到 `Anthropic Sans SC` / `Anthropic Serif SC`。

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![dsh-plugin](https://img.shields.io/badge/dsh-plugin-web--ui-3964fe.svg)](https://github.com/deepseek-ai/deepseek-harness)

## 前置条件

本机需安装以下字体（否则回退到系统字体）：

- `Anthropic Sans Web Text`
- `Anthropic Serif Web Text`
- （可选，中文）`Anthropic Sans SC`、`Anthropic Serif SC`

## 安装

标准的 `dsh` bundle 插件 —— 与
[`dsh-whale-animation`](https://github.com/LeemanCheung/dsh-whale-animation)
和 [`dsh-toolkit`](https://github.com/omdsh-dev/dsh-toolkit) 同一种形态。

### CLI（推荐）

```sh
# 本地目录
dsh plugin --profile web add "C:/path/to/dsh-anthropic-fonts"
# 或从 GitHub
dsh plugin --profile web add "github:you/dsh-anthropic-fonts"
```

`dsh plugin add` 会在 profile 内执行 `pnpm add`，并自动把 bundle 追加到
`dsh.profile.bundles`。之后重启 web 即可生效。

### 手动安装

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

然后：

```sh
cd ~/.dsh/profiles/web && pnpm install
```

## 卸载 / 关闭

```sh
dsh plugin --profile web remove dsh-anthropic-fonts
```

（或从 `dependencies` 和 `bundles` 里移除，再 `pnpm install`）。重启即恢复默认字体。

## 原理

覆盖 DSH 的排版 token：`--dsw-font-family`（UI 用），以及全部非代码的
`--dsw-font-markdown-*`（对话正文用）。注入的 `<style>` 归属 client fiber，
卸载时一并清理。

## 结构

- `lib/index.js` —— Host 半边（空；字体效果只在浏览器）
- `lib/client.js` —— Client 半边（注入字体 CSS 变量覆盖）
- `cordis.patch.yml` —— bundle patch，插入插件行

## 许可

MIT
