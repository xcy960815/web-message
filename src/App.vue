<template>
  <div class="web-message-demo">
    <div class="web-message-demo__header">
      <h1>web-message demo</h1>
      <p>用下面这些场景把消息组件多折腾几轮。</p>
    </div>

    <div class="web-message-demo__layout">
      <section class="demo-panel">
        <h2>快捷场景</h2>
        <div class="demo-grid">
          <button class="demo-button" @click="emitInfoMessage">默认消息</button>
          <button class="demo-button" @click="emitSuccessMessage">
            成功消息
          </button>
          <button class="demo-button" @click="emitWarningMessage">
            警告消息
          </button>
          <button class="demo-button" @click="emitErrorMessage">
            错误消息
          </button>
          <button class="demo-button" @click="emitMultilineMessage">
            换行消息
          </button>
          <button class="demo-button" @click="emitLongMessage">
            长文本消息
          </button>
          <button class="demo-button" @click="emitClosableMessage">
            带关闭按钮
          </button>
          <button class="demo-button" @click="emitStickyMessage">
            常驻消息
          </button>
          <button class="demo-button" @click="emitHoverStopMessage">
            悬停暂停
          </button>
          <button class="demo-button" @click="emitNoHoverStopMessage">
            悬停不停
          </button>
          <button class="demo-button" @click="emitBurstQueue">
            队列压力测试
          </button>
          <button class="demo-button" @click="emitMixedHeights">
            混合高度队列
          </button>
        </div>
      </section>

      <section class="demo-panel">
        <h2>位置测试</h2>
        <div class="demo-grid demo-grid--triplet">
          <button class="demo-button" @click="emitPositionMessage('left')">
            左侧
          </button>
          <button class="demo-button" @click="emitPositionMessage('center')">
            居中
          </button>
          <button class="demo-button" @click="emitPositionMessage('right')">
            右侧
          </button>
        </div>
      </section>

      <section class="demo-panel demo-panel--playground">
        <h2>自定义测试</h2>
        <div class="demo-form">
          <label class="demo-field">
            <span>消息文案</span>
            <textarea v-model="customMessage" rows="4" class="demo-textarea" />
          </label>

          <div class="demo-form__row">
            <label class="demo-field">
              <span>类型</span>
              <select v-model="customType" class="demo-select">
                <option value="info">info</option>
                <option value="success">success</option>
                <option value="warning">warning</option>
                <option value="error">error</option>
              </select>
            </label>

            <label class="demo-field">
              <span>位置</span>
              <select v-model="customPosition" class="demo-select">
                <option value="left">left</option>
                <option value="center">center</option>
                <option value="right">right</option>
              </select>
            </label>

            <label class="demo-field">
              <span>时长(ms)</span>
              <input
                v-model.number="customDuration"
                type="number"
                min="0"
                step="500"
                class="demo-input"
              />
            </label>
          </div>

          <div class="demo-form__row demo-form__row--toggles">
            <label class="demo-toggle">
              <input v-model="customHoverStop" type="checkbox" />
              <span>悬停暂停</span>
            </label>

            <label class="demo-toggle">
              <input v-model="customShowClose" type="checkbox" />
              <span>关闭按钮</span>
            </label>
          </div>

          <div class="demo-form__actions">
            <button
              class="demo-button demo-button--primary"
              @click="emitCustomMessage"
            >
              创建自定义消息
            </button>
            <button class="demo-button" @click="resetCustomForm">
              重置表单
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  MessageDuration,
  MessageOption,
  MessagePosition,
  MessageType,
  WebMessage,
} from './index'

const messageInstance = WebMessage.getInstance()

const customMessage = ref('这是一条可以自由配置的消息')
const customType = ref<NonNullable<MessageType>>('info')
const customPosition = ref<NonNullable<MessagePosition>>('center')
const customDuration = ref<MessageDuration>(2000)
const customHoverStop = ref(true)
const customShowClose = ref(false)

const createMessage = (options: MessageOption): void => {
  messageInstance.createMessage(options)
}

const emitInfoMessage = (): void => {
  createMessage({
    message: '创建一条默认消息',
    messageType: 'info',
    messageDuration: 2000,
    messageHoverStop: true,
  })
}

const emitSuccessMessage = (): void => {
  createMessage({
    message: '操作完成，数据已经更新',
    messageType: 'success',
    messageDuration: 2200,
    messageHoverStop: true,
  })
}

const emitWarningMessage = (): void => {
  createMessage({
    message: '剩余可用次数不多了，注意检查配额',
    messageType: 'warning',
    messageDuration: 2600,
    messageHoverStop: true,
    showClose: true,
  })
}

const emitErrorMessage = (): void => {
  createMessage({
    message: '请求失败，请稍后重试',
    messageType: 'error',
    messageDuration: 2800,
    messageHoverStop: true,
    showClose: true,
  })
}

const emitMultilineMessage = (): void => {
  createMessage({
    message: '创建一条换行消息\n创建一条换行消息\n创建一条换行消息',
    messageType: 'info',
    messageDuration: 2400,
    messageHoverStop: true,
  })
}

