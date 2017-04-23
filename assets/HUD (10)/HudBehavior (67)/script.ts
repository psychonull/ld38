class HubBehavior extends Sup.Behavior {
  grid;
  
  awake() {}

  initialize(grid){
    this.grid = grid;
    Sup.log(this.grid);
  }
  
  update() {
    let stats = this.grid.getBehavior(GridBehavior).getStats();
    this.actor.getChild("GenerationValue").getBehavior(GenerationBehavior).setGeneration(stats.generation);
  }
}
Sup.registerBehavior(HubBehavior);
 