module Utils {

  //TODO: How do we use lodash?
  export function throttle(fn:Function, ms: number):Function {
    
    let whenToCall = 0;
    return (...args) => {
      if(whenToCall > Date.now()){
        return;
      }
      whenToCall = Date.now() + ms;
      return fn.apply(args);
    }
  }
  
  export function throttleExp(fn:Function, ms: number):Function {
    let whenToCall = 0;
    return (nextMS: number) => {
      if(whenToCall > Date.now()){
        return;
      }
      whenToCall = Date.now() + (nextMS || ms);
      return fn();
    }
  }
  
  export function delay(fn:Function, ms: number):Function {
    let whenToCall = Date.now() + ms;
    return (...args) => {
      if(whenToCall > Date.now()){
        return;
      }
      return fn.apply(args);
    }
  }
  
  export function getRandomPosition(from, to) {
    return {
      y: Sup.Math.Random.integer(from.y, to.y), 
      x: Sup.Math.Random.integer(from.x, to.x)
    };
  }
  
}