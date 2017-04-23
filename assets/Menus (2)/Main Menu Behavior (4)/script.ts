class MainMenuBehavior extends Sup.Behavior {
  
  currentGameMode = GameModes.normal;
  
  flyingShitTween: Sup.Tween;
  
  awake() {
    var flyingShit = Sup.getActor("FlyingShit");
    this.flyingShitTween = new Sup.Tween(flyingShit, {scale: 1, color: 0})
      .to({scale: 4, color: 1}, 4000)
      .onUpdate(obj => {
        if(this.currentGameMode === GameModes.zen){
          flyingShit.setLocalScale(Sup.Math.lerp(obj.scale, 2, 0.1));
          return;
        }
        if(this.currentGameMode === GameModes.frenzy){
          flyingShit.spriteRenderer.setColor(new Sup.Color(0xCC0000 * obj.color));
        }
        else {
          flyingShit.spriteRenderer.setColor(new Sup.Color(0xFFFFFF));
        }
        flyingShit.setLocalScale(obj.scale);
      })
      .yoyo(true)
      .repeat(Infinity)
      .start();
  }

  update() {
    if(Sup.Input.wasKeyJustPressed("SPACE")){
      this.startTween();
    }
    if(Input.left() && this.hasPrevGameMode()){
      this.changeGameMode(-1);
    }
    if(Input.right() && this.hasNextGameMode()){
      this.changeGameMode(+1);
    }
  }
  
  hide(){
    this.actor.destroy();
  }
  
  hasPrevGameMode():boolean{
    return this.currentGameMode - 1 >= 0;
  }
  
  hasNextGameMode():boolean{
    return this.currentGameMode + 1 <= (Object.keys(GameModes).length / 2) - 1;
  }
  
  changeGameMode(dir: number){
    var nextGameMode = this.currentGameMode + dir;
    this.currentGameMode = nextGameMode;
    let textRenderer = Sup.getActor("GameModeLabel").textRenderer;
    textRenderer.setText(`${ this.hasPrevGameMode() ? '<<' : ''}  Game mode:  ${GameModes[this.currentGameMode]} ${ this.hasNextGameMode() ? '>>' : ''}`);
  }
  
  startTween(){
    var flyingShit = Sup.getActor("FlyingShit");
    this.flyingShitTween.stop();
    
    this.flyingShitTween = new Sup.Tween(flyingShit, flyingShit.getPosition())
      .to({x: 0, y: 0, z: 14.9}, 750)
      .onUpdate(obj => {
        flyingShit.setPosition(obj);
      })
      .onComplete(() => Game.reset(this.currentGameMode))
      .start();
  }
}
Sup.registerBehavior(MainMenuBehavior);