const emitLongMessage = (): void => {
  createMessage({
    message:
      '这是一条比较长的消息，用来测试长文本在固定宽度下的换行、关闭按钮布局，以及多条消息连续出现时的重排效果。',
    messageType: 'info',
    messageDuration: 3200,
    messageHoverStop: true,
    showClose: true,
  })
}

const emitClosableMessage = (): void => {
  createMessage({
    message: '这条消息带关闭按钮，你可以手动点掉它',
    messageType: 'success',
    messageDuration: 4000,
    messageHoverStop: true,
    showClose: true,
  })
}

const emitStickyMessage = (): void => {
  createMessage({
    message: '这条消息不会自动消失，只能手动关闭',
    messageType: 'warning',
    messageDuration: 0,
    messageHoverStop: true,
    showClose: true,
  })
}

const emitHoverStopMessage = (): void => {
  createMessage({
    message: '把鼠标移上来会暂停计时',
    messageType: 'info',
    messageDuration: 2500,
    messageHoverStop: true,
  })
}

const emitNoHoverStopMessage = (): void => {
  createMessage({
    message: '就算鼠标移上来也会继续消失',
    messageType: 'info',
    messageDuration: 2500,
    messageHoverStop: false,
  })
}

const emitPositionMessage = (position: NonNullable<MessagePosition>): void => {
  createMessage({
    message: `当前位置测试：${position}`,
    messageType: 'info',
    messagePosition: position,
    messageDuration: 2200,
    messageHoverStop: true,
  })
}

const emitBurstQueue = (): void => {
  const types: NonNullable<MessageType>[] = [
    'info',
    'success',
    'warning',
    'error',
  ]

  types.forEach((messageType, index) => {
    createMessage({
      message: `第 ${index + 1} 条 ${messageType} 消息`,
      messageType,
      messageDuration: 1200 + index * 500,
      messageHoverStop: true,
      showClose: index % 2 === 0,
    })
  })
}

const emitMixedHeights = (): void => {
  createMessage({
    message: '短消息',
    messageType: 'info',
    messageDuration: 2600,
    messageHoverStop: true,
  })

  createMessage({
    message:
      '第二条消息比较长一些，用来确认高矮不一的时候，下面的消息不会被遮住。',
    messageType: 'success',
    messageDuration: 3000,
    messageHoverStop: true,
  })

  createMessage({
    message: '第三条消息\n故意换成多行\n继续测一遍重排',
    messageType: 'warning',
    messageDuration: 3400,
    messageHoverStop: true,
    showClose: true,
  })
}

const emitCustomMessage = (): void => {
  createMessage({
    message: customMessage.value,
    messageType: customType.value,
    messagePosition: customPosition.value,
    messageDuration: Number(customDuration.value),
    messageHoverStop: customHoverStop.value,
    showClose: customShowClose.value,
  })
}

const resetCustomForm = (): void => {
  customMessage.value = '这是一条可以自由配置的消息'
  customType.value = 'info'
  customPosition.value = 'center'
  customDuration.value = 2000
  customHoverStop.value = true
  customShowClose.value = false
}
</script>

<style lang="less" scoped>
.web-message-demo {
  min-height: 100vh;
  padding: 32px;
  background: #f6f8fb;
  color: #243041;

  &__header {
    margin-bottom: 24px;

    h1 {
      margin: 0 0 8px;
      font-size: 28px;
      font-weight: 600;
    }

    p {
      margin: 0;
      color: #5f6b7a;
      line-height: 1.5;
    }
  }

  &__layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
    align-items: start;
  }
}

.demo-panel {
  background: #fff;
  border: 1px solid #d9e0ea;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(33, 52, 86, 0.08);

  h2 {
    margin: 0 0 16px;
    font-size: 18px;
    font-weight: 600;
  }

  &--playground {
    grid-column: 1 / -1;
  }
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  &--triplet {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.demo-button {
  min-height: 42px;
  padding: 10px 14px;
  border: 1px solid #ced7e3;
  border-radius: 8px;
  background: #fff;
  color: #243041;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

  &:hover {
    border-color: #8ea4c2;
    box-shadow: 0 6px 16px rgba(40, 67, 110, 0.12);
  }

  &--primary {
    background: #2f6fed;
    border-color: #2f6fed;
    color: #fff;
  }
}

.demo-form {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;

    &--toggles {
      grid-template-columns: repeat(2, minmax(0, 180px));
    }
  }

  &__actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
}

.demo-field {
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    font-size: 13px;
    color: #5b6775;
  }
}

.demo-input,
.demo-select,
.demo-textarea {
  width: 100%;
  border: 1px solid #ced7e3;
  border-radius: 8px;
  padding: 10px 12px;
  font: inherit;
  color: #243041;
  background: #fff;
  box-sizing: border-box;
}

.demo-textarea {
  resize: vertical;
  min-height: 96px;
}

.demo-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  color: #243041;

  input {
    margin: 0;
  }
}

@media (max-width: 900px) {
  .web-message-demo {
    padding: 20px;

    &__layout {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  .demo-grid,
  .demo-grid--triplet,
  .demo-form__row,
  .demo-form__row--toggles {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
