### web-message 
> 一款仿照element-ui操作逻辑,用js开发的message组件,支持4种文案提示风格，文案换行，文案自定义位置，hover页面停留，自定义页面停留时间，。

#### 安装
```npm
npm i web-message -S
```
###引用方式
```ts
// 常规多例模式
// const messageInstance = new Message();
// 单例模式无论在哪里引用都是同一个实例 节省内存开销
const messageInstance = WebMessage.getInstance();
messageInstance.createMessage({
    message, // 要展示的消息 默认为 ""
    messageType, // 消息类型  默认为 "info"
    messageDuration, // 消息存在的时间 默认为 2000毫秒
    messagePosition, // 消息的位置 默认为 "left"
    messageHoverStop // 鼠标hover上去是否停留在页面上 默认为 false 
    showClose, // 是否显示关闭按钮 默认为 false
  })
```

#### Options
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| message | 文案 | String | - | - |
| messageType | 类型 | String | success / warning / error / info | info |
| messageDuration | 持续时间 | Number | - | 2000 |
| messagePosition | 位置 | String | left / center / right | leftt |
| messageHoverStop | hover组件在页面上停留 | Boolean | true / false | false |
| showClose | 是否显示关闭按钮 | Boolean | - | false |
-----------





