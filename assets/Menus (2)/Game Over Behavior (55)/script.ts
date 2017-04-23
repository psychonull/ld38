class GameOverBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    if(Sup.Input.wasKeyJustPressed("SPACE")){
      Game.initialize();
    }
  }
}
Sup.registerBehavior(GameOverBehavior);
