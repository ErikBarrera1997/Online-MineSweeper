<?php
require_once __DIR__ . '/../connection/supabaseConection.php';
require_once __DIR__ . '/sessionManager.php';

header('Content-Type: application/json');

$session = verifySession();

if (!$session) {
    echo json_encode([
        "authenticated" => false
    ]);
    exit;
}

$result = supabase_get("MinesSweeperUserData", [
    "e_mail" => "eq." . $session["e_mail"]
]);

if (!is_array($result) || count($result) === 0) {
    destroySession();
    echo json_encode([
        "authenticated" => false
    ]);
    exit;
}

$user = $result[0];
unset($user['password']);

echo json_encode([
    "authenticated" => true,
    "user" => $user
]);
?>
