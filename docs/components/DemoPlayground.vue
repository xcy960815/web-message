<template>
  <div class="demo-playground">
    <div class="demo-playground__header">
      <h2>Demo Playground</h2>
      <p>Try shortcut scenes or configure your own message.</p>
    </div>

    <div class="demo-playground__layout">
      <section class="demo-panel">
        <h3>Quick Scenes</h3>
        <div class="demo-grid">
          <button class="demo-button" @click="emitInfoMessage">Default</button>
          <button class="demo-button" @click="emitSuccessMessage">
            Success
          </button>
          <button class="demo-button" @click="emitWarningMessage">
            Warning
          </button>
          <button class="demo-button" @click="emitErrorMessage">Error</button>
          <button class="demo-button" @click="emitMultilineMessage">
            Multiline
          </button>
          <button class="demo-button" @click="emitLongMessage">
            Long Text
          </button>
          <button class="demo-button" @click="emitClosableMessage">
            Closable
          </button>
          <button class="demo-button" @click="emitStickyMessage">Sticky</button>
          <button class="demo-button" @click="emitHoverStopMessage">
            Hover Pause
          </button>
          <button class="demo-button" @click="emitNoHoverStopMessage">
            No Pause
          </button>
          <button class="demo-button" @click="emitBurstQueue">
            Queue Burst
          </button>
          <button class="demo-button" @click="emitMixedHeights">
            Mixed Heights
          </button>
        </div>
      </section>

      <section class="demo-panel">
        <h3>Position Test</h3>
        <div class="demo-grid demo-grid--triplet">
          <button class="demo-button" @click="emitPositionMessage('left')">
            Left
          </button>
          <button class="demo-button" @click="emitPositionMessage('center')">
            Center
          </button>
          <button class="demo-button" @click="emitPositionMessage('right')">
            Right
          </button>
        </div>
      </section>

      <section class="demo-panel demo-panel--full">
        <h3>Custom Message</h3>
        <div class="demo-form">
          <label class="demo-field">
            <span>Message</span>
            <textarea v-model="customMessage" rows="4" class="demo-textarea" />
          </label>

          <div class="demo-form__row">
            <label class="demo-field">
              <span>Type</span>
              <select v-model="customType" class="demo-select">
                <option value="info">info</option>
                <option value="success">success</option>
                <option value="warning">warning</option>
                <option value="error">error</option>
              </select>
            </label>

            <label class="demo-field">
              <span>Position</span>
              <select v-model="customPosition" class="demo-select">
                <option value="left">left</option>
                <option value="center">center</option>
                <option value="right">right</option>
              </select>
            </label>

            <label class="demo-field">
              <span>Duration(ms)</span>
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
              <span>Hover pause</span>
            </label>

            <label class="demo-toggle">
              <input v-model="customShowClose" type="checkbox" />
              <span>Show close button</span>
            </label>
          </div>

          <div class="demo-form__actions">
            <button
              class="demo-button demo-button--primary"
              @click="emitCustomMessage"
            >
              Create Message
            </button>
            <button class="demo-button" @click="resetCustomForm">Reset</button>
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
} from '../../src'

const messageInstance = WebMessage.getInstance()

const customMessage = ref('This is a custom message')
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
    message: 'Default message created',
    messageType: 'info',
    messageDuration: 2000,
    messageHoverStop: true,
  })
}

const emitSuccessMessage = (): void => {
  createMessage({
    message: 'Operation completed successfully',
    messageType: 'success',
    messageDuration: 2200,
    messageHoverStop: true,
  })
}

const emitWarningMessage = (): void => {
  createMessage({
    message: 'Warning: check your remaining quota',
    messageType: 'warning',
    messageDuration: 2600,
    messageHoverStop: true,
    showClose: true,
  })
}

const emitErrorMessage = (): void => {
  createMessage({
    message: 'Request failed, please try again later',
    messageType: 'error',
    messageDuration: 2800,
    messageHoverStop: true,
    showClose: true,
  })
}

