class TripleShootBehavior extends Sup.Behavior {
  
  quantity = 5;
  
  movementBehavior: MovementBehavior;
  pool: BulletPool;
  
  static TIME_BETWEEN = 250;
  
  throttledShoot: Function;
  
  awake() {
    this.movementBehavior = this.actor.getBehavior(MovementBehavior);
    this.pool = new BulletPool();
    this.throttledShoot = Utils.throttle(() => {
      this.pool.shoot(this.actor.getPosition(), this.movementBehavior.angle);
      this.pool.shoot(this.actor.getPosition(), this.movementBehavior.angle - .5);
      this.pool.shoot(this.actor.getPosition(), this.movementBehavior.angle + .5);
    }, SimpleShootBehavior.TIME_BETWEEN);
  }

  update() {
    if(Input.shootBtn()) {
      this.throttledShoot();
    }
  }
}
Sup.registerBehavior(TripleShootBehavior);
