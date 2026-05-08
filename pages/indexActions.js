const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const authSection = document.getElementById("auth-section");
const userGreeting = document.getElementById("user-greeting");
const partidaMenuItem = document.getElementById("menu-item-partida");
const settingsBackdrop = document.getElementById("game-settings-backdrop");
const settingsModal = document.getElementById("game-settings-modal");
const sizeSelect = document.getElementById("board-size-select");
const minesSlider = document.getElementById("mine-probability-slider");
const minesValue = document.getElementById("mine-probability-value");
const timeModeSelect = document.getElementById("time-mode-select");
const previewGrid = document.getElementById("game-settings-preview");
const acceptSettingsBtn = document.getElementById("game-settings-accept");
const cancelSettingsBtn = document.getElementById("game-settings-cancel");

const BOARD_SIZE_OPTIONS = {
    "9x9": { rows: 9, columns: 9 },
    "15x15": { rows: 15, columns: 15 },
    "15x30": { rows: 15, columns: 30 }
};

function getBoardSizeKey(rows, columns) {
    return Object.keys(BOARD_SIZE_OPTIONS).find((key) => {
        const option = BOARD_SIZE_OPTIONS[key];
        return option.rows === rows && option.columns === columns;
    }) || "15x15";
}

function setSliderValueLabel(value) {
    minesValue.textContent = value.toString();
}

function renderPreviewGrid(rows, columns) {
    const maxDimension = Math.max(rows, columns);
    const cellSize = Math.max(10, Math.floor(160 / maxDimension));

    previewGrid.style.gridTemplateColumns = `repeat(${columns}, ${cellSize}px)`;
    previewGrid.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;
    previewGrid.innerHTML = "";

    for (let index = 0; index < rows * columns; index++) {
        const previewCell = document.createElement("div");
        previewCell.className = "celda game-settings-preview-cell";
        previewCell.style.width = `${cellSize}px`;
        previewCell.style.height = `${cellSize}px`;
        previewGrid.appendChild(previewCell);
    }
}

function syncModalWithSettings() {
    sizeSelect.value = getBoardSizeKey(GAME_SETTINGS.BOARD.ROWS, GAME_SETTINGS.BOARD.COLUMNS);
    minesSlider.value = GAME_SETTINGS.MINES.PROBABILITY;
    setSliderValueLabel(GAME_SETTINGS.MINES.PROBABILITY);
    timeModeSelect.value = GAME_SETTINGS.TIME.IS_COUNTDOWN ? "COUNTDOWN" : "CHRONOMETER";

    const selectedSize = BOARD_SIZE_OPTIONS[sizeSelect.value];
    renderPreviewGrid(selectedSize.rows, selectedSize.columns);
}

function openSettingsModal() {
    syncModalWithSettings();
    settingsBackdrop.classList.remove("hidden");
    settingsBackdrop.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    settingsModal.focus();
}

function closeSettingsModal() {
    settingsBackdrop.classList.add("hidden");
    settingsBackdrop.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

function applyGameSettings() {
    const selectedSize = BOARD_SIZE_OPTIONS[sizeSelect.value];

    GAME_SETTINGS.BOARD.ROWS = selectedSize.rows;
    GAME_SETTINGS.BOARD.COLUMNS = selectedSize.columns;
    GAME_SETTINGS.MINES.PROBABILITY = Number(minesSlider.value);
    GAME_SETTINGS.TIME.IS_COUNTDOWN = timeModeSelect.value === "COUNTDOWN";

    closeSettingsModal();
    resetMatch();
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => logout());
}

if (partidaMenuItem) {
    partidaMenuItem.addEventListener("click", openSettingsModal);
}

if (sizeSelect) {
    sizeSelect.addEventListener("change", () => {
        const selectedSize = BOARD_SIZE_OPTIONS[sizeSelect.value];
        renderPreviewGrid(selectedSize.rows, selectedSize.columns);
    });
}

if (minesSlider) {
    minesSlider.addEventListener("input", () => {
        setSliderValueLabel(minesSlider.value);
    });
}

if (acceptSettingsBtn) {
    acceptSettingsBtn.addEventListener("click", applyGameSettings);
}

if (cancelSettingsBtn) {
    cancelSettingsBtn.addEventListener("click", closeSettingsModal);
}

if (settingsBackdrop) {
    settingsBackdrop.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !settingsBackdrop.classList.contains("hidden")) {
        event.preventDefault();
    }
});

(async () => {
    try {
        const response = await fetch("data/checkSession.php", {
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Error en el servidor de sesión: ${response.status}`);
        }

        const data = await response.json();

        if (data.authenticated) {
            if (loginBtn) loginBtn.style.display = "none";
            if (authSection) authSection.style.display = "flex";
            if (userGreeting) userGreeting.textContent = `Hola de nuevo '${data.user.user_name}'`;
        }
    } catch (error) {
        console.error("Session check failed:", error);
    }
})();
