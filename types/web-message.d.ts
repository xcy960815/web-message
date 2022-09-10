export declare type MessageDuration = number;

export declare type messageHoverStop = boolean;

export declare interface MessageOption {
    message: string;
    messageType?: MessageType;
    messagePosition?: MessagePosition;
    messageDuration?: MessageDuration;
    messageHoverStop?: messageHoverStop;
    showClose?: showClose;
    mouseenterEvent?: mouseenterEvent;
    mouseleaveEvent?: mouseleaveEvent;
}

export declare type MessagePosition = 'left' | "center" | 'right' | undefined;

export declare type MessageType = 'info' | 'warning' | 'error' | 'success' | undefined;

export declare type mouseenterEvent = EventListener;

export declare type mouseleaveEvent = EventListener;

export declare type showClose = boolean;

export declare class WebMessage {
    private messageQueue;
    private bodyElement;
    private id;
    private maxZindex;
    private timeId;
    static instance: WebMessage;
    constructor();
    static getInstance(): WebMessage;
    /**
     * @desc 获取当前页面最大z-index元素值
     * @returns {number}
     */
    private getMaxZIndex;
    /**
     * 给dom节点添加自定义属性
     * @param {HTMLElement} dom
     * @param {string} attribute
     * @param {string} attributeValue
     */
    private setElementAttribute;
    /**
     * 获取dom节点自定义属性
     * @param {HTMLElement} dom
     * @param {string} attribute
     * @returns {string}
     */
    private getElementAttribute;
    /**
     * @desc 校验message配置 兼容不不符合要求的配置
     * @param {MessageOption} messageOption
     * @returns {MessageOption}
     */
    private checkMessageOptions;
    private createButtonElement;
    /**
     * @desc 创建 message 文本内容节点
     * @param { HTMLDivElement } messageboxElement
     * @param { MessageOption } messageOption
     * @returns void
     */
    private createMessageContentElement;
    /**
     * @desc 创建message组件外层组件节点
     * @param {MessageOption} messageOption
     * @returns HTMLDivElement
     */
    private createMessageboxElement;
    /**
     * @desc 为外层message节点添加鼠标滑入滑出事件
     * @param {HTMLDivElement} messageboxElement
     * @returns void
     */
    private addEventForMessageElement;
    /**
     * @desc 循环更新 message 节点的样式  移动上去
     * @param {number} startIndex
     * @returns void
     */
    private updateMessageElementStyle;
    /**
     * @desc 设置当前创建的 message 节点的 zIndex、top
     * @decs 从上往下排 第一个出现的在第一行 第二个出现的在第二行 以此类推... 这样做的好处是 只处理最后一次出现的message节点就行了 不需要考虑之前出现的message节点
     * @param {HTMLDivElement} messageboxElement
     * @returns void
     */
    private setCurrentMessageboxElementStyle;
    /**
     * @desc  移除 message 节点
     * @param {HTMLDivElement} messageboxElement
     * @param {number} targetId
     * @returns void
     */
    private updateMessageQueue;
    /**
     * @desc 创建 message 组件
     * @param {MessageOption} messageOption
     * @returns void
     */
    createMessage(messageOption: MessageOption): void;
}

export { }
