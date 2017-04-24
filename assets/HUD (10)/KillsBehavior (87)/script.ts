class KillsBehavior extends Sup.Behavior {
  fontActor: Sup.Actor = null;
  font = "Menus/GameTitleFont";
  kills = "Kills: "
  
  awake() {}

  update() {}
  
  setKills(value: number){
    if(this.fontActor)
      this.fontActor.destroy();
    
    let finalValue = this.kills + value;
    this.fontActor = new Sup.Actor("KillsText", this.actor);
    new Sup.TextRenderer(this.fontActor, finalValue, this.font,{size: 30});
    this.fontActor.setLocalPosition(0,0,0);
  }
}
Sup.registerBehavior(KillsBehavior);
