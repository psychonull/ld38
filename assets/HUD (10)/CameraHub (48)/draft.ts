class CameraHudBehavior extends Sup.Behavior {
  awake() {
  }

  update() {
    let camera = Sup.getActor("Camera");
    this.actor.setPosition( camera.getX() , camera.getY());
  }
}
Sup.registerBehavior(CameraHudBehavior);