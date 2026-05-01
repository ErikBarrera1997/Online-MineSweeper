<?php
/**
 * Carga variables de entorno desde un archivo .env
 */
function loadEnv($path) {
    if (!file_exists($path)) {
        error_log("Archivo .env no encontrado en: $path");
        return;
    }
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value, " \t\n\r\0\x0B\"");
        $_ENV[$name] = $value;
    }
}

loadEnv(__DIR__ . '/../.env');

// Supabase REST API Connection
$supabase_url = $_ENV['SUPABASE_URL'] ?? "";
$supabase_api_key = $_ENV['SUPABASE_API_KEY'] ?? "";

// Legacy PostgreSQL credentials (kept for reference)
$pg_host = $_ENV['PG_HOST'] ?? "";
$pg_port = $_ENV['PG_PORT'] ?? "5432";
$pg_dbname = $_ENV['PG_DBNAME'] ?? "";
$pg_user = $_ENV['PG_USER'] ?? "";
$pg_password = $_ENV['PG_PASSWORD'] ?? "";

// Log POST data
if (!empty($_POST)) {
    error_log("Datos recibidos vía POST: " . json_encode($_POST));
}

/**
 * Make a GET request to Supabase REST API
 * @param string $table Table name
 * @param array $params Query parameters (e.g. ['select' => '*', 'id' => 'eq.1'])
 * @return array Decoded JSON response
 */
function supabase_get($table, $params = []) {
    global $supabase_url, $supabase_api_key;
    
    $query = http_build_query($params);
    $url = "$supabase_url/rest/v1/$table" . ($query ? "?$query" : "");
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "apikey: $supabase_api_key",
        "Authorization: Bearer $supabase_api_key",
        "Content-Type: application/json",
        "Prefer: return=representation"
    ]);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        error_log("Supabase GET error: $error");
        return ["error" => $error];
    }
    
    error_log("Supabase GET [$http_code] $url");
    return json_decode($response, true);
}

/**
 * Make a POST request to Supabase REST API (insert data)
 * @param string $table Table name
 * @param array $data Data to insert
 * @return array Decoded JSON response
 */
function supabase_post($table, $data) {
    global $supabase_url, $supabase_api_key;
    
    $url = "$supabase_url/rest/v1/$table";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "apikey: $supabase_api_key",
        "Authorization: Bearer $supabase_api_key",
        "Content-Type: application/json",
        "Prefer: return=representation"
    ]);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        error_log("Supabase POST error: $error");
        return ["error" => $error];
    }
    
    error_log("Supabase POST [$http_code] $url");
    return json_decode($response, true);
}

/**
 * Make a PATCH request to Supabase REST API (update data)
 * @param string $table Table name
 * @param array $filters Filter conditions (e.g. ['id' => 'eq.1'])
 * @param array $data Data to update
 * @return array Decoded JSON response
 */
function supabase_patch($table, $filters, $data) {
    global $supabase_url, $supabase_api_key;
    
    $query = http_build_query($filters);
    $url = "$supabase_url/rest/v1/$table?$query";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PATCH");
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "apikey: $supabase_api_key",
        "Authorization: Bearer $supabase_api_key",
        "Content-Type: application/json",
        "Prefer: return=representation"
    ]);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        error_log("Supabase PATCH error: $error");
        return ["error" => $error];
    }
    
    error_log("Supabase PATCH [$http_code] $url");
    return json_decode($response, true);
}

/**
 * Make a DELETE request to Supabase REST API
 * @param string $table Table name
 * @param array $filters Filter conditions (e.g. ['id' => 'eq.1'])
 * @return array Decoded JSON response
 */
function supabase_delete($table, $filters) {
    global $supabase_url, $supabase_api_key;
    
    $query = http_build_query($filters);
    $url = "$supabase_url/rest/v1/$table?$query";
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "apikey: $supabase_api_key",
        "Authorization: Bearer $supabase_api_key",
        "Content-Type: application/json",
        "Prefer: return=representation"
    ]);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        error_log("Supabase DELETE error: $error");
        return ["error" => $error];
    }
    
    error_log("Supabase DELETE [$http_code] $url");
    return json_decode($response, true);
}

if (basename($_SERVER['PHP_SELF']) === 'supabaseConection.php') {
    error_log("Supabase REST API ready: $supabase_url");
    echo "Connection successful to Supabase REST API";
}
?>
