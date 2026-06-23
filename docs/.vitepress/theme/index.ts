import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import AppDemo from '../../../src/App.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('AppDemo', AppDemo)
  },
} satisfies Theme
