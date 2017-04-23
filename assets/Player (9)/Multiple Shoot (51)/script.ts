class MultipleShootBehavior extends Sup.Behavior {
  
  quantity = 5;
  
  movementBehavior: MovementBehavior;
  pool: BulletPool;
  
  timeThrottle = 500;
  
  throttledShoot: Function;
  
  awake() {
    this.movementBehavior = this.actor.getBehavior(MovementBehavior);
    this.pool = new BulletPool(this.quantity * 5);
    this.throttledShoot = Utils.throttle(() => {
      var angles = this.getAngles(this.movementBehavior.angle, this.quantity);
      angles.forEach(angle => this.pool.shoot(this.actor.getPosition(), angle));
    }, this.timeThrottle);
  }
  
  getAngles(baseAngle:number, count:number):number[] {
    let result = [];
    const OPENING = 1;
    const step = OPENING / count;
    let initial = baseAngle - (OPENING / count / 2);
    for(let i = 0; i < count; i++){
      result.push(initial + step * i);
    }
    return result;
  }

  update() {
    if(Input.shootBtn()) {
      this.throttledShoot();
    }
  }
}
Sup.registerBehavior(MultipleShootBehavior);
