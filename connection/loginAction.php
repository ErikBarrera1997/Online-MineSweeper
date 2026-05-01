<?php
require_once __DIR__ . '/supabaseConection.php';
require_once __DIR__ . '/../data/sessionManager.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed"
    ]);
    exit;
}

$e_mail = trim($_POST['e_mail'] ?? '');
$password = trim($_POST['password'] ?? '');

try {
    if (empty($e_mail)) {
        throw new Exception("Debe ingresar el correo electrónico");
    }

    if (empty($password)) {
        throw new Exception("Debe de ingresar la contraseña");
    }

    $result = supabase_get("MinesSweeperUserData", [
        "e_mail" => "eq.$e_mail"
    ]);

    if (is_array($result) && isset($result['error'])) {
        throw new Exception("Database error: " . $result['error']);
    }

    if (!is_array($result) || count($result) === 0) {
        throw new Exception("Usuario no encontrado");
    }

    $user = $result[0];

    if ($user['password'] !== $password) {
        throw new Exception("Contraseña incorrecta");
    }

    setSessionCookie($user);

    echo json_encode([
        "success" => true,
        "message" => "Login successful"
    ]);

} catch (Exception $e) {
    error_log("LoginAction error: " . $e->getMessage());
    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>
