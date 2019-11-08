---
title: VuePress 中 Markdown 的拓展
date: 2019-11-08 10:12:00
sidebar: 'auto'
categories:
 - VuePress
tags:
 - VuePress
 - Markdown
---

这个是第一个 VuePress 文章， VuePress 是通过 Markdown 生成静态页面，它的诞生初衷是为了支持 Vue 及其子项目的文档需求。

## Markdown 拓展

### Header Anchors

所有的标题将会自动地应用 anchor 链接，anchor 的渲染可以通过 [`markdown.anchor`](https://vuepress.vuejs.org/zh/config/#markdown-anchor) 来配置。

### 链接

#### 内部链接

网站内部的链接，将会被转换成 `<router-link>` 用于 SPA 导航。同时，站内的每一个文件夹下的 `README.md` 或者 `index.md` 文件都会被自动编译为 `index.html`，对应的链接将被视为 `/`。

以如下的文件结构为例：

```
.
├─ README.md
├─ foo
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ README.md
   ├─ three.md
   └─ four.md
```

假设你现在在 `foo/one.md` 中：

``` md
[Home](/) <!-- 跳转到根部的 README.md -->
[foo](/foo/) <!-- 跳转到 foo 文件夹的 index.html -->
[foo heading](./#heading) <!-- 跳转到 foo/index.html 的特定标题位置 -->
[bar - three](../bar/three.md) <!-- 具体文件可以使用 .md 结尾（推荐） -->
[bar - four](../bar/four.html) <!-- 也可以用 .html -->
```

#### 链接的重定向 <Badge text="1.0.0-alpha.37"/>

VuePress 支持重定向到干净链接。如果一个链接 `/foo` 找不到，VuePress 会自行寻找一个可用的 `/foo/` 或 `/foo.html`。反过来，当 `/foo/` 或 `/foo.html` 中的一个找不到时，VuePress 也会尝试寻找另一个。借助这种特性，我们可以通过官方插件 [vuepress-plugin-clean-urls](https://vuepress.github.io/plugins/clean-urls/) 定制你的网站路径。

::: tip 注意
无论是否使用了 permalink 和 clean-urls 插件，你的相对路径都应该依赖于当前的文件结构来定义。在上面的例子中，即使你将 `/foo/one.md` 的路径设为了 `/foo/one/`，你依然应该通过 `./two.md` 来访问 `/foo/two.md`。
:::

#### 外部链接

外部的链接将会被自动地设置为  `target="_blank" rel="noopener noreferrer"`:

- [vuejs.org](https://vuejs.org)
- [VuePress on GitHub](https://github.com/vuejs/vuepress)

你可以自定义通过配置 [config.markdown.externalLinks](https://vuepress.vuejs.org/zh/config/#markdown-externallinks) 来自定义外部链接的特性。

### Front Matter

VuePress 提供了对 [YAML front matter](https://jekyllrb.com/docs/frontmatter/) 开箱即用的支持:

``` yaml
---
title: Blogging Like a Hacker
lang: en-US
---
```

这些数据可以在当前 markdown 的正文，或者是任意的自定义或主题组件中使用。

想了解更多，请移步 [Front Matter](https://vuepress.vuejs.org/zh/guide/frontmatter.html)。

vuepress-theme-reco 主题提供一个完整的 Front Matter 案例：

``` yaml
---
title: 烤鸭的做法   # 文章标题，放弃通过一级目录定义标题的方式，改在 Front Matter 中定义。
date: 2019-08-08  # 文章创建日期，格式 2019-08-08 或 2019-08-08 08:08:08。
sidebar: 'auto'   # 是否开启侧边栏。
categories:       # 所属分类。
 - 烹饪
 - 爱好
tags:             # 所属标签。
 - 烤
 - 鸭子
keys:             # 文章加密密码。
 - '123456'
publish: false    # 文章是否发布。
---
```


### GitHub 风格的表格

**输入**

```
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

**输出**

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

### Emoji

**输入**

```
:tada: :100:
```

**输出**

:tada: :100:

### 目录

**输入**

```
[[toc]]
```

**输出**

<!--lint disable no-shortcut-reference-link no-undefined-references-->

[[toc]]

<!--lint enable no-shortcut-reference-link no-undefined-references-->

目录（Table of Contents）的渲染可以通过  [`markdown.toc`](https://vuepress.vuejs.org/zh/config/#markdown-toc) 选项来配置。

### 自定义容器 <Badge text="默认主题"/>

**输入**

```
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::
```

**输出**

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous thing
:::

你也可以自定义块中的标题：

```
::: danger STOP
Danger zone, do not proceed
:::
```

::: danger STOP
Danger zone, do not proceed
:::

**参考:**

- [vuepress-plugin-container](https://vuepress.github.io/plugins/container/)

### 代码块中的语法高亮

VuePress 使用了 [Prism](https://prismjs.com/) 来为 markdown 中的代码块实现语法高亮。Prism 支持大量的编程语言，你需要做的只是在代码块的开始倒勾中附加一个有效的语言别名：

**输入**

````
``` js
export default {
  name: 'MyComponent',
  // ...
}
```
````

**输出**

``` js
export default {
  name: 'MyComponent',
  // ...
}
```

**输入**

````
``` html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```
````

**输出**

``` html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```

在 Prism 的网站上查看 [合法的语言列表](https://prismjs.com/#languages-list)。


### 代码块中的行高亮

**输入**

````
``` js {4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**输出**

``` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

### 行号

你可以通过配置来为每个代码块显示行号：

``` js
module.exports = {
  markdown: {
    lineNumbers: true
  }
}
```

<!-- TODO Support line numbers for specific fence block -->

- 示例:

<picture>
  <source srcset="/line-numbers-desktop.png" media="(min-width: 719px)">
  <img class="line-numbers-desktop-snap" alt="Image">
</picture>

<picture>
  <source srcset="/line-numbers-mobile.gif" media="(max-width: 719px)">
  <img class="line-numbers-mobile-snap" alt="Image">
</picture>

<style>
  @media screen and (min-width:  719px) {
    .line-numbers-mobile-snap {
       display: none;
    }
  }
  @media screen and (max-width:  719px) {
    .line-numbers-desktop-snap {
       display: none;
    }
    .line-numbers-mobile-snap {
      max-width: none!important;
      margin: 0 -1.5rem;
      width: 100vw;
    }
  }
</style>

### 导入代码段 <Badge text="beta" type="warn"/>

你可以通过下述的语法导入已经存在的文件中的代码段：

``` md
<<< @/filepath
```

它也支持 [行高亮](#代码块中的行高亮)：

``` md
<<< @/filepath{highlightLines}
```

**输入**

```
<<< @/docs/software/web/__tests__/snippet.js{2}
```

**输出**

<!--lint disable strong-marker-->

<<< @/docs/software/web/__tests__/snippet.js{2}

<!--lint enable strong-marker-->

::: tip 注意
由于代码段的导入将在 webpack 编译之前执行，因此你无法使用 webpack 中的路径别名，此处的 `@` 默认值是 `process.cwd()`。
:::

### 进阶配置

VuePress 使用 [markdown-it](https://github.com/markdown-it/markdown-it) 来渲染 Markdown，上述大多数的拓展也都是通过自定义的插件实现的。想要进一步的话，你可以通过 `.vuepress/config.js` 的 `markdown` 选项，来对当前的 `markdown-it` 实例做一些自定义的配置：

``` js
module.exports = {
  markdown: {
    // markdown-it-anchor 的选项
    anchor: { permalink: false },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2] },
    extendMarkdown: md => {
      // 使用更多的 markdown-it 插件!
      md.use(require('markdown-it-xxx'))
    }
  }
}
```
## 在 Markdown 中 使用 Vue

### 浏览器的 API 访问限制

当你在开发一个 VuePress 应用时，由于所有的页面在生成静态 HTML 时都需要通过 Node.js 服务端渲染，因此所有的 Vue 相关代码都应当遵循 [编写通用代码](https://ssr.vuejs.org/zh/universal.html) 的要求。简而言之，请确保只在 `beforeMount` 或者 `mounted` 访问浏览器 / DOM 的 API。

如果你正在使用，或者需要展示一个对于 SSR 不怎么友好的组件（比如包含了自定义指令），你可以将它们包裹在内置的 `<ClientOnly>` 组件中：

``` md
<ClientOnly>
  <NonSSRFriendlyComponent/>
</ClientOnly>
```

请注意，这并不能解决一些组件或库在**导入**时就试图访问浏览器 API 的问题 —— 如果需要使用这样的组件或库，你需要在合适的生命周期钩子中**动态导入**它们：

``` vue
<script>
export default {
  mounted () {
    import('./lib-that-access-window-on-import').then(module => {
      // use code
    })
  }
}
</script>
```

如果你的模块通过 `export default` 导出一个 Vue 组件，那么你可以动态注册它：

```vue
<template>
  <component v-if="dynamicComponent" :is="dynamicComponent"></component>
</template>
<script>
export default {
  data() {
    return {
      dynamicComponent: null
    }
  },
  mounted () {
    import('./lib-that-access-window-on-import').then(module => {
      this.dynamicComponent = module.default
    })
  }
}
</script>
```

**参考:**

- [Vue.js > 动态组件](https://cn.vuejs.org/v2/guide/components.html#动态组件)

### 模板语法

#### 插值

每一个 Markdown 文件将首先被编译成 HTML，接着作为一个 Vue 组件传入 `vue-loader`，这意味着你可以在文本中使用 Vue 风格的插值：

**Input**

``` md
{{ 1 + 1 }}
```

**Output**

<div class="language-text"><pre><code>{{ 1 + 1 }}</code></pre></div>

#### 指令

同样地，也可以使用指令:

**Input**

``` md
<span v-for="i in 3">{{ i }} </span>
```

**Output**

<div class="language-text"><pre><code><span v-for="i in 3">{{ i }} </span></code></pre></div>

#### 访问网站以及页面的数据

编译后的组件没有私有数据，但可以访问 [网站的元数据](https://vuepress.vuejs.org/zh/theme/writing-a-theme.html#网站和页面的元数据)，举例来说：

**Input**

``` md
{{ $page }}
```

**Output**

``` json
{
  "path": "/using-vue.html",
  "title": "Using Vue in Markdown",
  "frontmatter": {}
}
```

### Escaping

默认情况下，块级 (block) 的代码块将会被自动包裹在 `v-pre` 中。如果你想要在内联 (inline) 的代码块或者普通文本中显示原始的大括号，或者一些 Vue 特定的语法，你需要使用自定义容器 `v-pre` 来包裹：

**Input**

``` md
::: v-pre
`{{ This will be displayed as-is }}`
:::
```

**Output**

::: v-pre
`{{ This will be displayed as-is }}`
:::

### 使用组件

所有在 `.vuepress/components` 中找到的 `*.vue` 文件将会自动地被注册为全局的异步组件，如：

```
.
└─ .vuepress
   └─ components
      ├─ demo-1.vue
      ├─ OtherComponent.vue
      └─ Foo
         └─ Bar.vue
```

你可以直接使用这些组件在任意的 Markdown 文件中（组件名是通过文件名取到的）：

``` md
<demo-1/>
<OtherComponent/>
<Foo-Bar/>
```

<demo-1></demo-1>

<OtherComponent/>

<Foo-Bar/>

::: warning 重要！
请确保一个自定义组件的名字包含连接符或者是 PascalCase，否则，它将会被视为一个内联元素，并被包裹在一个 `<p>` 标签中，这将会导致 HTML 渲染紊乱，因为 HTML 标准规定， `<p>` 标签中不允许放置任何块级元素。
:::

#### 在标题中使用组件

你可以在标题中使用 Vue 组件，但是请留意以下两种方式的不同：

| Markdown | 输出的 HTML | 解析后的标题 |
|--------|-------------|----------------|
| <pre v-pre><code> # text &lt;Tag/&gt; </code></pre> | `<h1>text <Tag/></h1>` | `text` |
| <pre v-pre><code> # text \`&lt;Tag/&gt;\` </code></pre> | `<h1>text <code>&lt;Tag/&gt;</code></h1>` | `text <Tag/>` |

被 `<code>` 包装的 HTML 将按原样显示，只有未被包装的 HTML 才会被 Vue 解析。

::: tip
输出的 HTML 由 [markdown-it](https://github.com/markdown-it/markdown-it) 完成。而解析后的标题由 VuePress 完成，用于[侧边栏](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#侧边栏)以及文档的标题。
:::

### 使用预处理器

VuePress 对以下预处理器已经内置相关的 webpack 配置：`sass`、`scss`、`less`、`stylus` 和 `pug`。要使用它们你只需要在项目中安装对应的依赖即可。例如，要使用 `sass`，需要安装：

``` bash
yarn add -D sass-loader node-sass
```

然后你就可以在 Markdown 或是组件中使用如下代码：

``` vue
<style lang="sass">
  .title
    font-size: 20px
</style>
```

要在组件中使用 `<template lang="pug">`，则需要安装 `pug` 和 `pug-plain-loader`:

``` bash
yarn add -D pug pug-plain-loader
```

::: tip
需要指出的是，如果你是一个 `stylus` 用户，你并不需要在你的项目中安装 `stylus` 和 `stylus-loader`，因为 VuePress 已经内置了它们。

对于那些没有内置的预处理器，除了安装对应的依赖，你还需要 [拓展内部的 Webpack 配置](https://vuepress.vuejs.org/zh/config/#configurewebpack)。
:::


### 脚本和样式提升

有时，你可以只想在当前页面应用一些 JavaScript 或者 CSS，在这种情况下，你可以直接在 Markdown 文件中使用原生的 `<script>` 或者 `<style>` 标签，它们将会从编译后的 HTML 文件中提取出来，并作为生成的 Vue 单文件组件的 `<script>` 和 `<style>` 标签。

<p class="demo" :class="$style.example"></p>

<style module>
.example {
  color: #41b883;
}
</style>

<script>
export default {
  props: ['slot-key'],
  mounted () {
    document.querySelector(`.${this.$style.example}`)
      .textContent = '这个块是被内联的脚本渲染的，样式也采用了内联样式。'
  }
}
</script>

### 内置的组件

#### OutboundLink <Badge text="stable"/>

(<OutboundLink/>) 用来表明当前是一个外部链接。在 VuePress 中这个组件会紧跟在每一个外部链接后面。

#### ClientOnly <Badge text="stable"/>

参考 [浏览器的 API 访问限制](#浏览器的-api-访问限制)。

#### Content <Badge text="1.0.0+"/>

- **Props**:

  - `pageKey` - string, 要渲染的 [page](https://vuepress.vuejs.org/zh/guide/global-computed.html#page) 的 hash key, 默认值是当前页面的 key.
  - `slotKey` - string, 页面的 [markdown slot](https://vuepress.vuejs.org/zh/guide/markdown-slot.html) 的 key. 默认值是 [default slot](https://vuepress.vuejs.org/zh/guide/markdown-slot.html#default-slot-content).

- **Usage**：

指定一个指定页面的特定 slot 用于渲染，当你使用 [自定义布局](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#特定页面的自定义布局) 或者自定义主题时，这将非常有用。


``` vue
<Content/>
```

**参考:**

- [全局计算属性 > $page](https://vuepress.vuejs.org/zh/guide/global-computed.html#page)
- [Markdown 插槽](https://vuepress.vuejs.org/zh/guide/markdown-slot.html)
- [开发主题 > 获取渲染内容](https://vuepress.vuejs.org/zh/theme/writing-a-theme.html#获取渲染内容)


#### Badge <Badge text="beta" type="warn"/> <Badge text="0.10.1+"/> <Badge text="默认主题"/>

- **Props**:

  - `text` - string
  - `type` - string, 可选值： `"tip"|"warn"|"error"`，默认值是： `"tip"`
  - `vertical` - string, 可选值： `"top"|"middle"`，默认值是： `"top"`

- **Usage**:

你可以在标题中，使用这个组件来为某些 API 添加一些状态：

``` md
#### Badge <Badge text="beta" type="warn"/> <Badge text="0.10.1+"/> <Badge text="默认主题"/>
```

**参考:**

- [在标题中使用组件](#在标题中使用组件)