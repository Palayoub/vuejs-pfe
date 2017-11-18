<template>
  <div>
    <input class="inputsearch" type="text" name="search" placeholder="Searching..." @input="changedSearch"/>
    <button class="button" @click="filterClicked = !filterClicked">filter</button>
    <filter-search v-if="filterClicked"></filter-search>
    <hr>
    <span v-if="errors">{{ this.errors.response.data.message }} | Retry in few seconds</span>
    <div v-else>
      <ul align="left" v-for="item in repos">
        - {{ item.full_name }}
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
      searchQuery: 'mediax',
      filterClicked: false,
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
      axios.get(API + this.searchQuery + '&per_page=' + this.perpage + '&page=' + pagenum)
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
      this.searchQuery = event.target.value, this.fetchRepos(this.pagenum);
    }
  }
}
</script>
