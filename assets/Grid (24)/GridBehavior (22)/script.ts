class GridBehavior extends Sup.Behavior {
  rows = 20;
  columns = 30;
  cellSize = 1.28;
  generateEvery = 3; // seconds
  spawnersAmount = 3;
  
  maxCellsRandom = 30;
  maxArea = 30;
  
  borders = [];

  aliveCells = [];
  
  private grid = [];
  private cells = [];
  private spawners = [];
  private tickGeneration: Function;
  
  generation = 0;
  population = 0;

  createBorders() {
    let leftBorderActor = new Sup.Actor("leftBorder");
    let rightBorderActor = new Sup.Actor("rightBorder");
    let topBorderActor = new Sup.Actor("topBorder");
    let bottomBorderActor = new Sup.Actor("bottomBorder");

    new Sup.SpriteRenderer(leftBorderActor, "Grid/BorderV");
    leftBorderActor.setLocalScaleY(this.columns*this.cellSize+this.cellSize);
    leftBorderActor.setPosition(-this.cellSize, this.rows*this.cellSize/2-this.cellSize/2, 0);
    let leftBorder = new Sup.ArcadePhysics2D.Body(leftBorderActor,Sup.ArcadePhysics2D.BodyType.Box,  {width:0.1, height:this.columns*this.cellSize, movable: false})
    leftBorderActor.arcadeBody2D.warpPosition(-this.cellSize, this.rows*this.cellSize/2-this.cellSize/2);

    new Sup.SpriteRenderer(rightBorderActor, "Grid/BorderV");
    rightBorderActor.setLocalScaleY(this.columns*this.cellSize+this.cellSize);
    rightBorderActor.setPosition(this.columns*this.cellSize, this.rows*this.cellSize/2-this.cellSize/2, 0);
    let rightBorder = new Sup.ArcadePhysics2D.Body(rightBorderActor,Sup.ArcadePhysics2D.BodyType.Box,  {width:0.1, height:this.columns*this.cellSize+this.cellSize, movable: false})
    rightBorderActor.arcadeBody2D.warpPosition(this.columns*this.cellSize, this.rows*this.cellSize/2-this.cellSize/2);

    new Sup.SpriteRenderer(topBorderActor, "Grid/BorderH");
    topBorderActor.setLocalScaleX(this.rows*this.cellSize+this.cellSize);
    topBorderActor.setPosition(this.columns*this.cellSize/2-this.cellSize/2, this.rows*this.cellSize, 0);
    let topBorder = new Sup.ArcadePhysics2D.Body(topBorderActor,Sup.ArcadePhysics2D.BodyType.Box,  {width:this.rows*(this.cellSize+1), height:0.1, movable: false})
    topBorderActor.arcadeBody2D.warpPosition(this.columns*this.cellSize/2-this.cellSize/2, this.rows*this.cellSize);

    new Sup.SpriteRenderer(bottomBorderActor, "Grid/BorderH");
    bottomBorderActor.setLocalScaleX(this.rows*this.cellSize+this.cellSize);
    bottomBorderActor.setPosition(this.columns*this.cellSize/2-this.cellSize/2, -this.cellSize, 0);
    let bottomBorder = new Sup.ArcadePhysics2D.Body(bottomBorderActor,Sup.ArcadePhysics2D.BodyType.Box,  {width:this.rows*(this.cellSize+1), height:0.1, movable: false})
    bottomBorderActor.arcadeBody2D.warpPosition(this.columns*this.cellSize/2-this.cellSize/2, -this.cellSize);

    this.borders.push(leftBorder);
    this.borders.push(rightBorder);
    this.borders.push(topBorder);
    this.borders.push(bottomBorder);
  }
  
  createCells() {
    this.grid = Grid.generateEmptyGrid(this.rows, this.columns);
    
    const orientation = new Sup.Math.Quaternion();
  
    for (let y = 0; y < this.grid.length; y++) {
      this.cells[y] = [];
      
      for (let x = 0; x < this.grid[y].length; x++) {
        let actors: Sup.Actor[] = Sup.appendScene("Grid/CellPrefab");
        
        actors[0].setPosition(x * this.cellSize, y * this.cellSize, 0);
        
        const rot = orientation.setFromYawPitchRoll(0, 0, Math.atan2(Sup.Math.Random.integer(-100, 100), Sup.Math.Random.integer(-100, 100)));
        actors[0].setOrientation(orientation);
        
        const scale = Sup.Math.Random.float(1, 1.5);
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
      this.generation++;
    }, this.generateEvery * 1000);
    
  }
  
  updateCellsState(grid) {
    this.aliveCells = [];
    this.population = 0;
    
    const nonPopulation  = [
      Grid.CellState.Empty,
      Grid.CellState.Dead
    ];
    
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if(grid[y][x] == Grid.CellState.Alive){
          this.aliveCells.push(this.cells[y][x]);
        }
        if(nonPopulation.indexOf(grid[y][x]) == -1) {
          this.population++;
        }
          
        
        this.cells[y][x].getBehavior(CellBehavior).setState(grid[y][x]);
      }
    }
  }
  
  killCell(cell: Sup.Actor) {
    let cellBehavior = cell.getBehavior(CellBehavior);
    this.grid[cellBehavior.gridY][cellBehavior.gridX] = Grid.CellState.Empty; // Grid.CellState.Dead;
    this.updateCellsState(this.grid);
  }
  
  getAliveCells() : Sup.Actor[] {
    return this.aliveCells;  
  }
  
  initSpawners(qty) {
    for(let i=0; i<qty; i++){
      const [actor] = Sup.appendScene("Grid/CellSpawnerPrefab");
      const behavior = actor.getBehavior(CellSpawnerBehavior);

      const ranges = behavior.getRandomEnemyPositions(4, this.columns, this.rows);
      ranges.forEach(rnd => {
        this.grid[rnd.y][rnd.x] = Grid.CellState.Baby;
      })

      this.updateCellsState(this.grid);
      this.spawners.push(actor);
    }
  }
  
  getStats() {
    return {generation: this.generation, population: this.population};
  }
  
  awake() {
    this.oveerridePropsBasedOnGameDifficulty();
    this.createCells();
    this.createBorders();
    this.initSpawners(this.spawnersAmount);
  }

  update() {
    this.tickGeneration();
  }
  
  oveerridePropsBasedOnGameDifficulty() {
    if(Game.mode === GameModes.zen){
      this.generateEvery = this.generateEvery + 4;
    }
    else if(Game.mode === GameModes.frenzy){
      this.generateEvery = .2;
    }
  }
}
Sup.registerBehavior(GridBehavior);