class PowerUpBehavior extends Sup.Behavior {
  
  def: PowerUpDefinition;
  
  init(def: PowerUpDefinition){
    this.def = def;
  }
  
  awake() {
    
  }

  update() {
      if(Sup.ArcadePhysics2D.collides(Sup.getActor("Player").arcadeBody2D, this.actor.arcadeBody2D)){
        this.apply();
        this.actor.setVisible(false);
        this.destroy();
      }
  }
  
  apply() {
    var actor = Sup.getActor(this.def.target);
    
    if(!actor){
      return Sup.log('Error - no target for powerup', this.def.target);
    }
    
    let behavior = actor.getBehavior(this.def.behavior);
    
    if(behavior){
      behavior.destroy();
    }
    actor.addBehavior(this.def.behavior, this.def.extra);
  }
}
Sup.registerBehavior(PowerUpBehavior);
