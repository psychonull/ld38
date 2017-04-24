class HubBehavior extends Sup.Behavior {
  grid;
  
  awake() {}

  initialize(grid){
    this.grid = grid;
  }
  
  update() {
    let stats = this.grid.getBehavior(GridBehavior).getStats();
    this.actor.getChild("GenerationValue").getBehavior(GenerationBehavior).setGeneration(stats.generation);
    this.actor.getChild("PopulationValue").getBehavior(PopulationBehavior).setPopulation(stats.population);
    // this.actor.getChild("FPSValue").textRenderer.setText(`FPS: ${Sup.Game.getFPS()}`);
  }
}
Sup.registerBehavior(HubBehavior);
 