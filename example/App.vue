<template>
  <div class='web-message-demo'>
    <h3>web-message-demo</h3>
    <div class="web-message-box">
      <button class="web-message-button" @click="createMessage('info', '创建一条默认消息', 10000)">创建一条默认消息</button>
      <button class="web-message-button" @click="createMessage('success', '创建一条成功消息')">创建一条成功消息</button>
      <button class="web-message-button" @click="createMessage('warning', '创建一条警告消息')">创建一条警告消息</button>
      <button class="web-message-button" @click="createMessage('error', '创建一条错误消息')">创建一条错误消息</button>
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
    message,
    messageType,
    messageDuration
  })
}
// 创建多条消息
const createmanyLinesMessage = () => {
  createMessage('info', '创建一条默认消息', 4000)
  createMessage('success', '创建一条成功消息', 3000)
  createMessage('warning', '创建一条警告消息', 2000)
  createMessage('error', '创建一条错误消息', 1000)
}
</script>
<style lang='less' scoped>
.web-message-demo {
  padding: 1% 5%;
  z-index: 10000;

  .web-message-box {
    .web-message-button {
      margin-right: 5px;
    }
  }
}
</style>