let maze;
let rows = 20, cols = 20;
let currentVertex;
function setup() {
    createCanvas(500,500);
    maze = new Maze(rows,cols);
    maze.generateMaze();
    currentVertex = 0;
    maze.visited[currentVertex] = true;
}

function draw() {
    background(51);
    MazeDisplayer.drawMaze(maze, width, width / cols, currentVertex);
    noLoop();
}

