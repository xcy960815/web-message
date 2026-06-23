import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import DemoPlayground from '../../components/DemoPlayground.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DemoPlayground', DemoPlayground)
  },
} satisfies Theme
