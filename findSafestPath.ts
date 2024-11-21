
console.time("findSafestPath");

function findSafestPath(dream: number[][]): number {
  const potentialRoutes: { total: number; path: number[][] }[] = [];
  let betterRouteIndex = 0;

  for (let y = 0; y < dream.length; y++) {
    const row = dream[y];

    for (let x = 0; x < row.length; x++) {
      const isAtStart = y === 0 && x === 0;

      if (isAtStart)
        potentialRoutes.push({
          total: row[x],
          path: [[y, x]]
        });

      const rightNeighbor: number | undefined = row[x + 1];
      const belowNeighbor: number | undefined = dream[y + 1]?.[x];

      const hasRightNeighbor = rightNeighbor !== undefined;
      const hasBelowNeighbor = belowNeighbor !== undefined;

      const rightNeighborCoords = [y, x + 1];
      const belowNeighborCoords = [y + 1, x];

      for (let i = 0; i < potentialRoutes.length; i++) {
        const currentRoute = potentialRoutes[i];

        const finalCoordsIndex = currentRoute.path.length - 1;
        const [finalCoordY, finalCoordX] = currentRoute.path[finalCoordsIndex];
        const isAtDestinationCell = finalCoordY === y && finalCoordX === x;

        if (!isAtDestinationCell) continue;

        //?Amplia las rutas colocando los vecinos, si existen dos caminos posibles, se bifurca creando una nueva ruta con todos los nodos anteriores y el vecino
        if (hasRightNeighbor && hasBelowNeighbor) {
          potentialRoutes.push({
            path: [...currentRoute.path, belowNeighborCoords],
            total: currentRoute.total + belowNeighbor
          });

          currentRoute.path.push(rightNeighborCoords);
          currentRoute.total += rightNeighbor;
        }

        if (!hasBelowNeighbor && hasRightNeighbor) {
          currentRoute.path.push(rightNeighborCoords);
          currentRoute.total += rightNeighbor;
        }

        if (!hasRightNeighbor && hasBelowNeighbor) {
          currentRoute.path.push(belowNeighborCoords);
          currentRoute.total += belowNeighbor;
        }

        const betterRouteTotal = potentialRoutes[betterRouteIndex].total;
        betterRouteIndex =
          currentRoute.total < betterRouteTotal ? i : betterRouteIndex;
      }
    }
  }

  return potentialRoutes[betterRouteIndex].total;
}

console.timeEnd("findSafestPath");

const defaultDream = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1]
];

console.log(findSafestPath(defaultDream));
