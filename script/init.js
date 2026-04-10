//Initializing assets
preloadImages().then(() => {
    // Inicializar juego
    generarTablero();
    generarCeldas();
    
    //Initializing time counter
    setIncrement(1);
    setTick(getCount);
    startTimer();
});