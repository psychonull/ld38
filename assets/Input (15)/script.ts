module Input {
  // inspired by fat-kevin example
  // TODO: gamepads
  const checkJustPressed = (key:string, autoRepeat:boolean) => {
    return Sup.Input.wasKeyJustPressed(key, { autoRepeat });
  };
        
  export function up(autoRepeat=false):boolean {
    return checkJustPressed("UP", autoRepeat) || checkJustPressed("W", autoRepeat);
  }
  export function down(autoRepeat=false):boolean {
    return checkJustPressed("DOWN", autoRepeat) || checkJustPressed("S", autoRepeat);
  }
  export function left(autoRepeat=false):boolean {
    return checkJustPressed("LEFT", autoRepeat) || checkJustPressed("A", autoRepeat);
  }
  export function right(autoRepeat=false):boolean {
    return checkJustPressed("RIGHT", autoRepeat) || checkJustPressed("D", autoRepeat);
  }
  export function getMovementAngle():number {
    let angle = null;
    if (Sup.Input.isKeyDown("LEFT") || Sup.Input.isKeyDown("A")) {
      if (Sup.Input.isKeyDown("UP") || Sup.Input.isKeyDown("W")) angle = Math.PI * 3 / 4;
      else if (Sup.Input.isKeyDown("DOWN") || Sup.Input.isKeyDown("S")) angle = -Math.PI * 3 / 4;
      else angle = -Math.PI;

    } 
    else if (Sup.Input.isKeyDown("RIGHT") || Sup.Input.isKeyDown("D")) {
      if (Sup.Input.isKeyDown("UP") || Sup.Input.isKeyDown("W")) angle = Math.PI / 4;
      else if (Sup.Input.isKeyDown("DOWN") || Sup.Input.isKeyDown("S")) angle = -Math.PI / 4;
      else angle = 0;

    } else if (Sup.Input.isKeyDown("UP") || Sup.Input.isKeyDown("W")) angle = Math.PI / 2;
    else if (Sup.Input.isKeyDown("DOWN") || Sup.Input.isKeyDown("S")) angle = -Math.PI / 2;
    return angle; 
  }
  export function shootBtn():boolean {
    return Sup.Input.wasMouseButtonJustPressed(0);
  }
}