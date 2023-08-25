interface Office {
  shape: string;
  color: string;
}

interface Node {
  id: number;
  type: string;
  name: string;
  x: number;
  y: number;
  filled?: boolean;
  offices?: Office[];
}

interface Edge {
  from: number;
  to: number;
}

interface Player {
  id: number;
  name: string;
  isActive: boolean;
  actionsRemaining: number;
  cubesAvailable: number;
}

interface Game {
  map: {
    nodes: Node[];
    edges: Edge[];
  };
  players: Player[];
}

class GameService {
  game: Game;

  constructor() {
    this.game = this.initGame();
  }

  initGame() {
    return {
      map: {
        nodes: [
          // Adjusted nodes:
          {
            id: 1,
            type: "city",
            name: "Austin",
            x: 50,
            y: 250,
            offices: [
              { shape: "square", color: "white" },
              { shape: "circle", color: "orange" },
              { shape: "square", color: "#FF69B4" },
            ],
          },
          {
            id: 6,
            type: "city",
            name: "Dallas",
            x: 300,
            y: 200,
            offices: [
              { shape: "square", color: "white" },
              { shape: "square", color: "orange" },
              { shape: "square", color: "black" },
            ],
          },
          {
            id: 7,
            type: "city",
            name: "Houston",
            x: 300,
            y: 500,
            offices: [
              { shape: "square", color: "white" },
              { shape: "circle", color: "hotpink" },
            ],
          },

          // Austin to Dallas (via spots):
          {
            id: 2,
            type: "spot",
            filled: false,
            name: "Austin_Dallas_1",
            x: 135,
            y: 320,
          },
          {
            id: 3,
            type: "spot",
            filled: false,
            name: "Austin_Dallas_2",
            x: 170,
            y: 290,
          },
          {
            id: 4,
            type: "spot",
            filled: false,
            name: "Austin_Dallas_3",
            x: 205,
            y: 260,
          },
          {
            id: 5,
            type: "spot",
            filled: false,
            name: "Austin_Dallas_4",
            x: 240,
            y: 230,
          },

          // Austin to Houston (via spots):
          {
            id: 8,
            type: "spot",
            filled: false,
            name: "Austin_Houston_1",
            x: 135,
            y: 380,
          },
          {
            id: 9,
            type: "spot",
            filled: false,
            name: "Austin_Houston_2",
            x: 170,
            y: 410,
          },
          {
            id: 12,
            type: "spot",
            filled: false,
            name: "Austin_Houston_3",
            x: 205,
            y: 440,
          },
          {
            id: 13,
            type: "spot",
            filled: false,
            name: "Austin_Houston_4",
            x: 240,
            y: 470,
          },

          // Dallas to Houston (via spots):
          {
            id: 10,
            type: "spot",
            filled: false,
            name: "Dallas_Houston_1",
            x: 300,
            y: 275,
          },
          {
            id: 11,
            type: "spot",
            filled: false,
            name: "Dallas_Houston_2",
            x: 300,
            y: 350,
          },
          {
            id: 14,
            type: "spot",
            filled: false,
            name: "Dallas_Houston_3",
            x: 300,
            y: 425,
          },
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
          { from: 14, to: 7 },
        ],
      },
      players: [
        {
          id: 1,
          name: "Player 1",
          isActive: true,
          actionsRemaining: 3, // for example, if each player starts with 3 actions per turn
          cubesAvailable: 10, // initial count, can adjust based on gameplay needs
          // ... other attributes as needed ...
        },
        {
          id: 2,
          name: "Player 2",
          isActive: false,
          actionsRemaining: 3,
          cubesAvailable: 10,
        },
      ],
    };
  }

  updateNode(nodeId: number, newProperties: any) {
    // Find the node by its id
    const nodeToUpdate = this.game.map.nodes.find((node: any) => node.id === nodeId);

    // If the node was found, update its properties
    if (nodeToUpdate) {
      nodeToUpdate.filled = true;
    }
  }

  // getGame() {
  //   return this.game;
  // }
}

const gameServiceInstance = new GameService();
export default gameServiceInstance;