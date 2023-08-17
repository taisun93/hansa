<template>
  <Gameboard :nodes="gameObject.map.nodes" :edges="gameObject.map.edges" @spotClicked="handleSpotClick"/>
  <PlayerBoard :players="gameObject.players" />
</template>

<script>
import Gameboard from './components/GameBoard.vue'
import {gameService} from '@/services/gameService.ts'
import PlayerBoard from './components/PlayerBoard.vue';
export default {
  name: 'App',
  components: {
    Gameboard,
    PlayerBoard
  },
  data() {
    return{
      gameObject: gameService.getGame()
    } 
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
