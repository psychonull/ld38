class SizeChangeBehavior extends Sup.Behavior {
  
  scale = 2;
  time = 3 * 1000;
  tween: Sup.Tween;
  
  sizeChanged = false;
  
  timer: number;
  
  awake() {
    this.tween = new Sup.Tween(this.actor, {scale: 1})
      .to({scale: this.scale}, 400)
      .onUpdate(obj => {
        this.actor.setLocalScale(obj.scale);
      })
      .onComplete(() => this.sizeChanged = true)
      .start();
  }

  update() {
    
    if(this.sizeChanged){
      this.sizeChanged = false;
      this.timer = Sup.setTimeout(this.time, () => {
        this.tween = new Sup.Tween(this.actor, {scale: this.scale})
          .to({scale: 1}, 400)
          .onUpdate(obj => {
            this.actor.setLocalScale(obj.scale);
          })
          .onComplete(() => this.destroy())
          .start();
      });
    }
    
  }
  
  onDestroy() {
    if(this.timer){
      Sup.clearTimeout(this.timer);
    }
  }
}
Sup.registerBehavior(SizeChangeBehavior);
