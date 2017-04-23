class PlayerCollisionBehavior extends Sup.Behavior { 
  awake() {

  }

  update() {
    //Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.borders);
  }
}
Sup.registerBehavior(PlayerCollisionBehavior);
