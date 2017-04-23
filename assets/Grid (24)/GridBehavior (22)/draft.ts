class GridBehavior extends Sup.Behavior {
  rows = 20;
  columns = 30;
  cellSize = 1.28;
  generateEvery = 3; // seconds
  
  maxCellsRandom = 30;
  maxArea = 30;
  
  borders = [];

  aliveCells = [];
  
  private grid = [];
  private cells = [];
  private tickGeneration: Function;
  
  setInitAlive() {
    const maxX = this.columns-1;
    const maxY = this.rows-1;
    
    for (let i=0; i<this.maxCellsRandom; i++){
      const rndY = Sup.Math.Random.integer(maxY - this.maxArea, maxY);
      const rndX = Sup.Math.Random.integer(maxX - this.maxArea, maxX);
      this.grid[rndY][rndX] = Grid.CellState.Alive;
    }
  }
  
  
  createBorders() {
    
    let leftBorder = new Sup.Actor("leftBorder");
    let rightBorder = new Sup.Actor("rightBorder");
    let topBorder = new Sup.Actor("topBorder");
    let bottomBorder = new Sup.Actor("bottomBorder");

    new Sup.SpriteRenderer(leftBorder, "Grid/BorderV");
    leftBorder.setLocalScaleY(this.columns*(this.cellSize+1));
    leftBorder.setPosition(-1, this.rows/2+this.cellSize, 0);
    leftBorderarcadeBody2D.warpPosition(x * this.cellSize, y * this.cellSize);
    
    new Sup.SpriteRenderer(rightBorder, "Grid/BorderV");
    rightBorder.setLocalScaleY(this.columns*(this.cellSize+1));
    rightBorder.setPosition(this.columns+this.cellSize*2, this.rows/2+this.cellSize, 0);
    
    this.borders.push(leftBorder);
    this.borders.push(rightBorder);
    
    let player = Sup.getActor("Player");
    Sup.ArcadePhysics2D.collides(player.arcadeBody2D, this.borders);

/*
    leftBorder.setLocalScaleY(this.columns);
    rightBorder.setLocalScaleY(this.columns);
    topBorder.setLocalScaleX(this.rows);
    bottomBorder.setLocalScaleX(this.rows);
    leftBorder.arcadeBody2D.warpPosition(-1, 0);
    rightBorder.arcadeBody2D.warpPosition(this.columns+0.1, 0);
    topBorder.arcadeBody2D.warpPosition(0, this.rows+0.1);
    bottomBorder.arcadeBody2D.warpPosition(0, 1);

    this.borders.push(leftBorder);
    this.borders.push(rightBorder);
    this.borders.push(topBorder);
    this.borders.push(bottomBorder);
    
    let player = Sup.getActor("Player");
    Sup.ArcadePhysics2D.collides(player.arcadeBody2D, this.borders);
    */
  }
  
  createCells() {
    this.grid = Grid.generateEmptyGrid(this.rows, this.columns);
    this.setInitAlive();
    
    const orientation = new Sup.Math.Quaternion();
  
    for (let y = 0; y < this.grid.length; y++) {
      this.cells[y] = [];
      
      for (let x = 0; x < this.grid[y].length; x++) {
        let actors: Sup.Actor[] = Sup.appendScene("Grid/CellPrefab");
        
        actors[0].setPosition(x * this.cellSize, y * this.cellSize, 0);
        
        const rot = orientation.setFromYawPitchRoll(0, 0, Math.atan2(Sup.Math.Random.integer(-100, 100), Sup.Math.Random.integer(-100, 100)));
        actors[0].setOrientation(orientation);
        
        const scale = Sup.Math.Random.float(0.3, 0.7);
        actors[0].setLocalScale(scale, scale, 1);
        
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