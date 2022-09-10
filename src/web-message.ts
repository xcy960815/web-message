// 引入message 样式
import './web-message.css'
export type MessageType = 'info' | 'warning' | 'error' | 'success' | undefined
export type MessagePosition = 'left' | "center" | 'right' | undefined
export type MessageDuration = number
export type messageHoverStop = boolean
export type showClose = boolean
export type mouseenterEvent = EventListener;
export type mouseleaveEvent = EventListener;
export interface MessageOption {
    message: string;
    messageType?: MessageType
    messagePosition?: MessagePosition
    messageDuration?: MessageDuration
    messageHoverStop?: messageHoverStop
    showClose?: showClose;
    mouseenterEvent?: mouseenterEvent;
    mouseleaveEvent?: mouseleaveEvent;
}

interface MessageQueueOption {
    messageboxElement: HTMLDivElement;
    id: number,
    mouseenterEvent?: mouseenterEvent;
    mouseleaveEvent?: mouseleaveEvent;
}
export class WebMessage {
    // 消息队列
    private messageQueue: Array<MessageQueueOption> = []

    private bodyElement: HTMLBodyElement | null = document.querySelector('body')

    private id: number = 0

    private maxZindex: number = 0

    private timeId: number = 0

    static instance: WebMessage

    constructor() {
        // 不使用 window.onload 会只查找 原生节点里面的 z-index
        window.onload = () => {
            this.maxZindex = this.getMaxZIndex()
        }
    }

    // 单例模式
    static getInstance(): WebMessage {
        if (!WebMessage.instance) {
            WebMessage.instance = new WebMessage()
        }
        return WebMessage.instance
    }

    /** 
     * @desc 获取当前页面最大z-index元素值
     * @returns {number}
     */
    private getMaxZIndex(): number {
        return Array.from(document.querySelectorAll("*")).reduce((maxZIndex: number, element: Element) => Math.max(maxZIndex, +window.getComputedStyle(element).zIndex || 0), 0)
    }

    /**
     * 给dom节点添加自定义属性
     * @param {HTMLElement} dom 
     * @param {string} attribute 
     * @param {string} attributeValue 
     */
    private setElementAttribute(dom: HTMLElement, attribute: string, attributeValue: string): void {
        dom.setAttribute(attribute, attributeValue)
    }

    /**
     * 获取dom节点自定义属性
     * @param {HTMLElement} dom 
     * @param {string} attribute 
     * @returns {string}
     */
    private getElementAttribute(dom: HTMLElement, attribute: string): string {
        return dom.getAttribute(attribute)!
    }

    /**
     * @desc 校验message配置 兼容不不符合要求的配置
     * @param {MessageOption} messageOption 
     * @returns {MessageOption}
     */
    private checkMessageOptions(messageOption: MessageOption): MessageOption {
        return {
            ...messageOption,
            message: messageOption.message ? messageOption.message : "",
            messageType: messageOption.messageType ? messageOption.messageType : "info",
            messagePosition: messageOption.messagePosition ? messageOption.messagePosition : "left",
            messageDuration: messageOption.messageDuration ? messageOption.messageDuration : 2000,
        }
    }

    private createButtonElement(messageboxElement: HTMLDivElement) {
        const i = document.createElement('i')
        i?.classList.add('close-button')
        i?.addEventListener('click', () => {
            this.updateMessageQueue(messageboxElement, this.id)
            if (this.id > 0) window.clearTimeout(this.timeId)
        })
        messageboxElement.appendChild(i)
    }

    /**
     * @desc 创建 message 文本内容节点
     * @param { HTMLDivElement } messageboxElement 
     * @param { MessageOption } messageOption 
     * @returns void
     */
    private createMessageContentElement(messageboxElement: HTMLDivElement, messageOption: MessageOption): void {
        const messageContentElement = document.createElement('p')
        messageContentElement.classList.add('web-message-content')
        messageContentElement.textContent = messageOption.message!
        messageboxElement.appendChild(messageContentElement)
    }

    /**
     * @desc 创建message组件外层组件节点
     * @param {MessageOption} messageOption 
     * @returns HTMLDivElement
     */
    private createMessageboxElement(messageOption: MessageOption): HTMLDivElement {
        // 创建节点
        const messageboxElement = document.createElement('div')
        // 为 message 节点设置 id 属性
        this.setElementAttribute(messageboxElement, "web-message-id", String(this.id))
        // 基本class
        messageboxElement.classList.add('web-message')
        // message 内容 位置 class
        messageboxElement.classList.add(`web-message-${messageOption.messagePosition || "left"}`)
        // message节点 样式 class
        messageboxElement.classList.add(`web-message-${messageOption.messageType ? messageOption.messageType : 'info'}`)
        // 创建 message 文本节点
        this.createMessageContentElement(messageboxElement, messageOption)
        // 创建是否可以关闭节点
        messageOption.showClose === true && this.createButtonElement(messageboxElement)
        // 设置当前 message 节点的 zIndex、top
        this.setCurrentMessageboxElementStyle(messageboxElement)
        // 为外层message节点添加事件
        messageOption.messageHoverStop &&
            this.addEventForMessageElement(messageboxElement, messageOption)
        // 添加滑入动画
        window.setTimeout(() => {
            messageboxElement.classList.add('web-message-enter')
        }, 0)
        return messageboxElement
    }

