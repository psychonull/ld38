class GenerationBehavior extends Sup.Behavior {
  fontActor: Sup.Actor = null;
  font = "Menus/Base Font";
  awake() {}

  update() {}
  
  setGeneration(value: number){
    if(this.fontActor)
      this.fontActor.destroy();
    
    this.fontActor = new Sup.Actor("GenerationText", this.actor);
    new Sup.TextRenderer(this.fontActor, value, this.font,{size: 15});
    this.fontActor.setLocalPosition(0,0);
  }
}
Sup.registerBehavior(GenerationBehavior);