import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import Filter from './components/Filter.vue'

Vue.component('home', Home);
Vue.component('filter-search', Filter);

new Vue({
  el: '#app',
  render: h => h(App)
})
