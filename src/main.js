import Vue from 'vue';
import App from './App.vue';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
