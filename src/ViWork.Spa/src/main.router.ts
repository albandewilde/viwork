// Vue router setup
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// Components
import Home from './components/Home.vue';
import About from './components/About.vue';
import Test from './components/Test.vue';

const routes = [
  { path: '', component: Home },
  { path: '/about', component: About },
  { path: '/test', component: Test },
];

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
