<?php

// ============================================================
// test-connection.php – Datenbankverbindungs-Test
// Testet, ob PDO die DB erreicht.
// GET /api/test-connection.php
// ============================================================

require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/../config/db.php';

setCorsHeaders();

// getDbConnection() beendet das Script selbst bei Fehler
$pdo = getDbConnection();

// Einfache Test-Query
$stmt = $pdo->query('SELECT 1 AS connected');
$row  = $stmt->fetch();

if ($row && $row['connected'] === 1) {
    sendSuccess([
        'connected'   => true,
        'db_name'     => DB_NAME,
        'server_time' => date('Y-m-d H:i:s'),
        'message'     => 'Datenbankverbindung erfolgreich.',
    ]);
} else {
    sendError('Datenbankverbindung konnte nicht verifiziert werden.', 503);
}
