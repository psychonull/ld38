class MovementBehavior extends Sup.Behavior {
  
  isMoving = false;
  angle = 0;
  targetAngle = 0;
  moveSpeed = 0;
  
  static maxMoveSpeed = 1;
  
  modelActor:Sup.Actor;
  orientation = new Sup.Math.Quaternion();
  
  private speed: Sup.Math.Vector2 = new Sup.Math.Vector2(0, 0);
  private defAcceleration = 0.0001;
  private acceleration = 0.001;
  
  awake() {
    this.modelActor = this.actor.getChild("PlayerSprite");  
    this.modelActor.spriteRenderer.setAnimation("iddle");
  }

  update() {
    this.checkMovement();
    this.checkPointing();
  }
  
  clampSpeed(coord) {
    return Sup.Math.clamp(coord, -MovementBehavior.maxMoveSpeed, MovementBehavior.maxMoveSpeed);
  }
  
  checkMovement() {
    let angle = Input.getMovementAngle();
    let pressing = false;
      
    if (angle != null) {
      this.targetAngle = angle;
      this.isMoving = true;
      pressing = true
    }
    
    let acc = this.defAcceleration;
    if (pressing) {
      acc = this.acceleration + this.moveSpeed;
    }
    
    const vel = new Sup.Math.Vector2(Math.cos(this.targetAngle) * acc, Math.sin(this.targetAngle) * acc);
    this.speed = this.actor.arcadeBody2D.getVelocity().clone().add(vel);
    
    this.speed = new Sup.Math.Vector2(this.clampSpeed(this.speed.x), this.clampSpeed(this.speed.y));
    this.actor.arcadeBody2D.setVelocity(this.speed);
    
    /*
    let velocity = this.actor.arcadeBody2D.getVelocity();
    this.speed = Sup.Math.clamp(this.speed, 0, MovementBehavior.maxMoveSpeed);
    velocity.set(Math.cos(this.targetAngle) * this.speed, Math.sin(this.targetAngle) * this.speed);
    this.actor.arcadeBody2D.setVelocity(velocity);
    */
    
    if (this.speed.x === 0 && this.speed.y == 0) {
      this.modelActor.spriteRenderer.setAnimation("iddle");
    }
    else {
      this.modelActor.spriteRenderer.setAnimation("walk");
    }
  }
  
  checkPointing() {
    let cam = Sup.getActor("Camera").camera;
    let mousePositionScreen = Sup.Input.getMousePosition();
    let mousePosition = new Sup.Math.Vector3(mousePositionScreen.x, mousePositionScreen.y, 0);
    mousePosition.unproject(cam);
    
    let xDiff: number;
    let yDiff: number;
    let position = this.actor.getPosition();
    xDiff = mousePosition.x - position.x;
    yDiff = mousePosition.y - position.y;
    this.angle = Math.atan2(yDiff, xDiff);
      
    this.orientation.setFromYawPitchRoll(0, 0, this.angle);
    this.actor.setOrientation(this.orientation);
  }
  
}
Sup.registerBehavior(MovementBehavior);
