import './web-message.css'

import {
  App,
  PropType,
  createApp,
  defineComponent,
  h,
  nextTick,
  reactive,
} from 'vue'
import type {
  InternalMessage,
  MessageOption,
  NormalizedMessageOption,
} from '../types'

const MESSAGE_GAP = 12
const MESSAGE_START_TOP = 20
const MESSAGE_Z_INDEX_OFFSET = 1000
const MESSAGE_Z_INDEX_STEP = 10
const MESSAGE_LEAVE_DURATION = 400
const MESSAGE_FALLBACK_HEIGHT = 56

const MessageContainer = defineComponent({
  name: 'WebMessageContainer',
  props: {
    messages: {
      type: Array as PropType<InternalMessage[]>,
      required: true,
    },
  },
  emits: ['close', 'mouseenter', 'mouseleave'],
  setup(props, { emit }) {
    return () =>
      h(
        'div',
        { class: 'web-message-container' },
        props.messages.map((message: InternalMessage) =>
          h(
            'div',
            {
              key: message.id,
              'data-message-id': String(message.id),
              class: [
                'web-message',
                `web-message--${message.messageType}`,
                `web-message--${message.messagePosition}`,
                {
                  'web-message--enter': message.isVisible && !message.isLeaving,
                  'web-message--leave': message.isLeaving,
                },
              ],
              style: {
                top: `${message.offsetTop}px`,
                zIndex: String(message.zIndex),
              },
              onMouseenter: (event: MouseEvent) =>
                emit('mouseenter', message.id, event),
              onMouseleave: (event: MouseEvent) =>
                emit('mouseleave', message.id, event),
            },
            [
              h('p', { class: 'web-message__content' }, message.message),
              message.showClose
                ? h(
                    'button',
                    {
                      type: 'button',
                      class: 'web-message__close',
                      'aria-label': 'Close message',
                      onClick: () => emit('close', message.id),
                    },
                    'x',
                  )
                : null,
            ],
          ),
        ),
      )
  },
})

export class WebMessage {
  private static instance: WebMessage

  private readonly state = reactive({
    messages: [] as InternalMessage[],
  })

  private app: App<Element> | null = null

  private bodyElement: HTMLBodyElement | null = null

  private hostElement: HTMLDivElement | null = null

  private id: number = 0

  private maxZindex: number = 0

  private reflowFrameId: number | null = null

  private readonly handleWindowLoad = (): void => {
    this.maxZindex = this.getMaxZIndex()
    this.scheduleReflow()
  }

  private readonly handleWindowResize = (): void => {
    this.scheduleReflow()
  }

  constructor() {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    this.ensureMounted()
    this.maxZindex = this.getMaxZIndex()
    window.addEventListener('load', this.handleWindowLoad)
    window.addEventListener('resize', this.handleWindowResize)
  }

  static getInstance(): WebMessage {
    if (!WebMessage.instance) {
      WebMessage.instance = new WebMessage()
    }
    return WebMessage.instance
  }

  public createMessage(messageOption: MessageOption): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return

    const normalizedOption = this.checkMessageOptions(messageOption)
    this.ensureMounted()
    this.maxZindex = this.getMaxZIndex()
    this.id += 1

    const currentMessage: InternalMessage = {
      ...normalizedOption,
      id: this.id,
      isVisible: false,
      isLeaving: false,
      offsetTop: 0,
      zIndex: this.maxZindex + MESSAGE_Z_INDEX_OFFSET,
      timerId: null,
    }

    this.state.messages.push(currentMessage)
    this.scheduleReflow()

    window.requestAnimationFrame(() => {
      const targetMessage = this.findMessageById(currentMessage.id)
      if (targetMessage && !targetMessage.isLeaving) {
        targetMessage.isVisible = true
      }
      this.scheduleReflow()
    })

