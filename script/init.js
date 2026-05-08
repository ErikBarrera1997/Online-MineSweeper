function applyCurrentTimerMode() {
    stopTimer();

    if (GAME_SETTINGS.TIME.IS_COUNTDOWN) {
        setCountdownActive(true);
        setChronometerActive(false);
        resetCountdown();
        setTick(getCountdownTick);
        document.getElementById("timer").textContent = `${GAME_SETTINGS.TIME.INITIAL_MINUTES}:${GAME_SETTINGS.TIME.INITIAL_SECONDS.toString().padStart(2, "0")}`;
        return;
    }

    setCountdownActive(false);
    setChronometerActive(true);
    setChronometerIncrement(GAME_SETTINGS.TIME.INCREMENT);
    resetChronometer();
    setTick(getChronometerTick);
    document.getElementById("timer").textContent = "000";
}

function initializeGame() {
    generarTablero();
    generarCeldas();
    applyCurrentTimerMode();
    startTimer();
}

//Initializing assets
aplicarColoresDinamicos();

//Initializing audio
preloadImages().then(() => {
    preloadAudio().then(() => {
        initializeGame();
        playAudio("intro");
    });
});

//setAudioOptions(GAME_SETTINGS.AUDIO);
