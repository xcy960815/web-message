<template>
  <div class="web-message-demo">
    <h3>web-message-demo</h3>
    <div class="web-message-box">
      <button
        class="web-message-button"
        @click="createMessage('info', newLineMessage, 1000)"
      >创建一条换行消息</button>
      <button
        class="web-message-button"
        @click="createMessage('info', defaultMessage, 1000)"
      >创建一条默认消息</button>
      <button
        class="web-message-button"
        @click="createMessage('success', successMessage, 1000)"
      >创建一条成功消息</button>
      <button
        class="web-message-button"
        @click="createMessage('warning', warningMessage, 1000)"
      >创建一条警告消息</button>
      <button
        class="web-message-button"
        @click="createMessage('error', errorMessage, 1000)"
      >创建一条错误消息</button>
      <button class="web-message-button" @click="createSomeMessage">创建一条默认消息和一条成功消息</button>
      <button class="web-message-button" @click="createmanyLinesMessage">创建多条消息</button>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { WebMessage, MessageType, MessageDuration } from "web-message";
// 常规多例模式
// const messageInstance = new Message();
// 单例模式无论在哪里引用都是同一个实例 节省内存开销
const messageInstance = WebMessage.getInstance();
const newLineMessage = "创建一条换行消息\n";
const defaultMessage = `创建一条默认消息`;
const successMessage = "创建一条成功消息";
const warningMessage = "创建一条警告消息";
const errorMessage = "创建一条错误消息";
// 创建一条消息
const createMessage = (
  messageType: MessageType,
  message: string,
  messageDuration?: MessageDuration
) => {
  messageInstance.createMessage({
    message, // 要展示的消息 默认为 ""
    messageType, // 消息类型  默认为 "info"
    messageDuration, // 消息存在的时间 默认为 2000毫秒
    messageHoverStop: true // 鼠标hover上去是否停留在页面上 默认为 false
  });
};
// 创建一条默认消息和 一条成功消息
const createSomeMessage = () => {
  createMessage("info", "创建一条默认消息", 2000);
  createMessage("success", "创建一条成功消息", 3000);
};
// 创建多条消息
const createmanyLinesMessage = () => {
  createMessage("info", defaultMessage, 1000);
  createMessage("success", successMessage, 1000);
  createMessage("warning", warningMessage, 1000);
  createMessage("error", errorMessage, 1000);
  createMessage("info", "创建一条默认消息", 1000);
  createMessage("success", "创建一条成功消息", 1000);
  createMessage("warning", "创建一条警告消息", 1000);
  createMessage("error", "创建一条错误消息", 1000);
};
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