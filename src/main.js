import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.css';
import '@/assets/css/common.css';
import { add } from '@/assets/js/utils';
import '@/assets/js/common';
add(1,8);
console.log($);

Vue.use(ElementUI);

new Vue({
  render: h => h(App)
}).$mount('#root');

