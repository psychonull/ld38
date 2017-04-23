class GridBehavior extends Sup.Behavior {
  
  x_size = 30;
  y_size = 20;

  private grid = [];
  private size = 100;

  generateGrid() {
    
    for (let x = 0; x < this.x_size; x++) {
      let line = [];
    
      for (let y = 0; y < this.y_size; y++) {
        let actors: Sup.Actor[] = Sup.appendScene("Grid/CellPrefab")
        actors[0].setPosition(x, y, 0);
        line.push(actors[0]);
      }
      
      this.grid.push(line);
    }  
  }
  
  awake() {   
    this.generateGrid();
  }

  update() {
    for (let x = 0; x < this.x_size; x++) {
      for (let y = 0; y < this.y_size; y++) {
        if(x/y == 0) {
          this.grid[x][y].spriteRenderer.setAnimation("Alive");
        }
      }
    }  
  }
}
Sup.registerBehavior(GridBehavior);