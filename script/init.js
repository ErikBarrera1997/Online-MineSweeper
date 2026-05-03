//Initializing assets
aplicarColoresDinamicos();

preloadImages().then(() => {
    preloadAudio().then(() => {
        generarTablero();
        generarCeldas();

        playAudio("intro");
    
        //Initializing time counter
        setIncrement(1);
        setTick(getCount);
        startTimer();
    });   
});