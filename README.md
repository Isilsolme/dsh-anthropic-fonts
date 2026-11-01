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

## 与 DSH 自带字体设置的关系

DSH 0.2 起「设置 → 外观」里有「正文字体 / 代码字体」。插件针对的是**这两栏留空（默认）**的情况：如果你在那里填了自己的字体，DSH 会把它写成 `body` 上的内联变量，优先级高于插件注入的样式表——正文和代码会回落到你填的字体（对话衬线仍由插件接管）。想用插件的字体，保持这两栏为空即可。

## 兼容性与权限

| 项目 | 声明位置 | 值 |
|---|---|---|
| DSH 范围（DSH 实际校验） | `engines.dsh` | `>=0.1.0-rc.7 <0.3.0` |
| DSH 范围（文档 / 市场展示） | `dsh.compatibility.dsh` | `>=0.1.0-rc.7 <0.3.0` |
| DSH 逐版本 | `dsh.compatibility.dshReleases` | 见下 |
| Node.js | `engines.node` | `>=22` |
| Profile | `dsh.compatibility.profiles`、`dsh.client.platform` | `web` |

DSH 0.2 起，启动 profile 前会先按 `engines.dsh`（没有则看 `@deepseek-ai/dsh*` 的 peer 依赖）做一次兼容性 preflight，不满足的插件行会被**直接禁用**。这里写 `engines.dsh` 是为了让超出范围时失败得明确，而不是静默不生效。

`dshReleases` 对每个 DSH 版本逐项写 `compatible` / `incompatible` / `unknown`。**只有实际跑过一次性 Profile 冒烟验证的版本才写 `compatible`**；范围覆盖但未逐版本验证的一律是 `unknown`，范围声明不会被当作已验证。

已验证版本（一次性 Profile，`DSH_HOME` 指向临时目录，不触碰真实 Profile）：

| DSH 版本 | 安装 | 启动 | 卸载 |
|---|---|---|---|
| 0.1.5-alpha.2 | ✅ | ✅ | ✅ |
| 0.1.5-rc.1 | ✅ | ✅ | ✅ |
| 0.1.5-rc.2 | ✅ | ✅ | ✅ |
| 0.2.1-rc.5 | ✅ | ✅ | ✅ |

0.2.1-rc.5 额外做了浏览器内验收：在真实页面里读取计算样式，界面 `--dsw-font-family` 为 Anthropic Sans，Markdown 容器 / h1–h4 / p / strong / em / 表格为 Anthropic Serif，行内代码与代码块为 Anthropic Mono，且字号、行高、字重与 DSH 默认值逐项一致（h1 21px/700/30px、正文 14px/24px、表格 13px/22px 等）。

验证步骤（每个版本各跑一次）：

```sh
DSH_HOME=/tmp/dsh-smoke dsh plugin --profile web add /path/to/dsh-anthropic-fonts  # 安装
DSH_HOME=/tmp/dsh-smoke dsh --profile web --dump-config                            # 入口 anthropic-fonts 出现在组合配置里
DSH_HOME=/tmp/dsh-smoke dsh --profile web --port 39123 --no-open                   # 启动并输出访问地址
DSH_HOME=/tmp/dsh-smoke dsh plugin --profile web remove dsh-anthropic-fonts        # 卸载
```

覆盖到的证据：依赖写入 profile、bundle 追加进 `dsh.profile.bundles`、bundle patch 插入入口 `anthropic-fonts`（且没被兼容性 preflight 禁用）、web 服务正常监听并返回页面（启动载荷里已注册 `dsh-anthropic-fonts/client.js`）、卸载后依赖与 bundle 行都被移除。**未覆盖**：独立安全审计。

**权限**：客户端只往 `document.head` 注入一个 `<style>`；不读写文件、不访问网络、不执行命令、不接触凭据。Host 半边（`lib/index.js`）为空。

新的 DSH 版本发布后：在一次性 Profile 里重跑上面四步，把该版本写进 `dsh.compatibility.dshReleases`（`compatible`），并提升本插件 SemVer 后推送。

## 原理

DSH 0.2 起排版 token 分成两层：

- `--dsh-font-family-{text,code}` 是唯一事实来源（「设置 → 外观」里的正文字体 / 代码字体写的就是它们）；
- theme 在 `body` 上把它们拼进 `--dsw-font-family` / `--ds-font-family-code`，其余所有排版 token 再引用这两个。

所以插件覆盖的是 `--dsh-*` 这一层。**只写 `--dsw-font-family` 在 0.2 起会失效**：`body` 上那条派生声明会盖掉 `:root` 上的继承值——这正是 0.2.1 版本更新后插件「整体回到默认字体」的原因。0.1.x 没有 `--dsh-*` 层、直接读 `--dsw-font-family`，因此两套都写，两条曲线同时可用。

对话的衬线来自 Markdown 简写 token。0.2.x 起 Markdown 正文与标题改用 `font: var(--dsw-font-markdown-h1)` 这类简写，字体族已经烧进简写值里，单独的 `--dsw-font-markdown-*-font-family` 不再被任何选择器读取。插件改用宿主自己的 `-font-style` / `-font-weight` / `-font-size` / `-line-height` 分量重建这些简写，只把字体族换成衬线：字号、行高、字重仍然跟着 DSH（包括设置里的字号调整），分量缺失时回退到 DSH 默认值，0.1.x 也照常工作。

代码字体走 `--dsh-font-family-code` / `--ds-font-family-code`；终端字体（`--dsh-font-family-terminal`）不在插件范围内。

注入的 `<style>` 归属 client fiber，卸载时一并清理。

## 结构

- `lib/index.js` —— Host 半边（空；字体效果只在浏览器）
- `lib/client.js` —— Client 半边（注入字体 CSS 变量覆盖）
- `cordis.patch.yml` —— bundle patch，插入插件行
- `fonts/` —— 三个拉丁字体文件

## 参考

字体栈参考了 [`blaxisomu/typora_claude`](https://github.com/blaxisomu/typora_claude) 的实现（拉丁用 Anthropic Web 字体、中文回退思源字体）。

## 许可

MIT
