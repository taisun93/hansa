<template>
  <Gameboard msg="Welcome to Your Vue.js App"/>
</template>

<script>
import Gameboard from './components/GameBoard.vue'

export default {
  name: 'App',
  components: {
    Gameboard
  }
}
</script>

<style>
#app {
  width: 100vw;  /* 100% of the viewport width */
  height: 100vh; /* 100% of the viewport height */
  display: flex;
  align-items: center; /* vertically center the board */
  justify-content: center; /* horizontally center the board */
}
</style>
