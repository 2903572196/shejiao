import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 引入全局组件
import fengexian from "./components/common/fengexian.vue"
Vue.component('fengexian',fengexian	)
import noThing from "./components/common/no-thing.vue"
Vue.component('no-thing',noThing	)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
