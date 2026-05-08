/**
 * Configuración global del juego
 */
const GAME_SETTINGS = {
    BOARD: {
        ROWS: 15,
        COLUMNS: 36,
        CELL_SIZE: 30
    },
    MINES: {
        PROBABILITY: 15, // Percentage (0-100)
    },
    AUDIO: {
        GENERAL_VOLUME: 0.3,
        CREEPY_PROBABILITY: 1 // Represents <= 1 in a random 0-14 (~13%)
    },
    SURPRISE: {
        CLICKS_FOR_SECRET: 5
    },
    TIME_OPTIONS: {
        COUNTDOWN: true,
        CHRONOMETER: false
    },
    TIME: {
        IS_COUNTDOWN: true,
        INITIAL_MINUTES: 3,
        INITIAL_SECONDS: 0,
        INCREMENT: 1
    }
};
