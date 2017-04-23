
interface PowerUpDefinition {
  behavior: any, //Sup.Behavior;
  target: string;
  extra: any;
};

module PowerUpGenerator  {
  
  export function getRandom(): PowerUpDefinition {
    return Sup.Math.Random.sample([
      null,
      null,
      null,
      null,
      null,
      null,
      {
        behavior: MultipleShootBehavior,
        target: "Player",
        extra: {
          quantity: Sup.Math.Random.integer(2, 5),
          shotsAvailable: Sup.Math.Random.integer(5, 15)
        }
      }
    ]);
  };
        
}