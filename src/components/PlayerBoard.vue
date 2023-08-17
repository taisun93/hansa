<template>
    <div class="player-board">
        <div v-for="player in players" :key="player.id" class="player-info">
            <h3 :class="{ active: player.isActive }">{{ player.name }}</h3>
            <p>Actions Remaining: {{ player.actionsRemaining }}</p>
            <p>Cubes Available: {{ player.cubesAvailable }}</p>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        players: {
            type: Array,
            required: true
        }
    }
}
</script>
  
<style>
.player-board {
    border-left: 1px solid #ccc;
    padding-left: 20px;
}

.active {
    color: green;
}

.player-info {
    margin-bottom: 20px;
}
</style>
  