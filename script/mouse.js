/**
 * Función que se activa al realizar clic derecho.
 * Se deja vacía de momento para implementaciones futuras.
 * @param {MouseEvent} event - El evento del ratón.
 */
function handleRightClick(event) {
    const celda = event.target.closest('.celda');
    // No permitir poner banderas en celdas reveladas o si el juego terminó
    if (!celda || celda.classList.contains("revealed") || celda.classList.contains("locked")) return;

    // Lógica para poner/quitar (toggle) la bandera
    if (celda.classList.contains("flagged")) {
        celda.innerHTML = ""; // Quita la imagen
        celda.classList.remove("flagged");
    } else {
        const flagImg = getImage("red_flag");
        if (flagImg) {
            // Usamos 100, 100 porque resizeImage usa porcentajes del contenedor (la celda)
            celda.appendChild(resizeImage(flagImg, 100, 100));
            celda.classList.add("flagged");
        } else {
            console.error("Error: No se pudo cargar la imagen 'red_flag'. Verifica que 'assets/red_flag.webp' exista.");
            celda.textContent = "🚩"; 
        }
    }
}


// Registrar el evento para capturar el clic derecho en el documento
document.addEventListener('contextmenu', function(event) {
    if (event.target.closest('.celda')) {
        // Solo prevenimos el menú y ejecutamos la lógica si es una celda
        event.preventDefault();
        handleRightClick(event);
    }
});