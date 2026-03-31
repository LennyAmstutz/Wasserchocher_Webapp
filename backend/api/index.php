<?php

// ============================================================
// index.php – API-Root
// Einfacher Endpunkt als Bestätigung, dass die API läuft.
// GET /api/
// ============================================================

require_once __DIR__ . '/helpers.php';

setCorsHeaders();

sendSuccess([
    'name'    => 'Backend API',
    'version' => '1.0.0',
    'status'  => 'running',
]);
