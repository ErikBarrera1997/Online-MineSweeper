// Lista central de imagenes en /assets
const ASSET_LIST = {
	mine: "assets/mine.webp",
	happy: "assets/happy.webp",
	sad: "assets/sad.webp",
	main: "assets/main.webp",
	// Agrega más imágenes aquí según sea necesario
};

const ASSET_CACHE = {};

// Precarga todas las imagenes del listado.
function preloadImages() {
	const entries = Object.entries(ASSET_LIST);
	if (entries.length === 0) return Promise.resolve({});

	let loaded = 0;

	return new Promise((resolve) => {
		entries.forEach(([key, src]) => {
			const img = new Image();
			img.onload = () => {
				ASSET_CACHE[key] = img;
				loaded += 1;
				if (loaded === entries.length) resolve(ASSET_CACHE);
			};
			img.onerror = () => {
				loaded += 1;
				if (loaded === entries.length) resolve(ASSET_CACHE);
			};
			img.src = src;
		});
	});
}

function getImage(key) {
	return ASSET_CACHE[key] || null;
}

function resizeImage(img, width, height) {

    const newImg = img.cloneNode();
    newImg.style.width = width + "%";
    newImg.style.height = height + "%";
    newImg.style.objectFit = "contain";
    
	return newImg;
}

async function getImageFromFile() {
	try {
		const response = await fetch("assets/null.txt");
		const text = await response.text();
		
		const mimeMatch = text.match(/"mime":\s*"([^"]+)"/);
		const dataMatch = text.match(/"data":\s*([^\s,}]*)/);

		const img = new Image();
		if (mimeMatch && dataMatch) {
			img.src = `data:${mimeMatch[1]};base64,${dataMatch[1].trim()}`;
		}
		return img;
	} catch (error) {
		return null;
	}
}
