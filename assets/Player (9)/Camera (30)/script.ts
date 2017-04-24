class CameraBehavior extends Sup.Behavior {
    
  private cameraMin = new Sup.Math.Vector2(-11, -11);
  private cameraMax = new Sup.Math.Vector2(10, 10);

  awake() {
    // Sup.log(this.actor)
  }

  moveCamera() {
    let target = Sup.getActor("Player");
    const targetPos = new Sup.Math.Vector3(target.getX(), target.getY(), 5);
    
    const camera = this.actor;
    const cameraPos = camera.getPosition();
    
    let cameraScale = camera.camera.getOrthographicScale();
    let aspectRatio = camera.camera.getWidthToHeightRatio();
    
    const halfH = cameraScale / 2;
    const halfW = cameraScale * aspectRatio / 2;
  
    // const wantedPosition = new Sup.Math.Vector3(3*targetPos.x, 3*targetPos.y, camera.getZ());
    const wantedPosition = new Sup.Math.Vector3(targetPos.x, targetPos.y, camera.getZ());
    
    if (wantedPosition.x - halfW < this.cameraMin.x){
      wantedPosition.x = this.cameraMin.x + halfW;
    }

    if (wantedPosition.x + halfW > this.cameraMax.x){
      wantedPosition.x = this.cameraMax.x - halfW;
    }

    if (wantedPosition.y - halfH < this.cameraMin.y){
      wantedPosition.y = this.cameraMin.y + halfH;
    }

    if (wantedPosition.y + halfH > this.cameraMax.y){
      wantedPosition.y = this.cameraMax.y - halfH;
    }

    this.actor.setPosition(wantedPosition.clone());
  }
  
  update() {
    // let player = Sup.getActor("Player");
    // this.actor.setPosition( player.getX(), player.getY(), 5);
    
    this.moveCamera();  
  }
}
Sup.registerBehavior(CameraBehavior);
