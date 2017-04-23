class BulletPool {
  
  static SIZE= 20;
  
  bullets: Sup.Actor[] = [];

  constructor() {
     for(let i = 0; i < BulletPool.SIZE; i++) {
       let actor =  Sup.appendScene(Sup.get("Bullets/BasicBulletPrefab", Sup.Scene))[0];
       this.bullets.push(actor);
     }
  }

  shoot(fromPosition: Sup.Math.Vector3, angle: number){
    let bulletsAvailable = this.getDestroyed();
    if(bulletsAvailable.length) { 
      bulletsAvailable[0].getBehavior(BasicBulletBehavior).shoot(fromPosition, angle);
    }
    else {
      Sup.log("No bullets available");
    }
  }

  getAlive() {
    return this.bullets.filter(b => b.getBehavior(BasicBulletBehavior).alive);
  }

  getDestroyed() {
    return this.bullets.filter(b => ! b.getBehavior(BasicBulletBehavior).alive);
  }
  
}