    /**
     * @desc 为外层message节点添加鼠标滑入滑出事件
     * @param {HTMLDivElement} messageboxElement
     * @returns void
     */
    private addEventForMessageElement(messageboxElement: HTMLDivElement, messageOption: MessageOption): void {
        messageOption.mouseenterEvent = () => {
            // 获取当前message组件所对应的延时器id
            const timeId = Number(this.getElementAttribute(messageboxElement, "web-message-timeid"))
            // 清空默认添加的延时器
            window.clearTimeout(timeId)
            this.setElementAttribute(messageboxElement, "web-message-timeid", "0")
        }
        // 给节点添加鼠标划入的事件
        messageboxElement.addEventListener("mouseenter", messageOption.mouseenterEvent)

        messageOption.mouseleaveEvent = () => {
            const id = Number(this.getElementAttribute(messageboxElement, "web-message-id"))
            const currentMessageQueueIndex: number = this.messageQueue.findIndex((messageQueueOption: MessageQueueOption) => messageQueueOption.id === id)
            // 鼠标划出继续移除message节点
            const timeId = window.setTimeout(() => {
                // 更新样式
                this.updateMessageElementStyle(messageboxElement, currentMessageQueueIndex)
                // 销毁当前的message节点
                this.updateMessageQueue(messageboxElement, currentMessageQueueIndex)
            }, messageOption.messageDuration || 2000)
            this.setElementAttribute(messageboxElement, "web-message-timeid", JSON.stringify(timeId))
        }
        // 给节点添加鼠标划出的事件
        messageboxElement.addEventListener("mouseleave", messageOption.mouseleaveEvent)

    }
    /**
     * @desc 循环更新 message 节点的样式  移动上去
     * @param {number} startIndex 
     * @returns void
     */
    private updateMessageElementStyle(messageboxElement: HTMLDivElement, startIndex: number): void {
        for (let index = startIndex; index < this.messageQueue.length; index++) {
            const messageQueueOption: MessageQueueOption = this.messageQueue[index]
            if (messageQueueOption) {
                const timeId = Number(this.getElementAttribute(messageQueueOption.messageboxElement, "web-message-timeid"))
                if (timeId === 0) continue
                const messageboxElement = messageQueueOption.messageboxElement
                // messageboxElement.style.zIndex = `${this.maxZindex + i}`
                // 换行后获取上一个元素的height和top来更新下一个元素的top
                if (messageboxElement) messageboxElement.style.top = `${64 * index + 20}px`
                messageboxElement.classList.add('web-message-leave')
            }
        }
    }

    /**
     * @desc 设置当前创建的 message 节点的 zIndex、top  
     * @decs 从上往下排 第一个出现的在第一行 第二个出现的在第二行 以此类推... 这样做的好处是 只处理最后一次出现的message节点就行了 不需要考虑之前出现的message节点
     * @param {HTMLDivElement} messageboxElement
     * @returns void
     */
    private setCurrentMessageboxElementStyle(messageboxElement: HTMLDivElement): void {
        const currentIndex = this.messageQueue.length
        // 为了解决 鼠标划入中间部分的message节点 下面的message节点的zindex 比当前的大 从节点的上面 划回去 
        messageboxElement.style.zIndex = `${this.maxZindex + 1000 - currentIndex * 10}`
        messageboxElement.style.top = `${64 * currentIndex + 20}px`
    }

    /**
     * @desc  移除 message 节点
     * @param {HTMLDivElement} messageboxElement 
     * @param {number} targetId 
     * @returns void
     */
    private updateMessageQueue(messageboxElement: HTMLDivElement, startIndex: number,): void {
        if (startIndex === -1) {
            this.messageQueue.length = 0
        } else {
            // 从消息队列中删掉
            const currentMessageQueueOption = this.messageQueue.splice(startIndex, 1)[0]
            if (currentMessageQueueOption) {
                currentMessageQueueOption.mouseenterEvent && messageboxElement.removeEventListener("mouseenter", currentMessageQueueOption.mouseenterEvent)
                currentMessageQueueOption.mouseleaveEvent && messageboxElement.removeEventListener('mouseleave', currentMessageQueueOption.mouseleaveEvent)
            }
        }
        // 从body当中移除掉 这里的400毫秒和css样式的 0.4s 相对应
        setTimeout(() => {
            if (this.bodyElement?.contains(messageboxElement))
                this.bodyElement?.removeChild(messageboxElement)
        }, 400)

    }

    /**
    * @desc 创建 message 组件
    * @param {MessageOption} messageOption 
    * @returns void
    */
    public createMessage(messageOption: MessageOption): void {
        messageOption = this.checkMessageOptions(messageOption)
        // 先执行++操作
        this.id++
        // 创建message组件最外层的节点
        const messageboxElement = this.createMessageboxElement(messageOption)
        if (messageOption.messageDuration !== 0) {
            // 定时移除 message 节点 messageOption.messageDuration 为 0 代表不移除 message 节点
            const timeId = window.setTimeout(() => {
                // 查找要开始操作的下标
                const startIndex = this.messageQueue.findIndex((messageQueueOption: MessageQueueOption) => messageQueueOption.id === this.id)
                // 更新样式
                this.updateMessageElementStyle(messageboxElement, startIndex)
                // 移除节点
                this.updateMessageQueue(messageboxElement, startIndex)
            }, messageOption.messageDuration || 2000)
            this.setElementAttribute(messageboxElement, "web-message-timeid", JSON.stringify(timeId))
        }
        // 向消息队列当中添加消息数据
        this.messageQueue.push({ id: this.id, messageboxElement, mouseenterEvent: messageOption.mouseenterEvent, mouseleaveEvent: messageOption.mouseleaveEvent })
        // 将 message 节点添加到 body 当中
        this.bodyElement?.appendChild(messageboxElement)
    }
}
