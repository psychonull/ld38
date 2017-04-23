class GenerationBehavior extends Sup.Behavior {
  fontActor: Sup.Actor = null;
  font = "Menus/GameTitleFont";
  generations = "Generation: "
  awake() {}

  update() {}
  
  setGeneration(value: number){
    if(this.fontActor)
      this.fontActor.destroy();
    
    let finalValue = this.generations + value;
    this.fontActor = new Sup.Actor("GenerationText", this.actor);
    new Sup.TextRenderer(this.fontActor, finalValue, this.font,{size: 30});
    this.fontActor.setLocalPosition(0,0,0);
  }
}
Sup.registerBehavior(GenerationBehavior);