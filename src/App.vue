<template>
  <Gameboard :nodes="gameObject.map.nodes" :edges="gameObject.map.edges" @spotClicked="handleSpotClicked"/>
  <PlayerBoard :players="gameObject.players" />
</template>

<script>
import Gameboard from './components/GameBoard.vue'
import gameServiceInstance from '@/services/gameService.ts'
import PlayerBoard from './components/PlayerBoard.vue';
export default {
  name: 'App',
  components: {
    Gameboard,
    PlayerBoard
  },
  data() {
    return{
      gameObject: gameServiceInstance.game
    } 
  },
  methods: {
    handleSpotClicked(node) {
     gameServiceInstance.updateNode(node.id)
     this.gameObject = gameServiceInstance.game
     console.log(this.gameObject.map.nodes)
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
