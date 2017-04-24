class GameOverBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    if(Sup.Input.wasKeyJustPressed("SPACE")){
      Sup.Audio.playSound("Menus/SelectMenu", 2);
      Game.initialize();
    }
  }
}
Sup.registerBehavior(GameOverBehavior);
