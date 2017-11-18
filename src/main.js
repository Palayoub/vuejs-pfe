import Vue from 'vue'
import App from './App.vue'
import Home from './components/Home.vue'
import Filter from './components/Filter.vue'

Vue.component('home', Home);
Vue.component('filter-search', Filter);

//Filter to display a portion of the error message returned by the API
Vue.filter('split', function (value) {
  return value.split('(')[0]
});

new Vue({
  el: '#app',
  render: h => h(App)
})
