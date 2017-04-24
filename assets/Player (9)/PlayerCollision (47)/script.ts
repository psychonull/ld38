class PlayerCollisionBehavior extends Sup.Behavior { 
  
  gridBehavior: GridBehavior;
  
  awake() {
    
  }

  update() {
    this.checkEnemyCollision();
    this.checkBorderCollisions();
  }
  
   checkEnemyCollision(){
    if(!this.gridBehavior && Sup.getActor("GridBehavior")){
      this.gridBehavior = Sup.getActor("GridBehavior").getBehavior(GridBehavior);
    }
    if(!this.gridBehavior){
     return;
    }
     
    let aliveCells = this.gridBehavior.getAliveCells();
    
    aliveCells.forEach(cell => {
      if(Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, cell.arcadeBody2D)) {
        Game.lastStats = this.gridBehavior.getStats();
        Sup.Audio.playSound("Player/PlayerHit", 1);
        Sup.loadScene("Menus/GameOver");
      }
    });
  }
  
  checkBorderCollisions(){
    if(!this.gridBehavior && Sup.getActor("GridBehavior")){
      this.gridBehavior = Sup.getActor("GridBehavior").getBehavior(GridBehavior);
    }
    if(!this.gridBehavior){
      return;
    }
        
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.gridBehavior.borders);
  }
}
Sup.registerBehavior(PlayerCollisionBehavior);
