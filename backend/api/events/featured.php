<?php

// ============================================================
// events/featured.php – Das gefeatured Event laden
// GET /api/events/featured.php
// Gibt das erste aktive Event mit is_featured = true zurück,
// oder { success: true, data: null } wenn keines existiert.
// ============================================================

require_once __DIR__ . '/../../api/helpers.php';
require_once __DIR__ . '/../../config/db.php';

setCorsHeaders();

$pdo = getDbConnection();

$sql = "
    SELECT
        id,
        title,
        slug,
        short_description,
        event_date,
        event_time,
        location,
        address,
        hero_image_path,
        status,
        is_featured,
        created_at,
        updated_at
    FROM events
    WHERE is_featured = 1
      AND status != 'cancelled'
    ORDER BY event_date ASC
    LIMIT 1
";

try {
    $stmt  = $pdo->prepare($sql);
    $stmt->execute();
    $event = $stmt->fetch();

    if ($event) {
        $event['id']          = (int) $event['id'];
        $event['is_featured'] = (bool) $event['is_featured'];
        sendSuccess($event);
    } else {
        // Kein Featured-Event vorhanden → null zurückgeben (kein Fehler)
        sendSuccess(null);
    }
} catch (PDOException $e) {
    $msg = (APP_ENV === 'development') ? $e->getMessage() : 'Fehler beim Laden des Featured-Events.';
    sendError($msg, 500);
}
