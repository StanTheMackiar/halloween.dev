const defaultDream = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1]
];

console.time("findSafestPath");

function findSafestPath(sheet = defaultDream): number {
  const potentialRoutes: number[][][] = [];

  for (let y = 0; y < sheet.length; y++) {
    const row = sheet[y];

    for (let x = 0; x < row.length; x++) {
      const isAtStart = y === 0 && x === 0;
      if (isAtStart) potentialRoutes.push([[y, x]]);

      const hasRightNeighbor = Boolean(row[x + 1]);
      const hasBelowNeighbor = Boolean(sheet[y + 1]?.[x]);
      const rightNeighborCoords = [y, x + 1];
      const belowNeighborCoords = [y + 1, x];

      for (let i = 0; i < potentialRoutes.length; i++) {
        const currentRoute = potentialRoutes[i];

        const finalCoordsIndex = currentRoute.length - 1;
        const [finalCoordY, finalCoordX] = currentRoute[finalCoordsIndex];
        const isAtDestinationCell = finalCoordY === y && finalCoordX === x;

        if (!isAtDestinationCell) continue;

        //?Amplia las rutas colocando los vecinos, si existen dos caminos posibles, se bifurca creando una nueva ruta con todos los nodos anteriores y el vecino
        if (hasRightNeighbor && hasBelowNeighbor) {
          potentialRoutes.push([...currentRoute, belowNeighborCoords]);
          currentRoute.push(rightNeighborCoords);
        }

        if (!hasBelowNeighbor && hasRightNeighbor) {
          currentRoute.push(rightNeighborCoords);
        }

        if (!hasRightNeighbor && hasBelowNeighbor) {
          currentRoute.push(belowNeighborCoords);
        }
      }
    }
  }

  const betterRoute = potentialRoutes.reduce((acc, route) => {
    const routeSum = route.reduce((acc, [y, x]) => acc + sheet[y][x], 0);

    return routeSum < acc ? routeSum : acc;
  }, Infinity);

  console.log(potentialRoutes);

  return betterRoute;
}


console.timeEnd("findSafestPath");
console.log(findSafestPath());
