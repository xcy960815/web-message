export declare class Message {
    private messageQueue;
    private bodyElement;
    private id;
    private maxZindex;
    private timeId;
    constructor();
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
    private setDomAttribute;
    /**
     * 获取dom节点自定义属性
     * @param {HTMLElement} dom
     * @param {string} attribute
     * @returns {string}
     */
    private getDomAttribute;
    /**
     * @desc 校验message配置 不符合要求 不会生成message组件
     * @param {MessageOptions} messageOptions
     * @returns boolean
     */
    private checkMessageOptions;
    /**
     * @desc 创建 message 文本内容节点
     * @param { HTMLDivElement } messageboxDom
     * @param { MessageOptions } messageOption
     * @returns void
     */
    private createMessageContentDom;
    /**
     * @desc 创建message组件外层组件节点
     * @param {MessageOptions} messageOptions
     * @returns HTMLDivElement
     */
    private createMessageboxDom;
    /**
     * @desc 为外层message节点添加鼠标滑入滑出事件
     * @param {HTMLDivElement} messageboxDom
     * @returns void
     */
    private addEventForMessageDom;
    /**
     * @desc 创建 message 组件
     * @param {MessageOptions} messageOptions
     * @returns void
     */
    createMessage(messageOptions: MessageOptions): void;
    /**
     * @desc 循环更新 message 节点的样式  移动上去
     * @param {number} startIndex
     * @returns void
     */
    private updateMessageDomStyle;
    /**
     * @desc 设置当前创建的 message 节点的 zIndex、top
     * @decs 从上往下排 第一个出现的在第一行 第二个出现的在第二行 以此类推... 这样做的好处是 只处理最后一次出现的message节点就行了 不需要考虑之前出现的message节点
     * @param {HTMLDivElement} messageboxDom
     * @returns void
     */
    private setCurrentMessageboxDomStyle;
    /**
     * @desc  移除 message 节点
     * @param {HTMLDivElement} messageboxDom
     * @param {number} targetId
     * @returns void
     */
    private removeMessage;
}

export declare type MessageDuration = number;

export declare interface MessageOptions {
    message: string;
    messageType?: MessageType;
    messagePosition?: MessagePosition;
    messageDuration?: MessageDuration;
    showClose?: boolean;
}

export declare type MessagePosition = 'left' | "center" | 'right' | undefined;

export declare type MessageType = 'info' | 'warning' | 'error' | 'success' | undefined;

export { }
