<?php
require_once __DIR__ . '/supabaseConection.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method not allowed"
    ]);
    exit;
}

$user_name = trim($_POST['user_name'] ?? '');
$e_mail = trim($_POST['e_mail'] ?? '');
$password = trim($_POST['password'] ?? '');

try {
    if (empty($user_name)) {
        throw new Exception("Ingrese un nombre de usuario");
    }

    if (empty($e_mail)) {
        throw new Exception("Ingrese un correo electrónico válido");
    }

    if (empty($password)) {
        throw new Exception("Ingrese una contraseña, no puede estar vacía");
    }

    if (!filter_var($e_mail, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Formato de correo electrónico inválido");
    }

    $existing = supabase_get("MagicWorldUsers", [
        "user_name" => "eq.$user_name",
        "e_mail" => "eq.$e_mail"
    ]);

    if (is_array($existing) && count($existing) > 0) {
        throw new Exception("Ya existe un usuario con ese nombre o correo electrónico");
    }

    $result = supabase_post("MagicWorldUsers", [
        "user_name" => $user_name,
        "e_mail" => $e_mail,
        "password" => $password
    ]);

    if (isset($result['error'])) {
        throw new Exception("Error al crear el usuario: " . $result['error']);
    }

    http_response_code(201);
    echo json_encode([
        "success" => true,
        "message" => "Usuario creado con éxito",
        "user" => $result
    ]);

} catch (Exception $e) {
    error_log("Servicio no disponible");
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>
