class CellSpawner {
    
  static getRandomRanges(from, to, qty) {
    const ranges = [];
    
    for (let i=0; i < qty; i++){
      ranges.push(Utils.getRandomPosition(from, to))
    }
    
    return ranges;
  }
  
  static getRandomEnemyPositions(offset, cols, rows, qty = 15) {
    const halfOffset = Math.round(offset / 2);
    
    const rnd = Utils.getRandomPosition(
      {x: offset, y: offset},
      {x: cols-offset, y: rows-offset}
    )
    
    return this.getRandomRanges(
      {x: rnd.x-halfOffset, y: rnd.y-halfOffset},
      {x: rnd.x+halfOffset, y: rnd.y+halfOffset},
      qty
    )
  }
  
}
