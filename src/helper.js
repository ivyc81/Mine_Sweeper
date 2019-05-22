export function drawRandom(chance, number, exclude){
  const numOfOutput = Math.floor(chance * number);
  const randoms = new Set();

  while(randoms.size < numOfOutput){
    const randomNum = Math.floor(Math.random() * number);
    if(randomNum !== exclude){
      randoms.add(randomNum);
    }
  }

  return randoms;
}