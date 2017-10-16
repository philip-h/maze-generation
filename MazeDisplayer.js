/**
 * A wrapper class to display Maze.js using p5.js!
 */
class MazeDisplayer {

    static drawMaze(maze, screenSize, cellSize, curr) {
        stroke(255);
        strokeWeight(2);
        noFill();

        let x = 0;
        let y = 0;
        let cols = screenSize / cellSize;

        for (var v = 0; v < maze.V; v++) {
            // Draw a square, excluding lines between neighbours
            if (!this._hasANeighbour(maze, "top", v)) {
                line(x, y, x + cellSize, y);
            }
            if (!this._hasANeighbour(maze, "right", v)) {
                line(x + cellSize, y, x + cellSize, y + cellSize);
            }
            if (!this._hasANeighbour(maze, "bottom", v)) {
                line(x + cellSize, y + cellSize, x, y + cellSize);
            }
            if (!this._hasANeighbour(maze, "left", v)) {
                line(x, y + cellSize, x, y);
            }

            if (maze.visited[v]) {
                push();
                noStroke();
                fill(255,0,255,50);
                rect(x, y, cellSize, cellSize);
                pop();
            }

            if (v == curr) {
                push();
                noStroke();
                fill(0,255,0);
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

    static _hasANeighbour(maze, side, v) {
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
}



