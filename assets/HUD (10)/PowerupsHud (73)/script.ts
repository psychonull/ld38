class PowerupsHudBehavior extends Sup.Behavior {
  
  powerUps = [];
  powerUpsActors: Sup.Actor[] = [];
  
  player: Sup.Actor;
  
  awake() {
    this.player = Sup.getActor("Player");
  }

  update() {
    this.powerUps = [
      ...this.player.getBehaviors(MultipleShootBehavior), 
      ...this.player.getBehaviors(SizeChangeBehavior),
      ...this.player.getBehaviors(SpeedChangeBehavior)
    ];
    if(this.powerUps.length !== this.powerUpsActors.length){
      this.renderPowerUps();
    }
  }
  
  renderPowerUps(){
    // TODO: dont recreate the full array for perf (?)
    this.powerUpsActors.forEach(a => {
      a.setVisible(false);
      a.destroy();
    });
    this.powerUpsActors = [];
    this.powerUps.forEach((pu, index) => {
      let animation = PowerUpAnimations.getFromBehavior(pu);
      if(!animation){
        return;
      }
      let actor = new Sup.Actor("PowerUpHud" + index, this.actor);
      actor.spriteRenderer = new Sup.SpriteRenderer(actor, "PowerUps/GenericPowerUpSprite");
      actor.spriteRenderer.setAnimation(animation, true);
      actor.spriteRenderer.playAnimation();
      actor.setLocalX(index);
      this.powerUpsActors.push(actor);
    });
  }
}
Sup.registerBehavior(PowerupsHudBehavior);
