(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{501:function(v,t,_){"use strict";_.r(t);var a=_(37),r=Object(a.a)({},(function(){var v=this,t=v.$createElement,_=v._self._c||t;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("h1",{attrs:{id:"performance面板解决性能"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#performance面板解决性能"}},[v._v("#")]),v._v(" performance面板解决性能")]),v._v(" "),_("h2",{attrs:{id:"准备"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#准备"}},[v._v("#")]),v._v(" 准备")]),v._v(" "),_("p",[_("strong",[v._v("匿名模式")])]),v._v(" "),_("p",[v._v("匿名模式可以保证Chrome在一个相对干净的环境下运行。比如安装了许多chrome插件，这些插件可能会影响我们分析性能表现")]),v._v(" "),_("p",[v._v("使用快捷键ctrl(mac是command) + shift + N 即可代码匿名模式下的chrome新标签页")]),v._v(" "),_("p",[_("img",{attrs:{src:"/optimization/chromePerformance1.png",alt:""}})]),v._v(" "),_("p",[_("strong",[v._v("移动设备CPU")])]),v._v(" "),_("p",[v._v("移动设备的CPU一般比台式机和笔记本弱很多。分析页面时，可以用CPU控制器(CPU Throttling)来模拟移动端设备CPU")]),v._v(" "),_("p",[v._v("在DevTools中，点击Performance的tab。确保Screenshots chekbox被选中；点击Capture Settings（⚙️）按钮，DevTools会展示很多设置，来模拟各种状况；对于模拟CPU，选择4x slowdown，于是Devtools就开始模拟4倍低速CPU")]),v._v(" "),_("p",[_("img",{attrs:{src:"/optimization/browserRender5.png",alt:""}})]),v._v(" "),_("h2",{attrs:{id:"概述"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[v._v("#")]),v._v(" 概述")]),v._v(" "),_("p",[_("strong",[v._v("组成")])]),v._v(" "),_("p",[v._v("performance面板有如下四个窗格:")]),v._v(" "),_("ul",[_("li",[v._v("controls:开始记录，停止记录和配置记录期间捕获的信息")]),v._v(" "),_("li",[v._v("overview:页面性能的高级汇总")]),v._v(" "),_("li",[v._v("火焰图:CPU堆叠追踪的可视化")]),v._v(" "),_("li",[v._v("统计汇总:以图表的形式汇总数据")])]),v._v(" "),_("p",[_("img",{attrs:{src:"/optimization/chromePerformance2.png",alt:""}})]),v._v(" "),_("p",[_("strong",[v._v("颜色展示")])]),v._v(" "),_("ul",[_("li",[v._v("HTML文件为蓝色")]),v._v(" "),_("li",[v._v("脚本为黄色")]),v._v(" "),_("li",[v._v("样式表为紫色")]),v._v(" "),_("li",[v._v("媒体文件为绿色")]),v._v(" "),_("li",[v._v("其他资源为灰色")])]),v._v(" "),_("p",[_("strong",[v._v("做记录")])]),v._v(" "),_("p",[v._v("打开想要记录的页面，然后重新加载页面。performance面板会自动记录页面重新加载。")]),v._v(" "),_("p",[v._v("要记录页面交互，打开performance面板，然后按"),_("strong",[v._v("Record")]),v._v(" 按钮，或者键盘快捷键cmd+E(Mac)或Ctrl+E(Windows/Linux)，开始记录。记录时，"),_("strong",[v._v("Record")]),v._v("按钮会变成红色。执行页面交互，然后按"),_("strong",[v._v("Record")]),v._v(" 按钮活再次快捷键停止记录")]),v._v(" "),_("p",[v._v("完成记录后，DevTools会猜测哪一部分记录最相关，并自动缩放到那一个部分")]),v._v(" "),_("h2",{attrs:{id:"查看"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#查看"}},[v._v("#")]),v._v(" 查看")]),v._v(" "),_("p",[_("strong",[v._v("Overview")])]),v._v(" "),_("p",[_("strong",[v._v("Overview")]),v._v(" 窗格包含一下三个图表:")]),v._v(" "),_("ul",[_("li",[_("p",[v._v("FPS。每秒帧数。绿色竖线越高，FPS越高。FPS图表上的红色块表示长时间帧，很可能会出现卡顿")])]),v._v(" "),_("li",[_("p",[v._v("CPU。CPU资源。此面积图指示消耗CPU资源的事件类型")])]),v._v(" "),_("li",[_("p",[v._v("NET。每条彩色横杠标识一种资源。横杠越长。检索资源所需时间越长。每个横杠的浅色部分表示等待时间(从请求资源到第一个字节下载完成的时间)")])])]),v._v(" "),_("p",[v._v("可以放大显示一部分记录，以便简化分析。使用"),_("strong",[v._v("Overview")]),v._v(" 窗格可以放大显示一部分记录。放大后，"),_("strong",[v._v("火焰图")]),v._v(" 会自动缩放以匹配同一部分")]),v._v(" "),_("p",[v._v("选择部分后，可以使用W,A,S和D键调整选择。W和S分别代表放大和缩小。A和D分别代表左移和右移")]),v._v(" "),_("p",[_("strong",[v._v("火焰图")])]),v._v(" "),_("p",[v._v("在"),_("strong",[v._v("火焰图")]),v._v(" 上看到一到三条垂直的虚线。蓝线代表DOMContentLoaded事件。绿色代表首次绘制的时间。红线代表load事件")]),v._v(" "),_("p",[v._v("在"),_("strong",[v._v("火焰图")]),v._v(" 中选择事件时，"),_("strong",[v._v("Details")]),v._v(" 窗格会显示与事件相关的其他信息")]),v._v(" "),_("p",[_("img",{attrs:{src:"/optimization/details-pane.png",alt:""}})]),v._v(" "),_("h2",{attrs:{id:"诊断开连接"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#诊断开连接"}},[v._v("#")]),v._v(" 诊断开连接")]),v._v(" "),_("p",[_("strong",[v._v("JS")])]),v._v(" "),_("p",[v._v("JavaScript计算，特别是会触发大量视觉变化的计算会降低应用性能。不要让时机不当活长时间运行的JavaScript影响用户交互")]),v._v(" "),_("p",[v._v("下面是一些常见JavaScript问题:")]),v._v(" "),_("p",[v._v("1.大开销输入处理程序影响响应活动画")]),v._v(" "),_("p",[v._v("让浏览器尽可能晚的处理触摸和滚动，或者绑定侦听")]),v._v(" "),_("p",[v._v("2.时机不当的JavaScript影响响应，动画，加载")]),v._v(" "),_("p",[v._v("使用requestAnimationFrame,使用DOM操作遍布各个帧，使用网络工作线程")]),v._v(" "),_("p",[v._v("3.长时间运行的JavaScript影响响应")]),v._v(" "),_("p",[v._v("将纯粹的计算工作转移到web worker中。如果需要DOM访问权限，配合使用requestAnimationFrame")]),v._v(" "),_("p",[_("strong",[v._v("样式")])]),v._v(" "),_("p",[v._v("样式更改开销较大，在这些更改会影响DOM中的多个元素时更是如此。只要将样式应用到元素，浏览器就必须确定对所有相关元素的影响，重新计算布局并重新绘制。")]),v._v(" "),_("p",[v._v("点击"),_("strong",[v._v("Recalculate Style")]),v._v(" 事件(以紫色显示)可以在"),_("strong",[v._v("Details")]),v._v(" 窗格中查看更多相关信息。如果样式更改需要较长时间，对性能的影响会非常大。如果样式计算会影响大量元素，则需要改进另一个方面")]),v._v(" "),_("p",[_("img",{attrs:{src:"/optimization/recalculate-style.png",alt:""}})]),v._v(" "),_("p",[v._v("要降低"),_("strong",[v._v("Recalculate Style")]),v._v(" 事件的影响，使用一些对渲染性能的影响较小的属性。如使用transform和opacity属性更改来实现动画，使用will-change活translateZ提升移动的元素")]),v._v(" "),_("p",[v._v("下面是一些常见的CSS问题")]),v._v(" "),_("p",[v._v("1.大开销样式计算影响响应或动画")]),v._v(" "),_("p",[v._v("任何会更改元素几何形状的CSS属性，如宽度，高度或位置；浏览器必须检查所有其他元素并重做布局。避免会触发重排的CSS属性")]),v._v(" "),_("p",[v._v("2.复杂的选择器影响响应或动画")]),v._v(" "),_("p",[v._v("嵌套选择器强制浏览器了解与所有其他元素有关的全部内容，包括父级和子级。尽量在CSS中引用只有一个类的元素")]),v._v(" "),_("p",[_("strong",[v._v("重排")])]),v._v(" "),_("p",[v._v('布局(或重排)是浏览器用来计算页面上所有元素的位置和大小的过程。网页的布局模式意味着一个元素可能影响其他元素；例如body元素的宽度一般会影响其子元素的宽度以及树中各处的节点等等。这个过程对于浏览器说可能很复杂。一般的经验法则是，如果在帧完成前从DOM请求返回几何值，将发现会出现"强制同步布局"，在频繁的重复或针对较大的DOM树执行操作时这会成为性能的大瓶颈。')]),v._v(" "),_("p",[v._v("performance面板可以确定页面何时会导致强制同步布局。 这些 "),_("strong",[v._v("Layout")]),v._v(" 事件使用红色竖线标记")]),v._v(" "),_("p",[_("img",{attrs:{src:"/optimization/forced-synchronous-layout.png",alt:""}})]),v._v(" "),_("p",[v._v('"布局抖动"是指反复出现强制同步布局情况。这种情况会在JavaScript从DOM反复的写入和读取时出现，将会强制浏览器反复重新计算布局')]),v._v(" "),_("p",[_("strong",[v._v("重绘")])]),v._v(" "),_("p",[v._v("绘制是填充像素的过程。这经常是渲染流程开销最大的部分。如果在任何情况下注意到页面出现卡顿现象，很有可能存在绘制问题。")]),v._v(" "),_("p",[v._v("合成是将页面的已绘制部分放在一起以在屏幕上显示的过程。 大多数情况下，如果坚持仅合成器属性并避免一起绘制，性能会有极大的改进，但是需要留意过多的层计数")]),v._v(" "),_("p",[v._v("一定不要使用下面的代码")]),v._v(" "),_("div",{staticClass:"language-js extra-class"},[_("pre",{pre:!0,attrs:{class:"language-js"}},[_("code",[_("span",{pre:!0,attrs:{class:"token operator"}},[v._v("*")]),v._v(" "),_("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v("{")]),v._v("\n  will"),_("span",{pre:!0,attrs:{class:"token operator"}},[v._v("-")]),v._v("change"),_("span",{pre:!0,attrs:{class:"token operator"}},[v._v(":")]),v._v(" transform"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v(";")]),v._v("\n  transform"),_("span",{pre:!0,attrs:{class:"token operator"}},[v._v(":")]),v._v(" "),_("span",{pre:!0,attrs:{class:"token function"}},[v._v("translateZ")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v("(")]),_("span",{pre:!0,attrs:{class:"token number"}},[v._v("0")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v(")")]),_("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v(";")]),v._v("\n"),_("span",{pre:!0,attrs:{class:"token punctuation"}},[v._v("}")]),v._v("\n")])])]),_("p",[v._v("这是以迂回方式说想要提升页面上的每个元素。此处的问题是创建的每一层都需要内存和管理，而这些并不是免费的。事实上，在内存有限的设备上，对性能的影响可能远远超过创建层带来的任何好处。每一层的纹理都需要上传到 GPU，使 CPU 与 GPU 之间的带宽、GPU 上可用于纹理处理的内存都受到进一步限制")]),v._v(" "),_("p",[v._v("如果大部分渲染时间花费在绘制上，即表示存在绘制问题")]),v._v(" "),_("p",[v._v("下面是一些常见的绘制问题")]),v._v(" "),_("p",[v._v("1、绘制风暴影响响应或动画")]),v._v(" "),_("p",[v._v("较大的绘制区域或大开销绘制影响了响应或动画，要避免绘制、提升将要移动到自有层的元素，使用变形和不透明度")]),v._v(" "),_("p",[v._v("2、层数激增影响动画")]),v._v(" "),_("p",[v._v("使用 translateZ(0) 过度提升过多的元素会严重影响动画性能，要谨慎提升到层，并且仅在了解这样会有切实改进时才提升到层")])])}),[],!1,null,null,null);t.default=r.exports}}]);