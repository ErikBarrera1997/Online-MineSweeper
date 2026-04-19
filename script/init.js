//Initializing assets
preloadImages().then(() => {
    preloadAudio().then(() => {
        generarTablero();
        generarCeldas();
    
        //Initializing time counter
        setIncrement(1);
        setTick(getCount);
        startTimer();
    });   
});