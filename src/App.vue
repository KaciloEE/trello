<template>
  <div id="app">
    <div>
      <h1 class="is-size-3">Tasks</h1>
    </div>
    <div>
      <board/>
    </div>
  </div>
</template>

<script>
import Board from '@/components/Board'

export default {
  name: 'App',
  components: {
    Board
  }
}
</script>

<style lang="scss">
  html, body {
    height: 100%;
  }

  body {
    padding: 20px;
  }
</style>
