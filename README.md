### web-message 一款仿照element-ui操作逻辑 用js 开发的 message组件 

#### 设计初衷
 此库本来是自己封装的一个axios库所用的message组件，使用主流的element-ui的message组件 或者 antd-ui 的message组件 打包之后 提交太大，其他的原生message库样式又太难看，索性自己就封装了一个。此库没有别的功能就是一个message组件展示消息用的。



#### 安装
```shell
npm i web-message -S
```
or
```shell
yarn add web-message 
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
const messageInstance = new Message()
// 创建一条消息
const createMessage = (messageType: MessageType, message: string, messageDuration?: MessageDuration) => {
  messageInstance.createMessage({
    message, // 要展示的消息 默认为 ""
    messageType, // 消息类型  默认为 "info"
    messageDuration, // 消息存在的时间 默认为 2000毫秒
    hoverStop: true // 鼠标hover上去是否停留在页面上 默认为 false 
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


