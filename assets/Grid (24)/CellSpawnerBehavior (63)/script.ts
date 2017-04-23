class CellSpawnerBehavior extends Sup.Behavior {
  
  //spawnEvery = 5; // seconds
  isActive = true;
  
  //private tickSpawner: Function;
  //private onTickCallback: Function;
  
  getRandomRanges(from, to, qty) {
    const ranges = [];
    
    for (let i=0; i < qty; i++){
      ranges.push(Utils.getRandomPosition(from, to))
    }
    
    return ranges;
  }
  
  onTick(callback) {
    //this.onTickCallback = callback;
  }
  
  getRandomEnemyPositions(offset, cols, rows) {
    const halfOffset = offset / 2; // Must Be Integer
    
    const rnd = Utils.getRandomPosition(
      {x: offset, y: offset},
      {x: cols-offset, y: rows-offset}
    )
    
    return this.getRandomRanges(
      {x: rnd.x-halfOffset, y: rnd.y-halfOffset},
      {x: rnd.x+halfOffset, y: rnd.y+halfOffset},
      15
    )
  }
  
  awake() {
    // this.tickSpawner = Utils.throttle(this.onTickCallback, this.spawnEvery * 1000);
  }

  update() {
    // this.tickSpawner();
  }
}

Sup.registerBehavior(CellSpawnerBehavior);
