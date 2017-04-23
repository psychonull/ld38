class BasicBulletBehavior extends Sup.Behavior {
  
  //TODO - HOW DO WE HANDLE ALIVE STATUS
  
  moveSpeed = 1;
  
  angle = 0;
  powa = 10;
  position = new Sup.Math.Vector3();
  alive = false;
  maxDistance = 10;
  
  justShot = false;
  
  awake() {

  }
  
  shoot(fromPosition: Sup.Math.Vector3, angle: number){
    this.position = fromPosition;
    this.position.z = 1;
    this.angle = angle;
    this.alive = true;
    this.actor.setVisible(true);
    
    this.justShot = true;
  }

  update() {
    if(!this.alive){
      return;
    }
    if(this.justShot){ //TODO: Why can't I just call shoot() and set pos there?
      //this.moveSpeed = Sup.Math.lerp(this.moveSpeed, this.maxMoveSpeed, 0.1);
      this.actor.arcadeBody2D.warpPosition(this.position.x, this.position.y);
      this.actor.arcadeBody2D.setVelocity(Math.cos(this.angle) * this.moveSpeed, Math.sin(this.angle) * this.moveSpeed);
      this.actor.setPosition(this.position);
      this.justShot = false;
    }
    this.checkDistance(); 
    this.checkEnemyCollision();
  }
  
  checkDistance() {
    if(this.position.distanceTo(this.actor.getPosition()) > this.maxDistance) {
      this.collide();
    }  
  }
  
  checkEnemyCollision(){
    var gridBehavior = Sup.getActor("GridBehavior").getBehavior(GridBehavior);
    let aliveCells = gridBehavior.getAliveCells();
    
    aliveCells.forEach(cell => {
      if(Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, cell.arcadeBody2D)) {
        this.collide();
        gridBehavior.killCell(cell);
        this.generatePowerUp();
      }
    });
  }
  
  generatePowerUp(){
    var gen = PowerUpGenerator.getRandom();
    if(!gen){
      return;
    }
    var actor = Sup.appendScene(Sup.get("PowerUps/PowerUpPrefab", Sup.Scene))[0];
    actor.setPosition(this.actor.getPosition());
    actor.arcadeBody2D.warpPosition(actor.getPosition());
    actor.spriteRenderer.setAnimation(gen.animation);
    actor.spriteRenderer.playAnimation(true);
    var powerUpBehavior = actor.getBehavior(PowerUpBehavior);
    powerUpBehavior.init(gen);
  }
  
  collide() {
    this.alive = false;
    this.actor.setVisible(false);
  }
}
Sup.registerBehavior(BasicBulletBehavior);
