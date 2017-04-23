class SimpleShootBehavior extends Sup.Behavior {
  
  movementBehavior: MovementBehavior;
  pool: BulletPool;
  
  static MAX_BULLETS = 10;
  static TIME_BETWEEN = 100;
  
  awake() {
    this.movementBehavior = this.actor.getBehavior(MovementBehavior);
    this.pool = new BulletPool();
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
