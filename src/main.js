import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from './router'
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSelectImage from 'vue-select-image'

Vue.use(VueSelectImage)
require('vue-select-image/dist/vue-select-image.css')

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.prototype.$api = 'https://couponic.online/api'

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')

// export default new router({
//   routes: [
//     {
//       path: '/',
//       redirect: '/homepage'
//     }
//   ]
// })

// export default router

export default new router({
  mode: 'history',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/homepage',
      name: 'home',
      component: import (`./components/HomepageLayout.vue`),
      children: [
        {
          path: 'homepage',
          name: 'homepage',
          component: import (`./components/Homepage.vue`)
        },
      ]
       
    }
]})