<template>
  <div>
    <input class="inputsearch" type="text" name="search" placeholder="Searching..." @input="changedSearch"/>
    <button class="button" @click="filterClicked = !filterClicked">filter</button>
    <filter-search v-if="filterClicked" @orderChanged="orderChanged" @filterChanged="filterChanged"></filter-search>
    <hr>
    <span v-if="errors">{{ this.errors.response.data.message }} | Retry in few seconds</span>
    <div v-else>
      <ul align="left" v-for="item in repos">
        <li>
        <span style="float:left;">{{ item.full_name }}</span>
        <span style="float:right;">F:{{ item.forks_count }} S:{{ item.watchers_count }} A:0</span>
        </li>
      </ul>
      <div class="pagination" v-for="page in pagenum">
        <a href="#" @click="fetchRepos(page)">{{ page }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const API = 'https://api.github.com/search/repositories?q=';

export default {
  data () {
    return {
      searchQuery: 'ayoub',
      filterClicked: false,
      checkedOrder: '',
      checkedFilters: [],
      pagenum: 1,
      perpage: 20,
      repos: [],
      errors: null,
    }
  },
  //fetch result at component created
  created() {
    this.fetchRepos(this.pagenum);
  },
  methods: {
  //Method to make a remote request to our API
    fetchRepos(pagenum) {
      axios.get(API + this.searchQuery + '&per_page=' + this.perpage + '&page=' + pagenum + '&sort=' + this.checkedOrder + '&order=desc')
        .then(response => {
          //we get the number of pages from the header of our response
          this.pagenum = parseInt(response.headers.link.split(';')[1].split('=')[4]);
          this.repos = response.data.items
        })
      .catch(e => {
          this.errors = e;
        })
    },
    //Method to call each time our search input is changed
    changedSearch(event) {
      //call fetchRepos with searched query if its not empty
      if(event.target.value != '')
        this.searchQuery = event.target.value, this.fetchRepos(1);
    },
    orderChanged(event) {
      this.checkedOrder = event, this.fetchRepos(1);
      console.log(this.checkedOrder);
    },
    filterChanged(event) {
      this.checkedFilters = event;
      console.log(this.checkedFilters[0]);
    }
  }
}
</script>
