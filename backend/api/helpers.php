<?php

// ============================================================
// helpers.php – Gemeinsame Hilfsfunktionen
// Wird in jede API-Datei eingebunden.
// ============================================================

require_once __DIR__ . '/../config/config.php';

// ------------------------------------------------------------
// CORS-Header setzen (für Angular HttpClient)
// ------------------------------------------------------------
function setCorsHeaders(): void
{
    header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Content-Type: application/json; charset=utf-8');

    // OPTIONS-Preflight-Request sofort beenden
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

// ------------------------------------------------------------
// Erfolgreiche JSON-Antwort senden
// ------------------------------------------------------------
function sendSuccess(mixed $data, int $statusCode = 200): void
{
    http_response_code($statusCode);
    echo json_encode([
        'success' => true,
        'data'    => $data,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// ------------------------------------------------------------
// Fehler-JSON-Antwort senden
// ------------------------------------------------------------
function sendError(string $message, int $statusCode = 400): void
{
    http_response_code($statusCode);
    echo json_encode([
        'success' => false,
        'message' => $message,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// ------------------------------------------------------------
// Query-Parameter sicher auslesen (GET)
// ------------------------------------------------------------
function getParam(string $key, mixed $default = null): mixed
{
    return isset($_GET[$key]) ? trim($_GET[$key]) : $default;
}

// ------------------------------------------------------------
// POST-Body als JSON oder FormData auslesen
// ------------------------------------------------------------
function getPostData(): array
{
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

    if (str_contains($contentType, 'application/json')) {
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true);
        return is_array($data) ? $data : [];
    }

    return $_POST;
}

// ------------------------------------------------------------
// Einfache Validierung: Pflichtfelder prüfen
// ------------------------------------------------------------
function validateRequired(array $data, array $fields): ?string
{
    foreach ($fields as $field) {
        if (empty($data[$field])) {
            return "Das Feld '$field' ist erforderlich.";
        }
    }
    return null;
}
