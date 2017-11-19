<template>
  <div>
    <input class="inputsearch" type="text" name="search" :placeholder="searchQuery" @input="changedSearch"/>
    <button class="button" @click="filterClicked = !filterClicked">filter</button>
    <filter-search v-if="filterClicked" @orderChanged="orderChanged" @filterChanged="filterChanged"></filter-search>
    <hr>
    <span v-if="errors">{{ this.errors.response.data.message | split }} | Retry in few seconds</span>
    <div v-else>
      <ul align="left" v-for="item in repos">
        <li>
        <span style="float:left;">{{ item.full_name }}</span>
        <span style="float:right;">Forks: {{ item.forks_count }} | Stars: {{ item.watchers_count }}</span>
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
      //contains the search query of the user
      searchQuery: 'github',
      //to show/hide the filter component
      filterClicked: false,
      //contains the order
      checkedOrder: '',
      //contains a list of the filters checked
      checkedFilters: [],
      //contains our final filter query
      filterQuery: '',
      //pagenumber of a query
      pagenum: 1,
      //how many elements we want to show per page
      perpage: 20,
      //list of our results
      repos: [],
      //contains our error response
      errors: null,
    }
  },
  //fetch result when component is created with default value 'github'
  created() {
    this.fetchRepos(this.pagenum);
  },
  methods: {
  //Method to make a remote request to our API
    fetchRepos(pagenum) {
      axios.get(API + this.searchQuery + this.filterQuery + '&per_page=' + this.perpage + '&page=' + pagenum + '&sort=' + this.checkedOrder + '&order=desc')
        .then(response => {
        //only update pagenumber if there are multiple pages
          if('link' in response.headers)
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
      //Basic implementation to apply the filters (if Stars filter is selected only no starred repo are displayed and same with Fork)
      if(this.checkedFilters.length > 0) {
        this.filterQuery = this.checkedFilters.includes('stars') ? ' stars:<1 ' : this.filterQuery;
        this.filterQuery = this.checkedFilters.includes('forks') ? ' forks:<1 ' : this.filterQuery;
        this.filterQuery = (this.checkedFilters.includes('stars') && this.checkedFilters.includes('forks'))? ' forks:<1+stars:<1 ' : this.filterQuery;
      }
      else this.filterQuery = '';
      this.fetchRepos(1);
    }
  }
}
</script>
