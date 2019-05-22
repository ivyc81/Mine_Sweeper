export function drawRandom(chance, number){
  const numOfOutput = Math.floor(chance * number);
  const randoms = new Set();

  while(randoms.size < numOfOutput){
    randoms.add(Math.floor(Math.random() * number));
  }

  return randoms;
}