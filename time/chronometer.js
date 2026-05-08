let countdownSeconds = GAME_SETTINGS.TIME.INITIAL_SECONDS;
let countdownMinutes = GAME_SETTINGS.TIME.INITIAL_MINUTES;

function getCountdownTick() {
	const currentValue = `${countdownMinutes}:${countdownSeconds.toString().padStart(2, "0")}`;

	if (countdownMinutes === 0 && countdownSeconds === 0) {
		return currentValue;
	}

	countdownSeconds--;
	if (countdownSeconds < 0) {
		countdownMinutes -= 1;
		countdownSeconds = 59;
	}

	if (countdownMinutes < 0) {
		countdownMinutes = 0;
		countdownSeconds = 0;
	}

	return currentValue;
}

function resetCountdown() {
	countdownMinutes = GAME_SETTINGS.TIME.INITIAL_MINUTES;
	countdownSeconds = GAME_SETTINGS.TIME.INITIAL_SECONDS;
}
