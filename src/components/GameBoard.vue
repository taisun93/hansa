<template>
  <svg width="600" height="600">
    <!-- <rect width="1000" height="1000" fill="green" /> -->
    <!-- Draw the edges (lines) -->
    <line v-for="edge in edges" :key="edge.from + '-' + edge.to" :x1="nodes.find(n => n.id === edge.from).x"
      :y1="nodes.find(n => n.id === edge.from).y" :x2="nodes.find(n => n.id === edge.to).x"
      :y2="nodes.find(n => n.id === edge.to).y" stroke="black" stroke-width="2" />

    <!-- Draw the nodes (circles for spots) -->
    <circle v-for="node in nodes.filter(n => n.type === 'spot')" :key="'outer-circle-' + node.id" :cx="node.x"
      :cy="node.y" r="10" fill="none" stroke="black" stroke-width="2" />

    <!-- Draw the inner rectangle (trader placement) inside spots -->
    <rect v-for="node in nodes.filter(n => n.type === 'spot')" :key="'inner-rect-' + node.id" :x="node.x - 8"
      :y="node.y - 8" width="16" height="16" :fill="node.filled ? 'red' : 'white'" stroke="black" stroke-width="1"
      @click="onSpotClick(node)" />

    <!-- Draw the nodes (main rectangle for cities) -->
    <rect v-for="node in nodes.filter(n => n.type === 'city')" :key="'main-rect-' + node.id" :x="node.x - 40"
      :y="node.y - 25" width="80" height="30" fill="white" stroke="black" stroke-width="2" />

    <!-- Draw the offices within the city nodes -->
    <template v-for="node in nodes.filter(n => n.type === 'city')">
      <template v-for="(office, index) in node.offices">
        <!-- Square office -->
        <rect v-if="office.shape === 'square'" :key="'square-office-' + node.id + '-' + index"
          :x="node.x - 35 + (index * 20)" :y="node.y - 20" width="16" height="16" :fill="office.color" stroke="black"
          stroke-width="1" />

        <!-- Circular office -->
        <circle v-if="office.shape === 'circle'" :key="'circle-office-' + node.id + '-' + index"
          :cx="node.x - 27 + (index * 20)" :cy="node.y - 12" r="8" :fill="office.color" stroke="black" stroke-width="1" />
      </template>
    </template>
    <!-- Draw the node names (for cities) -->
    <text v-for="node in nodes.filter(n => n.type === 'city')" :key="'label-' + node.id" :x="node.x" :y="node.y - 30"
      font-size="14" text-anchor="middle">
      {{ node.name }}
    </text>
  </svg>
</template>




<script>
export default {
  props: {
    nodes: {
      type: Array,
      required: true
    },
    edges: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSpotClick(spot) {
      // Check if the spot is empty
      if (!spot.filled) {
        this.$emit('spotClicked', spot);
      }
    }
  }


}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Style the nodes (cities and spots) */
circle {
  stroke: black;
  stroke-width: 2;
}

/* Style the edges */
line {
  stroke-width: 2;
}
</style>
