type MessageType = 'info' | 'warning' | 'error' | 'success' | undefined;
type MessagePosition = 'left' | 'center' | 'right' | undefined;
type MessageDuration = number;
type MessageHoverStop = boolean;
type ShowClose = boolean;
type MouseenterEvent = EventListener;
type MouseleaveEvent = EventListener;
type messageHoverStop = MessageHoverStop;
type showClose = ShowClose;
type mouseenterEvent = MouseenterEvent;
type mouseleaveEvent = MouseleaveEvent;
interface MessageOption {
    message: string;
    messageType?: MessageType;
    messagePosition?: MessagePosition;
    messageDuration?: MessageDuration;
    messageHoverStop?: MessageHoverStop;
    showClose?: ShowClose;
    mouseenterEvent?: MouseenterEvent;
    mouseleaveEvent?: MouseleaveEvent;
}

declare class WebMessage {
    private static instance;
    private readonly state;
    private app;
    private bodyElement;
    private hostElement;
    private id;
    private maxZindex;
    private reflowFrameId;
    private readonly handleWindowLoad;
    private readonly handleWindowResize;
    constructor();
    static getInstance(): WebMessage;
    createMessage(messageOption: MessageOption): void;
    private ensureMounted;
    private getMaxZIndex;
    private checkMessageOptions;
    private findMessageById;
    private clearRemoveTimer;
    private startRemoveTimer;
    private handleMouseenter;
    private handleMouseleave;
    private removeMessageById;
    private getMessageHeight;
    private scheduleReflow;
    private reflowMessages;
}

export { WebMessage };
export type { MessageDuration, MessageHoverStop, MessageOption, MessagePosition, MessageType, MouseenterEvent, MouseleaveEvent, ShowClose, messageHoverStop, mouseenterEvent, mouseleaveEvent, showClose };
