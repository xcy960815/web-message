export type MessageType = 'info' | 'warning' | 'error' | 'success' | undefined
export type MessagePosition = 'left' | 'center' | 'right' | undefined
export type MessageDuration = number
export type MessageHoverStop = boolean
export type ShowClose = boolean
export type MouseenterEvent = EventListener
export type MouseleaveEvent = EventListener

// Backward-compatible aliases for the original public API.
export type messageHoverStop = MessageHoverStop
export type showClose = ShowClose
export type mouseenterEvent = MouseenterEvent
export type mouseleaveEvent = MouseleaveEvent

export interface MessageOption {
  message: string
  messageType?: MessageType
  messagePosition?: MessagePosition
  messageDuration?: MessageDuration
  messageHoverStop?: MessageHoverStop
  showClose?: ShowClose
  mouseenterEvent?: MouseenterEvent
  mouseleaveEvent?: MouseleaveEvent
}

export interface NormalizedMessageOption {
  message: string
  messageType: NonNullable<MessageType>
  messagePosition: NonNullable<MessagePosition>
  messageDuration: MessageDuration
  messageHoverStop: MessageHoverStop
  showClose: ShowClose
  mouseenterEvent?: MouseenterEvent
  mouseleaveEvent?: MouseleaveEvent
}

export interface InternalMessage extends NormalizedMessageOption {
  id: number
  isVisible: boolean
  isLeaving: boolean
  offsetTop: number
  zIndex: number
  timerId: number | null
}
