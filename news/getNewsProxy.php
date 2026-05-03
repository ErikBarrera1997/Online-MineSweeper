<?php
// Evitar que errores de PHP rompan el JSON de salida
error_reporting(0);
ini_set('display_errors', 0);
header('Content-Type: application/json');

// Cargar las variables del archivo .env
$envPath = __DIR__ . '/../.env';
if (!file_exists($envPath)) {
    echo json_encode(['error' => 'Archivo .env no encontrado']);
    exit;
}

// Cargamos el .env manualmente porque parse_ini_file falla con comentarios '#' en PHP moderno
$lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$config = [];
foreach ($lines as $line) {
    $line = trim($line);
    if (empty($line) || strpos($line, '#') === 0) continue;
    
    // Dividir solo por el primer '='
    $parts = explode('=', $line, 2);
    if (count($parts) === 2) {
        $config[trim($parts[0])] = trim($parts[1], " \t\n\r\0\x0B\"'");
    }
}

$apiKey = $config['NEWS_API_KEY'] ?? '';
$baseUrl = $config['NEWS_API_URL'] ?? '';

if (empty($apiKey)) {
    echo json_encode(['error' => 'API Key no configurada']);
    exit;
}

// Obtener el término de búsqueda enviado desde el JS
$keyword = $_GET['q'] ?? '';

// NewsAPI requiere obligatoriamente un User-Agent y XAMPP suele fallar con SSL
$opts = [
    "http" => [
        "method" => "GET",
        "header" => "User-Agent: MineSweeper-App/1.0\r\n"
    ],
    "ssl" => [
        "verify_peer" => false,
        "verify_peer_name" => false,
    ]
];

$context = stream_context_create($opts);
$url = $baseUrl . "?q=" . urlencode($keyword) . "&searchIn=title&language=es&apiKey=" . $apiKey;
$response = @file_get_contents($url, false, $context);

if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al conectar con NewsAPI']);
} else {
    // Devolver la respuesta original al navegador
    echo $response;
}