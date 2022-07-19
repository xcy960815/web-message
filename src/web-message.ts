// 引入message 样式
import './web-message.css'
export type MessageType = 'info' | 'warning' | 'error' | 'success' | undefined
export type MessagePosition = 'left' | "center" | 'right' | undefined
export type MessageDuration = number
export interface MessageOptions {
    message: string;
    messageType?: MessageType
    messagePosition?: MessagePosition
    messageDuration?: MessageDuration
    showClose?: boolean;
    hoverStop?: boolean
}

interface MessageQueueOption {
    messageboxDom: HTMLDivElement;
    id: number,
    // timeId: number,
}
export class Message {
    // 消息队列
    private messageQueue: Array<MessageQueueOption> = []

    private bodyElement: HTMLBodyElement | null = document.querySelector('body')

    private id: number = 0

    private maxZindex: number = 0

    private timeId: number = 0

    constructor() {
        // 不使用 window.onload 会只查找 原生节点里面的 z-index
        window.onload = () => {
            this.maxZindex = this.getMaxZIndex()
        }
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
    private setDomAttribute(dom: HTMLElement, attribute: string, attributeValue: string): void {
        dom.setAttribute(attribute, attributeValue)
    }

    /**
     * 获取dom节点自定义属性
     * @param {HTMLElement} dom 
     * @param {string} attribute 
     * @returns {string}
     */
    private getDomAttribute(dom: HTMLElement, attribute: string): string {
        return dom.getAttribute(attribute)!
    }

    /**
     * @desc 校验message配置 兼容不不符合要求的配置
     * @param {MessageOptions} messageOptions 
     * @returns {MessageOptions}
     */
    private checkMessageOptions(messageOptions: MessageOptions): MessageOptions {

        return {
            ...messageOptions,
            message: messageOptions.message ? messageOptions.message : "",
            messageType: messageOptions.messageType ? messageOptions.messageType : "info",
            messagePosition: messageOptions.messagePosition ? messageOptions.messagePosition : "left",
            messageDuration: messageOptions.messageDuration ? messageOptions.messageDuration : 2000,
        }
    }

    private createButtonDom(messageboxDom: HTMLDivElement) {

        const i = document.createElement('i')
        i.classList.add('close-button')
        i?.addEventListener('click', () => {
            this.updateMessageQueue(messageboxDom, this.id)
            if (this.id > 0) window.clearTimeout(this.timeId)
        })
        messageboxDom.appendChild(i)
    }

    /**
     * @desc 创建 message 文本内容节点
     * @param { HTMLDivElement } messageboxDom 
     * @param { MessageOptions } messageOption 
     * @returns void
     */
    private createMessageContentDom(messageboxDom: HTMLDivElement, messageOption: MessageOptions): void {

        const messageContentDom = document.createElement('p')

        messageContentDom.classList.add('web-message_content')

        messageContentDom.textContent = messageOption.message!

        messageboxDom.appendChild(messageContentDom)
    }

    /**
     * @desc 创建message组件外层组件节点
     * @param {MessageOptions} messageOptions 
     * @returns HTMLDivElement
     */
    private createMessageboxDom(messageOptions: MessageOptions): HTMLDivElement {

        // 创建节点
        const messageboxDom = document.createElement('div')

        // 为 message 节点设置 id 属性
        this.setDomAttribute(messageboxDom, "web-message-id", JSON.stringify(this.id))

        // 基本class
        messageboxDom.classList.add('web-message')

        // 动画class
        messageboxDom.classList.add('web-message_leave')

        // message 内容 位置 class
        messageboxDom.classList.add(`web-message_${messageOptions.messagePosition || "left"}`)

        // message节点 样式 class
        messageboxDom.classList.add(`web-message_${messageOptions.messageType ? messageOptions.messageType : 'info'}`)

        // 创建 message 文本节点
        this.createMessageContentDom(messageboxDom, messageOptions)

        // 创建是否可以关闭节点
        messageOptions.showClose === true && this.createButtonDom(messageboxDom)

        // 设置当前 message 节点的 zIndex、top
        this.setCurrentMessageboxDomStyle(messageboxDom)

        // 移除class 添加滑入动画
        window.setTimeout(() => {
            messageboxDom.classList.remove('web-message_leave')
        }, 100)


        // 为外层message节点添加事件
        messageOptions.hoverStop &&
            this.addEventForMessageDom(messageboxDom, messageOptions)

        return messageboxDom
    }

    /**
     * @desc 为外层message节点添加鼠标滑入滑出事件
     * @param {HTMLDivElement} messageboxDom
     * @returns void
     */
    private addEventForMessageDom(messageboxDom: HTMLDivElement, messageOptions: MessageOptions): void {

        // 给节点添加鼠标划入的事件
        messageboxDom.addEventListener("mouseenter", (_event: MouseEvent) => {
            // 获取当前message组件所对应的延时器id
            const timeId = Number(this.getDomAttribute(messageboxDom, "web-message-timeid"))
            // 清空默认添加的延时器
            window.clearTimeout(timeId)
            this.setDomAttribute(messageboxDom, "web-message-timeid", "0")
        })


        // 给节点添加鼠标划出的事件
        messageboxDom.addEventListener("mouseleave", (_event: MouseEvent) => {
            const id = Number(this.getDomAttribute(messageboxDom, "web-message-id"))
            const currentMessageQueueIndex: number = this.messageQueue.findIndex((messageQueueOption: MessageQueueOption) => messageQueueOption.id === id)
            // 鼠标划出继续移除message节点
            const timeId = window.setTimeout(() => {

                // 更新样式
                this.updateMessageDomStyle(messageboxDom, currentMessageQueueIndex)

                // 销毁当前的message节点
                this.updateMessageQueue(messageboxDom, currentMessageQueueIndex)

            }, messageOptions.messageDuration || 2000)

            this.setDomAttribute(messageboxDom, "web-message-timeid", JSON.stringify(timeId))
        })

    }


    /**
     * @desc 创建 message 组件
     * @param {MessageOptions} messageOptions 
     * @returns void
     */
    public createMessage(messageOptions: MessageOptions): void {

        messageOptions = this.checkMessageOptions(messageOptions)

        // 先执行++操作
        this.id++

        // 创建message组件最外层的节点
        const messageboxDom = this.createMessageboxDom(messageOptions)

        if (messageOptions.messageDuration !== 0) {

            // 定时移除 message 节点 messageOptions.messageDuration 为 0 代表不移除 message 节点

            const timeId = window.setTimeout(() => {

                // 查找要开始操作的下标
                const startIndex = this.messageQueue.findIndex((messageQueueOption: MessageQueueOption) => messageQueueOption.id === this.id)

                // 更新样式
                this.updateMessageDomStyle(messageboxDom, startIndex)

                // 移除节点
                this.updateMessageQueue(messageboxDom, startIndex)

            }, messageOptions.messageDuration || 2000)

            this.setDomAttribute(messageboxDom, "web-message-timeid", JSON.stringify(timeId))

        }


        // 向消息队列当中添加消息数据
        this.messageQueue.push({ id: this.id, messageboxDom })

        // 将 message 节点添加到 body 当中
        this.bodyElement?.appendChild(messageboxDom)
    }

    /**
     * @desc 循环更新 message 节点的样式  移动上去
     * @param {number} startIndex 
     * @returns void
     */
    private updateMessageDomStyle(messageboxDom: HTMLDivElement, startIndex: number): void {

        // 增加移除动画
        messageboxDom.classList.add('web-message_leave')
        for (let index = startIndex; index < this.messageQueue.length; index++) {
            const messageQueueOption: MessageQueueOption = this.messageQueue[index]
            if (messageQueueOption) {
                const timeId = Number(this.getDomAttribute(messageQueueOption.messageboxDom, "web-message-timeid"))
                if (timeId === 0) continue
                const messageboxDom = messageQueueOption.messageboxDom
                // messageboxDom.style.zIndex = `${this.maxZindex + i}`
                // 换行后获取上一个元素的height和top来更新下一个元素的top
                if (messageboxDom) messageboxDom.style.top = `${64 * index + 20}px`
            }
        }
    }


    /**
     * @desc 设置当前创建的 message 节点的 zIndex、top  
     * @decs 从上往下排 第一个出现的在第一行 第二个出现的在第二行 以此类推... 这样做的好处是 只处理最后一次出现的message节点就行了 不需要考虑之前出现的message节点
     * @param {HTMLDivElement} messageboxDom
     * @returns void
     */
    private setCurrentMessageboxDomStyle(messageboxDom: HTMLDivElement): void {
        // 设置 message节点top值的时候 可能会存在 鼠标hover的情况  所以需要重新比较一下
        // const lastMessageIndex = this.messageQueue.length
        // const messageQueueTop = `${64 * lastMessageIndex + 20}px`
        // const messageNodeQueue = document.querySelectorAll(".web-message")
        // const messageNodeQueueTop = `${64 * messageNodeQueue.length + 20}px`
        // // 为了解决 鼠标划入中间部分的message节点 下面的message节点的zindex 比当前的大 从节点的上面 划回去
        // messageboxDom.style.zIndex = `${this.maxZindex + 1000 - lastMessageIndex * 10}`
        // messageboxDom.style.top = messageNodeQueueTop === messageQueueTop ? messageQueueTop : messageNodeQueueTop > messageQueueTop ? messageNodeQueueTop : messageQueueTop

        const currentIndex = this.messageQueue.length

        // 为了解决 鼠标划入中间部分的message节点 下面的message节点的zindex 比当前的大 从节点的上面 划回去 
        messageboxDom.style.zIndex = `${this.maxZindex + 1000 - currentIndex * 10}`

        messageboxDom.style.top = `${64 * currentIndex + 20}px`
    }

    /**
     * @desc  移除 message 节点
     * @param {HTMLDivElement} messageboxDom 
     * @param {number} targetId 
     * @returns void
     */
    private updateMessageQueue(messageboxDom: HTMLDivElement, startIndex: number,): void {
        if (startIndex === -1) {
            this.messageQueue.length = 0
        } else {
            // 从消息队列中删掉
            this.messageQueue.splice(startIndex, 1)
        }
        // 从body当中移除掉 这里的400毫秒和css样式的 0.4s 相对应
        setTimeout(() => {
            // contains 方法用来判断当前节点中是否包含 某个节点 
            if (this.bodyElement?.contains(messageboxDom))
                this.bodyElement?.removeChild(messageboxDom)
        }, 400)

    }
}
