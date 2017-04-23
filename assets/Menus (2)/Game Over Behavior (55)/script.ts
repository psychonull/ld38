class GameOverBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    if(Sup.Input.wasKeyJustPressed("SPACE")){
      Sup.loadScene("Scene");
    }
  }
}
Sup.registerBehavior(GameOverBehavior);
