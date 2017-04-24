module Grid {
  
  export enum CellState {
    Born = -2,
    Empty = -1,
    Baby = 0,
    Alive = 1,
    Dead = 2   
  };

  export const generateEmptyGrid = (rows: Number, cols: Number) => {
    const newGrid = [];

    for (let y = 0; y < rows; y++) {
      newGrid[y] = [];
      for (let x = 0; x < cols; x++) {
        newGrid[y][x] = CellState.Empty;
      }
    }

    return newGrid;
  }

  export const v0 = val => val < 0 ? 0 : val;
  export const vm = (val, max) => val > max ? max : val;

  export const countNeighboursOf = value => (grid, y, x) => {
    const x1 = vm(x+1, grid.length - 1);
    const y1 = vm(y+1, grid[0].length - 1);

    return [
      grid[v0(x-1)][v0(y-1)], grid[x][v0(y-1)], grid[x1][v0(y-1)],
      grid[v0(x-1)][y], /* x, y */ grid[x1][y],
      grid[v0(x-1)][y1], grid[x][y1], grid[x1][y1]
    ].reduce((total, cell) => total + (cell === value ? 1 : 0), 0)
  }

  export const countAlives = countNeighboursOf(CellState.Alive)
  export const countDead = countNeighboursOf(CellState.Dead)

  export const createStateOf = grid => (x, y) => {
    let value = grid[y][x];
    const alives = countAlives(grid, x, y);

    if (value === CellState.Born) { // Only happen once at first born
      return CellState.Baby;
    }
    
    if (Sup.Math.Random.integer(0, 2) === 1) {
      return value;
    }
    
    if (value === CellState.Baby) {
      return CellState.Alive;
    }
    
    if (value === CellState.Alive && alives < 2 || alives > 4) {
      return CellState.Baby;
    }
    else if (value !== CellState.Alive && (alives === 3 || alives === 4)) {
      return CellState.Baby;
    }

    return value;
  }

  export const nextGeneration = grid => {
    const rows = grid.length;
    const cols = grid[0].length;
    
    const nextGrid = generateEmptyGrid(rows, cols);
    const nextStateAt = createStateOf(grid);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        nextGrid[y][x] = nextStateAt(x, y);
      }
    }

    return nextGrid;
  }
  
}