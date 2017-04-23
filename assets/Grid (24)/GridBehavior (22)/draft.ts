class GridBehavior extends Sup.Behavior {
  rows = 20;
  columns = 30;
  cellSize = 1.28;
  generateEvery = 3; // seconds

  private grid = [];
  private cells = [];
  private tickGeneration: Function;
  
  setInitAlive() {
    for (let i=0; i<50; i++){
      const rndY = Sup.Math.Random.integer(0, this.rows-1);
      const rndX = Sup.Math.Random.integer(0, this.columns-1);
      this.grid[rndY][rndX] = Grid.CellState.Alive;
    }
  }
  
  createCells() {
    this.grid = Grid.generateEmptyGrid(this.rows, this.columns);
    this.setInitAlive();
  
    for (let y = 0; y < this.grid.length; y++) {
      this.cells[y] = [];
      
      for (let x = 0; x < this.grid[y].length; x++) {
        let actors: Sup.Actor[] = Sup.appendScene("Grid/CellPrefab");
        actors[0].setPosition(x * this.cellSize, y * this.cellSize, 0);
        actors[0].getBehavior(CellBehavior).setState(this.grid[y][x]);
        this.cells[y][x] = actors[0];
      }
    }
  
    this.tickGeneration = Utils.throttle(() => {
      const newGrid = Grid.nextGeneration(this.grid);
      this.updateCellsState(newGrid);
      this.grid = newGrid;
    }, this.generateEvery * 1000);
  }
  
  updateCellsState(grid) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (this.cells[y][x]) {
          this.cells[y][x].getBehavior(CellBehavior).setState(grid[y][x]);
        }
      }
    }
  }
  
  awake() {
    this.createCells();
  }

  update() {
    this.tickGeneration();
  }
}
Sup.registerBehavior(GridBehavior);