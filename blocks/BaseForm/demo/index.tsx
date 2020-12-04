import Vue from 'vue'
import Block from '../src/index'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(ViewUI)
Vue.config.productionTip = false

new Vue({
  render: (h) => h(Block)
}).$mount('#vue-demo-layout')
