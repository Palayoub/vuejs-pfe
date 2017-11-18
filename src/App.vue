<template>
  <div id="app">
    <h1>{{ header }}</h1>
    <home></home>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      header: 'Search of all Github repositories containing a keyword'
    }
  }
}
</script>

<style src="./assets/style.css"></style>
