class MainMenuBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    if(Sup.Input.wasKeyJustPressed("SPACE")){
      this.hide();
      Sup.log("Exit main menu");
    }
  }
  
  hide(){
    this.actor.destroy();
  }
}
Sup.registerBehavior(MainMenuBehavior);
