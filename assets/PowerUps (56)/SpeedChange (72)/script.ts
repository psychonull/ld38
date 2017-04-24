class SpeedChangeBehavior extends Sup.Behavior {
  
  speedFactor = 2;
  time = 2 * 1000;
  
  timer: number;
  
  awake() {
    var movementBehavior = this.actor.getBehavior(MovementBehavior);
    var previousMoveSpeed = movementBehavior.moveSpeed;
    movementBehavior.moveSpeed = movementBehavior.moveSpeed * this.speedFactor;
    this.timer = Sup.setTimeout(this.time, () => {
      movementBehavior.moveSpeed = previousMoveSpeed;
      this._destroy();
    });
  }

  update() {
    
  }
  
  _destroy(){ //HACK???
    try {
      this.destroy();
    }
    catch(ex){
      Sup.log("error trying to suicide behavior");
    }
  }
  
  onDestroy() {
    if(this.timer){
      Sup.clearTimeout(this.timer);
    }
  }
}
Sup.registerBehavior(SpeedChangeBehavior);
