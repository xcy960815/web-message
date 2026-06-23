# API

## `WebMessage.getInstance()`

返回单例消息管理器。

```ts
import { WebMessage } from 'web-message'

const message = WebMessage.getInstance()
```

## `createMessage(options)`

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
| `messageHoverStop` | `boolean`                                     | `false`     | 鼠标悬停时暂停自动消失                  |
| `showClose`        | `boolean`                                     | `false`     | 是否显示关闭按钮                        |
| `mouseenterEvent`  | `EventListener`                               | `undefined` | 鼠标移入时触发的回调                    |
| `mouseleaveEvent`  | `EventListener`                               | `undefined` | 鼠标移出时触发的回调                    |

## 示例

```ts
import { WebMessage } from 'web-message'
import 'web-message/style.css'

const message = WebMessage.getInstance()

message.createMessage({
  message: '资料更新成功',
  messageType: 'success',
  messageDuration: 1800,
  messagePosition: 'right',
  messageHoverStop: true,
  showClose: true,
})
```

## 行为说明

- 消息会按照创建顺序进入队列。
- 不同高度的消息会自动重排。
- `messageDuration: 0` 会创建常驻消息。
- 当 `messageHoverStop` 为 `true` 时，鼠标悬停会暂停自动消失计时。

## 发布产物

- `dist/web-message.es.js`
- `dist/web-message.umd.js`
- `dist/web-message.umd.min.js`
- `dist/web-message.css`
- `types/web-message.d.ts`
