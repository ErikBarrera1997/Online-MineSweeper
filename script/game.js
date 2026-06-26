let tablero = [];

function generarTablero() {
  const filas = getBoardRows();
  const columnas = getBoardColumns();
  const totalCeldas = getTotalCellsCount();

  tablero = new Array(totalCeldas).fill(0);
  let celda = 0;

  while (celda < totalCeldas) {
    if (tablero[celda] !== -1 && generate()) {
      tablero[celda] = -1;
      setMine();

      const r = Math.floor(celda / columnas);
      const c = celda % columnas;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const nr = r + i;
          const nc = c + j;

          if (nr >= 0 && nr < filas && nc >= 0 && nc < columnas) {
            const nPos = nr * columnas + nc;
            if (tablero[nPos] !== -1) tablero[nPos]++;
          }
        }
      }
    }

    celda++;
  }

  setCellsToDiscover(totalCeldas, gettotalMines());
  document.getElementById("mines").textContent = gettotalMines().toString().padStart(3, "0");

  const happyImg = getImage("happy");
  const resetBtn = document.getElementById("reset");
  if (resetBtn && happyImg) {
    resetBtn.innerHTML = "";
    resetBtn.appendChild(resizeImage(happyImg, 100, 100));
  }
}

function generarCeldas() {
  const filas = getBoardRows();
  const columnas = getBoardColumns();
  const tamanioCelda = getCellSize();
  const divTablero = document.getElementById("field");

  divTablero.style.gridTemplateColumns = `repeat(${columnas}, ${tamanioCelda}px)`;
  divTablero.style.gridTemplateRows = `repeat(${filas}, ${tamanioCelda}px)`;
  divTablero.innerHTML = "";

  tablero.forEach((valor, index) => {
    const celda = document.createElement("div");
    celda.className = "celda";
    celda.id = `celda-${index}`;
    celda.addEventListener("click", () => {
      revelarCelda(index);
    });
    divTablero.appendChild(celda);
  });
}

async function revelarCelda(index) {
  const columnas = getBoardColumns();
  const filas = getBoardRows();
  const celda = document.getElementById(`celda-${index}`);

  if (!celda || celda.classList.contains("revealed") || celda.classList.contains("locked")) return;

  const valor = tablero[index];
  celda.classList.add("revealed");

  if (valor === -1) {
    const mineImg = getImage("mine");
    const sadImg = getImage("sad");

    if (mineImg) {
      celda.innerHTML = "";
      celda.appendChild(resizeImage(mineImg, 100, 100));
      const resetBtn = document.getElementById("reset");
      resetBtn.innerHTML = "";
      if (sadImg) resetBtn.appendChild(resizeImage(sadImg, 100, 100));
    } else {
      celda.textContent = "💣";
    }

    celda.classList.add("mine");
    stopTimer();
    if (!showSurprise()) {
      messages.mostrarMensaje("¡Boom! Fin del juego.");
    }
    restrict();
    return; // Finalize execution for mine case
  } else {
    celda.textContent = valor > 0 ? valor.toString() : "";

    if (valor > 0) {
      celda.style.color = coloresMina[valor];
    }

    if (valor === 0) {
      const r = Math.floor(index / columnas);
      const c = index % columnas;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const nr = r + i;
          const nc = c + j;
          if (nr >= 0 && nr < filas && nc >= 0 && nc < columnas) {
            revelarCelda(nr * columnas + nc);
          }
        }
      }
    }

    setDiscoveredCells(1);

    if (getDiscoveredCells() === getTotalCells()) {
      restrict();
      stopTimer();
      const finalScore = getScore();

      const sessionUser = await verificarSesion();
      let winText = "¡Felicidades!\nHas ganado el juego.\n\nPuntuación: " +
        finalScore.toFixed(2) + " puntos.";
      if (!sessionUser) {
        winText += "\n\nInicia sesión para guardar la puntuación";
      }
      messages.mostrarMensaje(winText, "success", () => {
          if (typeof saveScore === 'function') {
              saveScore(finalScore);
          } else {
              console.warn("La función save Score no está disponible.");
          }
      });
    }
  }
}

function restrict() {
  const totalCeldas = getTotalCellsCount();

  for (let j = 0; j < totalCeldas; j++) {
    const cell = document.getElementById(`celda-${j}`);
    if (cell) {
      cell.classList.add("locked");
    }
  }
}

function resetMatch() {
  stopTimer();
  resetElapsedTime();
  resetDiscover();
  resetMines();
  generarTablero();
  generarCeldas();
  applyCurrentTimerMode();
  startTimer();
}

function getBoardRows() {
  return GAME_SETTINGS.BOARD.ROWS;
}

function getBoardColumns() {
  return GAME_SETTINGS.BOARD.COLUMNS;
}

function getTotalCellsCount() {
  return getBoardRows() * getBoardColumns();
}

function getCellSize() {
  return GAME_SETTINGS.BOARD.CELL_SIZE;
}

document.getElementById("reset").addEventListener("click", () => {
  resetMatch();
});
