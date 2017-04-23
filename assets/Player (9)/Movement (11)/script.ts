class MovementBehavior extends Sup.Behavior {
  
  isMoving = false;
  angle = 0;
  targetAngle = 0;
  moveSpeed = 0;
  
  static maxMoveSpeed = 0.3;
  
  modelActor:Sup.Actor;
  orientation = new Sup.Math.Quaternion();
  
  awake() {
    this.modelActor = this.actor.getChild("PlayerSprite");  
    this.modelActor.spriteRenderer.setAnimation("iddle");
  }

  update() {
    this.checkMovement();
    this.checkPointing();
    if(Sup.Input.wasKeyJustPressed("M")){ //TODO: REMOVE THIS
      Game.showTitleScren();
    }
  }
  
  checkMovement() {
    let angle = Input.getMovementAngle();
      
    if (angle != null) {
      this.targetAngle = angle;
      this.isMoving = true;
    }
    else {
      this.modelActor.spriteRenderer.setAnimation("iddle");
      return this.actor.arcadeBody2D.setVelocity(0, 0);
    }
    
    let velocity = this.actor.arcadeBody2D.getVelocity();
    
    if(this.isMoving) {
      this.modelActor.spriteRenderer.setAnimation("walk");
      this.moveSpeed = Sup.Math.lerp(this.moveSpeed, MovementBehavior.maxMoveSpeed, 0.1);
      velocity.set(Math.cos(this.targetAngle) * this.moveSpeed, Math.sin(this.targetAngle) * this.moveSpeed);
    }
    else {
      velocity.set(0,0);  
    }
    
    this.actor.arcadeBody2D.setVelocity(velocity);
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