const emitMultilineMessage = (): void => {
  createMessage({
    message: 'A multiline message\nkeeps the queue clean\nwithout overlap.',
    messageType: 'info',
    messageDuration: 2400,
    messageHoverStop: true,
  })
}

const emitLongMessage = (): void => {
  createMessage({
    message:
      'This longer message helps verify text wrapping, spacing, close button layout, and vertical reflow when multiple messages are visible at the same time.',
    messageType: 'info',
    messageDuration: 3200,
    messageHoverStop: true,
    showClose: true,
  })
}

const emitClosableMessage = (): void => {
  createMessage({
    message: 'This message can be dismissed manually.',
    messageType: 'success',
    messageDuration: 4000,
    messageHoverStop: true,
    showClose: true,
  })
}

const emitStickyMessage = (): void => {
  createMessage({
    message: 'This sticky message stays until you close it.',
    messageType: 'warning',
    messageDuration: 0,
    messageHoverStop: true,
    showClose: true,
  })
}

const emitHoverStopMessage = (): void => {
  createMessage({
    message: 'Hover me to pause the timer.',
    messageType: 'info',
    messageDuration: 2500,
    messageHoverStop: true,
  })
}

const emitNoHoverStopMessage = (): void => {
  createMessage({
    message: 'This one keeps dismissing even while hovered.',
    messageType: 'info',
    messageDuration: 2500,
    messageHoverStop: false,
  })
}

const emitPositionMessage = (position: NonNullable<MessagePosition>): void => {
  createMessage({
    message: `Position test: ${position}`,
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
      message: `Queue item ${index + 1}: ${messageType}`,
      messageType,
      messageDuration: 1200 + index * 500,
      messageHoverStop: true,
      showClose: index % 2 === 0,
    })
  })
}

const emitMixedHeights = (): void => {
  createMessage({
    message: 'Short message',
    messageType: 'info',
    messageDuration: 2600,
    messageHoverStop: true,
  })

  createMessage({
    message:
      'The second message is intentionally longer so you can verify reflow when message heights are different.',
    messageType: 'success',
    messageDuration: 3000,
    messageHoverStop: true,
  })

  createMessage({
    message:
      'Third message\nwith explicit line breaks\nto test stack spacing again.',
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
  customMessage.value = 'This is a custom message'
  customType.value = 'info'
  customPosition.value = 'center'
  customDuration.value = 2000
  customHoverStop.value = true
  customShowClose.value = false
}
</script>

<style scoped>
.demo-playground {
  background: #f6f8fb;
  border: 1px solid #dbe3ef;
  border-radius: 8px;
  padding: 24px;
}

.demo-playground__header {
  margin-bottom: 20px;
}

.demo-playground__header h2 {
  margin: 0 0 8px;
  font-size: 24px;
}

.demo-playground__header p {
  margin: 0;
  color: #5f6b7a;
}

.demo-playground__layout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.demo-panel {
  background: #fff;
  border: 1px solid #d9e0ea;
  border-radius: 8px;
  padding: 20px;
}

.demo-panel h3 {
  margin: 0 0 16px;
  font-size: 18px;
}

.demo-panel--full {
  grid-column: 1 / -1;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.demo-grid--triplet {
  grid-template-columns: repeat(3, minmax(0, 1fr));
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
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.demo-button:hover {
  border-color: #8ea4c2;
  box-shadow: 0 6px 16px rgba(40, 67, 110, 0.12);
}

.demo-button--primary {
  background: #2f6fed;
  border-color: #2f6fed;
  color: #fff;
}

.demo-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.demo-form__row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.demo-form__row--toggles {
  grid-template-columns: repeat(2, minmax(0, 180px));
}

.demo-form__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.demo-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.demo-field span {
  font-size: 13px;
  color: #5b6775;
}

.demo-input,
.demo-select,
.demo-textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ced7e3;
  border-radius: 8px;
  padding: 10px 12px;
  font: inherit;
  color: #243041;
  background: #fff;
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
}

.demo-toggle input {
  margin: 0;
}

@media (max-width: 900px) {
  .demo-playground__layout,
  .demo-grid,
  .demo-grid--triplet,
  .demo-form__row,
  .demo-form__row--toggles {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
