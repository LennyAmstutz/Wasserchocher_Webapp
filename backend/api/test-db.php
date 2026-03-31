<?php

// ============================================================
// test-db.php – PHP-Laufzeit-Test
// Bestätigt, dass PHP korrekt läuft (kein DB-Zugriff).
// GET /api/test-db.php
// ============================================================

require_once __DIR__ . '/helpers.php';

setCorsHeaders();

sendSuccess([
    'php_version' => PHP_VERSION,
    'server_time' => date('Y-m-d H:i:s'),
    'message'     => 'PHP läuft korrekt.',
]);
