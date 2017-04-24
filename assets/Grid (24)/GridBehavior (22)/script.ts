class GridBehavior extends Sup.Behavior {
  rows = 20;
  columns = 30;
  cellSize = 1.28;
  generateEvery = 3; // seconds
  increaseGenerationBy = 1; //seconds
  spawnersAmount = 3;
  rangeEnemiesPerGen = new Sup.Math.Vector2(15, 30);
  
  maxCellsRandom = 30;
  maxArea = 30;
  
  borders = [];

  aliveCells = [];
  
  private grid = [];
  private cells = [];
  
  private tickGeneration: Function;
  
  private generation = 0;
  private population = 0;
  private kills = 0;
  
  getOffset() {
   return  {
      x: this.cellSize * Math.round(this.columns / 2) * -1,
      y: this.cellSize * Math.round(this.rows / 2) * -1
    };
  }

  createBorders() {
    const offset = this.getOffset();
      
    let leftBorderActor = new Sup.Actor("leftBorder");
    let rightBorderActor = new Sup.Actor("rightBorder");
    let topBorderActor = new Sup.Actor("topBorder");
    let bottomBorderActor = new Sup.Actor("bottomBorder");

    let x, y;
    
    x = -this.cellSize + offset.x;
    y = (this.rows*this.cellSize/2-this.cellSize/2) + offset.y;
    new Sup.SpriteRenderer(leftBorderActor, "Grid/BorderV");
    leftBorderActor.setLocalScaleY(this.columns*this.cellSize+this.cellSize);
    leftBorderActor.setPosition(x, y, 0);
    let leftBorder = new Sup.ArcadePhysics2D.Body(leftBorderActor,Sup.ArcadePhysics2D.BodyType.Box,  {width:0.1, height:this.columns*this.cellSize, movable: false})
    leftBorderActor.arcadeBody2D.warpPosition(x, y);
    
    x = (this.columns*this.cellSize) + offset.x;
    y = (this.rows*this.cellSize/2-this.cellSize/2) + offset.y;
    new Sup.SpriteRenderer(rightBorderActor, "Grid/BorderV");
    rightBorderActor.setLocalScaleY(this.columns*this.cellSize+this.cellSize);
    rightBorderActor.setPosition(x, y, 0);
    let rightBorder = new Sup.ArcadePhysics2D.Body(rightBorderActor,Sup.ArcadePhysics2D.BodyType.Box,  {width:0.1, height:this.columns*this.cellSize+this.cellSize, movable: false})
    rightBorderActor.arcadeBody2D.warpPosition(x, y);

    x = (this.columns*this.cellSize/2-this.cellSize/2) + offset.x;
    y = (this.rows*this.cellSize) + offset.y;
    new Sup.SpriteRenderer(topBorderActor, "Grid/BorderH");
    topBorderActor.setLocalScaleX(this.rows*this.cellSize+this.cellSize);
    topBorderActor.setPosition(x, y, 0);
    let topBorder = new Sup.ArcadePhysics2D.Body(topBorderActor,Sup.ArcadePhysics2D.BodyType.Box,  {width:this.rows*(this.cellSize+1), height:0.1, movable: false})
    topBorderActor.arcadeBody2D.warpPosition(x, y);

    x = (this.columns*this.cellSize/2-this.cellSize/2) + offset.x;
    y = -this.cellSize + offset.y;
    new Sup.SpriteRenderer(bottomBorderActor, "Grid/BorderH");
    bottomBorderActor.setLocalScaleX(this.rows*this.cellSize+this.cellSize);
    bottomBorderActor.setPosition(x, y, 0);
    let bottomBorder = new Sup.ArcadePhysics2D.Body(bottomBorderActor,Sup.ArcadePhysics2D.BodyType.Box,  {width:this.rows*(this.cellSize+1), height:0.1, movable: false})
    bottomBorderActor.arcadeBody2D.warpPosition(x, y);

    this.borders.push(leftBorder);
    this.borders.push(rightBorder);
    this.borders.push(topBorder);
    this.borders.push(bottomBorder);
  }
  
  createCells() {
    this.grid = Grid.generateEmptyGrid(this.rows, this.columns);
    const offset = this.getOffset();
    
    const orientation = new Sup.Math.Quaternion();
  
    for (let y = 0; y < this.grid.length; y++) {
      this.cells[y] = [];
      
      for (let x = 0; x < this.grid[y].length; x++) {
        let actors: Sup.Actor[] = Sup.appendScene("Grid/CellPrefab");
        
        const _x = (x * this.cellSize) + offset.x;
        const _y = (y * this.cellSize) + offset.y;
        
        actors[0].setPosition(_x, _y, 0);
        
        const rot = orientation.setFromYawPitchRoll(0, 0, Math.atan2(Sup.Math.Random.integer(-100, 100), Sup.Math.Random.integer(-100, 100)));
        actors[0].setOrientation(orientation);
        
        const scale = Sup.Math.Random.float(1, 1.5);
        actors[0].setLocalScale(scale, scale, 1);
        
        actors[0].arcadeBody2D.warpPosition(_x, _y);
        
        let cellBehavior = actors[0].getBehavior(CellBehavior);
        cellBehavior.gridY = y;
        cellBehavior.gridX = x;
        
        this.cells[y][x] = actors[0];
      }
    }
    
    this.updateCellsState(this.grid);
  
    this.tickGeneration = Utils.throttleExp(() => {
      if (this.aliveCells.length < 10) {
        this.runSpawners();
      }
      
      const newGrid = Grid.nextGeneration(this.grid);
      this.updateCellsState(newGrid);
      this.grid = newGrid;
      this.generation++;
      
      this.generateEvery = Sup.Math.clamp(this.generateEvery - this.increaseGenerationBy, 0.1, 999);
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
    Sup.Audio.playSound("Grid/HitAlive", 1); 
    this.grid[cellBehavior.gridY][cellBehavior.gridX] = Grid.CellState.Empty;
    this.kills++;
    this.updateCellsState(this.grid);
  }
  
  getAliveCells() : Sup.Actor[] {
    return this.aliveCells;  
  }
  
  runSpawners() {
    for(let i=0; i<this.spawnersAmount; i++){
      const enemiesAmount = Sup.Math.Random.integer(this.rangeEnemiesPerGen.x, this.rangeEnemiesPerGen.y);
      const ranges = CellSpawner.getRandomEnemyPositions(4, this.columns, this.rows, enemiesAmount);
      
      ranges.forEach(rnd => {
        this.grid[rnd.y][rnd.x] = Grid.CellState.Born;// Grid.CellState.Baby;
      })
    }
  }
  
  getStats() {
    return {generation: this.generation, population: this.population, kills: this.kills};
  }
  
  awake() {
    this.kills = 0;
    this.population = 0;
    this.oveerridePropsBasedOnGameDifficulty();
    this.createCells();
    this.createBorders();
    this.runSpawners();
  }

  update() {
    this.tickGeneration(this.generateEvery * 1000);
  }
  
  oveerridePropsBasedOnGameDifficulty() {
    switch(Game.mode){
      case GameModes.zen: {
        this.rangeEnemiesPerGen = new Sup.Math.Vector2(5, 15);
        this.generateEvery = 5;
        this.increaseGenerationBy = 0.01;
        this.spawnersAmount = 1;
        break;
      }
      case GameModes.normal: {
        this.rangeEnemiesPerGen = new Sup.Math.Vector2(15, 30);
        this.generateEvery = 5;
        this.increaseGenerationBy = 0.05;
        this.spawnersAmount = 3;
        break;
      }
      case GameModes.frenzy: {
        this.rangeEnemiesPerGen = new Sup.Math.Vector2(20, 40);
        this.generateEvery = .2;
        this.increaseGenerationBy = 0;
        this.spawnersAmount = 4;
        break;
      }
    }
  }
}
Sup.registerBehavior(GridBehavior);