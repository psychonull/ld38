class BulletPoolBehavior extends Sup.Behavior {
  
  static SIZE= 20;
  
  bullets: Sup.Actor[];

  awake() {
    this.bullets = [];
  }

  update() {
    
  }
  
  
  
}
Sup.registerBehavior(BulletPoolBehavior);
