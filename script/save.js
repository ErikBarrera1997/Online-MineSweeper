/**
 * Guarda la puntuación final del usuario en la base de datos.
 * @param {number} score - La puntuación calculada al finalizar la partida.
 */
async function saveScore(score) {
    const isInsidePages = window.location.pathname.includes('/pages/');
    const dataPath = isInsidePages ? '../data' : 'data';
    const connectionPath = isInsidePages ? '../connection' : 'connection';
    let userName = null;

    try {
        const authRes = await fetch(`${dataPath}/checkSession.php`, { credentials: 'include' });
        const authData = await authRes.json();

        if (!authData.authenticated || !authData.user) {
            return;
        }

        userName = authData.user.user_name;

        const formData = new FormData();
        formData.append('user_name', userName);
        formData.append('score', score);

        const response = await fetch(`${connectionPath}/scoresactions.php`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        });


        if (!response.ok) {
            throw new Error(`Servidor respondió con status ${response.status} (Posible archivo no encontrado)`);
        }

        const result = await response.json();
        if (result.success) {
            console.log("Servidor:", result.message);
            messages.mostrarNotificacion("¡Puntuación guardada con éxito!");
        } else {
            console.error("El servidor rechazó el guardado:", result.error);
            messages.mostrarNotificacion("No se pudo guardar la puntuación");
        }

    } catch (error) {
        console.error("Error crítico en save.js:", error.message || error);
    }
}