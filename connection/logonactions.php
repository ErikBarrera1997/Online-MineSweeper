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
        throw new Exception("user_name is required");
    }

    if (empty($e_mail)) {
        throw new Exception("e_mail is required");
    }

    if (empty($password)) {
        throw new Exception("password is required and cannot be null");
    }

    if (!filter_var($e_mail, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email format");
    }

    $existing = supabase_get("MinesSweeperUserData", [
        "user_name" => "eq.$user_name",
        "e_mail" => "eq.$e_mail"
    ]);

    if (is_array($existing) && count($existing) > 0) {
        throw new Exception("User already exists with that user_name or e_mail");
    }

    $result = supabase_post("MinesSweeperUserData", [
        "user_name" => $user_name,
        "e_mail" => $e_mail,
        "password" => $password
    ]);

    if (isset($result['error'])) {
        throw new Exception("Failed to create user: " . $result['error']);
    }

    http_response_code(201);
    echo json_encode([
        "success" => true,
        "message" => "User created successfully",
        "user" => $result
    ]);

} catch (Exception $e) {
    error_log("LogonAction error: " . $e->getMessage());
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}
?>
