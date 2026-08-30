<?php
require_once __DIR__ . '/supabaseConection.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_name = isset($_POST['user_name']) && $_POST['user_name'] !== 'null' ? $_POST['user_name'] : null;
    $score = isset($_POST['score']) ? floatval($_POST['score']) : 0;

    try {
        // Utilizamos la función de Supabase definida en supabaseConection.php
        $result = supabase_post("Scores", [
            "user_name" => $user_name,
            "score" => $score
        ]);

        if (isset($result['error'])) {
            throw new Exception("Error en Supabase: " . $result['error']);
        }

        echo json_encode(['success' => true, 'message' => '¡Puntuación guardada correctamente!']);

    } catch (Exception $e) {
        error_log("ScoresAction error: " . $e->getMessage());
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
}
?>