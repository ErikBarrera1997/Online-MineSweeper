//Colors for numbers in the minesweeper game, where each index corresponds to the number of adjacent mines.

//Default colors
const coloresMina = [
  "",        // 0
  "#0000ff", // 1: Blue
  "#008000", // 2: Green
  "#ff0000", // 3: Red
  "#000080", // 4: Dark Blue
  "#800000", // 5: Maroon
  "#008080", // 6: Teal
  "#000000", // 7: Black
  "#808080"  // 8: Gray
];

const menuColors = [
  "#bdc3c7", // Fondo principal (Silver)
  "#7f8c8d", // Bordes (Asbestos)
  "#34495e", // Items de menú (Wet Asphalt)
  "#ecf0f1", // Botones (Clouds)
  "#f4f7f7", // Texto de items (Off-white)
  "#2c3e50"  // Texto de saludo (Belize Hole)
]

const mapColors = [
  "#34495e", // Fondo del tablero
  "#bdc3c7", // Fondo del contenedor de stats
  "#95a5a6", // Celda oculta (Concrete)
  "#fafbfa", // Celda revelada (White-ish)
  "#e74c3c"  // Celda con mina (Alizarin)
];

/**
 * Aplica los colores de las listas a variables CSS en el :root
 * para permitir personalización dinámica desde JavaScript.
 */
function aplicarColoresDinamicos() {
    const root = document.documentElement;

    // Mapeo de Map Colors
    root.style.setProperty('--bg-main', mapColors[0]);
    root.style.setProperty('--bg-container', mapColors[1]);
    root.style.setProperty('--bg-celda', mapColors[2]);
    root.style.setProperty('--bg-celda-revealed', mapColors[3]);
    root.style.setProperty('--bg-celda-mine', mapColors[4]);

    // Mapeo de Menu Colors
    root.style.setProperty('--bg-menu-start', menuColors[0]);
    root.style.setProperty('--border-primary', menuColors[1]);
    root.style.setProperty('--bg-btn-start', menuColors[3]);
    root.style.setProperty('--color-menu-text', menuColors[4]);
    root.style.setProperty('--color-greeting', menuColors[5]);
}