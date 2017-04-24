
class Camera {
  
  static CAMERAOBJECT_NAME = "Camera";
  // static DEFAULT_ZOOM = 10;

  // VIEWPORT POINT TO WORLD POSITION
  // Convert Viewport Point Units to World Position
  static ViewportToWorldPoint(x: number, y: number, z: number) : Sup.Math.Vector3
  {
    //Debug.Log(`Getting world position of ${x}, ${y}, ${z}`,"UI");
    let camera = Sup.getActor(Camera.CAMERAOBJECT_NAME);
    let cameraPos = camera.getPosition();
    let cameraScale = camera.camera.getOrthographicScale();
    let aspectRatio = Sup.Game.getScreenRatio().width / Sup.Game.getScreenRatio().height;
    let originPoint = Camera.Origin;
    return new Sup.Math.Vector3(
      originPoint.x + (x * (cameraScale * aspectRatio)),
      originPoint.y + (y * (cameraScale)),
      originPoint.z + z
    );
  }

  // WORLD POSITION TO VIEWPORT POINT
  // Convert World Position to Viewport Point
  static WorldToViewportPoint(worldPoint: Sup.Math.Vector3) : Sup.Math.Vector2
  {
    let camera = Sup.getActor(Camera.CAMERAOBJECT_NAME);
    //let cameraPos = camera.getPosition();
    let cameraScale = camera.camera.getOrthographicScale();
    let aspectRatio = Sup.Game.getScreenRatio().width / Sup.Game.getScreenRatio().height;
    let cameraBounds = Camera.Bounds;
    
    return new Sup.Math.Vector2(
      (worldPoint.x - cameraBounds.left) / (cameraScale * aspectRatio),
      (worldPoint.y - cameraBounds.bottom) / cameraScale
    );
  }

  // CAMERA BOUNDS
  // Get Bounds of Camera space
  static get Bounds()
  {
    let camera = Sup.getActor(Camera.CAMERAOBJECT_NAME);
    let cameraPos = camera.getPosition();
    let cameraScale = camera.camera.getOrthographicScale();
    let aspectRatio = Sup.Game.getScreenRatio().width / Sup.Game.getScreenRatio().height;
    return {
      bottom: cameraPos.y + (cameraScale / 2),
      top: cameraPos.y - (cameraScale / 2),
      left: cameraPos.x - ((cameraScale * aspectRatio) / 2),
      right: cameraPos.x + ((cameraScale * aspectRatio) / 2)
    };
  }

  // CAMERA ORIGIN
  // Get Origin (bottom, left) corner of Camera
  static get Origin() : Sup.Math.Vector3
  {
    let camera = Sup.getActor(Camera.CAMERAOBJECT_NAME);
    let cameraPos = camera.getPosition();
    let cameraScale = camera.camera.getOrthographicScale();
    let aspectRatio = Sup.Game.getScreenRatio().width / Sup.Game.getScreenRatio().height;
    return new Sup.Math.Vector3(
      cameraPos.x - (cameraScale * aspectRatio / 2),
      cameraPos.y - (cameraScale  / 2),
      cameraPos.z
    );
  }
}