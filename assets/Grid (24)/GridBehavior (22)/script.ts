class GridBehavior extends Sup.Behavior {
  rows = 20;
  columns = 30;
  cellSize = 1.28;
  generateEvery = 3; // seconds
  borders = [];

  aliveCells = [];
  
  private grid = [];
  private cells = [];
  private tickGeneration: Function;
  
  setInitAlive() {
    for (let i=0; i<30; i++){
      const rndY = Sup.Math.Random.integer(0, this.rows-1);
      const rndX = Sup.Math.Random.integer(0, this.columns-1);
      this.grid[rndY][rndX] = Grid.CellState.Alive;
    }
  }
  
  
  createBorders() {
/*
    let leftBorder = Sup.getActor("LeftBorder");
    let rightBorder = Sup.getActor("RightBorder");
    let topBorder = Sup.getActor("TopBorder");
    let bottomBorder = Sup.getActor("BottomBorder");

    leftBorder.setLocalScaleY(this.columns);
    rightBorder.setLocalScaleY(this.columns);
    topBorder.setLocalScaleX(this.rows);
    bottomBorder.setLocalScaleX(this.rows);
    
    leftBorder.setX(-1);
    leftBorder.setY(0);

    rightBorder.setX(this.columns+1);
    rightBorder.setY(0);

    topBorder.setX(0);
    topBorder.setY(this.rows+1);

    bottomBorder.setX(0);
    bottomBorder.setY(-1);

    this.borders.push(leftBorder);
    this.borders.push(rightBorder);
    this.borders.push(topBorder);
    this.borders.push(bottomBorder);
    */
  }
  
  createCells() {
    this.grid = Grid.generateEmptyGrid(this.rows, this.columns);
    this.setInitAlive();
  
    for (let y = 0; y < this.grid.length; y++) {
      this.cells[y] = [];
      
      for (let x = 0; x < this.grid[y].length; x++) {
        let actors: Sup.Actor[] = Sup.appendScene("Grid/CellPrefab");
        actors[0].setPosition(x * this.cellSize, y * this.cellSize, 0);
        actors[0].arcadeBody2D.warpPosition(x * this.cellSize, y * this.cellSize);
        
        let cellBehavior = actors[0].getBehavior(CellBehavior);
        cellBehavior.gridY = y;
        cellBehavior.gridX = x;
        
        this.cells[y][x] = actors[0];
      }
    }
    
    this.updateCellsState(this.grid);
  
    this.tickGeneration = Utils.throttle(() => {
      const newGrid = Grid.nextGeneration(this.grid);
      this.updateCellsState(newGrid);
      this.grid = newGrid;
    }, this.generateEvery * 1000);
  }
  
  updateCellsState(grid) {
    this.aliveCells = [];
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if(grid[y][x] == Grid.CellState.Alive){
          this.aliveCells.push(this.cells[y][x]);
        }
        
        this.cells[y][x].getBehavior(CellBehavior).setState(grid[y][x]);
      }
    }
  }
  
  killCell(cell: Sup.Actor) {
    let cellBehavior = cell.getBehavior(CellBehavior);
    this.grid[cellBehavior.gridY][cellBehavior.gridX] = Grid.CellState.Dead;
    this.updateCellsState(this.grid);
  }
  
  getAliveCells() : Sup.Actor[] {
    return this.aliveCells;  
  }
  
  awake() {
    this.createCells();
    this.createBorders();
  }

  update() {
    this.tickGeneration();
  }
}
Sup.registerBehavior(GridBehavior);