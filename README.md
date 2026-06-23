# web-message

[中文文档](./README.zh-CN.md)

`web-message` is a lightweight browser-side message/toast library with a plain JavaScript usage API.

It does not require your application itself to be written in Vue, but the package uses Vue 3 internally as its rendering runtime. In practice, that means:

- You can call it from plain JavaScript, TypeScript, Vue, React, or other browser-based projects.
- Your project must have `vue@^3.2.13` available, because it is a runtime peer dependency.
- It is not intended to run directly in a pure Node.js runtime.

## Features

- Four message types: `info`, `success`, `warning`, `error`
- Three positions: `left`, `center`, `right`
- Auto-dismiss with configurable duration
- Hover-to-pause support
- Optional close button
- Queue management for multiple messages
- Automatic vertical reflow for mixed-height and multi-line messages
- TypeScript definitions included

## Installation

```bash
npm install web-message vue
```

```bash
pnpm add web-message vue
```

## Quick Start

Import the library and stylesheet:

```ts
import { WebMessage } from 'web-message'
import 'web-message/style.css'

const message = WebMessage.getInstance()

message.createMessage({
  message: 'Saved successfully',
  messageType: 'success',
  messageDuration: 2000,
  messagePosition: 'center',
  messageHoverStop: true,
  showClose: true,
})
```

## Using It Outside Vue Apps

Even though the package uses Vue internally, the public API is just JavaScript.

That means you can call it in a non-Vue project as long as:

1. your build tool can bundle `vue`
2. you import the stylesheet
3. the code runs in a browser environment

Example in a plain TypeScript or JavaScript web app:

```ts
import { WebMessage } from 'web-message'
import 'web-message/style.css'

document.querySelector('#save')?.addEventListener('click', () => {
  WebMessage.getInstance().createMessage({
    message: 'Saved',
    messageType: 'success',
  })
})
```

## CDN / UMD Example

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

Returns the singleton message manager.

### `createMessage(options)`

Creates a message instance.

```ts
import type { MessageOption } from 'web-message'
```

| Option             | Type                                          | Default     | Description                                                                                   |
| ------------------ | --------------------------------------------- | ----------- | --------------------------------------------------------------------------------------------- |
| `message`          | `string`                                      | `""`        | Message text                                                                                  |
| `messageType`      | `"info" \| "success" \| "warning" \| "error"` | `"info"`    | Visual message type                                                                           |
| `messagePosition`  | `"left" \| "center" \| "right"`               | `"center"`  | Horizontal position                                                                           |
| `messageDuration`  | `number`                                      | `2000`      | Auto-dismiss delay in milliseconds. Use `0` to keep the message visible until manually closed |
| `messageHoverStop` | `boolean`                                     | `false`     | Pause auto-dismiss while hovering                                                             |
| `showClose`        | `boolean`                                     | `false`     | Show a close button                                                                           |
| `mouseenterEvent`  | `EventListener`                               | `undefined` | Callback invoked when the mouse enters the message                                            |
| `mouseleaveEvent`  | `EventListener`                               | `undefined` | Callback invoked when the mouse leaves the message                                            |

## Notes

- This package is intended for browser usage.
- It cannot display messages in a pure Node.js runtime because it depends on `window`, `document`, DOM mounting, and browser events.
- In SSR applications, import is usually fine, but `createMessage()` should only be called on the client side.
- The stylesheet is shipped separately and should be imported explicitly.
- Multiple messages with different heights are reflowed automatically.
- `messageDuration: 0` creates a sticky message that must be closed manually if `showClose` is enabled.

## Build Artifacts

The published package currently includes:

- `dist/web-message.es.js`: ESM build for modern bundlers
- `dist/web-message.umd.js`: UMD build for script-tag or legacy integration
- `dist/web-message.umd.min.js`: minified UMD build
- `dist/web-message.css`: stylesheet

Source maps and CommonJS output are intentionally not published.

## Development

```bash
pnpm install
pnpm run dev
pnpm run check
pnpm run build
```

## Project Structure

- `src/components/web-message.ts`: core message logic and runtime renderer
- `src/components/web-message.css`: component styles
- `src/index.ts`: library entry
- `src/App.vue`: local demo playground
- `rollup.config.js`: Rollup build for library bundles and bundled declarations
- `vite.config.mts`: Vite config for the demo app

## License

[MIT](./LICENSE)
