<?php
// Connection data for Supabase 
$host = "db.tbcgnqxvskujlhsnynvq.supabase.co;   // Dirección del servidor
$port = "5432";                  // Puerto por defecto de PostgreSQL
$dbname = "MinesSweeperDataBase";            // Nombre de la base de datos
$user = "MSDATASERVER_ADMIN";            // Usuario de Supabase
$password = "S=p2_5Cg";       // Contraseña de Supabase

try {
    // Create a new PDO instance
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;";
    $pdo = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    echo "Connection successful to Supabase";

} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
