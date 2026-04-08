
let discoveredCells = 0;
let totalCellsToDiscover = 0;


/**
 * The amount of cells that need to be discovered to win the game. This is calculated as the total number of cells minus the number of mines.
 */
function setCellsToDiscover(totalCells, mines) {
  totalCellsToDiscover = totalCells - mines;
}
    
function getTotalCells() {
  return totalCellsToDiscover;
}
    
function setDiscoveredCells(count) {
  discoveredCells += count;
}

function getDiscoveredCells() {
  return discoveredCells;
}

