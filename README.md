# dsh-anthropic-fonts

[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)

给 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) Web 界面换上 Anthropic 字体：

- **界面**（侧栏、标题、按钮、设置）：`Anthropic Sans Web Text`
- **模型对话**（Markdown 正文 / 标题 / 表格）：`Anthropic Serif Web Text`
- **代码 / 代码块**：`Anthropic Mono Variable`

中文回退到思源字体（`Noto Sans SC` / `Source Han Sans SC` / `Noto Serif SC`），未安装时回退到系统字体（苹方 / 微软雅黑 / 宋体）。

## 字体

> **重要：插件不内置字体**。npm 包不随包分发字体文件；安装插件后还需手动安装字体（见下表），然后刷新 / 重启 web 才会生效。

插件引用的三个 Anthropic 拉丁字体（建议安装，英文 / 代码效果最佳）：

| 字体 | 用途 | 获取方式 |
|---|---|---|
| Anthropic Sans Web Text | 界面 | 仓库 [`fonts/`](fonts/) 下载，或从 Claude 应用提取 |
| Anthropic Serif Web Text | 模型对话 | 仓库 [`fonts/`](fonts/) 下载，或从 Claude 应用提取 |
| Anthropic Mono Variable | 代码 | 仓库 [`fonts/`](fonts/) 下载，或从 Claude 应用提取 |

安装：Windows 双击每个 `.ttf` → 点「安装」；macOS 用「字体册」导入。安装后**刷新 / 重启 web** 生效。

> 字体版权归 Anthropic 所有，仅供个人使用，不适用 MIT 许可（详见 [LICENSE](LICENSE) 字体声明）。

中文无需额外安装：会回退到思源黑体 / 宋体（Noto Sans/Serif SC、Source Han），没有则用系统字体。

## 安装

标准的 `dsh` bundle 插件 —— 与 [`dsh-whale-animation`](https://github.com/LeemanCheung/dsh-whale-animation) 同一种形态。

### CLI（推荐）

已发布到 npm，一条命令安装：

```sh
dsh plugin --profile web add dsh-anthropic-fonts
```

也可以从 GitHub 安装：

```sh
dsh plugin --profile web add "github:Isilsolme/dsh-anthropic-fonts"
```

`dsh plugin add` 会在 profile 内执行 `pnpm add`，并自动把 bundle 追加到 `dsh.profile.bundles`。之后重启 web 即可生效。

> ⚠️ 安装插件后**还需手动安装字体文件**（见上方「字体」）——npm 包不随包分发字体。

### 手动安装

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

然后：

```sh
cd ~/.dsh/profiles/web && pnpm install
```

> 本地调试时，可用 `"dsh-anthropic-fonts": "link:C:/path/to/dsh-anthropic-fonts"` 指向本地目录。

## 卸载 / 关闭

```sh
dsh plugin --profile web remove dsh-anthropic-fonts
```

（或从 `dependencies` 和 `bundles` 里移除，再 `pnpm install`）。重启即恢复默认字体。

## 原理

只覆盖 DSH 排版 token 的**字体族**部分：`--dsw-font-family`（UI 用）与全部非代码的 `--dsw-font-markdown-*-font-family`（对话正文用），保留 DSH 官方字号与行高；代码字体走 `--ds-font-family-code`。注入的 `<style>` 归属 client fiber，卸载时一并清理。

## 结构

- `lib/index.js` —— Host 半边（空；字体效果只在浏览器）
- `lib/client.js` —— Client 半边（注入字体 CSS 变量覆盖）
- `cordis.patch.yml` —— bundle patch，插入插件行
- `fonts/` —— 三个拉丁字体文件

## 参考

字体栈参考了 [`blaxisomu/typora_claude`](https://github.com/blaxisomu/typora_claude) 的实现（拉丁用 Anthropic Web 字体、中文回退思源字体）。

## 许可

MIT
