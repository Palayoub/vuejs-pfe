<template>
  <div>
    <input class="inputsearch" type="text" name="search" placeholder="Searching..."/>
    <button class="button" @click="filterClicked = !filterClicked">filter</button>
    <filter-search v-if="filterClicked"></filter-search>
    <hr>
    <div>
      <ul align="left" v-for="item in list">
        - {{ item.text }}
      </ul>
    </div>
    <div class="pagination" v-for="page in pagenum">
      <a href="#">{{ page }}</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        { text: 'First repo' },
        { text: 'Second repo' },
        { text: 'Third repo' }
      ],
      filterClicked: false,
      pagenum: 5,
    }
  }
}
</script>
