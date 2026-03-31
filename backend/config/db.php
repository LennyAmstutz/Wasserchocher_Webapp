<?php

// ============================================================
// db.php – PDO-Datenbankverbindung
// Gibt eine wiederverwendbare $pdo-Instanz zurück.
// Wird per require_once in jede API-Datei eingebunden.
// ============================================================

require_once __DIR__ . '/config.php';

function getDbConnection(): PDO
{
    static $pdo = null;

    // Singleton: Verbindung wird nur einmal pro Request aufgebaut
    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;charset=%s',
        DB_HOST,
        DB_NAME,
        DB_CHARSET
    );

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,   // Fehler als Exception
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,          // Assoziative Arrays
        PDO::ATTR_EMULATE_PREPARES   => false,                     // Echte Prepared Statements
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        // Fehlermeldung nur im Development-Modus ausgeben
        $message = (APP_ENV === 'development')
            ? 'Datenbankverbindung fehlgeschlagen: ' . $e->getMessage()
            : 'Datenbankverbindung fehlgeschlagen.';

        http_response_code(503);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['success' => false, 'message' => $message]);
        exit;
    }
}
