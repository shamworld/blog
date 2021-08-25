(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{435:function(t,a,e){"use strict";e.r(a);var r=e(33),v=Object(r.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"http缓存"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#http缓存"}},[t._v("#")]),t._v(" HTTP缓存")]),t._v(" "),e("p",[t._v("缓存会根据请求保存输出内容的副本,例如html页面,图片,文件,当下一个请求来到的时候：如果是相同的URL，缓存直接使用副本响应访问请求，而不是向源服务器再次发送请求")]),t._v(" "),e("p",[e("strong",[t._v("浏览器第一次请求")])]),t._v(" "),e("p",[e("img",{attrs:{src:"/http/nocache.png",alt:"nocache.png"}})]),t._v(" "),e("p",[e("strong",[t._v("浏览器再次请求时：")]),t._v(" "),e("img",{attrs:{src:"/http/cache.png",alt:"cache.png"}})]),t._v(" "),e("h2",{attrs:{id:"按缓存位置分类"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#按缓存位置分类"}},[t._v("#")]),t._v(" 按缓存位置分类")]),t._v(" "),e("p",[t._v("我们可以在 Chrome 的开发者工具中，Network -> Size 一列看到一个请求最终的处理方式：如果是大小 (多少 K， 多少 M 等) 就表示是网络请求，否则会列出 "),e("strong",[t._v("from memory cache")]),t._v(", "),e("strong",[t._v("from disk cache")]),t._v(" 和 "),e("strong",[t._v("from ServiceWorker")]),t._v("。")]),t._v(" "),e("p",[t._v("它们的优先级是:(由上到下寻找,找到即返回;加不到继续)")]),t._v(" "),e("ol",[e("li",[t._v("Server Worker")]),t._v(" "),e("li",[t._v("Memory Cache")]),t._v(" "),e("li",[t._v("Disk Cache")]),t._v(" "),e("li",[t._v("网络请求")])]),t._v(" "),e("h3",{attrs:{id:"memory-cache"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#memory-cache"}},[t._v("#")]),t._v(" memory cache")]),t._v(" "),e("p",[t._v("memory cache 是内存中的缓存(相对 disk cache 就是硬盘上的缓存). 几乎所有的网络请求资源都会被浏览器自动加入到 memory cache 。但是也正因为数量很大但是浏览器占用的内存不能无限扩大这样两个因素，memory cache 注定只能是个“短期存储”,也就是  TAB 关闭后 memory cache 便就失效了。")]),t._v(" "),e("p",[t._v("memory cache 机制保证了一个页面中如果有两个相同的请求 (例如两个 src 相同的 "),e("img"),t._v("，两个 href 相同的 "),e("link"),t._v(")都实际只会被请求最多一次，避免浪费")]),t._v(" "),e("p",[t._v("在从 memory cache 获取缓存内容时，浏览器会忽视例如 max-age=0, no-cache 等头部配置,如果不想让一个资源进入缓存,短期也不行,那就需要使用 "),e("strong",[t._v("no-store")])]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("测试")]),t._v(" "),e("p",[t._v("打开浏览器随便一个页面,第一次访问百度首页,发现是网络请求得来的,再次访问,发现很多来自 memory cache 的")])]),t._v(" "),e("h3",{attrs:{id:"disk-cache"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#disk-cache"}},[t._v("#")]),t._v(" disk cache")]),t._v(" "),e("p",[t._v("disk cache 也叫 HTTP cache，顾名思义是存储在硬盘上的缓存，因此它是持久存储的，是实际存在于文件系统中的。而且它允许相同的资源在跨会话，甚至跨站点的情况下使用，例如两个站点都使用了同一张图片。")]),t._v(" "),e("p",[t._v("disk cache 会严格根据 HTTP 头信息中的各类字段来判定哪些资源可以缓存，哪些资源不可以缓存；哪些资源是仍然可用的，哪些资源是过时需要重新请求的。当命中缓存之后，浏览器会从硬盘中读取资源，虽然比起从内存中读取慢了一些，但比起网络请求还是快了不少的。绝大部分的缓存都来自 disk cache。")]),t._v(" "),e("h3",{attrs:{id:"service-worker"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#service-worker"}},[t._v("#")]),t._v(" Service Worker")]),t._v(" "),e("p",[t._v("Service Worker 能够操作的缓存是有别于浏览器内部的 memory cache 或者 disk cache 的。我们可以从 Chrome 的 F12 中，Application -> Service Workers 找到。除了位置不同之外，这个缓存是永久性的，即关闭 TAB 或者浏览器，下次打开依然还在(而 memory cache 不是)。")]),t._v(" "),e("p",[t._v("如果 Service Worker 没能命中缓存，一般情况会使用 fetch() 方法继续获取资源。这时候，浏览器就去 memory cache 或者 disk cache 进行下一次找缓存的工作了。注意：经过 Service Worker 的 "),e("strong",[t._v("fetch()")]),t._v(" 方法获取的资源，即便它并没有命中 Service Worker 缓存，甚至实际走了网络请求，也会标注为 "),e("strong",[t._v("from ServiceWorker")])]),t._v(" "),e("h3",{attrs:{id:"请求网络"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#请求网络"}},[t._v("#")]),t._v(" 请求网络")]),t._v(" "),e("p",[t._v("如果一个请求在上述 3 个位置都没有找到缓存，那么浏览器会正式发送网络请求去获取内容")]),t._v(" "),e("ol",[e("li",[t._v("根据 Service Worker 中的 handler 决定是否存入 Cache Storage")]),t._v(" "),e("li",[t._v("根据HTTP头部的相关字段(Cache-control)等决定是否存入缓存 disk cache")]),t._v(" "),e("li",[t._v("memory cache 保存一份资源 的引用，以备下次使用。")])]),t._v(" "),e("h2",{attrs:{id:"按失效策略分类"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#按失效策略分类"}},[t._v("#")]),t._v(" 按失效策略分类")]),t._v(" "),e("ol",[e("li",[e("strong",[t._v("memory cache")]),t._v(" 是浏览器为了加快读取缓存速度而进行的自身的优化行为,不受开发者控制，也不受 HTTP 协议头的约束,算是一个黑盒。")]),t._v(" "),e("li",[e("strong",[t._v("Service Worker")]),t._v(" 是由开发者编写的额外的脚本，且缓存位置独立.")]),t._v(" "),e("li",[e("strong",[t._v("disk cache")]),t._v(" 其实是我们最熟悉也是说的最多的。主要分为"),e("strong",[t._v("强缓存")]),t._v("和"),e("strong",[t._v("协商缓存")]),t._v(",浏览器加载一个页面的简单流程如下:")])]),t._v(" "),e("ul",[e("li",[t._v("如果未命中协商缓存，则服务器会将完整的资源返回给浏览器，浏览器加载新资源，并更新缓存。")])]),t._v(" "),e("h3",{attrs:{id:"强缓存"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#强缓存"}},[t._v("#")]),t._v(" 强缓存")]),t._v(" "),e("p",[t._v("浏览器先根据这个资源的http头信息来判断是否命中强缓存。如果命中则先访问缓存数据库看是否存在,如果存在缓存中的资源直接返回,并不会将请求发送到服务器。")]),t._v(" "),e("p",[t._v("强缓存是利用http的返回头中的 "),e("font",{attrs:{color:"red"}},[t._v(" Expires ")]),t._v("或者 "),e("font",{attrs:{color:"red"}},[t._v(" Cache-Control ")]),t._v("两个字段来控制的，用来表示资源的缓存时间。")],1),t._v(" "),e("h4",{attrs:{id:"expires"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#expires"}},[t._v("#")]),t._v(" Expires")]),t._v(" "),e("p",[t._v("缓存过期时间，用来指定资源到期的时间，是服务器端的具体的时间点。如:")]),t._v(" "),e("div",{staticClass:"language-html extra-class"},[e("pre",{pre:!0,attrs:{class:"language-html"}},[e("code",[t._v("Expires: Thu, 10 Nov 2017 08:45:11 GMT\n")])])]),e("p",[t._v("在响应消息头中,设置这个字段之后,就可以告诉浏览器,在未过期之前不需要再次请求。\n这种方式有一个明显的缺点,由于失效时间是一个绝对时间，所以当客户端本地时间被修改以后，服务器与客户端时间偏差变大以后，就会导致缓存混乱。于是发展出了Cache-Control。")]),t._v(" "),e("p",[e("img",{attrs:{src:"/http/1593338090251-7ea9118e-aae5-460e-baa1-126aaa941b89.png",alt:"expires.png"}})]),t._v(" "),e("h4",{attrs:{id:"cache-control"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#cache-control"}},[t._v("#")]),t._v(" Cache-Control")]),t._v(" "),e("p",[t._v("Cache-Control是一个相对时间，例如Cache-Control:3600，代表着资源的有效期是3600秒。由于是相对时间，并且都是与客户端时间比较，所以服务器与客户端时间偏差也不会导致问题。")]),t._v(" "),e("p",[e("strong",[t._v("Cache-Control")]),t._v("与"),e("strong",[t._v("Expires")]),t._v("可以在服务端配置同时启用或者启用任意一个,同时启用的时候 "),e("font",{attrs:{color:"red"}},[t._v("Cache-Control优先级高 ")]),t._v("。")],1),t._v(" "),e("p",[t._v("Cache-Control 可以由多个字段组合而成，主要有以下几个取值：")]),t._v(" "),e("ol",[e("li",[e("strong",[t._v("max-age")]),t._v(" 指定一个时间长度，在这个时间段内缓存是有效的，单位是s。例如设置 Cache-Control:max-age=31536000，也就是说缓存有效期为（31536000 / 24 / 60 * 60）天，第一次访问这个资源的时候，服务器端也返回了 Expires 字段，并且过期时间是一年后。在没有禁用缓存并且没有超过有效时间的情况下，再次访问这个资源就命中了缓存，不会向服务器请求资源而是直接从浏览器缓存中取。")]),t._v(" "),e("li",[e("strong",[t._v("s-maxage")]),t._v(" 同 max-age,覆盖 max-age、Expires，但仅适用于共享缓存，在私有缓存中被忽略。")]),t._v(" "),e("li",[e("strong",[t._v("public")]),t._v(" 表明响应可以被任何对象（发送请求的客户端、代理服务器等等）缓存。")]),t._v(" "),e("li",[e("strong",[t._v("private")]),t._v(" 表明响应只能被单个用户（可能是操作系统用户、浏览器用户）缓存，是非共享的，不能被代理服务器缓存。")]),t._v(" "),e("li",[e("strong",[t._v("no-cache")]),t._v(" 强制所有缓存了该响应的用户,在使用已缓存的数据前，发送带验证器的请求到服务器。不是字面意思上的不缓存。")]),t._v(" "),e("li",[e("strong",[t._v("no-store")]),t._v(" 禁止缓存，每次请求都要向服务器重新获取数据。")]),t._v(" "),e("li",[e("strong",[t._v("must-revalidate")]),t._v(" 指定如果页面是过期的，则去服务器进行获取。这个指令并不常用，就不做过多的讨论了。")])]),t._v(" "),e("h3",{attrs:{id:"协商缓存"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#协商缓存"}},[t._v("#")]),t._v(" 协商缓存")]),t._v(" "),e("p",[t._v("若未命中强缓存，则浏览器会将请求发送至服务器。服务器根据 http 头信息中的 "),e("strong",[t._v("Last-Modified")]),t._v("/"),e("strong",[t._v("If-Modify-Since")]),t._v("或"),e("strong",[t._v("Etag")]),t._v("/"),e("strong",[t._v("If-None-Match")]),t._v("来判断是否命中协商缓存。如果命中，则http返回码为"),e("strong",[t._v("304")]),t._v(",浏览器从缓存中加载资源。")]),t._v(" "),e("h4",{attrs:{id:"last-modified-if-modified-since"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#last-modified-if-modified-since"}},[t._v("#")]),t._v(" Last-Modified & If-Modified-Since")]),t._v(" "),e("ol",[e("li",[t._v("浏览器第一次请求一个资源的时候，服务器返回的header中会加上 "),e("strong",[t._v("Last-Modified")]),t._v(" 是一个时间标识该资源的最后修改时间，例如")])]),t._v(" "),e("div",{staticClass:"language-html extra-class"},[e("pre",{pre:!0,attrs:{class:"language-html"}},[e("code",[t._v("Last-Modified:Thu,31 Dec 2037 23:59:59 GMT。\n")])])]),e("ol",{attrs:{start:"2"}},[e("li",[e("p",[t._v("浏览器将这个值和内容一起记录在缓存数据库中")])]),t._v(" "),e("li",[e("p",[t._v("当浏览器再次请求该资源时，发送的请求头中会包含 "),e("strong",[t._v("If-Modify-Since")]),t._v(",该值为缓存之前返回的 "),e("strong",[t._v("Last-Modified")]),t._v("。服务器收到 "),e("strong",[t._v("If-Modify-Since")]),t._v(" 后,根据资源的最后修改时间判断是否命中缓存。")])]),t._v(" "),e("li",[e("p",[t._v("如果命中缓存，则响应 "),e("font",{attrs:{color:"red"}},[t._v("304")]),t._v(",并且不会返回资源内容，并且不会返回Last-Modified。由于对比的服务端时间，所以客户端与服务端时间差距不会导致问题。但是有时候通过最后修改时间来判断资源是否修改还是不太准确(资源变化了最后修改时间也可以一致)。于是出现了 "),e("strong",[t._v("ETag/If-None-Match")]),t._v("。")],1)])]),t._v(" "),e("h4",{attrs:{id:"etag-if-none-match"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#etag-if-none-match"}},[t._v("#")]),t._v(" ETag/If-None-Match")]),t._v(" "),e("p",[e("strong",[t._v("Etag")]),t._v(" 返回的是一个特殊标识（一般都是 hash 生成）. "),e("strong",[t._v("Etag")]),t._v(" 可以保证每一个资源是唯一的,资源变化都会导致 "),e("strong",[t._v("Etag")]),t._v("变化。ETag值的变更则说明资源状态已经被修改。服务器根据浏览器上发送的 "),e("strong",[t._v("If-None-Match")]),t._v(" 值来判断是否命中缓存。命中缓存返回 "),e("font",{attrs:{color:"red"}},[t._v("304")]),t._v(",不命中返回新资源 "),e("font",{attrs:{color:"red"}},[t._v("200")])],1),t._v(" "),e("p",[e("img",{attrs:{src:"/http/Etag.png",alt:"Etag.png"}})]),t._v(" "),e("h2",{attrs:{id:"浏览器的行为"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#浏览器的行为"}},[t._v("#")]),t._v(" 浏览器的行为")]),t._v(" "),e("p",[t._v("所谓浏览器的行为,指的就是用户在浏览器如何操作时,会出发怎样的缓存策略,有以下三种:")]),t._v(" "),e("ol",[e("li",[t._v("打开网页,输入地址:查找 "),e("strong",[t._v("disk cache")]),t._v(" 中是否匹配. 如有则使用;如没有则发送网络请求")]),t._v(" "),e("li",[t._v("普通刷新(F5):因为 TAB 没有关闭,根据上面所说浏览器会自动缓存一些资源, 因此 memory cache 是可用的,会被优先使用(如果配置的话),其次才是 "),e("strong",[t._v("disk cache")])]),t._v(" "),e("li",[t._v("强制刷新(Ctrl + F5): 浏览器不使用缓存,因此发送的请求头部均带有 "),e("font",{attrs:{color:"red"}},[t._v("Cache-control: no-cache")]),t._v("(为了兼容，还带了 Pragma: no-cache)。服务器直接返回 200 和最新内容。")],1)]),t._v(" "),e("h2",{attrs:{id:"总结"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),e("p",[e("img",{attrs:{src:"/optimization/cache.png",alt:"cache.png"}})]),t._v(" "),e("p",[e("img",{attrs:{src:"/optimization/cache-level.png",alt:"cache-level.png"}})]),t._v(" "),e("ul",[e("li",[t._v("cache-control")]),t._v(" "),e("li",[t._v("expries")]),t._v(" "),e("li",[t._v("etag")]),t._v(" "),e("li",[t._v("last-modified")])])])}),[],!1,null,null,null);a.default=v.exports}}]);