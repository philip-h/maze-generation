// A di-graph class that stores a graph as an adjacency list.
// The nodes are 'labeled' 0 - V-1.
class Graph {
    constructor(V) {
        this.V = V;
        this.adj = new Array(this.V);
        this.visited = new Array(this.V).fill(false);
        for (var v = 0; v < this.V; v++) {
            this.adj[v] = [];
        }
    }

    addEdge(v, w) {
        this.adj[v].push(w);
    }

    getAdj(v) {
        return this.adj[v];
    }
}