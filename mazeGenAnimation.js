/**
 * Generates a maze using a random DFS Recursive backtracking algorithm.
 * This animates the process!
 */
let maze;
let rows = 20;
let cols = 20;
let currentVertex;
let stack = [];
function setup() {
    createCanvas(500,500);
    maze = new Graph(rows * cols);
    currentVertex = 0;
    maze.visited[currentVertex] = true;
}




function draw() {
    background(51);
    drawMaze();
    
    if (!maze.visited.includes(false)) {
        
        noLoop();
        print("DONE");
        return;
    }

    let neighbours = getNeighbours(currentVertex);
    let unvisited = [];
    for (var i = 0; i < neighbours.length; i++) {
        if (maze.visited[neighbours[i]] == false) {
            unvisited.push(neighbours[i]);
        }
    }
    if (unvisited.length > 0) {
        let randomNeighbour = unvisited[floor(random(unvisited.length))];
        stack.push(currentVertex);
        
        maze.addEdge(currentVertex, randomNeighbour);
        maze.addEdge(randomNeighbour, currentVertex);

        currentVertex = randomNeighbour;
        maze.visited[randomNeighbour] = true;
    } else if (stack.length > 0) {
        currentVertex = stack.pop();
    }
}

function getNeighbours(v) {
    const vIndex = getPosition(v);
    let i = vIndex[0];
    let j = vIndex[1];
    let neighbours = [];
    const top = getIndex(i -1, j);
    if (top != -1)
        neighbours.push(top);
    const right = getIndex(i, j + 1);
    if (right != -1)
        neighbours.push(right);
    const bottom = getIndex(i+1, j);
    if (bottom != -1)
        neighbours.push(bottom);
    const left = getIndex(i, j-1);
    if (left != -1)
        neighbours.push(left);
    
    return neighbours;
}

function getIndex(i, j) {
    if (i < 0 || j < 0 || i > rows-1 || j > cols-1)
        return -1;
    return i * cols + j;
}

function getPosition(v) {
    let index = new Array(2);
    if (v < 0 || v > maze.V) 
        return index.fill(-1);
    let row = floor(v / cols);
    let col = v % cols;
    index[0] = row;
    index[1] = col;
    return index;  
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
    if (!hasANeighbour("top", v)) {
        line(x, y, x + len, y);
    }
    if (!hasANeighbour("right", v)) {
        line(x + len, y, x + len, y + len);
    }
    if (!hasANeighbour("bottom", v)) {
        line(x + len, y + len, x, y + len);
    }
    if (!hasANeighbour("left", v)) {
        line(x, y + len, x, y);
    }

    if (maze.visited[v]) {
        push();
        noStroke();
        fill(255,0,255, 50);
        rect(x, y, len, len);
        pop();
    }

    if (v == currentVertex) {
        push();
        noStroke();
        fill(0,255,0, 50);
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


