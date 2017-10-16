let maze;
let rows = 20, cols = 20;
let cellSize;
function setup() {
    createCanvas(500,500);
    maze = new Maze(rows,cols);
    cellSize = floor(width / cols);
    maze.generateMaze();
    maze.bfs(0);
    
    
}

function draw() {
    background(51);
    MazeDisplayer.drawMaze(maze, width, cellSize, -1);
    displayPathTo(399);
    noLoop();
}

function displayPathTo(v) {
    let path = maze.pathTo(v);
    if (!path) {
        console.log("No path found from 0 to", v);
        return;
    }
    
    let x = 0;
    let y = 0;
    
    for (var v = 0; v < maze.V; v++) {
       

        if (path.includes(v)) {
            push();
            noStroke();
            fill(255,255,255,80);
            rect(x, y, cellSize, cellSize);
            pop();
        }

        x += cellSize;
        if ((v+1) % cols == 0) {
            y += cellSize;
            x = 0;
        }

    }
}

