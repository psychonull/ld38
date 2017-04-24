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
      case Grid.CellState.Born:
      case Grid.CellState.Baby: { 
        animation = 'GrowingBack'; 
        this.nextAnimation = 'Baby'; 
        Sup.Audio.playSound("Grid/Ungrow", 0.2); 
        break; 
      } 
      case Grid.CellState.Alive: { 
        animation = 'Growing'; 
        this.nextAnimation = 'Alive';  
        Sup.Audio.playSound("Grid/Grow", 0.2); 
        break; 
      }   
      case Grid.CellState.Empty: { 
        animation = 'Dying'; 
        this.nextAnimation = 'Empty'; 
        // Sup.Audio.playSound("Grid/Dead", 0.3); 
        break; 
      }
    }
    
    sprite.setAnimation(animation, false);
    this.iddleDelay = Date.now();
    this.frameLapsedTime = 1000/sprite.getAnimationSpeed();
    
    this.currentState = nextState;
  }
  
}
Sup.registerBehavior(CellBehavior);
