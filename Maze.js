/**
 * Generates a maze using a random DFS Recursive backtracking algorithm
 */
class Maze extends Graph {
    constructor(rows, cols) {
        super(rows * cols);
        this.rows = rows;
        this.cols = cols;
        
        /* For DFS Maze Generation */
        this.stack = [];
    }

    generateMaze() {
        this._generateBaseMaze();
        this._DFSBacktracking();
        this.visited.fill(false);
        this.stack = [];
    }

    /** 
     * Generates a grid and makes all adjacent squares 
     * (not including diagonals) nieghbours
     */
    _generateBaseMaze() {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j ++) {
                const currV = this._getIndex(i, j);
                const top = this._getIndex(i -1, j);
                if (top != -1)
                    this.addEdge(currV, top);
                const right = this._getIndex(i, j + 1);
                if (right != -1)
                    this.addEdge(currV, right);
                const bottom = this._getIndex(i+1, j);
                if (bottom != -1)
                    this.addEdge(currV, bottom);
                const left = this._getIndex(i, j-1);
                if (left != -1)
                    this.addEdge(currV, left);
            }         
        }
    }

    _getIndex(i, j) {
        if (i < 0 || j < 0 || i > rows-1 || j > cols-1)
            return -1;
        return i * cols + j;
    }

    _DFSBacktracking() {
        let currentVertex = 0;
        this.visited[currentVertex] = true;

        while (this.visited.includes(false)) {
            let neighbours = this.adj[currentVertex];
            let hasUnvisitedNeighbours = false;
            for (var i = 0; i < neighbours.length; i++) {
                if (this.visited[neighbours[i]] == false) {
                    hasUnvisitedNeighbours = true;
                }
            }

            if (hasUnvisitedNeighbours) {
                let randomIndex = Math.floor(Math.random() * neighbours.length);
                let randomNeighbour = neighbours[randomIndex];
                
                this.stack.push(currentVertex);
                
                this._removeConnection(currentVertex, randomNeighbour);
                
                currentVertex = randomNeighbour;
                this.visited[currentVertex] = true;
            } else if (this.stack.length > 0) {
                currentVertex = this.stack.pop();
            }
        }
    }

    _removeConnection(v, w) {
        let indexV = this.adj[v].indexOf(w);
        if (indexV >= 0) {
            this.adj[v].splice(indexV, 1);
        }

        let indexW = this.adj[w].indexOf(v);
        if (indexW >= 0) {
            this.adj[w].splice(indexW, 1);
        }
        
    }
}