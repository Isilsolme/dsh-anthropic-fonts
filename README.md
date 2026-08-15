# dsh-anthropic-fonts

给 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web 界面换上 Anthropic 字体：

- **界面**（侧栏、标题、按钮、设置）：`Anthropic Sans Web Text`
- **模型对话**（Markdown 正文 / 标题 / 表格）：`Anthropic Serif Web Text`
- **代码 / 代码块**：`Anthropic Mono Variable`

中文回退到思源字体（`Noto Sans SC` / `Source Han Sans SC` / `Noto Serif SC`），未安装时回退到系统字体（苹方 / 微软雅黑 / 宋体）。

## 字体

仓库 `fonts/` 附带三个拉丁字体，安装后英文 / 代码效果最佳：

| 字体 | 文件 | 用途 |
|---|---|---|
| Anthropic Sans Web Text | `fonts/AnthropicSansWebText.ttf` | 界面 |
| Anthropic Serif Web Text | `fonts/AnthropicSerifWebText.ttf` | 模型对话 |
| Anthropic Mono Variable | `fonts/AnthropicMonoVariable.ttf` | 代码 |

安装：Windows 双击每个 `.ttf` → 点「安装」；macOS 用「字体册」导入。

中文无需额外安装：会回退到思源黑体 / 宋体（Noto Sans/Serif SC、Source Han），没有则用系统字体。

## 安装

标准的 `dsh` bundle 插件 —— 与 [`dsh-whale-animation`](https://github.com/LeemanCheung/dsh-whale-animation) 同一种形态。

### CLI（推荐）

```sh
dsh plugin --profile web add "github:Isilsolme/dsh-anthropic-fonts"
```

`dsh plugin add` 会在 profile 内执行 `pnpm add`，并自动把 bundle 追加到 `dsh.profile.bundles`。之后重启 web 即可生效。

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

覆盖 DSH 的排版 token：`--dsw-font-family`（UI 用），以及全部非代码的 `--dsw-font-markdown-*`（对话正文用）。注入的 `<style>` 归属 client fiber，卸载时一并清理。

## 结构

- `lib/index.js` —— Host 半边（空；字体效果只在浏览器）
- `lib/client.js` —— Client 半边（注入字体 CSS 变量覆盖）
- `cordis.patch.yml` —— bundle patch，插入插件行
- `fonts/` —— 三个拉丁字体文件

## 参考

字体栈参考了 [`blaxisomu/typora_claude`](https://github.com/blaxisomu/typora_claude) 的实现（拉丁用 Anthropic Web 字体、中文回退思源字体）。

## 许可

MIT
