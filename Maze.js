/**
 * Generates a maze using a random DFS Recursive backtracking algorithm
 */
class Maze extends Graph {
    constructor(rows, cols) {
        super(rows * cols);
        this.rows = rows;
        this.cols = cols;
        
        /* For DFS Stuff! */
        this.stack = [];

        this.edgeTo = new Array(this.V);
    }

    generateMaze() {
        this._DFSBacktracking();
        this.visited.fill(false);
        this.stack = [];
    }

    dfs(v) {
        this.visited[v] = true;
        for (var w = 0; w < this.adj[v].length; w++) {
            var adj = this.adj[v][w];
            if (this.visited[adj] == false) {
                this.edgeTo[adj] = v;
                this.dfs(adj)
            }
        }
    }

    bfs(v) {
        let queue = [];
        this.visited[v] = true;
        queue.unshift(v);
        while (queue.length > 0) {
            var next = queue.pop();
            
            for (var w = 0; w < this.adj[next].length; w++) {
                var adj = this.adj[next][w];
                if (this.visited[adj] == false) {
                    this.edgeTo[adj] = next;
                    this.visited[adj] = true;
                    queue.unshift(adj);
                }
            }

        }
        
    }

    pathTo(v) {
        if (!this.visited[v])
        {
            return null;
        }
        
        let path = [];
        for(var x = v; x != 0; x = this.edgeTo[x]) {
            path.push(x);
        }
        path.push(0);
        return path;
    }

    _DFSBacktracking() {
        let currentVertex = 0;
        this.visited[currentVertex] = true;
        
        while (this.visited.includes(false)) {
            let neighbours = this._getNeighbours(currentVertex);
            let unvisitedNeighbours = [];
            for (var i = 0; i < neighbours.length; i++) {
                if (this.visited[neighbours[i]] == false) {
                    unvisitedNeighbours.push(neighbours[i]);
                }
            }
            

            if (unvisitedNeighbours.length > 0) {
                let randomIndex = Math.floor(Math.random() * unvisitedNeighbours.length);
                let randomNeighbour = unvisitedNeighbours[randomIndex];
                this.stack.push(currentVertex);
                
                this.addEdge(currentVertex, randomNeighbour);
                this.addEdge(randomNeighbour, currentVertex);

                currentVertex = randomNeighbour;
                this.visited[currentVertex] = true;
            } else if (this.stack.length > 0) {
                currentVertex = this.stack.pop();
            }
            
        }
    }

    _getNeighbours(v) {
        const vIndex = this._getPosition(v);
        let i = vIndex[0];
        let j = vIndex[1];
        let neighbours = [];
        const top = this._getIndex(i -1, j);
        if (top != -1)
            neighbours.push(top);
        const right = this._getIndex(i, j + 1);
        if (right != -1)
            neighbours.push(right);
        const bottom = this._getIndex(i+1, j);
        if (bottom != -1)
            neighbours.push(bottom);
        const left = this._getIndex(i, j-1);
        if (left != -1)
            neighbours.push(left);
        
        return neighbours;
    }

    _getIndex(i, j) {
        if (i < 0 || j < 0 || i > this.rows-1 || j > this.cols-1)
            return -1;
        return i * this.cols + j;
    }

    _getPosition(v) {
        let index = new Array(2);
        if (v < 0 || v > this.V) 
            return index.fill(-1);
        let row = floor(v / this.cols);
        let col = v % this.cols;
        index[0] = row;
        index[1] = col;
        return index;  
    }
}