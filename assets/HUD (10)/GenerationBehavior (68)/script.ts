class GenerationBehavior extends Sup.Behavior {
  font = "Menus/Base Font";
  awake() {}

  update() {}
  
  setGeneration(value: number){
    let generation = new Sup.Actor("GenerationText", this.actor);
    new Sup.TextRenderer(generation, value, this.font,{size: 15});
    generation.setLocalPosition(0,0);
  }
}
Sup.registerBehavior(GenerationBehavior);