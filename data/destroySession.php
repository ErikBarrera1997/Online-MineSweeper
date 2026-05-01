<?php
require_once __DIR__ . '/sessionManager.php';

destroySession();

header('Content-Type: application/json');
echo json_encode([
    "success" => true
]);
?>
