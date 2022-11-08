# Dijkstra Algorithm

### _AUTHOR : RAVIPRASAD_

---

[Click here for session video of Dijkstra Algorithm](https://drive.google.com/file/d/1vUdhCq-Ng_JZ8eBf9EJXFZAOHwsY4f-t/view?usp=share_link)

### What is it?

- One of the most famous and widely used algorithm around!
- Most of the big tech companies use this algorithm as their base and build their secret algorithm on that.
- It finds the shortest path between two vertices on a graph(Whats the fastest way to get from point A to point B)

### Why is it useful?

1. Gps - finding fastest route
2. Network Routing - finds open shortest path for data
3. Biology -used to model the sread of viruses among humans
4. Airline tickets - finding cheapest route to your destination

Before working with dijkstra we need to have a weighted graph
(show weight graph image)

## The WeightedGraph

```javascript
class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }
}

// var graph = new weightedGraph()
// graph.addVertex("A")
// graph.addVertex("B")
// graph.addVertex("C")
//graph.addEdge("A","B",9)
//graph.addEdge("A","C",5)
//graph.addEdge("B","C",7)
//graph.adjacencyList
```

Now on to Dijkstra's

Find the shortest path from A to E
(show graph image)

## The Approach

- Every time we look to visit a new node, we pick the node with the smallest known distance to visit first.
- Once we’ve moved to the node we’re going to visit, we look at each of its neighbors
- For each neighboring node, we calculate the distance by summing the total edges that lead to the node we’re checking from the starting node.
- If the new total distance to a node is less than the previous total, we store the new shorter distance for that node

(show slide)

## Priority Queue

```javascript
class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    // enqueue is push
    this.values.push({ val, priority });
    this.sort();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
  dequeue() {
    // deququq is shift
    return this.values.shift();
  }
}

//we are sorting here which is O(N *log(N))

// var q = new PriorityQueue()
// q.enqueue("B",3)
// q.enqueue("C",5)
// q.enqueue("D",2)
// q.enqueue("Q",20)
// q.values

//q.dequeue()  every time we dequeue, it will return the smallest value in the queue
```

## Dijkstra's Pseudocode

- This function should accept a starting and ending vertex
- Create an object (we'll call it distances) and set each key to be every vertex in the adjacency list with a value of infinity, except for the starting vertex which should have a value of 0.
- After setting a value in the distances object, add each vertex with a priority of Infinity to the priority queue, except the starting vertex, which should have a priority of 0 because that's where we begin.
- Create another object called previous and set each key to be every vertex in the adjacency list with a value of null
- Start looping as long as there is anything in the priority queue
  - dequeue a vertex from the priority queue
  - If that vertex is the same as the ending vertex - we are done!
  - Otherwise loop through each value in the adjacency list at that vertex
    - Calculate the distance to that vertex from the starting vertex
    - if the distance is less than what is currently stored in our distances object
      - update the distances object with new lower distance
      - update the previous object to contain that vertex
      - enqueue the vertex with the total distance from the start node

## Dijkstra implementation

```javascript
class PriorityQueue {
  constructor() {
    this.values = [];
  }
  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }
  dequeue() {
    return this.values.shift();
  }
  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }
  Dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = []; //to return at end
    let smallest;
    //build up initial state
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }
    // as long as there is something to visit
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      if (smallest === finish) {
        //WE ARE DONE
        //BUILD UP PATH TO RETURN AT END
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          //find neighboring node
          let nextNode = this.adjacencyList[smallest][neighbor];
          //calculate new distance to neighboring node
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          if (candidate < distances[nextNeighbor]) {
            //updating new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            //updating previous - How we got to neighbor
            previous[nextNeighbor] = smallest;
            //enqueue in priority queue with new priority
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    return path.concat(smallest).reverse();
  }
}

var graph = new WeightedGraph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "E", 3);
graph.addEdge("C", "D", 2);
graph.addEdge("C", "F", 4);
graph.addEdge("D", "E", 3);
graph.addEdge("D", "F", 1);
graph.addEdge("E", "F", 1);

graph.Dijkstra("A", "E");

// ["A", "C", "D", "F", "E"]
```
