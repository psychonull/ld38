
interface PowerUpDefinition {
  behavior: any; //Sup.Behavior;
  animation: string;
  target: string;
  extra: any;
};

module PowerUpAnimations {
  export function getFromBehavior(behavior):string {
    const behaviorToAnimation = [
      {behavior: MultipleShootBehavior, animation: 'Bullets'},
      {behavior: SpeedChangeBehavior, animation: 'Speed'},
      {behavior: SizeChangeBehavior, animation: 'Size'}
    ];
    for(let b of behaviorToAnimation){
      if(behavior instanceof b.behavior){
        return b.animation;
      }
    }
    return null;
  }
}

module PowerUpGenerator  {
  
  export function getRandom(): PowerUpDefinition {
    const getNulls = amount => {
      const nulls = [];
      for (let i=0; i<amount; i++) nulls.push(null);
      return nulls;
    }
    
    return Sup.Math.Random.sample([
      ...getNulls(50),
      {
        behavior: SpeedChangeBehavior,
        animation: "Speed",
        target: "Player",
        extra: {
          time: Sup.Math.Random.integer(1000, 5000),
          speedFactor: Sup.Math.Random.float(1.25, 2.5)
        }
      },
      {
        behavior: MultipleShootBehavior,
        animation: "Bullets",
        target: "Player",
        extra: {
          quantity: Sup.Math.Random.integer(2, 5),
          shotsAvailable: Sup.Math.Random.integer(5, 15)
        }
      },
      {
        behavior: SizeChangeBehavior,
        target: "Player",
        animation: "Size",
        extra: {
          time: Sup.Math.Random.integer(1000, 10000),
          scale: Sup.Math.Random.float(.5, 3)
        }
      }
      
    ]);
  };
        
}