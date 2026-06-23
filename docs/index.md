---
layout: home

hero:
  name: web-message
  text: Browser-side message/toast library
  tagline: Lightweight message prompts with a plain JavaScript API, queue management, multiple positions, and mixed-height reflow support.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/install
    - theme: alt
      text: Try Demo
      link: /guide/demo

features:
  - title: Plain JS API
    details: Use the singleton message manager from JavaScript, TypeScript, Vue, React, or other browser projects.
  - title: Queue + Reflow
    details: Multiple messages stack cleanly and automatically reflow even when message heights differ.
  - title: Practical Controls
    details: Support for message types, positions, auto-dismiss, hover pause, and close buttons.
---

## Why this library

`web-message` is meant for browser-side message prompts with a small and direct API surface:

- create messages from anywhere with `WebMessage.getInstance()`
- keep installation simple
- avoid overlap when messages have different heights or multiline content
- ship ready-to-use CSS and TypeScript definitions

## Runtime notes

- This is a browser-side library.
- It can be used in non-Vue projects, but Vue 3 is still required at runtime because the renderer is built on Vue.
- In SSR applications, call `createMessage()` only on the client side.

## Next steps

- [Install and quick start](/guide/install)
- [API reference](/guide/api)
- [Online demo playground](/guide/demo)
