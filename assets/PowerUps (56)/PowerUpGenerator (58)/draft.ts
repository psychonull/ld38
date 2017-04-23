module PowerUpGenerator  {
  
  export function getRandom(): Sup.Scene | void {
    return Sup.Math.Random.sample([
      null,
      null,
      null,
      null,
      null,
      {}
    ]);
  };
        
}

enum PowerUps {
  MultipleShots
}