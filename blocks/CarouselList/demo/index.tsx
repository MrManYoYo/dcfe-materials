import Vue from 'vue'
import Block from '../src/index'
import DCView from 'dcfe-view-design'
import 'dcfe-view-design/dist/styles/iview.css'
Vue.use(DCView)
Vue.config.productionTip = false

new Vue({
  render: (h) => h(Block)
}).$mount('#vue-demo-layout')
