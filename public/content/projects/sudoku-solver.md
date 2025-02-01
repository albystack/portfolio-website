## Overview

The **AI-Powered Sudoku Solver** is a Python-based application that solves Sudoku puzzles using a **backtracking algorithm** and **constraint satisfaction techniques**. The project also includes a **Tkinter-based GUI** for an interactive solving experience.

## Technical Implementation

### Backtracking Algorithm for Sudoku Solving

- Uses **recursive backtracking** to fill the Sudoku grid.
- Checks **row, column, and 3x3 box constraints** before placing a number.

```python
def is_valid(board, row, col, num):
    for i in range(9):
        if board[row][i] == num or board[i][col] == num:
            return False
    box_x, box_y = row // 3 * 3, col // 3 * 3
    for i in range(3):
        for j in range(3):
            if board[box_x + i][box_y + j] == num:
                return False
    return True

def solve_sudoku(board):
    for row in range(9):
        for col in range(9):
            if board[row][col] == 0:
                for num in range(1, 10):
                    if is_valid(board, row, col, num):
                        board[row][col] = num
                        if solve_sudoku(board):
                            return True
                        board[row][col] = 0
                return False
    return True
```

---

### AI Constraint Satisfaction Solver

- Implements **forward checking** and **minimum remaining values (MRV) heuristics**.
- Improves performance on harder Sudoku puzzles.

```python
from constraint import Problem

def constraint_sudoku_solver(board):
    problem = Problem()
    cells = [(r, c) for r in range(9) for c in range(9) if board[r][c] == 0]
    for cell in cells:
        problem.addVariable(cell, range(1, 10))
    
    def constraint_unique(values):
        return len(values) == len(set(values))
    
    for row in range(9):
        problem.addConstraint(constraint_unique, [(row, c) for c in range(9)])
    for col in range(9):
        problem.addConstraint(constraint_unique, [(r, col) for r in range(9)])
    for box_x in range(0, 9, 3):
        for box_y in range(0, 9, 3):
            problem.addConstraint(constraint_unique, [(box_x + i, box_y + j) for i in range(3) for j in range(3)])
    
    solution = problem.getSolution()
    if solution:
        for (r, c), val in solution.items():
            board[r][c] = val
    return board
```

---

### Tkinter-Based Graphical User Interface (GUI)

- Users can input puzzles and visualize the solving process.
- Implements a **solve button** and real-time board updates.

```python
import tkinter as tk

def create_gui():
    root = tk.Tk()
    root.title("AI Sudoku Solver")
    grid = [[tk.Entry(root, width=3, font=("Arial", 20)) for _ in range(9)] for _ in range(9)]
    for i in range(9):
        for j in range(9):
            grid[i][j].grid(row=i, column=j)
    tk.Button(root, text="Solve", command=lambda: solve_sudoku(grid)).grid(row=10, column=4)
    root.mainloop()

create_gui()
```

---

## Results & Performance

### 1. Backtracking vs. AI Constraint Solver

![Sudoku Solver Performance](../images/sudoku-performance.png)

- **Backtracking solver works efficiently for most puzzles.**
- **Constraint satisfaction approach excels in complex scenarios.**

### 2. User-Friendly Sudoku Interface

![Sudoku GUI](../images/sudoku-gui.png)

- **Intuitive Tkinter GUI** enables easy puzzle input and solution visualization.
- **Fast execution time** on most 9x9 Sudoku puzzles.

---

## Challenges & Learnings

- **Performance Optimization:** Reduced unnecessary backtracking with **heuristic-based pruning**.
- **GUI Responsiveness:** Ensured smooth updates using **Tkinter event handling**.
- **Algorithm Comparison:** Tested different AI models to evaluate speed vs. accuracy.

---

## Future Improvements

- **Web-Based Version:** Convert the GUI to a **React.js frontend with a Flask API**.
- **Automated Puzzle Generator:** Implement a Sudoku generator using **randomized constraint solving**.
- **Mobile App Deployment:** Build a **React Native version** for cross-platform Sudoku solving.

---

## Conclusion

The **AI-Powered Sudoku Solver** combines **traditional backtracking algorithms** with **advanced constraint satisfaction techniques** to efficiently solve Sudoku puzzles. The **interactive GUI** enhances usability, making it an ideal tool for Sudoku enthusiasts and AI researchers alike.

