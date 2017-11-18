<template>
  <div class="filtersearch">
  <span class="alignorder">Order by:
    <select @input="orderClicked">
      <option selected value="stars">Stars</option>
      <option value="forks">Forks</option>
      <option value="updated">Updated</option>
    </select>
  </span>
  <span class="alignfilter">Filter by:
    <input type="checkbox" id="stars" value="stars" v-model="checkedValues" @change="filterClicked">
    <label for="jack">Stars</label>
    <input type="checkbox" id="forks" value="forks" v-model="checkedValues" @change="filterClicked">
    <label for="john">Forks</label>
    <input type="checkbox" id="activity" value="activity" v-model="checkedValues" @change="filterClicked">
    <label for="mike">Activity</label>
  </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkedValues: []
    }
  },
  methods: {
    orderClicked(event) {
      this.$emit('orderChanged', event.target.value);
    },
    filterClicked(event) {
      this.$emit('filterChanged', this.checkedValues);
    }
  }
}
</script>
