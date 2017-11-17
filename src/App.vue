<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <home></home>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'List of Gihtub public repos'
    }
  }
}
</script>

<style src="./assets/style.css"></style>
