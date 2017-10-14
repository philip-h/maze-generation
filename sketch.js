let maze;
let rows = 10, cols = 10;

function setup() {
    createCanvas(500,500);
    maze = new MazeGen(width, height, rows, cols);
}

function draw() {
    noLoop();
    background(127);
    //maze.displayMaze();
    maze.generate();
    maze.displayMaze();
}