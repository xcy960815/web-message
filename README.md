### web-message 
> 一款仿照element-ui操作逻辑,用js开发的message组件,支持message组件在页面停留。

#### 安装
```npm
npm i web-message -S
```


#### 使用方法（只是拿vue举例）

```html
<template>
  <div class='web-message-demo'>
    <h3>web-message-demo</h3>
    <div class="web-message-box">
      <button class="web-message-button" @click="createMessage('info', '创建一条默认消息', 1000)">创建一条默认消息</button>
      <button class="web-message-button" @click="createMessage('success', '创建一条成功消息', 1000)">创建一条成功消息</button>
      <button class="web-message-button" @click="createMessage('warning', '创建一条警告消息', 1000)">创建一条警告消息</button>
      <button class="web-message-button" @click="createMessage('error', '创建一条错误消息', 1000)">创建一条错误消息</button>
      <button class="web-message-button" @click="createmanyLinesMessage">创建多条消息</button>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { Message, MessageType, MessageDuration } from "web-message"
// 常规多例模式
// const messageInstance = new Message();
// 单例模式无论在哪里引用都是同一个实例 节省内存开销
const messageInstance = WebMessage.getInstance();
// 创建一条消息
const createMessage = (messageType: MessageType, message: string, messageDuration?: MessageDuration) => {
  messageInstance.createMessage({
    message, // 要展示的消息 默认为 ""
    messageType, // 消息类型  默认为 "info"
    messageDuration, // 消息存在的时间 默认为 2000毫秒
    messageHoverStop: true // 鼠标hover上去是否停留在页面上 默认为 false 
  })
}
// 创建多条消息
const createmanyLinesMessage = () => {
  createMessage('info', '创建一条默认消息', 1000)
  createMessage('success', '创建一条成功消息', 1000)
  createMessage('warning', '创建一条警告消息', 1000)
  createMessage('error', '创建一条错误消息', 1000)
}
</script>
<style lang='less' scoped>
.web-message-demo {
  padding: 1% 5%;
  z-index: 10000;

  .web-message-box {
    display: flex;
    flex-direction: column;
    width: 200px;

    .web-message-button {
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
}
</style>
```


