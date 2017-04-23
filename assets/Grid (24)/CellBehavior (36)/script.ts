class CellBehavior extends Sup.Behavior {
  
  gridX: number;
  gridY: number;
  
  awake() {
      
  }

  update() {
    
  }
  
  setState(nextState: number) {
    let animation = '';
    
    switch(nextState) {
      case Grid.CellState.Growing: animation = 'Dead'; break; 
      case Grid.CellState.Alive: animation = 'Alive'; break; 
      case Grid.CellState.Dead: animation = 'Empty'; break; 
      default: animation = 'Empty';
    }
    
    this.actor.spriteRenderer.setAnimation(animation);
  }
  
}
Sup.registerBehavior(CellBehavior);
