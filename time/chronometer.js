let chronometerTotalSeconds = 0;
let chronometerIncrement = 1;

let chronometerActive = false;
let chronometerFinished = false;

function getChronometerTick() {
    chronometerTotalSeconds += chronometerIncrement;
    
    if (chronometerTotalSeconds > 999) {
        chronometerTotalSeconds = 999;
    }
    return chronometerTotalSeconds;
}

function setChronometerIncrement(value) {
    if (typeof value === "number" && !Number.isNaN(value)) {
        chronometerIncrement = value;
    }
}

function resetChronometer() {
    chronometerTotalSeconds = 0;
    chronometerFinished = false;
}

function isChronometerActive() {
	return chronometerActive;
}

function setChronometerActive(value) {
	chronometerActive = value;
}

function isChronometerFinished() {
	return chronometerFinished;
}

function setChronometerFinished(value) {
	chronometerFinished = value;
}
