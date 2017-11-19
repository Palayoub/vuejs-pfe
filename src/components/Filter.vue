<template>
  <div class="filtersearch">
  <span class="alignorder">Sort:
    <select @input="orderClicked">
      <option selected value="">Best match</option>
      <option value="stars">Stars</option>
      <option value="forks">Forks</option>
      <option value="updated">Updated (Activity)</option>
    </select>
  </span>
  <span class="alignfilter">Filter by:
    <input type="checkbox" id="stars" value="stars" v-model="checkedValues" @change="filterClicked">
    <label>Stars</label>
    <input type="checkbox" id="forks" value="forks" v-model="checkedValues" @change="filterClicked">
    <label>Forks</label>
  </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //checkedValues contains the current checked checkboxes
      checkedValues: []
    }
  },
  methods: {
    //We emit the event when orderChanged to the parent component
    orderClicked(event) {
      this.$emit('orderChanged', event.target.value);
    },
    //We emit the value of checkedValues when filterChanged to the parent component
    filterClicked(event) {
      this.$emit('filterChanged', this.checkedValues);
    }
  }
}
</script>
