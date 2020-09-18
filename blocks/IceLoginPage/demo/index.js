import Vue from 'vue';
import App from '../src/index';
import DCView from 'dcfe-view-design';
import 'dcfe-view-design/dist/styles/iview.css';
Vue.use(DCView);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#vue-demo-layout');
