let maze;
let rows = 30, cols = 30;
let currentVertex;
function setup() {
    createCanvas(300,300);
    maze = new Maze(rows,cols);
    maze.generateMaze();
    currentVertex = 0;
    maze.visited[currentVertex] = true;
}

function draw() {
    background(51);
    MazeDisplayer.drawMaze(maze, width, width / cols, currentVertex);

    if (!maze.visited.includes(false)) {
        noLoop();
        console.log("Done");
        return;
    }

    let neighbours = maze.adj[currentVertex];
    let unvisitedNeighbours = [];
    
    for (var n = 0; n < neighbours.length; n++) {
        if (maze.visited[neighbours[n]] == false) {
            unvisitedNeighbours.push(neighbours[n]);
        }
    }
    print(unvisitedNeighbours);

    if (unvisitedNeighbours.length > 0 ) {
        for (var n = 0; n < unvisitedNeighbours.length; n++) {
            maze.stack.push(currentVertex);
            currentVertex = unvisitedNeighbours[n];
            maze.visited[unvisitedNeighbours[n]] = true;
        }

    } else if (maze.stack.length > 0) {
        currentVertex = maze.stack.pop();
    }
    
}