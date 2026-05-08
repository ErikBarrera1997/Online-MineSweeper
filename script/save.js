/**
 * Guarda la puntuación final del usuario en la base de datos.
 * @param {number} score - La puntuación calculada al finalizar la partida.
 */
async function saveScore(score) {
    console.log("Iniciando proceso de guardado para la puntuación:", score);
    const isInsidePages = window.location.pathname.includes('/pages/');
    const dataPath = isInsidePages ? '../data' : 'data';
    const connectionPath = isInsidePages ? '../connection' : 'connection';
    let userName = null;

    try {
        // Intentamos recuperar el nombre de usuario desde la sesión actual
        try {
            const authRes = await fetch(`${dataPath}/checkSession.php`, { credentials: 'include' });
            const authData = await authRes.json();
            if (authData.authenticated && authData.user) {
                userName = authData.user.user_name;
            }
        } catch (e) {
            console.warn("No se pudo recuperar la sesión, se registrará con user_name como null.");
        }

        const formData = new FormData();
        
        // Si userName es null, evitamos enviarlo para que el servidor lo trate como nulo
        if (userName !== null) {
            formData.append('user_name', userName);
        }
        
        formData.append('score', score);

        // Realizamos el envío a scoresactions.php (encargado del CRUD de Scores)
        const response = await fetch(`${connectionPath}/scoresactions.php`, {
            method: 'POST',
            body: formData
        });

        // Validamos que la respuesta del servidor sea exitosa antes de intentar leer JSON
        if (!response.ok) {
            throw new Error(`Servidor respondió con status ${response.status} (Posible archivo no encontrado)`);
        }

        const result = await response.json();
        if (result.success) {
            console.log("Servidor:", result.message);
            messages.mostrarNotificacion("Puntuación guardada con éxito");
        } else {
            console.error("El servidor rechazó el guardado:", result.error);
        }
    } catch (error) {
        console.error("Error crítico en save.js:", error.message || error);
    }
}