window.__ModuleLoader__.load({
  id: "dsh-anthropic-fonts",
  factory: function (require) {
    var module = { exports: {} };
    var exports = module.exports;

    var css = "html:root{--dsw-font-family:'Anthropic Sans Web Text','Noto Sans SC','Source Han Sans SC',-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei','Helvetica Neue',Helvetica,Arial,sans-serif;--dsw-font-serif:'Anthropic Serif Web Text',Georgia,'Times New Roman','Noto Serif SC','Source Han Serif SC','Songti SC','SimSun',serif;--ds-font-family-code:'Anthropic Mono Variable','Source Han Sans SC',ui-monospace,'SF Mono','JetBrains Mono','Fira Code',Consolas,'Liberation Mono',Menlo,Courier,monospace}" +
      "html body{" +
      "--dsw-font-markdown-h1:700 24px/34px var(--dsw-font-serif);--dsw-font-markdown-h1-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-h2:700 22px/32px var(--dsw-font-serif);--dsw-font-markdown-h2-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-h3:700 20px/30px var(--dsw-font-serif);--dsw-font-markdown-h3-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-h4:600 16px/28px var(--dsw-font-serif);--dsw-font-markdown-h4-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-base:16px/28px var(--dsw-font-serif);--dsw-font-markdown-base-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-base-strong:600 16px/28px var(--dsw-font-serif);--dsw-font-markdown-base-strong-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-base-italic:italic 16px/28px var(--dsw-font-serif);--dsw-font-markdown-base-italic-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-base-strong-italic:italic 600 16px/28px var(--dsw-font-serif);--dsw-font-markdown-base-strong-italic-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-table:15px/25px var(--dsw-font-serif);--dsw-font-markdown-table-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-table-head:500 15px/25px var(--dsw-font-serif);--dsw-font-markdown-table-head-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-small:14px/24px var(--dsw-font-serif);--dsw-font-markdown-small-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-small-strong:600 14px/24px var(--dsw-font-serif);--dsw-font-markdown-small-strong-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-small-italic:italic 14px/24px var(--dsw-font-serif);--dsw-font-markdown-small-italic-font-family:var(--dsw-font-serif);" +
      "--dsw-font-markdown-small-strong-italic:italic 600 14px/24px var(--dsw-font-serif);--dsw-font-markdown-small-strong-italic-font-family:var(--dsw-font-serif);" +
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
