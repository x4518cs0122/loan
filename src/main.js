// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import 'common/stylus/index.styl';
import 'babel-polyfill';
import fastclick from 'fastclick';
import router from './router';
import store from './store';
// import './mock'
import 'font-awesome/css/font-awesome.css';
import './permission'; //permission control
import Cube from 'cube-ui';

fastclick.attach(document.body);
Vue.config.productionTip = false;
Vue.use(Cube);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
