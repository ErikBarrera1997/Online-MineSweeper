﻿// Parametros del tablero
const filas = 9;
const columnas = 9;
const totalCeldas = filas * columnas;
const tamanioCelda = 30;

let tablero = new Array(totalCeldas).fill(0);
const coloresMina = [
  "",        // 0
  "#0000ff", // 1: Azul
  "#008000", // 2: Verde
  "#ff0000", // 3: Rojo
  "#000080", // 4: Azul oscuro
  "#800000", // 5: Granate
  "#008080", // 6: Turquesa
  "#000000", // 7: Negro
  "#808080"  // 8: Gris
];

/**
 * Creates a new game board with mines and numbers. Mines are represented by -1, 
 * and numbers indicate how many mines are adjacent to that cell. 
 */
function generarTablero() {
  tablero.fill(0);
  let celda = 0;

  while (celda < totalCeldas) {
    if (tablero[celda] !== -1) {
      if (generate()) {
        tablero[celda] = -1;
        setMine();

        const r = Math.floor(celda / columnas);
        const c = celda % columnas;

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const nr = r + i,
              nc = c + j;
            if (nr >= 0 && nr < filas && nc >= 0 && nc < columnas) {
              const nPos = nr * columnas + nc;
              if (tablero[nPos] !== -1) tablero[nPos]++;
            }
          }
        }
      }
    }

    celda++;
  }

  setCellsToDiscover(totalCeldas, gettotalMines());
  document.getElementById("mines").textContent = gettotalMines().toString().padStart(3, '0');
  document.getElementById("timer").textContent = "000";

  const happyImg = getImage("happy");
  const resetBtn = document.getElementById("reset");
  if (resetBtn && happyImg) {
    resetBtn.innerHTML = "";
    resetBtn.appendChild(resizeImage(happyImg, 100, 100));
  }
}

/**
 * Generates the grid of cells based on the current game board. Each cell is a div element that 
 * listens for click events to reveal its content. 
 */
function generarCeldas() {
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

function revelarCelda(index) {
  const celda = document.getElementById(`celda-${index}`);

  if (!celda || celda.classList.contains("revealed") || celda.classList.contains("locked")) return;

  const valor = tablero[index];
  celda.classList.add("revealed");

      if (valor === -1) {       
        const mineImg = getImage("mine");
        const sadImg = getImage("sad");

        if (mineImg) {
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
      } else {
        celda.textContent = valor > 0 ? valor.toString() : "";
      
      if (valor > 0) {
        celda.style.color = coloresMina[valor];
      }
    
      // Si la celda es "blanca" (0), revelar vecinos recursivamente
      if (valor === 0) {
        const r = Math.floor(index / columnas);
        const c = index % columnas;

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const nr = r + i, nc = c + j;
            if (nr >= 0 && nr < filas && nc >= 0 && nc < columnas) {
              revelarCelda(nr * columnas + nc);
            }
          }
        }
      }
    }

    setDiscoveredCells(1);

    if(getDiscoveredCells() === getTotalCells()) {
      restrict();
      stopTimer();
      messages.mostrarMensaje("¡Felicidades!\nHas ganado el juego.\n\nPuntuación: " + 
        getScore().toFixed(2) + " puntos.");
      
    }
   
}

function restrict() {
  for (let j = 0; j < totalCeldas; j++) {
    const cell = document.getElementById(`celda-${j}`);
    if (cell) {
      cell.classList.add("locked");
    }
  }
}

function resetMatch() {
  resetElapsedTime();
  reset(); // Resets the internal counter in countdown.js
  resetDiscover();
  resetMines();
  generarTablero();
  generarCeldas();
  startTimer();
}

document.getElementById("reset").addEventListener("click", () => {  
    resetMatch(); // resetMatch already handles clearing states and starting the timer
});
