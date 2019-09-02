import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import Mock from './mock'
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
import  util  from "../src/common/js/util.js";
import VueSelectl from 'vue-selectl'
//import 'font-awesome/css/styles.css' 

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueSelectl) 


/*
Vue.prototype.baseUrl = "http://192.168.1.158:8099/";
Vue.prototype.action="http://192.168.1.158:8099/HttpUtil/FileUploadHandler.ashx";
Vue.prototype.actionWZ="http://192.168.1.158:8099/HttpUtil/ImportExcel.ashx";
*/

Vue.prototype.baseUrl = "/";
Vue.prototype.action="/HttpUtil/FileUploadHandler.ashx";
Vue.prototype.actionWZ="/HttpUtil/ImportExcel.ashx";
Vue.prototype.actionWZJG="/HttpUtil/WZJGImportExcel.ashx";

/*
Vue.prototype.baseUrl = "http://192.168.1.183:8097/";
Vue.prototype.action="http://192.168.1.183:8097/HttpUtil/FileUploadHandler.ashx";
Vue.prototype.actionWZ="http://192.168.1.183:8097/HttpUtil/ImportExcel.ashx";
Vue.prototype.actionWZJG="http://192.168.1.183:8097/HttpUtil/WZJGImportExcel.ashx";
*/
Vue.prototype.util= util

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/login') != -1) {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path.indexOf('/login') == -1) {
    next({ path: '/login/1' })  //默认进入锐服本部
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')