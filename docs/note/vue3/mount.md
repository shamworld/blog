# $mount解读

```js
var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
    el,
    hydrating
) {
    el = el && query(el);

    /* istanbul ignore if */
    if (el === document.body || el === document.documentElement) {
        warn(
            "Do not mount Vue to <html> or <body> - mount to normal elements instead."
        );
        return this
    }

    var options = this.$options;
    // 没有render时将template转换为render
    if (!options.render) {
        var template = options.template;
        //判断template存不存在
        if (template) {
            //判断template类型(#id,模板字符串,dom元素)
            //template是字符串
            if (typeof template === 'string') {
                //判断template是#id
                if (template.charAt(0) === '#') {
                    template = idToTemplate(template);
                    /* istanbul ignore if */
                    if (!template) {
                        warn(
                            ("Template element not found or is empty: " + (options.template)),
                            this
                        );
                    }
                }
            } else if (template.nodeType) {//template是dom元素
                template = template.innerHTML;
            } else {
                //无效的template
                {
                    warn('invalid template option:' + template, this);
                }
                return this
            }
        } else if (el) {//无效的template
            template = getOuterHTML(el);
        }
        //执行template=>compileToFunctions()
        if (template) {
            /* istanbul ignore if */
            if (config.performance && mark) {
                mark('compile');
            }
            //编译器的入口文件 templatemo模板 字符串   options用户配置项
            var ref = compileToFunctions(template, {
                outputSourceRange: "development" !== 'production',
                // E浏览器下的bug
                shouldDecodeNewlines: shouldDecodeNewlines,
                shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
                //只在完整构建版本中的浏览器内编译时可用  改变纯文本插入分隔符。默认值：["{{", "}}"]
                delimiters: options.delimiters,
                //只在完整构建版本中的浏览器内编译时可用 
                //当设为 true 时，将会保留且渲染模板中的 HTML 注释。默认行为是舍弃它们。
                comments: options.comments
            }, this);
            var render = ref.render;
            var staticRenderFns = ref.staticRenderFns;
            options.render = render;
            options.staticRenderFns = staticRenderFns;

            /* istanbul ignore if */
            if (config.performance && mark) {
                mark('compile end');
                measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
            }
        }
    }
    return mount.call(this, el, hydrating)
};
```
整体流程:
- 用一个变量`mount`把原来的`$mount`方法存起来，在重写`$mount`方法
- 然后对`el`进行处理，`el`可以是dom节点或者节点的选择器字符串，若是后者的话在通过`query(el)`进行转换
- `el`不能是`html`或者`body`元素(也就是说不能直接将vue绑定在`html`或者`body`标签上)
- 若没有`render`函数
    - 若有`template`，判断`template`类型(#id，模板字符串，dom元素)
    - `render`函数和`template`都不存在，挂载DOM元素的HTML会被提取出来用作`template`
    - 执行`tempalte=>compileToFunctions()`，将`template`转换为`render`
- 若有`render`函数
    - 走原来的`$mount`方法

这就证明了使用`template`的话还是会先转换为`render`在进行下一步的操作
