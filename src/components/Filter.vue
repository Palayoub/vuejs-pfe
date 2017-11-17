<template>
  <div class="filtersearch">
  <span class="alignorder">Order by: 
    <select v-model="checkedOrder">
      <option selected>Stars</option>
      <option>Forks</option>
      <option>Updated</option>
    </select>
  </span>
  <span class="alignfilter">Filter by: 
    <input type="checkbox" id="stars" value="stars" v-model="checkedFilters">
    <label for="jack">Stars</label>
    <input type="checkbox" id="forks" value="forks" v-model="checkedFilters">
    <label for="john">Forks</label>
    <input type="checkbox" id="activity" value="activity" v-model="checkedFilters">
    <label for="mike">Activity</label>
  </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkedOrder: '',
      checkedFilters: []
    }
  }
}
</script>
