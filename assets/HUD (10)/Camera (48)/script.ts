class CameraHudBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    let player = Sup.getActor("Player");
    this.actor.setPosition( player.getX(), player.getY(), 5); 
  }
}
Sup.registerBehavior(CameraHudBehavior);