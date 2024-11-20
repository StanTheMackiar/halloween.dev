console.time("10001prime");

export const getLastPrime = (targetPos = 10001) => {
  const currentPos = {
    prime: 0,
    position: 0
  };


  for (let candidate = 2; candidate < Infinity; candidate++) {
    let isPrime = true

    for (let divisor = 2; divisor <= Math.sqrt(candidate); divisor++) {
      if (candidate % divisor === 0) {
        isPrime = false;
        break;
      }
    }
  
    if (isPrime) {
      currentPos.position++
      currentPos.prime = candidate
    }

    if(currentPos.position === targetPos) {
      return currentPos
    }
  }
}

console.timeEnd("10001prime");

console.log(getLastPrime())