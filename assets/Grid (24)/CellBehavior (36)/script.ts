class CellBehavior extends Sup.Behavior {
  awake() {
      
  }

  update() {
    
  }
  
  setState(nextState: Grid.CellState) {
    let animation = '';
    
    switch(nextState) {
      case Grid.CellState.Alive: animation = 'Alive';
      case Grid.CellState.Dead: animation = 'Dead';
      default: animation = 'Empty';
    }
    
    this.actor.spriteRenderer.setAnimation(animation);
  }
  
}
Sup.registerBehavior(CellBehavior);
