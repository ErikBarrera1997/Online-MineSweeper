<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 0);

$envPath = __DIR__ . '/../.env';
if (!file_exists($envPath)) {
    echo json_encode(['error' => '.env file not found']);
    exit;
}

$lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
$config = [];
foreach ($lines as $line) {
    $line = trim($line);
    if (empty($line) || strpos($line, '#') === 0) continue;

    $parts = explode('=', $line, 2);
    if (count($parts) === 2) {
        $config[trim($parts[0])] = trim($parts[1], " \t\n\r\0\x0B\"'");
    }
}

$apiKey = $config['NEWS_API_KEY'] ?? '';
$baseUrl = $config['NEWS_API_URL'] ?? '';

if (empty($apiKey)) {
    echo json_encode(['error' => 'API Key not configured']);
    exit;
}

$keyword = $_GET['q'] ?? '';
$url = $baseUrl . "?q=" . urlencode($keyword) . "&searchIn=title&language=es&apiKey=" . $apiKey;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERAGENT, 'MineSweeper-App/1.0');
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false || $curlError) {
    http_response_code(500);
    echo json_encode(['error' => 'Error connecting to NewsAPI', 'detail' => $curlError]);
} elseif ($httpCode !== 200) {
    http_response_code(500);
    echo json_encode(['error' => 'NewsAPI responded with status ' . $httpCode]);
} else {
    echo $response;
}
