class HubBehavior extends Sup.Behavior {
  grid;
  
  awake() {}

  initialize(grid){
    this.grid = grid;
    Sup.log(this.grid);
  }
  
  update() {    
    this.actor.getChild("GenerationValue").getBehavior(GenerationBehavior).setGeneration(this.grid.getBehavior(GridBehavior).getGenerationNumber());
  }
}
Sup.registerBehavior(HubBehavior);
 