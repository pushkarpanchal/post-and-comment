import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from "vue-router"
import LogIn from "./components/LogIn"
import Profile from "./components/Profile"

Vue.use(VueRouter)
const routes = [
  {
    path: "/", name: "home", component: LogIn
  },
  {
    path: "/posts", name : "posts", component: Profile
  }
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

new Vue({
  router: router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
