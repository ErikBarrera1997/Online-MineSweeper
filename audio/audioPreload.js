
const AUDIO_LIST = {
	creepy: "assets/creepy.ogg",
	null: "assets/null.ogg",
	theme1: "assets/theme1.ogg",
	intro: "assets/intro.ogg"
};

const AUDIO_CACHE = {};

async function preloadAudio() {
	const entries = Object.entries(AUDIO_LIST);
	if (entries.length === 0) return AUDIO_CACHE;

	let loaded = 0;

	return new Promise((resolve) => {
		entries.forEach(([key, src]) => {
			const audio = new Audio();
			audio.oncanplaythrough = () => {
				AUDIO_CACHE[key] = audio;
				loaded += 1;
				if (loaded === entries.length) resolve(AUDIO_CACHE);
			};
			audio.onerror = () => {
				loaded += 1;
				if (loaded === entries.length) resolve(AUDIO_CACHE);
			};
			audio.src = src;
		});
	});
}

function isAudioPlaying(audioName) {
	const audio = AUDIO_CACHE[audioName];
	return audio && !audio.paused && !audio.ended;
}

function playAudio(audioName) {
	const audio = AUDIO_CACHE[audioName];
	if (!audio) {
		console.warn("Audio no precargado:", audioName);
		return;
	}

	// No permitir que suene nada más si el intro está en curso
	if (audioName !== "intro" && isAudioPlaying("intro")) {
		return;
	}

	// Only attempt to play if the audio is currently paused to avoid overlapping sounds
	if (audio.paused) {
		audio.volume = 0.3;
		audio.currentTime = 0;

		const playPromise = audio.play();

		if (playPromise !== undefined) {
			playPromise.catch((err) => {
				console.log("Audio Engine: Reproducción en espera de interacción del usuario.");
			});
		}
	}
}

function stopAudio(audioName) {
	const audio = AUDIO_CACHE[audioName];
	if (audio) {
		audio.pause();
		audio.currentTime = 0;
	}
}

// Unlocking audio context on first user interaction (click or touch)
function unlockAudioContext() {
	const audios = Object.values(AUDIO_CACHE);
	if (audios.length === 0) return;

	console.log("Audio Engine: Intentando desbloqueo...");

	// Intentamos iniciar el intro específicamente al primer click si estaba bloqueado
	playAudio("intro");

	// Desbloqueo silencioso del resto de sonidos sin reiniciar los que ya estén sonando
	audios.forEach((audio) => {
		if (audio.paused) {
			audio.play().then(() => {
				audio.pause();
				audio.currentTime = 0;
			}).catch(() => {});
		}
	});

	window.removeEventListener("click", unlockAudioContext);
	window.removeEventListener("touchstart", unlockAudioContext);
}

window.addEventListener("click", unlockAudioContext);
window.addEventListener("touchstart", unlockAudioContext); // Soporte para móviles
