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
  private spawners = [];
  private tickGeneration: Function;
  private tickSpawners: Function;
  
  generation = 22;
  
  getRandomPosition(from, to) {
    return {
      y: Sup.Math.Random.integer(from.y, to.y), 
      x: Sup.Math.Random.integer(from.x, to.x)
    };
  }

  createBorders() {
    
    let leftBorderActor = new Sup.Actor("leftBorder");
    let rightBorderActor = new Sup.Actor("rightBorder");
    let topBorderActor = new Sup.Actor("topBorder");
    let bottomBorderActor = new Sup.Actor("bottomBorder");

    new Sup.SpriteRenderer(leftBorderActor, "Grid/BorderV");
    leftBorderActor.setLocalScaleY(this.columns*this.cellSize+this.cellSize);
    leftBorderActor.setPosition(-1, this.rows/2+this.cellSize, 0);
    let leftBorder = new Sup.ArcadePhysics2D.Body(leftBorderActor,Sup.ArcadePhysics2D.BodyType.Box,  {width:0.1, height:this.columns*this.cellSize+this.cellSize, movable: false})
    leftBorderActor.arcadeBody2D.warpPosition(-1, this.rows/2+this.cellSize);

    new Sup.SpriteRenderer(rightBorderActor, "Grid/BorderV");
    rightBorderActor.setLocalScaleY(this.columns*this.cellSize+this.cellSize);
    rightBorderActor.setPosition(this.columns+this.cellSize*2, this.rows/2+this.cellSize, 0);
    let rightBorder = new Sup.ArcadePhysics2D.Body(rightBorderActor,Sup.ArcadePhysics2D.BodyType.Box,  {width:0.1, height:this.columns*this.cellSize+this.cellSize, movable: false})
    rightBorderActor.arcadeBody2D.warpPosition(this.columns*this.cellSize, this.rows/2+this.cellSize);

    new Sup.SpriteRenderer(topBorderActor, "Grid/BorderH");
    topBorderActor.setLocalScaleX(this.rows*this.cellSize+this.cellSize);
    topBorderActor.setPosition(this.columns*this.cellSize/2-this.cellSize/2, this.rows*this.cellSize, 0);
    let topBorder = new Sup.ArcadePhysics2D.Body(topBorderActor,Sup.ArcadePhysics2D.BodyType.Box,  {width:this.rows*(this.cellSize+1), height:0.1, movable: false})
    topBorderActor.arcadeBody2D.warpPosition(this.columns*this.cellSize/2-this.cellSize/2, this.rows*this.cellSize);

    new Sup.SpriteRenderer(bottomBorderActor, "Grid/BorderH");
    bottomBorderActor.setLocalScaleX(this.rows*this.cellSize+this.cellSize);
    bottomBorderActor.setPosition(this.columns*this.cellSize/2-this.cellSize/2, -1, 0);
    let bottomBorder = new Sup.ArcadePhysics2D.Body(bottomBorderActor,Sup.ArcadePhysics2D.BodyType.Box,  {width:this.rows*(this.cellSize+1), height:0.1, movable: false})
    bottomBorderActor.arcadeBody2D.warpPosition(this.columns*this.cellSize/2-this.cellSize/2, -1);

    this.borders.push(leftBorder);
    this.borders.push(rightBorder);
    this.borders.push(topBorder);
    this.borders.push(bottomBorder);
    

  }
  
  createCells() {
    this.grid = Grid.generateEmptyGrid(this.rows, this.columns);
    // this.setInitAlive();
    
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
    this.generation++;
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
  
  setRandomRange(from, to, qty) {
    for (let i=0; i < qty; i++){
      const rnd = this.getRandomPosition(from, to)
      this.grid[rnd.y][rnd.x] = Grid.CellState.Growing;
    }
  }  
  
  initSpawners() {
    const [actor] = Sup.appendScene("Grid/CellSpawnerPrefab");
    const offset = 4
    const halfOffset = offset / 2; // Must Be Integer
    const rnd = this.getRandomPosition(
      {x: offset, y: offset},
      {x: this.columns-offset, y: this.rows-offset}
    )
    
    actor.setPosition(rnd.x, rnd.y);
    this.spawners.push(actor);

    this.tickSpawners = Utils.throttle(() => {
      this.setRandomRange(
        {x: rnd.x-halfOffset, y: rnd.y-halfOffset},
        {x: rnd.x+halfOffset, y: rnd.y+halfOffset},
        5
      )
      
      this.updateCellsState(this.grid);
    }, this.generateEvery * 2000);
  }
  
  getGenerationNumber() : number {
    return this.generation;
  }
  
  awake() {
    this.createCells();
    this.createBorders();
    this.initSpawners();
  }

  update() {
    this.tickGeneration();
    this.tickSpawners();
    
    let player = Sup.getActor("Player");
    Sup.ArcadePhysics2D.collides(player.arcadeBody2D, this.borders);   
  }
}
Sup.registerBehavior(GridBehavior);