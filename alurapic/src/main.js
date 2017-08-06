import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import './directives/Transform';

import VeeValidate from 'vee-validate'
import msg from './pt_BR';

import { routes } from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes, 
  mode: 'history'
});

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000';


Vue.use(VeeValidate, {

    locale: 'pt_BR',
    dictionary:{
      pt_BR: {
        messages: msg
      }
    }
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})