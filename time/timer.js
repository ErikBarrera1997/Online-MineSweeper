let timerIntervalId = null;
let tick = null;
let targetId = "timer";
let intervalMs = 1000;

/**
 * Sets the function to be called on each timer tick. 
 * @param {*} fn 
 */
function setTick(fn) {
	if (typeof fn === "function") {
		tick = fn;
	}
}

function setTargetId(id) {
	if (typeof id === "string" && id.length > 0) {
		targetId = id;
	}
}

function setIntervalMs(ms) {
	if (typeof ms === "number" && ms > 0) {
		intervalMs = ms;
	}
}

function startTimer() {
	if (timerIntervalId !== null) {
		clearInterval(timerIntervalId);
		timerIntervalId = null;
	}

	timerIntervalId = setInterval(() => {
		if (typeof tick !== "function") return;
		const value = tick();
		const el = document.getElementById(targetId);
		if (!el) return;
		
		// Update the shared elapsed time in score.js to keep score accurate
		setElapsedTime(1);

		getRandomAudio(); // Play random audio on each tick

		if (value === null || typeof value === "undefined") return;
		el.textContent = value.toString().padStart(3, "0");

		//Will show a window message when one of time systems are active and finished
		if(isCountdownActive() && isCountdownFinished()) {
			stopTimer();
			restrict(); 
			messages.mostrarTiempoAgotado();
			setCountdownFinished(false);
		} else if (isChronometerActive() && isChronometerFinished()) {
			stopTimer();
			restrict(); //Blocks the board to prevent further interactions after time is up
			messages.mostrarTiempoAgotado();
			setChronometerFinished(false);
		}
	}, intervalMs);
}

function stopTimer() {
	if (timerIntervalId !== null) {
		clearInterval(timerIntervalId);
		timerIntervalId = null;
	}
}

function isTimerRunning() {
	return timerIntervalId !== null;
}
