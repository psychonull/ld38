class SimpleShootBehavior extends Sup.Behavior {
  
  movementBehavior: MovementBehavior;
  
  awake() {
    this.movementBehavior = this.actor.getBehavior(MovementBehavior);
  }

  update() {
    if(Input.shootBtn()) {
                                            //   S
      Sup.log(this.movementBehavior.angle); // S H O O T
                                            //   O
                                            //   O
                                            //   T
    }
  }
}
Sup.registerBehavior(SimpleShootBehavior);
