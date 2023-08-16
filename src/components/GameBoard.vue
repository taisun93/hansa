<template>
  <svg width="1000" height="1000">
    <!-- <rect width="1000" height="1000" fill="green" /> -->
    <!-- Draw the edges (lines) -->
    <line v-for="edge in processedEdges" :key="edge.from + '-' + edge.to" :x1="nodes.find(n => n.id === edge.from).x"
      :y1="nodes.find(n => n.id === edge.from).y" :x2="nodes.find(n => n.id === edge.to).x"
      :y2="nodes.find(n => n.id === edge.to).y" stroke="black" stroke-width="2" />

    <!-- Draw the nodes (circles for spots) -->
    <circle v-for="node in nodes.filter(n => n.type === 'spot')" :key="'outer-circle-' + node.id" :cx="node.x"
      :cy="node.y" r="10" fill="none" stroke="black" stroke-width="2" />

    <!-- Draw the inner rectangle (trader placement) inside spots -->
    <rect v-for="node in nodes.filter(n => n.type === 'spot')" :key="'inner-rect-' + node.id" :x="node.x - 8"
      :y="node.y - 8" width="16" height="16" :fill="node.filled ? 'red' : 'white'" stroke="black" stroke-width="1"
      @click="toggleSpotFill(node)" />

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
  data() {
    return {
      nodes: [
        // Adjusted nodes:
        {
          id: 1,
          type: 'city',
          name: 'Austin',
          x: 50,
          y: 250,
          offices: [
            { shape: 'square', color: 'white' },
            { shape: 'circle', color: 'orange' },
            { shape: 'square', color: '#FF69B4' }
          ]
        }
        ,  // Austin slightly shifted
        { id: 6, type: 'city', name: 'Dallas', x: 300, y: 200 },  // Dallas stays the same
        { id: 7, type: 'city', name: 'Houston', x: 300, y: 500 }, // Positioned Houston east of Austin

        // Austin to Dallas (via spots):
        { id: 2, type: 'spot', filled: false, name: 'Austin_Dallas_1', x: 135, y: 320 },
        { id: 3, type: 'spot', filled: false, name: 'Austin_Dallas_2', x: 170, y: 290 },
        { id: 4, type: 'spot', filled: false, name: 'Austin_Dallas_3', x: 205, y: 260 },
        { id: 5, type: 'spot', filled: false, name: 'Austin_Dallas_4', x: 240, y: 230 },

        // Austin to Houston (via spots):
        { id: 8, type: 'spot', filled: false, name: 'Austin_Houston_1', x: 135, y: 380 },
        { id: 9, type: 'spot', filled: false, name: 'Austin_Houston_2', x: 170, y: 410 },
        { id: 12, type: 'spot', filled: false, name: 'Austin_Houston_3', x: 205, y: 440 },
        { id: 13, type: 'spot', filled: false, name: 'Austin_Houston_4', x: 240, y: 470 },

        // Dallas to Houston (via spots):
        { id: 10, type: 'spot', filled: false, name: 'Dallas_Houston_1', x: 300, y: 275 },
        { id: 11, type: 'spot', filled: false, name: 'Dallas_Houston_2', x: 300, y: 350 },
        { id: 14, type: 'spot', filled: false, name: 'Dallas_Houston_3', x: 300, y: 425 }
      ],
      edges: [
        // Edges:

        // Austin to Dallas:
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
        { from: 4, to: 5 },
        { from: 5, to: 6 },

        // Austin to Houston:
        { from: 1, to: 8 },
        { from: 8, to: 9 },
        { from: 9, to: 12 },
        { from: 12, to: 13 },
        { from: 13, to: 7 },

        // Dallas to Houston:
        { from: 6, to: 10 },
        { from: 10, to: 11 },
        { from: 11, to: 14 },
        { from: 14, to: 7 }

      ]
    };
  }
  ,
  computed: {
    processedEdges() {
      return this.edges.filter(edge =>
        this.nodes.find(n => n.id === edge.from) &&
        this.nodes.find(n => n.id === edge.to)
      );
    }
  },
  methods: {
    toggleSpotFill(node) {
      if (node.type === 'spot') {
        node.filled = !node.filled;
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
