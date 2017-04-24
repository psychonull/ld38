class GameOverBehavior extends Sup.Behavior {
  
  music: Sup.Audio.SoundPlayer;
  currentGameMode = Game.mode;
  
  flyingShitTween: Sup.Tween;
  
  awake() {
    const stats = Game.lastStats;
    
    const actor = Sup.getActor("GameOverStats");
    actor.getChild("Generations").textRenderer.setText(`Generations: ${stats.generation}`);
    actor.getChild("Population").textRenderer.setText(`Population: ${stats.population}`);
    actor.getChild("Kills").textRenderer.setText(`Kills: ${stats.kills}`);
    
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
    
    this.changeGameMode(0);
    
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
  
  hasPrevGameMode():boolean{
    return this.currentGameMode - 1 >= 0;
  }
  
  hasNextGameMode():boolean{
    return this.currentGameMode + 1 <= (Object.keys(GameModes).length / 2) - 1;
  }
  
  changeGameMode(dir: number){
    Sup.Audio.playSound("Menus/ChangeMenu");
    
    var nextGameMode = this.currentGameMode + dir;
    this.currentGameMode = nextGameMode;
    let textRenderer = Sup.getActor("GameModeLabel").textRenderer;
    textRenderer.setText(`${ this.hasPrevGameMode() ? '<<' : ''}  Try again in:  ${GameModes[this.currentGameMode]} ${ this.hasNextGameMode() ? '>>' : ''}`);
  }
  
  startTween(){
    Sup.Audio.playSound("Menus/SelectMenu", 2);
    
    var flyingShit = Sup.getActor("FlyingShit");
    this.flyingShitTween.stop();
    
    this.flyingShitTween = new Sup.Tween(flyingShit, flyingShit.getPosition())
      .to({x: 0, y: 0, z: 14.9}, 750)
      .onUpdate(obj => {
        flyingShit.setPosition(obj);
      })
      .onComplete(() => {
        Sup.Audio.playSound("Menus/SelectMenu", 2);
        Game.reset(this.currentGameMode);
      })
      .start();
  }
  
}
Sup.registerBehavior(GameOverBehavior);
