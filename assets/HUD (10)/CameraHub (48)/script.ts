class CameraHudBehavior extends Sup.Behavior {
  awake() {
  }

  update() {
    let camera = Sup.getActor("Camera");
    this.actor.setPosition( camera.getX() - 8 , camera.getY() - 4);
  }
}
Sup.registerBehavior(CameraHudBehavior);