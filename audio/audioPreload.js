
const AUDIO_LIST = {
	creepy: "assets/creepy.ogg",
	null: "assets/null.ogg",
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

function playAudio(audioName) {
	const audio = AUDIO_CACHE[audioName];
	if (!audio) {
		console.warn("Audio no precargado:", audioName);
		return;
	}

	// Only attempt to play if the audio is currently paused to avoid overlapping sounds
	if (audio.paused) {
		audio.volume = 0.3;
		audio.currentTime = 0;

		const playPromise = audio.play();

		if (playPromise !== undefined) {
			playPromise.catch((err) => {
				console.warn("Audio Engine: Error/Bloqueo del navegador:", err.message);
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

	// Intentamos reproducir todos los audios y esperamos a que al menos uno responda
	const unlockPromises = audios.map((audio) => {
		return audio.play().then(() => {
			audio.pause();
			audio.currentTime = 0;
		}).catch(() => {
			// Fallo silencioso si el navegador aún bloquea
		});
	});

	Promise.all(unlockPromises).then(() => {
		console.log("Audio Engine: Sistema desbloqueado con éxito.");
		window.removeEventListener("click", unlockAudioContext);
		window.removeEventListener("touchstart", unlockAudioContext);
	});
}

window.addEventListener("click", unlockAudioContext);
window.addEventListener("touchstart", unlockAudioContext); // Soporte para móviles