    if (currentMessage.messageDuration !== 0) {
      this.startRemoveTimer(currentMessage)
    }
  }

  private ensureMounted(): void {
    if (this.app || typeof document === 'undefined') return

    this.bodyElement = document.querySelector('body')
    if (!this.bodyElement) return

    this.hostElement = document.createElement('div')
    this.hostElement.className = 'web-message-host'
    this.bodyElement.appendChild(this.hostElement)

    const instance = this
    const rootComponent = defineComponent({
      name: 'WebMessageRoot',
      setup() {
        return () =>
          h(MessageContainer, {
            messages: instance.state.messages,
            onClose: (id: number) => instance.removeMessageById(id),
            onMouseenter: (id: number, event: MouseEvent) =>
              instance.handleMouseenter(id, event),
            onMouseleave: (id: number, event: MouseEvent) =>
              instance.handleMouseleave(id, event),
          })
      },
    })

    this.app = createApp(rootComponent)
    this.app.mount(this.hostElement)
  }

  private getMaxZIndex(): number {
    if (typeof document === 'undefined' || typeof window === 'undefined')
      return 0

    return Array.from(document.querySelectorAll('*')).reduce(
      (maxZIndex: number, element: Element) => {
        if (!(element instanceof HTMLElement)) return maxZIndex
        if (element.closest('.web-message-host')) return maxZIndex

        const zIndex = Number(window.getComputedStyle(element).zIndex)
        return Number.isNaN(zIndex) ? maxZIndex : Math.max(maxZIndex, zIndex)
      },
      0,
    )
  }

  private checkMessageOptions(
    messageOption: MessageOption,
  ): NormalizedMessageOption {
    return {
      ...messageOption,
      message: messageOption.message || '',
      messageType: messageOption.messageType || 'info',
      messagePosition: messageOption.messagePosition || 'center',
      messageDuration:
        typeof messageOption.messageDuration === 'number'
          ? messageOption.messageDuration
          : 2000,
      messageHoverStop: messageOption.messageHoverStop === true,
      showClose: messageOption.showClose === true,
    }
  }

  private findMessageById(id: number): InternalMessage | undefined {
    return this.state.messages.find(
      (message: InternalMessage) => message.id === id,
    )
  }

  private clearRemoveTimer(message: InternalMessage): void {
    if (message.timerId !== null) {
      window.clearTimeout(message.timerId)
      message.timerId = null
    }
  }

  private startRemoveTimer(message: InternalMessage): void {
    this.clearRemoveTimer(message)
    message.timerId = window.setTimeout(() => {
      this.removeMessageById(message.id)
    }, message.messageDuration)
  }

  private handleMouseenter(id: number, event: MouseEvent): void {
    const currentMessage = this.findMessageById(id)
    if (!currentMessage) return

    currentMessage.mouseenterEvent?.(event)
    if (currentMessage.messageHoverStop) {
      this.clearRemoveTimer(currentMessage)
    }
  }

  private handleMouseleave(id: number, event: MouseEvent): void {
    const currentMessage = this.findMessageById(id)
    if (!currentMessage || currentMessage.isLeaving) return

    currentMessage.mouseleaveEvent?.(event)
    if (
      currentMessage.messageHoverStop &&
      currentMessage.messageDuration !== 0
    ) {
      this.startRemoveTimer(currentMessage)
    }
  }

  private removeMessageById(id: number): void {
    const currentMessage = this.findMessageById(id)
    if (!currentMessage || currentMessage.isLeaving) return

    this.clearRemoveTimer(currentMessage)
    currentMessage.isLeaving = true
    currentMessage.isVisible = false
    this.scheduleReflow()

    window.setTimeout(() => {
      const targetIndex = this.state.messages.findIndex(
        (message: InternalMessage) => message.id === id,
      )
      if (targetIndex === -1) return

      this.state.messages.splice(targetIndex, 1)
      this.scheduleReflow()
    }, MESSAGE_LEAVE_DURATION)
  }

  private getMessageHeight(id: number): number {
    if (!this.hostElement) return MESSAGE_FALLBACK_HEIGHT

    const messageElement = this.hostElement.querySelector(
      `[data-message-id="${id}"]`,
    )
    if (!(messageElement instanceof HTMLElement)) return MESSAGE_FALLBACK_HEIGHT

    const { height } = messageElement.getBoundingClientRect()
    return height || MESSAGE_FALLBACK_HEIGHT
  }

  private scheduleReflow(): void {
    if (typeof window === 'undefined') return

    if (this.reflowFrameId !== null) {
      window.cancelAnimationFrame(this.reflowFrameId)
    }

    nextTick(() => {
      this.reflowFrameId = window.requestAnimationFrame(() => {
        this.reflowFrameId = null
        this.reflowMessages()
      })
    })
  }

  private reflowMessages(): void {
    let currentTop = MESSAGE_START_TOP

    this.state.messages.forEach((message: InternalMessage) => {
      if (message.isLeaving) return

      message.offsetTop = currentTop
      currentTop += this.getMessageHeight(message.id) + MESSAGE_GAP
    })

    let activeIndex = 0
    this.state.messages.forEach((message: InternalMessage) => {
      if (message.isLeaving) return

      message.zIndex =
        this.maxZindex +
        MESSAGE_Z_INDEX_OFFSET -
        activeIndex * MESSAGE_Z_INDEX_STEP
      activeIndex += 1
    })
  }
}
