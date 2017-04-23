class CellBehavior extends Sup.Behavior {
  awake() {
      
  }

  update() {
    
  }
  
  setState(nextState: number) {
    let animation = '';
    
    switch(nextState) {
      case Grid.CellState.Alive: animation = 'Alive'; break; 
      case Grid.CellState.Dead: animation = 'Dead'; break; 
      default: animation = 'Empty';
    }
    
    this.actor.spriteRenderer.setAnimation(animation);
  }
  
}
Sup.registerBehavior(CellBehavior);
