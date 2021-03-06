class SimpleShootBehavior extends Sup.Behavior {
  
  movementBehavior: MovementBehavior;
  pool: BulletPool;
  
  static MAX_BULLETS = 10;
  static TIME_BETWEEN = 250;
  
  throttledShoot: Function;
  
  awake() {
    this.movementBehavior = this.actor.getBehavior(MovementBehavior);
    this.pool = new BulletPool();
    this.throttledShoot = Utils.throttle(() => this.pool.shoot(this.actor.getPosition(), this.movementBehavior.angle), SimpleShootBehavior.TIME_BETWEEN);
  }

  update() {
    if(Input.shootBtn()) {
                                            //   S
      //Sup.log(this.movementBehavior.angle)// S H O O T
                                            //   O
                                            //   O
                                            //   T
    
      // this.pool.shoot(this.actor.getPosition(), this.movementBehavior.angle);
      this.throttledShoot();
    }
  }
}
Sup.registerBehavior(SimpleShootBehavior);
