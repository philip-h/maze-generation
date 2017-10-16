let maze;
let rows = 20, cols = 20;
let currentVertex;
let queue = [];
let edgeTo;
let x;
function setup() {
    createCanvas(500,500);
    maze = new Maze(rows,cols);
    maze.generateMaze();
    currentVertex = 0;
    edgeTo = new Array(maze.V);
    maze.visited[currentVertex] = true;
    queue.unshift(currentVertex);
    x = 399;
    
}

function draw() {
    background(51);
    MazeDisplayer.drawMaze(maze, width, width / cols, currentVertex);

    if (queue.length <= 0) {
        if (x == 399) {
            maze.visited.fill(false);
            currentVertex = 399;
        }
        
        currentVertex = x;
        if (currentVertex == 0) {
            maze.visited[currentVertex] = true;
            return;
        }
        maze.visited[currentVertex] = true;
        x = edgeTo[x];
       
    }
    else {

   
        currentVertex = queue.pop();
        for (var w = 0; w < maze.adj[currentVertex].length; w++) {
            var adj = maze.adj[currentVertex][w];
            if (maze.visited[adj] == false) {
                edgeTo[adj] = currentVertex;
                maze.visited[adj] = true;
                queue.unshift(adj);
            }
        }
    }

    
    
}
