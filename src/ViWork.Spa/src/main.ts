import Vue from 'vue';
import App from './App.vue';
import AuthService from './services/AuthService';
import ElementUI from 'element-ui';
import router from './router';
import store from './store';
import './main.vendors';
import './plugins/element.js';

Vue.use(ElementUI);
Vue.config.productionTip = false;

const main = async () => {
  await AuthService.init();
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
};

main();

