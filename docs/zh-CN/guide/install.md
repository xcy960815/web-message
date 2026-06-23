# 安装

## 安装依赖

::: code-group

```bash [pnpm]
pnpm add web-message vue
```

```bash [npm]
npm install web-message vue
```

```bash [yarn]
yarn add web-message vue
```

:::

## 快速开始

先引入库和样式文件：

```ts
import { WebMessage } from 'web-message'
import 'web-message/style.css'

const message = WebMessage.getInstance()

message.createMessage({
  message: '保存成功',
  messageType: 'success',
  messageDuration: 2000,
  messagePosition: 'center',
  messageHoverStop: true,
  showClose: true,
})
```

## 在非 Vue 项目中使用

虽然 `web-message` 内部用了 Vue，但对外暴露的是普通 JavaScript API。

也就是说，只要满足下面几点，它就能在其他浏览器端技术栈里用：

1. 你的构建工具能正常解析 `vue`
2. 你显式引入了样式文件
3. 代码运行在浏览器环境中

```ts
import { WebMessage } from 'web-message'
import 'web-message/style.css'

document.querySelector('#save')?.addEventListener('click', () => {
  WebMessage.getInstance().createMessage({
    message: '保存成功',
    messageType: 'success',
  })
})
```

## CDN / UMD

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/web-message/dist/web-message.css"
/>
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
<script src="https://unpkg.com/web-message/dist/web-message.umd.min.js"></script>
<script>
  const message = window.WebMessage.WebMessage.getInstance()

  message.createMessage({
    message: 'Hello from UMD',
    messageType: 'info',
  })
</script>
```

## 运行边界

- `web-message` 适用于浏览器端使用。
- 它不能在纯 Node.js 运行时里直接显示消息。
- 如果你在 SSR 项目里使用，导入通常没问题，但 `createMessage()` 需要只在客户端执行。
