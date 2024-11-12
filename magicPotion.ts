function createMagicPotion(
  potions: number[],
  goal: number
): number[] | undefined {
  const seenPowers = new Map<number, number>();

  for (let i = 0; i < potions.length; i++) {
    const currentPotion = potions[i];
    const complement = goal - currentPotion;

    if (seenPowers.has(complement)) {
      return [seenPowers.get(complement)!, i];
    }

    seenPowers.set(currentPotion, i);
  }

  return undefined;
}

const potions = [4, 5, 6, 2];
const goal = 8;

console.log(createMagicPotion(potions, goal));
