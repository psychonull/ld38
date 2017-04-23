class PopulationBehavior extends Sup.Behavior {
  fontActor: Sup.Actor = null;
  font = "Menus/Base Font";
  population = "Population: "
  
  awake() {}

  update() {}
  
  setPopulation(value: number){
    if(this.fontActor)
      this.fontActor.destroy();
    
    let finalValue = this.population + value;
    this.fontActor = new Sup.Actor("PopulationText", this.actor);
    new Sup.TextRenderer(this.fontActor, finalValue, this.font,{size: 20});
    this.fontActor.setLocalPosition(0,0,0);
  }
}
Sup.registerBehavior(PopulationBehavior);
