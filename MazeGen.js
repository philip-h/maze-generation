class MazeGen {
    constructor(w, h, rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.maze = []
        this.stack = [];

        this.initMaze(floor(w / this.cols), floor(h / this.rows));
        this.buildAllWalls();
    }

    initMaze(squareWidth, squareHeight) {
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
                this.maze.push(new Cell(i, j, squareWidth, squareHeight));
            }
        }
    }

    buildAllWalls() {
        for (var i = 0; i < this.maze.length; i++) {
            this.maze[i].buildWalls();
        }
    }

    generate() {
        let currentCell = this.maze[0];
        while (!this.isEveryCellVisited()) {
            let neighbours = this.getNeighbours(currentCell);
            if (neighbours.length > 0) {
                let randomNeighbour = neighbours[floor(random(neighbours.length))];
                this.stack.push(currentCell);
                this.removeWalls(currentCell, randomNeighbour);
                
                currentCell = randomNeighbour;
                currentCell.visited = true;
        
            } else if (this.stack.length > 0) {
                currentCell = this.stack.pop();
            }
        }
    }

    isEveryCellVisited() {
        for (var i = 0; i < this.maze.length; i++) {
            if (!this.maze[i].visited)
                return false;
        }
        return true;
    }

    getNeighbours(cell) {
        let i = cell.i;
        let j = cell.j;
        let neighbours = [];
        
        let top = this.maze[this.getIndex(i-1, j)];
        if (top && !top.visited)
            neighbours.push(top);
    
        let right = this.maze[this.getIndex(i, j + 1)];
        if (right && !right.visited)
            neighbours.push(right);
    
        let bottom = this.maze[this.getIndex(i+1, j)];
        if (bottom && !bottom.visited)
            neighbours.push(bottom);
    
        let left = this.maze[this.getIndex(i, j-1)];
        if (left && !left.visited)
            neighbours.push(left);
        
        return neighbours;
 
    }

    getIndex(i, j) {
        if (i < 0 || i > this.cols || j < 0 || j > this.rows)
            return -1;
        return i * cols + j;
    }

    removeWalls(cellA, cellB) {
        if (cellA.j < cellB.j) {
            // Cell A is LEFT of Cell B
            cellA.tearDownWall('right');
            cellB.tearDownWall('left');
        } else if (cellA.j > cellB.j) {
            // Cell A is RIGHT of Cell B
            cellA.tearDownWall('left');
            cellB.tearDownWall('right');
        } else {
            if (cellA.i < cellB.i) {
                // Cell A is ABOVE Cell B
                cellA.tearDownWall('bottom');
                cellB.tearDownWall('top');
            } else if (cellA.i > cellB.i) {
                // Cell A is BELOW Cell B
                cellA.tearDownWall('top');
                cellB.tearDownWall('bottom');
            }
        }
    }

   
    displayMaze() {
         for (var i = 0; i < this.maze.length; i++) {
             this.maze[i].display();
         }
    }
}

class Cell {
    
        constructor(i, j, w, h) {
            // Details for the square to draw
            this.i = i;
            this.j = j;
            this.x = j*w;
            this.y = i*h;
            this.w = w;
            this.h = h;
    
            // For the Maze generation algorithm
            this.visited = false;
            // keys of top, right, bottom, left
            this.walls = {};
        }
    
        buildWalls() {
            this.walls['top']    = [this.x,          this.y,          this.x + this.w, this.y];
            this.walls['right']  = [this.x + this.w, this.y,          this.x + this.w, this.y + this.h];
            this.walls['bottom'] = [this.x + this.w, this.y + this.h, this.x,          this.y + this.h];
            this.walls['left']   = [this.x,          this.y + this.h, this.x,          this.y];
        }
    
        tearDownWall(position) {
            this.walls[position] = undefined;
        }
    
        display() {
            strokeWeight(2);
            stroke(0);
    
            let top = this.walls['top'];
            if (top)
                line(top[0], top[1], top[2], top[3]);
    
            let right = this.walls['right'];
            if (right)
                line(right[0], right[1], right[2], right[3]);
           
            let bottom = this.walls['bottom'];
            if (bottom)
                line(bottom[0], bottom[1], bottom[2], bottom[3]);
    
            let left = this.walls['left'];
            if (left)
                line(left[0], left[1], left[2], left[3]);
            
            // To Highlight
            if (this.visited) {
                fill(255,10,255, 80);
                noStroke();
                rect(this.x, this.y, this.w, this.h);
            }
            
        }
    }