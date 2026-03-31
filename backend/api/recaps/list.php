<?php

// ============================================================
// recaps/list.php – Alle Rückblicke laden
// GET /api/recaps/list.php
// ============================================================

require_once __DIR__ . '/../../api/helpers.php';
require_once __DIR__ . '/../../config/db.php';

setCorsHeaders();

$pdo = getDbConnection();

$sql = "
    SELECT
        r.id,
        r.event_id,
        r.title,
        r.cover_image_path,
        r.published_at,
        r.created_at,
        r.updated_at,
        e.title      AS event_title,
        e.slug       AS event_slug,
        e.event_date AS event_date
    FROM recaps r
    LEFT JOIN events e ON e.id = r.event_id
    WHERE r.published_at IS NOT NULL
      AND r.published_at <= NOW()
    ORDER BY r.published_at DESC
";

try {
    $stmt   = $pdo->prepare($sql);
    $stmt->execute();
    $recaps = $stmt->fetchAll();

    foreach ($recaps as &$recap) {
        $recap['id']       = (int) $recap['id'];
        $recap['event_id'] = (int) $recap['event_id'];
    }
    unset($recap);

    sendSuccess($recaps);
} catch (PDOException $e) {
    $msg = (APP_ENV === 'development') ? $e->getMessage() : 'Fehler beim Laden der Rückblicke.';
    sendError($msg, 500);
}
