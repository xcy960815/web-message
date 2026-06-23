---
layout: home

hero:
  name: web-message
  text: 浏览器端消息提示组件库
  tagline: 轻量、直接，提供普通 JavaScript API，支持队列管理、多位置展示，以及不同高度消息自动重排。
  actions:
    - theme: brand
      text: 快速开始
      link: /zh-CN/guide/install
    - theme: alt
      text: 在线体验
      link: /zh-CN/guide/demo

features:
  - title: 普通 JS API
    details: 用 `WebMessage.getInstance()` 即可在 JavaScript、TypeScript、Vue、React 等浏览器项目中调用。
  - title: 队列与重排
    details: 多条消息会自动堆叠，不同高度和多行内容也能自然重排，不会互相遮挡。
  - title: 实用控制项
    details: 支持消息类型、位置、自动消失、悬停暂停和关闭按钮。
---

## 为什么用它

`web-message` 想做的是一个足够轻、又足够顺手的浏览器端消息提示库：

- 通过 `WebMessage.getInstance()` 在任意地方创建消息
- 安装和接入都尽量简单
- 处理多条消息、多行消息和混合高度消息时不挡不乱
- 直接提供可用样式和 TypeScript 类型声明

## 运行时说明

- 这是一个浏览器端库。
- 它可以在非 Vue 项目中使用，但运行时仍然依赖 Vue 3。
- 如果你在 SSR 项目中使用，`createMessage()` 需要只在客户端调用。

## 下一步

- [安装与快速开始](/zh-CN/guide/install)
- [API 说明](/zh-CN/guide/api)
- [在线演示](/zh-CN/guide/demo)
