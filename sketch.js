let maze;
let rows = 25;
let cols = 25;
let currentVertex;
let stack = [];
function setup() {
    createCanvas(500,500);
    maze = new Graph(rows * cols);
    createMaze();
    currentVertex = 0;
    maze.visited[currentVertex] = true;
    //frameRate(5);
}

function createMaze() {
    for(var i = 0; i < rows; i++) {
        for(var j = 0; j < cols; j++) {
            let current = getIndex(i,j);
            let top = getIndex(i-1, j);
            if (top != -1)
                maze.addEdge(current, top);
            let right = getIndex(i, j + 1);
            if (right != -1)
                maze.addEdge(current, right);
            let bottom = getIndex(i+1, j);
            if (bottom != -1)
                maze.addEdge(current, bottom);
            let left = getIndex(i, j-1);
            if (left != -1)
                maze.addEdge(current, left);
        }
    }
}

function getIndex(i, j) {
    if (i < 0 || j < 0 || i > rows-1 || j > cols-1)
        return -1;
    return i * cols + j;
}

function draw() {
    background(51);
    drawMaze();

    if (!maze.visited.includes(false)) {
        
        noLoop();
        print("DONE");
        return;
    }

    let neighbours = maze.adj[currentVertex];
    let hasUnvisited = false;
    for (var i = 0; i < neighbours.length; i++) {
        var element = neighbours[i];
        if (!maze.visited[neighbours[i]]) {
            hasUnvisited = true;
        }
    }
    if (hasUnvisited) {
        let randomNeighbour = neighbours[floor(random(neighbours.length))];
        stack.push(currentVertex);
        // remove connection between neighbour and current
        let index = maze.adj[currentVertex].indexOf(randomNeighbour);
        maze.adj[currentVertex].splice(index, 1);
        index = maze.adj[randomNeighbour].indexOf(currentVertex);
        maze.adj[randomNeighbour].splice(index, 1);

        currentVertex = randomNeighbour;
        maze.visited[randomNeighbour] = true;
    } else if (stack.length > 0) {
        currentVertex = stack.pop();
    }




    
}

function drawMaze() {
    let x = 0;
    let y = 0;
    let sideLen = 500 / cols;
    stroke(255);
    strokeWeight(2);
    noFill();
    for (var v = 0; v < maze.V; v++) {
        square(v, x, y, sideLen);
        x += sideLen;
        if ((v+1) % cols == 0) {
            y += sideLen;
            x = 0;
        }
        
    }
}

function square(v, x, y, len) {
    if (hasANeighbour("top", v)) {
        line(x, y, x + len, y);
    }
    if (hasANeighbour("right", v)) {
        line(x + len, y, x + len, y + len);
    }
    if (hasANeighbour("bottom", v)) {
        line(x + len, y + len, x, y + len);
    }
    if (hasANeighbour("letf")) {
        line(x, y + len, x, y);
    }

    if (maze.visited[v]) {
        push();
        noStroke();
        fill(255,0,255,50);
        rect(x, y, len, len);
        pop();
    }

    if (v == currentVertex) {
        push();
        noStroke();
        fill(0,255,0,50);
        rect(x, y, len, len);
        pop();
    }
}

function hasANeighbour(side, v) {
    switch(side) {
        case "right":
            return maze.adj[v].includes(v+1);
        case "left":
            return maze.adj[v].includes(v-1);
        case "top":
            return maze.adj[v].includes(v - cols);
        case "bottom":
            return maze.adj[v].includes(cols + v);
        default:
            return false;
    }
    
}