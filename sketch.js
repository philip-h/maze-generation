let maze;
let rows = 20, cols = 20;
function setup() {
    createCanvas(500,500);
    maze = new Maze(rows,cols);
    maze.generateMaze();
}

function draw() {
    background(51);
    MazeDisplayer.drawMaze(maze, width, width / cols);
    noLoop();
}