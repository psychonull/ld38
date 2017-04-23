class CameraHudBehavior extends Sup.Behavior {
  awake() {
  }

  update() {
    let player = Sup.getActor("Player");
    this.actor.setPosition(player.getX() -16, player.getY() -8)
  }
}
Sup.registerBehavior(CameraHudBehavior);