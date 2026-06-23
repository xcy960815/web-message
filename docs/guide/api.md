# API

## `WebMessage.getInstance()`

Returns the singleton message manager.

```ts
import { WebMessage } from 'web-message'

const message = WebMessage.getInstance()
```

## `createMessage(options)`

Creates a message entry.

```ts
import type { MessageOption } from 'web-message'
```

| Option             | Type                                          | Default     | Description                                                             |
| ------------------ | --------------------------------------------- | ----------- | ----------------------------------------------------------------------- |
| `message`          | `string`                                      | `""`        | Message text                                                            |
| `messageType`      | `"info" \| "success" \| "warning" \| "error"` | `"info"`    | Message visual type                                                     |
| `messagePosition`  | `"left" \| "center" \| "right"`               | `"center"`  | Horizontal position                                                     |
| `messageDuration`  | `number`                                      | `2000`      | Auto-dismiss delay in milliseconds. Use `0` to keep the message visible |
| `messageHoverStop` | `boolean`                                     | `false`     | Pause auto-dismiss while hovering                                       |
| `showClose`        | `boolean`                                     | `false`     | Show a close button                                                     |
| `mouseenterEvent`  | `EventListener`                               | `undefined` | Callback fired when the mouse enters the message                        |
| `mouseleaveEvent`  | `EventListener`                               | `undefined` | Callback fired when the mouse leaves the message                        |

## Example

```ts
import { WebMessage } from 'web-message'
import 'web-message/style.css'

const message = WebMessage.getInstance()

message.createMessage({
  message: 'Profile updated',
  messageType: 'success',
  messageDuration: 1800,
  messagePosition: 'right',
  messageHoverStop: true,
  showClose: true,
})
```

## Behavior notes

- Messages are queued in insertion order.
- Messages with different heights reflow automatically.
- `messageDuration: 0` creates a sticky message.
- If `messageHoverStop` is `true`, hovering pauses the dismissal timer.

## Published artifacts

- `dist/web-message.es.js`
- `dist/web-message.umd.js`
- `dist/web-message.umd.min.js`
- `dist/web-message.css`
- `types/web-message.d.ts`
