(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{470:function(t,e,a){"use strict";a.r(e);var s=a(33),r=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"传输加载优化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#传输加载优化"}},[t._v("#")]),t._v(" 传输加载优化")]),t._v(" "),a("h2",{attrs:{id:"启动压缩-gzip"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#启动压缩-gzip"}},[t._v("#")]),t._v(" 启动压缩 Gzip")]),t._v(" "),a("p",[t._v("在 修改 Nginx 配置,启动"),a("strong",[t._v("Gzip")]),t._v("压缩")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("gzip                on;\n")])])]),a("h2",{attrs:{id:"keep-alive"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#keep-alive"}},[t._v("#")]),t._v(" Keep-Alive")]),t._v(" "),a("p",[a("strong",[t._v("Keep-Alive")]),t._v(" 在Http1.1 默认是开启的,可以在 Response Header 中可以看到 "),a("strong",[t._v("Connection: keep-alive")])]),t._v(" "),a("p",[t._v("在nginx 配置中有两个比较重要的配置")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("keepalive_timeout "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("65")]),t._v("  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 保持连接的时间，也叫超时时间，单位秒")]),t._v("\nkeepalive_request "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 最大连接上限 ")]),t._v("\n")])])]),a("p",[t._v("合理的根据自己的业务量进行调整")]),t._v(" "),a("h2",{attrs:{id:"http-缓存"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http-缓存"}},[t._v("#")]),t._v(" Http 缓存")]),t._v(" "),a("p",[t._v("详见"),a("RouterLink",{attrs:{to:"/note/http/HTTP缓存.html"}},[t._v("HTTP缓存")]),t._v(",现在介绍下在 Nginx 中的配置")],1),t._v(" "),a("h2",{attrs:{id:"service-workers"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#service-workers"}},[t._v("#")]),t._v(" Service Workers")]),t._v(" "),a("h2",{attrs:{id:"http2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http2"}},[t._v("#")]),t._v(" Http2")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("二进制传输")])]),t._v(" "),a("li",[a("p",[t._v("请求相应多路复用")])]),t._v(" "),a("li",[a("p",[t._v("Server push")])])]),t._v(" "),a("p",[t._v("在 Nginx 开启 Htpps,配置证书,可以参考 "),a("a",{attrs:{href:"https://www.cnblogs.com/007sx/p/12583675.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("生成自签名的SSL证书和私钥"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("修改配置")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("server {\n\t# 添加 http2\n\tlisten 443 ssl http2;\n\t...\n}\n")])])]),a("h2",{attrs:{id:"ssr"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ssr"}},[t._v("#")]),t._v(" SSR")]),t._v(" "),a("p",[t._v("服务端渲染")]),t._v(" "),a("h2",{attrs:{id:"加载顺序"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#加载顺序"}},[t._v("#")]),t._v(" 加载顺序")]),t._v(" "),a("h3",{attrs:{id:"preload"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#preload"}},[t._v("#")]),t._v(" preload")]),t._v(" "),a("p",[a("strong",[t._v("Preload")]),t._v(" 来告诉浏览器预先请求当前页需要的资源，从而提高这些资源的请求优先级。比如,对于那些本来请求优先级较低的关键请求,我们可以通过设置 "),a("strong",[t._v("Preload")]),t._v(" 来提升这些请求的优先级。合理的安排优先级可以提升网站的性能,比如我们可以优先字体资源的下载")]),t._v(" "),a("h3",{attrs:{id:"prefetch"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prefetch"}},[t._v("#")]),t._v(" prefetch")]),t._v(" "),a("p",[a("strong",[t._v("Prefetch")]),t._v(" 来告诉浏览器用户将来可能在其他页面(非本页面)可能使用到的资源,那么浏览器会在空闲时,就去预先加载这些资源放在 http 缓存,最常见的 "),a("strong",[t._v("dns-prefetch")]),t._v(".")]),t._v(" "),a("p",[t._v("从加载优先级上看,"),a("strong",[t._v("Preload")]),t._v(" 会提升请求优先级;而"),a("strong",[t._v("Prefetch")]),t._v("会把资源的优先级放在最低，当浏览器空闲时才去预加载。")])])}),[],!1,null,null,null);e.default=r.exports}}]);