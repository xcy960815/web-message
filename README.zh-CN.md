# web-message

[English README](./README.md)

`web-message` 是一个轻量级的 Web 消息提示库，对外提供的是普通 JavaScript API。

它并不要求你的业务项目本身必须使用 Vue 开发，但当前包内部使用了 Vue 3 作为渲染运行时。所以准确地说：

- 你可以在普通 JavaScript、TypeScript、Vue、React，或者其他浏览器项目里调用它
- 你的项目运行时需要提供 `vue@^3.2.13`，因为这是它的 `peerDependencies`

## 功能特性

- 四种消息类型：`info`、`success`、`warning`、`error`
- 三种位置：`left`、`center`、`right`
- 支持自动消失和自定义时长
- 支持鼠标悬停暂停
- 支持关闭按钮
- 支持多条消息队列管理
- 支持换行消息和不同高度消息的自动重排
- 内置 TypeScript 类型声明

## 安装

```bash
npm install web-message vue
```

```bash
pnpm add web-message vue
```

## 快速开始

先引入库本身和样式文件：

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

虽然内部用了 Vue 3，但对外接口就是普通 JS 调用，所以在非 Vue 项目里也可以使用。前提是：

1. 你的构建工具能够正常打包 `vue`
2. 你显式引入了样式文件
3. 代码运行在浏览器环境中

示例：

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

## CDN / UMD 用法

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

## API

### `WebMessage.getInstance()`

返回单例消息管理器。

### `createMessage(options)`

创建一条消息。

```ts
import type { MessageOption } from 'web-message'
```

| 参数               | 类型                                          | 默认值      | 说明                                    |
| ------------------ | --------------------------------------------- | ----------- | --------------------------------------- |
| `message`          | `string`                                      | `""`        | 消息文案                                |
| `messageType`      | `"info" \| "success" \| "warning" \| "error"` | `"info"`    | 消息类型                                |
| `messagePosition`  | `"left" \| "center" \| "right"`               | `"center"`  | 水平位置                                |
| `messageDuration`  | `number`                                      | `2000`      | 自动消失时长，单位毫秒。传 `0` 表示常驻 |
| `messageHoverStop` | `boolean`                                     | `false`     | 鼠标悬停时是否暂停自动消失              |
| `showClose`        | `boolean`                                     | `false`     | 是否显示关闭按钮                        |
| `mouseenterEvent`  | `EventListener`                               | `undefined` | 鼠标移入时触发的回调                    |
| `mouseleaveEvent`  | `EventListener`                               | `undefined` | 鼠标移出时触发的回调                    |

## 使用说明

- 这是一个浏览器端消息提示库，不适用于 Node.js 服务端环境
- 样式文件是单独产物，需要手动引入
- 多条不同高度的消息会自动重排，避免遮挡
- `messageDuration: 0` 会创建常驻消息，建议同时配合 `showClose: true`

## 本地开发

```bash
pnpm install
pnpm run dev
pnpm run check
pnpm run build
```

## 项目结构

- `src/components/web-message.ts`：核心逻辑与运行时渲染实现
- `src/components/web-message.css`：消息样式
- `src/index.ts`：库入口
- `src/App.vue`：本地调试用 demo 页面
- `rollup.config.js`：库构建和类型打包配置
- `vite.config.mts`：demo 开发配置

## License

[MIT](./LICENSE)
