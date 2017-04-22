class GridBehavior extends Sup.Behavior {
  
 static x_size = 30;
  static y_size = 20;
  
 private grid = [];
  
 awake() {   
   for (let x = 0; x < GridBehavior.x_size; x++) {
      let line = [];
      for (let y = 0; y < GridBehavior.y_size; y++) {
        let newActor = new Sup.Actor(x + "_" + y);
        new Sup.SpriteRenderer(newActor, "Grid/Cell");
        newActor.setPosition(x, y, 0);
        line.push(newActor);
      }
      this.grid.push(line);
    }  
 }

 update() {
   for (let x = 0; x < GridBehavior.x_size; x++) {
      for (let y = 0; y < GridBehavior.y_size; y++) {
        if(x/y == 0) {
          this.grid[x][y].spriteRenderer.setAnimation("Alive");
        }
      }
    }  
 }
}
Sup.registerBehavior(GridBehavior);