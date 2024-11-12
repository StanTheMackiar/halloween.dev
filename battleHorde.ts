function battleHorde(zombies: string, humans: string) {
  let lastWinner = {
    power: 0,
    winner: "x"
  };

  if (zombies.length != humans.length) return lastWinner.winner;

  for (let i = 0; i < zombies.length; i++) {
    const zVictoryPower = lastWinner.winner === "z" ? lastWinner.power : 0;
    const hVictoryPower = lastWinner.winner === "h" ? lastWinner.power : 0;

    const zombieFinalPower = Number(zombies[i]) + zVictoryPower;
    const humanFinalPower = Number(humans[i]) + hVictoryPower;

    const fightResult = zombieFinalPower - humanFinalPower;

    lastWinner = {
      power: Math.abs(fightResult),
      winner: fightResult > 0 ? "z" : fightResult < 0 ? "h" : "x"
    };
  }

  if (lastWinner.winner === "x") return lastWinner.winner;
  return `${lastWinner.power}${lastWinner.winner}`;
}

const zombies = "11111";
const humans = "11111";

console.log(battleHorde(zombies, humans));
