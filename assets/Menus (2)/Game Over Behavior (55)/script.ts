class GameOverBehavior extends Sup.Behavior {
  awake() {
    const stats = Game.lastStats;
    
    const actor = Sup.getActor("GameOverStats");
    actor.getChild("Generations").textRenderer.setText(`Generations: ${stats.generation}`);
    actor.getChild("Population").textRenderer.setText(`Population: ${stats.population}`);
    actor.getChild("Kills").textRenderer.setText(`Kills: ${stats.kills}`);
  }

  update() {
    if(Sup.Input.wasKeyJustPressed("SPACE")){
      Sup.Audio.playSound("Menus/SelectMenu", 2);
      Game.initialize();
    }
  }
}
Sup.registerBehavior(GameOverBehavior);
