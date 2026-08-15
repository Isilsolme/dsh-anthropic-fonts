window.__ModuleLoader__.load({
  id: "dsh-anthropic-fonts",
  factory: function (require) {
    var module = { exports: {} };
    var exports = module.exports;

    // P3: 只覆盖 -font-family 系列（保留 DSH 官方字号/行高），代码字体走 --ds-font-family-code
    var css = "html:root{--dsw-font-family:'Anthropic Sans Web Text','Noto Sans SC','Source Han Sans SC',-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei','Helvetica Neue',Helvetica,Arial,sans-serif;--dsw-font-serif:'Anthropic Serif Web Text',Georgia,'Times New Roman','Noto Serif SC','Source Han Serif SC','Songti SC','SimSun',serif;--ds-font-family-code:'Anthropic Mono Variable','Source Han Sans SC',ui-monospace,'SF Mono','JetBrains Mono','Fira Code',Consolas,'Liberation Mono',Menlo,Courier,monospace}" +
      "html body{" +
      "--dsw-font-markdown-h1-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-h2-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-h3-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-h4-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-base-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-base-strong-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-base-italic-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-base-strong-italic-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-table-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-table-head-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-small-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-small-strong-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-small-italic-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-small-strong-italic-font-family:var(--dsw-font-serif);" +
      "}";

    function apply(ctx) {
      if (typeof document === "undefined") return;
      var tagId = "dsh-anthropic-fonts/fonts.css";
      if (document.querySelector('style[data-plugin-css=' + JSON.stringify(tagId) + ']') !== null) return;
      var tag = document.createElement("style");
      tag.dataset.plugin = "dsh-anthropic-fonts";
      tag.dataset.pluginCss = tagId;
      tag.textContent = css;
      document.head.appendChild(tag);
      ctx.effect(function () {
        return function () { tag.remove(); };
      });
    }

    exports.apply = apply;
    exports.inject = [];
    return module.exports;
  }
});
