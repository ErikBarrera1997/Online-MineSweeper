
let discoveredCells = 0;
let totalCellsToDiscover = 0;
let elapsedTime = 0;
let totalMines = 0;

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

function gettotalMines() {  
  return totalMines;
} 

function setMine() {
  totalMines++;
}

function resetMines() {
  totalMines = 0;
}

/**
 * Verify the elapsed time (ONLY THE SECONDS ELAPSED).
 * @param time
 */
function setElapsedTime(time) {
  elapsedTime += time;
}

function resetElapsedTime() {
  elapsedTime = 0;
}

function resetDiscover() {
  discoveredCells = 0;
}

function getScore() {
  return ((discoveredCells * 3) * totalMines) - (elapsedTime * 0.5);
}

function isWin() {
  return discoveredCells === getTotalCells();
}
