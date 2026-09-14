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
    "dsh-anthropic-fonts": "^0.2.1"
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

## 兼容性与权限

| 项目 | 声明位置 | 值 |
|---|---|---|
| DSH 范围 | `dsh.compatibility.dsh` | `>=0.1.0-rc.7 <0.2.0` |
| DSH 逐版本 | `dsh.compatibility.dshReleases` | 见下 |
| Node.js | `engines.node` | `>=22` |
| Profile | `dsh.compatibility.profiles`、`dsh.client.platform` | `web` |

`dshReleases` 对每个 DSH 版本逐项写 `compatible` / `incompatible` / `unknown`。**只有实际跑过一次性 Profile 冒烟验证的版本才写 `compatible`**；范围覆盖但未逐版本验证的一律是 `unknown`，范围声明不会被当作已验证。

已验证版本（一次性 Profile，`DSH_HOME` 指向临时目录，不触碰真实 Profile）：

| DSH 版本 | 安装 | 启动 | 卸载 |
|---|---|---|---|
| 0.1.5-alpha.2 | ✅ | ✅ | ✅ |
| 0.1.5-rc.1 | ✅ | ✅ | ✅ |
| 0.1.5-rc.2 | ✅ | ✅ | ✅ |

验证步骤（每个版本各跑一次）：

```sh
DSH_HOME=/tmp/dsh-smoke dsh plugin --profile web add /path/to/dsh-anthropic-fonts  # 安装
DSH_HOME=/tmp/dsh-smoke dsh --profile web --dump-config                            # 入口 anthropic-fonts 出现在组合配置里
DSH_HOME=/tmp/dsh-smoke dsh --profile web --port 39123 --no-open                   # 启动并输出访问地址
DSH_HOME=/tmp/dsh-smoke dsh plugin --profile web remove dsh-anthropic-fonts        # 卸载
```

覆盖到的证据：依赖写入 profile、bundle 追加进 `dsh.profile.bundles`、bundle patch 插入入口 `anthropic-fonts`、web 服务正常监听并返回页面（启动载荷里已注册 `dsh-anthropic-fonts/client.js`）、卸载后依赖与 bundle 行都被移除。**未覆盖**：浏览器内的目视渲染验收（需人工装好字体再刷新页面），也不包含独立安全审计。

**权限**：客户端只往 `document.head` 注入一个 `<style>`；不读写文件、不访问网络、不执行命令、不接触凭据。Host 半边（`lib/index.js`）为空。

新的 DSH 版本发布后：在一次性 Profile 里重跑上面四步，把该版本写进 `dsh.compatibility.dshReleases`（`compatible`），并提升本插件 SemVer 后推送。

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
