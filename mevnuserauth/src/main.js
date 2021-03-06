// main.js

import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false

import HomeComponent from './components/HomeComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import SignupComponent from './components/SignupComponent.vue';
import UserComponent from './components/UserComponent.vue';
import ProfileComponent from './components/ProfileComponent.vue';

const routes = [
  {
      name: 'home',
      path: '/',
      component: HomeComponent
  },
  {
      name: 'login',
      path: '/login',
      component: LoginComponent
  },
  {
      name: 'signup',
      path: '/signup',
      component: SignupComponent
  },
  {
      name: 'user',
      path: '/user',
      component: UserComponent
  },
  {
      name: 'profile',
      path: '/profile',
      component: ProfileComponent
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');
