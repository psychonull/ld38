class TripleShootBehavior extends Sup.Behavior {
  
  quantity = 5;
  
  movementBehavior: MovementBehavior;
  pool: BulletPool;
  
  static TIME_BETWEEN = 250;
  
  throttledShoot: Function;
  
  awake() {
    var angles = this.getAngles(this.movementBehavior.angle, this.quantity);
    this.movementBehavior = this.actor.getBehavior(MovementBehavior);
    this.pool = new BulletPool();
    this.throttledShoot = Utils.throttle(() => {
      angles.forEach(angle => this.pool.shoot(this.actor.getPosition(), angle));
    }, SimpleShootBehavior.TIME_BETWEEN);
  }
  
  getAngles(baseAngle:number, count:number):number[] {
    let result = [];
    const OPENING = 1;
    const step = OPENING / count;
    if(count % 2 === 0){
      
    }
    else {
      let initial = baseAngle - (OPENING / count / 2);
      for(let i = 0; i < count; i++){
        result.push(i )
      }
    }
    return result;
  }

  update() {
    if(Input.shootBtn()) {
      this.throttledShoot();
    }
  }
}
Sup.registerBehavior(TripleShootBehavior);
