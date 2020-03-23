import Vue from 'vue'
//import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import db from './datastore.js'

import './assets/css/reset.css';
import './assets/css/public.css';
import './assets/iconFont/iconfont.css';
import './assets/css/main.css';

import uploader from 'vue-simple-uploader'
Vue.use(uploader)
console.log(uploader)

//process.env.IS_WEB = 'web'

if(!process.env.IS_WEB) {
	Vue.use(require('vue-electron'))
}
//Vue.http = Vue.prototype.$http = axios
//Vue.prototype.$http = axios
Vue.config.productionTip = false

/* 其它代码 */

//Vue.prototype.$db = db.dbUtil

/* eslint-disable no-new */
new Vue({
	components: {
		App
	},
	router,
	store,
	template: '<App/>'
}).$mount('#app')