class CameraHudBehavior extends Sup.Behavior {
  awake() {
  }

  update() {
    let camera = Sup.getActor("Camera");
    this.actor.setPosition( camera.getX() - 16 , camera.getY() - 8);
  }
}
Sup.registerBehavior(CameraHudBehavior);