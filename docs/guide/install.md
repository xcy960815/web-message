# Install

## Package install

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

## Quick start

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

## Use in non-Vue projects

Even though `web-message` uses Vue internally, the public API is plain JavaScript.

That means you can use it in other browser-based stacks as long as:

1. your bundler can resolve `vue`
2. you import the stylesheet
3. the code runs in the browser

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

## Runtime boundary

- `web-message` is intended for browser-side usage.
- It cannot display messages in a pure Node.js runtime.
- In SSR apps, import is usually fine, but `createMessage()` should only run on the client.
