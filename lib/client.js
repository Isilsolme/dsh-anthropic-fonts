window.__ModuleLoader__.load({
  id: "dsh-anthropic-fonts",
  factory: function (require) {
    var module = { exports: {} };
    var exports = module.exports;

    // 只覆盖字体族，字号 / 行高 / 字重全部交给 DSH 自己的排版 token。
    var SANS =
      "'Anthropic Sans Web Text','Noto Sans SC','Source Han Sans SC',-apple-system,BlinkMacSystemFont,'Segoe UI','PingFang SC','Hiragino Sans GB','Microsoft YaHei','Helvetica Neue',Helvetica,Arial,sans-serif";
    var SERIF =
      "'Anthropic Serif Web Text',Georgia,'Times New Roman','Noto Serif SC','Source Han Serif SC','Songti SC','SimSun',serif";
    var MONO =
      "'Anthropic Mono Variable','Source Han Sans SC',ui-monospace,'SF Mono','JetBrains Mono','Fira Code',Consolas,'Liberation Mono',Menlo,Courier,monospace";

    // DSH >= 0.2 的排版分两层：--dsh-font-family-{text,code} 是唯一事实来源（设置里的
    // 「正文字体 / 代码字体」写的就是它们），theme 再在 body 上把它们拼进 --dsw-font-family /
    // --ds-font-family-code。所以必须覆盖 --dsh-* 这一层：只写 --dsw-font-family 会被 body 上那条
    // 派生声明盖掉（0.1.x 没有 --dsh-* 层，故两套都写，两条曲线同时可用）。
    var ROOT =
      "html:root{" +
      "--dsh-font-family-text:" + SANS + ";" +
      "--dsh-font-family-code:" + MONO + ";" +
      "--dsw-font-family:" + SANS + ";" +
      "--ds-font-family-code:" + MONO + ";" +
      "--dsw-font-serif:" + SERIF +
      "}";

    // 0.2.x 起 Markdown 正文与标题都走 font 简写 token（font:var(--dsw-font-markdown-h1)），
    // 字体族已经烧进简写里，单独的 --dsw-font-markdown-*-font-family 不再被任何选择器读取。
    // 这里用宿主自己的 style / weight / size / line-height 分量重建简写：字号行高继续跟随 DSH
    // （含设置里的字号调整），只把字体族换成衬线。分量缺失时回退到 DSH 的默认值。
    var DELTA = "var(--dsh-content-font-delta)";
    var DELTA_2 = "var(--dsh-content-font-delta-secondary,0px)";
    var SIZE = "var(--dsh-content-font-size,14px)";
    var SIZE_2 = "var(--dsh-content-font-size-secondary,13px)";
    // [variant, font-style, font-weight, font-size, line-height]
    var VARIANTS = [
      ["h1", "normal", "700", "calc(21px + " + DELTA + ")", "calc(30px + " + DELTA + ")"],
      ["h2", "normal", "700", "calc(19px + " + DELTA + ")", "calc(28px + " + DELTA + ")"],
      ["h3", "normal", "700", "calc(18px + " + DELTA + ")", "calc(26px + " + DELTA + ")"],
      ["h4", "normal", "600", SIZE, "calc(24px + " + DELTA + ")"],
      ["base", "normal", "400", SIZE, "calc(24px + " + DELTA + ")"],
      ["base-strong", "normal", "600", SIZE, "calc(24px + " + DELTA + ")"],
      ["base-italic", "italic", "400", SIZE, "calc(24px + " + DELTA + ")"],
      ["base-strong-italic", "italic", "600", SIZE, "calc(24px + " + DELTA + ")"],
      ["table", "normal", "400", SIZE_2, "calc(22px + " + DELTA_2 + ")"],
      ["table-head", "normal", "500", SIZE_2, "calc(22px + " + DELTA_2 + ")"],
      ["small", "normal", "400", "12px", "20px"],
      ["small-strong", "normal", "600", "12px", "20px"],
      ["small-italic", "italic", "400", "12px", "20px"],
      ["small-strong-italic", "italic", "600", "12px", "20px"]
    ];

    function part(variant, field, fallback) {
      return "var(--dsw-font-markdown-" + variant + "-" + field + "," + fallback + ")";
    }

    function markdownTokens() {
      var decls = [];
      for (var i = 0; i < VARIANTS.length; i++) {
        var variant = VARIANTS[i][0];
        // 0.1.x 的选择器读的是这个族 token；0.2.x 已没有选择器读它，保留不影响新版本。
        decls.push("--dsw-font-markdown-" + variant + "-font-family:var(--dsw-font-serif)");
        decls.push(
          "--dsw-font-markdown-" + variant + ":" +
            part(variant, "font-style", VARIANTS[i][1]) + " " +
            part(variant, "font-weight", VARIANTS[i][2]) + " " +
            part(variant, "font-size", VARIANTS[i][3]) + "/" +
            part(variant, "line-height", VARIANTS[i][4]) + " " +
            "var(--dsw-font-serif)"
        );
      }
      return "html body{" + decls.join(";") + "}";
    }

    var css = ROOT + markdownTokens();

    function apply(ctx) {
      if (typeof document === "undefined") return;
      var tagId = "dsh-anthropic-fonts/fonts.css";
      if (document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") !== null) return;
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
