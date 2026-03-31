<?php

// ============================================================
// contact/create.php – Kontaktanfrage speichern
// POST /api/contact/create.php
// Body (JSON oder FormData): name, email, subject, message, category
// ============================================================

require_once __DIR__ . '/../../api/helpers.php';
require_once __DIR__ . '/../../config/db.php';

setCorsHeaders();

// Nur POST erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Nur POST-Anfragen sind erlaubt.', 405);
}

$pdo  = getDbConnection();
$data = getPostData();

// ── 1. Pflichtfelder prüfen ───────────────────────────────────
$requiredError = validateRequired($data, ['name', 'email', 'subject', 'message']);
if ($requiredError) {
    sendError($requiredError, 422);
}

// ── 2. Felder auslesen & bereinigen ──────────────────────────
$name     = trim($data['name']);
$email    = trim($data['email']);
$subject  = trim($data['subject']);
$message  = trim($data['message']);
$category = isset($data['category']) ? trim($data['category']) : 'general';

// ── 3. Validierungen ─────────────────────────────────────────

// Name: 2–100 Zeichen
if (mb_strlen($name) < 2 || mb_strlen($name) > 100) {
    sendError('Der Name muss zwischen 2 und 100 Zeichen lang sein.', 422);
}

// E-Mail validieren
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendError('Bitte gib eine gültige E-Mail-Adresse ein.', 422);
}

// Subject: nicht leer, max. 200 Zeichen
if (mb_strlen($subject) < 1 || mb_strlen($subject) > 200) {
    sendError('Der Betreff darf maximal 200 Zeichen lang sein.', 422);
}

// Message: mindestens 10 Zeichen
if (mb_strlen($message) < 10) {
    sendError('Die Nachricht muss mindestens 10 Zeichen lang sein.', 422);
}

// Erlaubte Kategorien (passe sie an deine App an)
$allowedCategories = ['general', 'partnership', 'press', 'support', 'other'];
if (!in_array($category, $allowedCategories, true)) {
    $category = 'general';
}

// ── 4. In DB speichern ───────────────────────────────────────
$sql = "
    INSERT INTO contact_requests
        (name, email, subject, message, category, is_read, created_at)
    VALUES
        (:name, :email, :subject, :message, :category, 0, NOW())
";

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ':name'     => $name,
        ':email'    => $email,
        ':subject'  => $subject,
        ':message'  => $message,
        ':category' => $category,
    ]);

    $newId = (int) $pdo->lastInsertId();

    sendSuccess([
        'id'      => $newId,
        'message' => 'Deine Anfrage wurde erfolgreich gesendet.',
    ], 201);

} catch (PDOException $e) {
    $msg = (APP_ENV === 'development') ? $e->getMessage() : 'Fehler beim Speichern der Anfrage.';
    sendError($msg, 500);
}
