let chronometerCount = 0;
let chronometerIncrement = 1;

function getChronometerTick() {
	chronometerCount += chronometerIncrement;
	return chronometerCount;
}

function setChronometerIncrement(value) {
	if (typeof value === "number" && !Number.isNaN(value)) {
		chronometerIncrement = value;
	}
}

function resetChronometer() {
	chronometerCount = 0;
}
