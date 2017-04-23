class CameraHudBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    let camera = Sup.getActor("Player");
    this.actor.setPosition( camera.getX() + 200, camera.getY() + 200, 5);
  }
}
Sup.registerBehavior(CameraHudBehavior);