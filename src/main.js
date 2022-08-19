import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'//引入elementui
import './assets/css/reset.css'//初始化CSS
import router from './router'//引入路由

Vue.config.productionTip = false

new Vue({
	router,//将路由规则添加到vue实例上
	render: h => h(App),
}).$mount('#app')
