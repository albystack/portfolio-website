## Overview

The **Pathfinding & Maze Generation Visualization Platform** is an interactive desktop application that demonstrates how different pathfinding and maze generation algorithms function. It provides a dynamic way for users to visualize the efficiency of various algorithms, analyze their performance, and compare them in real-time. The application is built using **Python and Tkinter**, ensuring accessibility and ease of use.

## Technical Implementation

### Grid Representation

- The **grid is implemented as a 2D matrix**, where each cell represents a state:
  - `Empty`: Open path
  - `Wall`: Maze obstacle
  - `Start`: Starting position
  - `Finish`: Goal position
  - `Path`: Final computed path
  - `Open`: Nodes currently being explored
  - `Closed`: Nodes already evaluated
- The **maximum grid size is 200x200** for performance optimization.

```python
class Grid:
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.grid = [[CellType.EMPTY for _ in range(width)] for _ in range(height)]
    
    def set_cell(self, x, y, cell_type):
        self.grid[y][x] = cell_type
```

---

### Pathfinding Algorithms

This project implements five pathfinding algorithms, allowing users to experiment with different approaches:

#### **1. Breadth-First Search (BFS)**

- **Guarantees the shortest path in unweighted grids** by exploring nodes level by level.
- Uses a **FIFO queue** for traversal.

```python
from collections import deque

def bfs(grid, start, goal):
    queue = deque([start])
    came_from = {start: None}
    
    while queue:
        current = queue.popleft()
        if current == goal:
            break
        for neighbor in get_neighbors(grid, current):
            if neighbor not in came_from:
                queue.append(neighbor)
                came_from[neighbor] = current
    
    return reconstruct_path(came_from, start, goal)
```

---

#### **2. Depth-First Search (DFS)**

- Explores deeply before backtracking.
- **Does not guarantee the shortest path**.

```python
def dfs(grid, start, goal):
    stack = [start]
    came_from = {start: None}
    
    while stack:
        current = stack.pop()
        if current == goal:
            break
        for neighbor in get_neighbors(grid, current):
            if neighbor not in came_from:
                stack.append(neighbor)
                came_from[neighbor] = current
    
    return reconstruct_path(came_from, start, goal)
```

---

#### **3. Dijkstra’s Algorithm**

- Guarantees the shortest path by prioritizing nodes with the lowest cumulative cost.
- Uses a **priority queue**.

```python
import heapq

def dijkstra(grid, start, goal):
    pq = [(0, start)]  # (cost, node)
    came_from = {start: None}
    cost_so_far = {start: 0}
    
    while pq:
        current_cost, current = heapq.heappop(pq)
        if current == goal:
            break
        for neighbor in get_neighbors(grid, current):
            new_cost = current_cost + 1  # Assuming uniform cost
            if neighbor not in cost_so_far or new_cost < cost_so_far[neighbor]:
                cost_so_far[neighbor] = new_cost
                heapq.heappush(pq, (new_cost, neighbor))
                came_from[neighbor] = current
    
    return reconstruct_path(came_from, start, goal)
```

---

#### **4. A* Algorithm**

- **Combines Dijkstra's cost function with a heuristic** to prioritize promising paths.
- Uses **Manhattan Distance** as the heuristic.

```python
def a_star(grid, start, goal):
    pq = [(0, start)]
    came_from = {start: None}
    cost_so_far = {start: 0}
    
    while pq:
        current_cost, current = heapq.heappop(pq)
        if current == goal:
            break
        for neighbor in get_neighbors(grid, current):
            new_cost = cost_so_far[current] + 1
            if neighbor not in cost_so_far or new_cost < cost_so_far[neighbor]:
                cost_so_far[neighbor] = new_cost
                priority = new_cost + heuristic(neighbor, goal)
                heapq.heappush(pq, (priority, neighbor))
                came_from[neighbor] = current
    
    return reconstruct_path(came_from, start, goal)
```

---

### Maze Generation Algorithms

The application includes five maze generation algorithms, allowing users to compare their structures and complexity.

#### **1. Recursive Backtracking**

- Uses **Depth-First Search (DFS)** to generate a perfect maze.

```python
def recursive_backtracking(grid, x, y):
    stack = [(x, y)]
    while stack:
        current = stack.pop()
        neighbors = get_unvisited_neighbors(grid, current)
        if neighbors:
            stack.append(current)
            next_cell = random.choice(neighbors)
            remove_wall(grid, current, next_cell)
            stack.append(next_cell)
```

---

#### **2. Kruskal’s Algorithm**

- Uses a **disjoint-set (union-find)** to ensure all cells are connected without loops.

```python
class DisjointSet:
    def __init__(self):
        self.parent = {}
        self.rank = {}
    
    def find(self, node):
        if self.parent[node] != node:
            self.parent[node] = self.find(self.parent[node])
        return self.parent[node]
    
    def union(self, node1, node2):
        root1, root2 = self.find(node1), self.find(node2)
        if root1 != root2:
            if self.rank[root1] > self.rank[root2]:
                self.parent[root2] = root1
            else:
                self.parent[root1] = root2
                if self.rank[root1] == self.rank[root2]:
                    self.rank[root2] += 1
```

---

## Results & Performance Evaluation

### 1. Execution Time Comparisons

![Pathfinding Performance](../images/pathfinding-performance.png)

- **Dijkstra’s and A* performed best in weighted scenarios.**
- **BFS outperformed DFS in unweighted grids.**

### 2. Maze Complexity Analysis

![Maze Generation Comparison](../images/maze-complexity.png)

- **Recursive Backtracking creates many dead ends.**
- **Kruskal’s Algorithm results in interconnected paths.**

---

## Challenges & Learnings

- **Performance Optimization:** Implemented **asynchronous execution** to avoid UI freezing.
- **Algorithm Comparison:** Designed **metrics visualization** for real-time analysis.
- **User Experience:** Created an intuitive **drag-and-drop interface** for start/end point selection.

---

## Future Improvements

- **Weighted Terrain:** Implement cost-based movement for more complex simulations.
- **Multithreading:** Speed up large-scale pathfinding computations.
- **Web-Based Version:** Convert the project to a browser-based app using **React and D3.js**.

---

## Conclusion

The **Pathfinding & Maze Generation Visualization Platform** provides an interactive way to understand and compare different algorithms. By allowing users to visualize real-time execution and analyze performance metrics, it serves as an effective educational and analytical tool.

