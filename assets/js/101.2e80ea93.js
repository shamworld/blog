(window.webpackJsonp=window.webpackJsonp||[]).push([[101],{411:function(t,a,s){"use strict";s.r(a);var n=s(12),r=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"资源优化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#资源优化"}},[t._v("#")]),t._v(" 资源优化")]),t._v(" "),a("h2",{attrs:{id:"html压缩"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#html压缩"}},[t._v("#")]),t._v(" html压缩")]),t._v(" "),a("ul",[a("li",[t._v("使用在线工具 "),a("a",{attrs:{href:"http://kangax.github.io/html-minifier/",target:"_blank",rel:"noopener noreferrer"}},[t._v("html-minifier"),a("OutboundLink")],1),t._v(" 进行压缩")]),t._v(" "),a("li",[t._v("使用 npm 包进行压缩  "),a("a",{attrs:{href:"https://github.com/kangax/html-minifier",target:"_blank",rel:"noopener noreferrer"}},[t._v("html-minifier"),a("OutboundLink")],1)])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" fs "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'fs'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" minify "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'html-minifier'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("minify"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nfs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("readFile")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./test.htm'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'utf8'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("err"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" data")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("err"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("throw")]),t._v(" err"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    fs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("writeFile")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./test_result.html'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("minify")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("data"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("removeComments")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("collapseWhitespace")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("minifyJS")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("minifyCSS")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'success'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("如上安装 npm 后使用Node 读取文件后进行压缩再写入文件")]),t._v(" "),a("h2",{attrs:{id:"css-压缩"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#css-压缩"}},[t._v("#")]),t._v(" css 压缩")]),t._v(" "),a("ul",[a("li",[a("p",[a("a",{attrs:{href:"https://jakubpawlowicz.github.io/clean-css/",target:"_blank",rel:"noopener noreferrer"}},[t._v("在线工具"),a("OutboundLink")],1),t._v("压缩")])]),t._v(" "),a("li",[a("p",[t._v("使用 "),a("strong",[t._v("clean-css")]),t._v(" "),a("a",{attrs:{href:"https://github.com/jakubpawlowicz/clean-css",target:"_blank",rel:"noopener noreferrer"}},[t._v("npm"),a("OutboundLink")],1),t._v("包进行压缩")])])]),t._v(" "),a("p",[t._v("CSS JS资源合并,在合并前应该考虑是否会影响别的文件,合理的选择,单个JS文件大小在 "),a("strong",[t._v("30Kb为最佳")])]),t._v(" "),a("h2",{attrs:{id:"图片优化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#图片优化"}},[t._v("#")]),t._v(" 图片优化")]),t._v(" "),a("p",[t._v("在线压缩 "),a("a",{attrs:{href:"https://imagemin.saasify.sh/",target:"_blank",rel:"noopener noreferrer"}},[t._v("imagemin"),a("OutboundLink")],1),t._v(" 经个人测试"),a("a",{attrs:{href:"/optimization/LightHouse.png"}},[t._v("原图")]),t._v(" "),a("strong",[t._v("192KB")]),t._v(" 压缩后只有 "),a("strong",[t._v("52.7KB")]),t._v(",可以看到体积都是大大的缩小")]),t._v(" "),a("h3",{attrs:{id:"jpeg"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jpeg"}},[t._v("#")]),t._v(" JPEG")]),t._v(" "),a("p",[a("strong",[t._v("有损压缩、体积小、加载快、不支持透明")])]),t._v(" "),a("p",[t._v("JPEG/JPG 采用特殊的有损压缩算法，将不易被人眼察觉的图像颜色删除，从而达到较大的压缩比，因此它的压缩文件尺寸较小，下载速度快，成为互联网最广泛使用的格式。")]),t._v(" "),a("blockquote",[a("p",[t._v("在合适的场景下，即便我们将图片体积压缩至原有体积的 "),a("strong",[t._v("50%")]),t._v(" 以下,JPG 仍能保持住 "),a("strong",[t._v("60%")]),t._v(" 的品质.当压缩级别逐渐增大的时候，图片质量会逐渐损耗，所以压缩要适当。")])]),t._v(" "),a("p",[a("strong",[t._v("使用场景")])]),t._v(" "),a("ol",[a("li",[t._v("大的背景图")]),t._v(" "),a("li",[t._v("轮播图")]),t._v(" "),a("li",[t._v("Banner 图")])]),t._v(" "),a("p",[t._v("使用 "),a("a",{attrs:{href:"https://www.npmjs.com/package/imagemin-jpegtran",target:"_blank",rel:"noopener noreferrer"}},[t._v("imagemin-jpegtran"),a("OutboundLink")],1),t._v(" 进行 JPG 压缩")]),t._v(" "),a("h3",{attrs:{id:"png"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#png"}},[t._v("#")]),t._v(" PNG")]),t._v(" "),a("p",[a("strong",[t._v("无损压缩、质量高、体积大、支持透明")])]),t._v(" "),a("p",[t._v("PNG（可移植网络图形格式）是一种无损压缩的高保真的图片格式，它的压缩比高于 GIF，支持图像透明，可以利用 Alpha 通道调节图像透的明度。")]),t._v(" "),a("p",[a("strong",[t._v("使用场景")])]),t._v(" "),a("ol",[a("li",[t._v("小的 Logo，颜色简单且对比强烈的图片或者背景")]),t._v(" "),a("li",[t._v("颜色简单、对比度强的透明小图。")])]),t._v(" "),a("p",[t._v("使用"),a("a",{attrs:{href:"https://github.com/imagemin/imagemin-pngquant",target:"_blank",rel:"noopener noreferrer"}},[t._v("imagemin-pngquant"),a("OutboundLink")],1),t._v(" 进行 PNG 的压缩")]),t._v(" "),a("h3",{attrs:{id:"gif"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gif"}},[t._v("#")]),t._v(" GIF")]),t._v(" "),a("p",[t._v("支持动画,格式的压缩率一般在 "),a("strong",[t._v("50%")]),t._v(" 左右。")]),t._v(" "),a("h3",{attrs:{id:"svg"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#svg"}},[t._v("#")]),t._v(" SVG")]),t._v(" "),a("p",[a("strong",[t._v("文本文件、体积小、不失真、兼容性好")])]),t._v(" "),a("p",[a("strong",[t._v("SVG")]),t._v(" 格式的图片可以任意放大图形显示，并且不会损失图片质量")]),t._v(" "),a("p",[a("strong",[t._v("适用场景")])]),t._v(" "),a("ol",[a("li",[t._v("SVG loading 效果图：SVG-Loaders")]),t._v(" "),a("li",[t._v("矢量图标库：阿里巴巴矢量图标")])]),t._v(" "),a("p",[t._v("使用 "),a("a",{attrs:{href:"https://github.com/imagemin/imagemin-svgo",target:"_blank",rel:"noopener noreferrer"}},[t._v("imagemin-svgo"),a("OutboundLink")],1),t._v(" 进行 svg 压缩")]),t._v(" "),a("h3",{attrs:{id:"webp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#webp"}},[t._v("#")]),t._v(" WebP")]),t._v(" "),a("p",[t._v("支持有损压缩和无损压,但兼容性不够好,在特定使用场景下再去考虑它.")]),t._v(" "),a("p",[t._v("使用"),a("a",{attrs:{href:"https://github.com/imagemin/imagemin-webp",target:"_blank",rel:"noopener noreferrer"}},[t._v("imagemin-webp"),a("OutboundLink")],1),t._v(" 进行 PNG 的压缩")]),t._v(" "),a("h3",{attrs:{id:"懒加载"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#懒加载"}},[t._v("#")]),t._v(" 懒加载")]),t._v(" "),a("p",[t._v("在可视化的窗口中才去加载图片,大大提高首次的渲染速度!")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("原生支持 加 loading 属性 就可以了 需要浏览器支持")])]),t._v(" "),a("li",[a("p",[t._v("第三方插件 "),a("a",{attrs:{href:"https://github.com/tuupola/lazyload",target:"_blank",rel:"noopener noreferrer"}},[t._v("lazyload"),a("OutboundLink")],1),t._v(","),a("a",{attrs:{href:"https://github.com/twobin/react-lazyload",target:"_blank",rel:"noopener noreferrer"}},[t._v("react-lazyload"),a("OutboundLink")],1)])])]),t._v(" "),a("h3",{attrs:{id:"使用渐进式图片"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用渐进式图片"}},[t._v("#")]),t._v(" 使用渐进式图片")]),t._v(" "),a("p",[t._v("渐进式图片渲染过程中，会先显示整个图片的模糊轮廓，随着扫描次数的增加，图片变得越来越清晰。在如果图片较大或者网速慢的情况可以使用,提升用户的体验,不至于图片没有加载出来的部分呈现一片空白，不利于体验。")]),t._v(" "),a("p",[t._v("可以使用 "),a("a",{attrs:{href:"https://github.com/ccforward/progressive-image",target:"_blank",rel:"noopener noreferrer"}},[t._v("progressive-image"),a("OutboundLink")],1),t._v(" 插件来帮我们解决")]),t._v(" "),a("h3",{attrs:{id:"使用响应式图片"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用响应式图片"}},[t._v("#")]),t._v(" 使用响应式图片")]),t._v(" "),a("ul",[a("li",[t._v("Srcset 属性的使用")]),t._v(" "),a("li",[t._v("Sizes 属性的使用")]),t._v(" "),a("li",[t._v("picuure的使用")])]),t._v(" "),a("p",[t._v("如下使用非常简单")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("img")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("srcset")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("foo-160.jpg 160w,\n             foo-320.jpg 320w,\n             foo-640.jpg 640w,\n             foo-1280.jpg 1280w"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("foo-1280.jpg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("p",[t._v("具体可以参照 阮一峰老师的 "),a("a",{attrs:{href:"http://www.ruanyifeng.com/blog/2019/06/responsive-images.html?utm_source=tuicool&utm_medium=referral",target:"_blank",rel:"noopener noreferrer"}},[t._v("响应式图像教程"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"字体优化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#字体优化"}},[t._v("#")]),t._v(" 字体优化")]),t._v(" "),a("p",[t._v("开发者可以在自己的项目中使用自定义的字体,而下载时间难免会受到网络状况的影响从而会导致页面抖动的情况.因此 "),a("strong",[t._v("@font-face")]),t._v("增加新的 "),a("strong",[t._v("font-display")]),t._v(" 声明，用于控制字体下载完成之前的渲染行为。使用如下:")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token atrule"}},[a("span",{pre:!0,attrs:{class:"token rule"}},[t._v("@font-face")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("font-family")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Arvo'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("font-display")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" auto"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("src")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("local")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Arvo'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token url"}},[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("url")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("https://fonts.gstatic.com/s/arvo/v9/rC7kKhY-eUDY-ucISTIf5PesZW2xOQ-xsNqO47m55DA.woff2"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("format")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'woff2'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[a("strong",[t._v("font-display")]),t._v(" 有下面几种属性:")]),t._v(" "),a("p",[a("img",{attrs:{src:"/optimization/font-display.png",alt:"font-display"}})]),t._v(" "),a("p",[t._v("可以加载有限的字符集多个,那样会在需要时才去下载,如下:")]),t._v(" "),a("div",{staticClass:"language-css extra-class"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token atrule"}},[a("span",{pre:!0,attrs:{class:"token rule"}},[t._v("@font-face")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    ...\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token atrule"}},[a("span",{pre:!0,attrs:{class:"token rule"}},[t._v("@font-face")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    ...\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token atrule"}},[a("span",{pre:!0,attrs:{class:"token rule"}},[t._v("@font-face")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    ...\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}),[],!1,null,null,null);a.default=r.exports}}]);