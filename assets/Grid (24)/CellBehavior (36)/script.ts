class CellBehavior extends Sup.Behavior {
  
  gridX: number;
  gridY: number;
  
  private iddleDelay;
  private nextAnimation;
  private frameLapsedTime;

  private currentState: Grid.CellState = Grid.CellState.Empty;
  
  awake() {
      
  }

  update() {    
    if(this.nextAnimation) {
      if((Date.now() - this.iddleDelay) >= this.frameLapsedTime) {
        this.actor.spriteRenderer.setAnimation(this.nextAnimation);
        this.nextAnimation = null;
        this.iddleDelay = 0;
      }
    }
  }
  
  setState(nextState: number) {
    let sprite = this.actor.spriteRenderer;
    let animation = 'Empty';
    
    let currentAnimation = sprite.getAnimation();
    if(nextState !== Grid.CellState.Empty && ['GrowingBack', 'Growing', 'Dying'].indexOf(currentAnimation) > -1) return;
    
    if(nextState === this.currentState) return;
        
    switch(nextState) {
      case Grid.CellState.Baby: { animation = 'GrowingBack'; this.nextAnimation = 'Baby'; break } 
      case Grid.CellState.Alive: { animation = 'Growing'; this.nextAnimation = 'Alive';  break; }   
      case Grid.CellState.Empty: { animation = 'Dying'; this.nextAnimation = 'Empty';  break; }
    }
    
    sprite.setAnimation(animation, false);
    this.iddleDelay = Date.now();
    this.frameLapsedTime = 1000/sprite.getAnimationSpeed();
    
    this.currentState = nextState;
  }
  
}
Sup.registerBehavior(CellBehavior);
