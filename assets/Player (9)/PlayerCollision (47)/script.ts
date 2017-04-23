class PlayerCollisionBehavior extends Sup.Behavior {
  
  private borders = [];
  
  createBordersForCollision() {
    //let b = new Sup.ArcadePhysics2D.Body(this.actor, Sup.ArcadePhysics2D.BodyType.Box, { width: 1, height: 1, movable: true });
    //b.warpPosition(1, 1);
    //this.borders.push(b);
  }
  
  awake() {
    this.createBordersForCollision();
  }

  update() {
    //Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
    
  }
}
Sup.registerBehavior(PlayerCollisionBehavior);
