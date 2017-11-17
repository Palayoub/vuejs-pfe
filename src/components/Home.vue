<template>
  <div align="center">
    <input class="inputsearch" type="text" name="search" placeholder="Searching..."/>
    <button class="button">filter</button>
    <div >
      <ul v-for="item in list">
        - {{ item.text }}
      </ul>
      <div class="pagination" v-for="page in pagenum">
        <a href="#">{{ page }}</a>
      </div>
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
      pagenum: 5,
    }
  }
}
</script>
