
function handleRightClick(event) {
    const celda = event.target.closest('.celda');

    if (!celda || celda.classList.contains("revealed") || celda.classList.contains("locked")) return;

    if (celda.classList.contains("flagged")) {
        celda.innerHTML = ""; // Quita la imagen
        celda.classList.remove("flagged");
    } else {
        const flagImg = getImage("red_flag");
        if (flagImg) {
            celda.appendChild(resizeImage(flagImg, 100, 100));
            celda.classList.add("flagged");
        } else {
            console.error("Error: No se pudo cargar la imagen 'red_flag'. Verifica que 'assets/red_flag.webp' exista.");
            celda.textContent = "🚩"; 
        }
    }
}

document.addEventListener('contextmenu', function(event) {
    if (event.target.closest('.celda')) {
        event.preventDefault();
        handleRightClick(event);
    }
});