class SizeChangeBehavior extends Sup.Behavior {
  
  scale = 2;
  time = 3 * 1000;
  tween: Sup.Tween;
  
  timer: number;
  
  awake() {
    this.tween = new Sup.Tween(this.actor, {scale: 1})
      .to({scale: this.scale}, 400)
      .onUpdate(obj => {
        this.actor.setLocalScale(obj.scale);
      })
      .onComplete(() => {
        this.timer = Sup.setTimeout(this.time, () => {
          this.tween = new Sup.Tween(this.actor, {scale: this.scale})
            .to({scale: 1}, 400)
            .onUpdate(obj => {
              this.actor.setLocalScale(obj.scale);
            })
            .onComplete(() => this._destroy())
            .start();
        });
      })
      .start();
  }
  
  _destroy(){ //HACK???
    try {
      this.destroy();
    }
    catch(ex){
      Sup.log("error trying to suicide behavior");
    }
  }

  update() {
    
  }
  
  onDestroy() {
    if(this.timer){
      Sup.clearTimeout(this.timer);
    }
  }
}
Sup.registerBehavior(SizeChangeBehavior);