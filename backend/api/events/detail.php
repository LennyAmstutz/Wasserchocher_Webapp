<?php

// ============================================================
// events/detail.php – Ein einzelnes Event mit Bildern & Sponsoren
// GET /api/events/detail.php?slug=mein-event
// GET /api/events/detail.php?id=5
// ============================================================

require_once __DIR__ . '/../../api/helpers.php';
require_once __DIR__ . '/../../config/db.php';

setCorsHeaders();

$pdo  = getDbConnection();
$slug = getParam('slug');
$id   = getParam('id');

// Mindestens slug oder id muss angegeben sein
if (!$slug && !$id) {
    sendError("Parameter 'slug' oder 'id' ist erforderlich.", 400);
}

// ── 1. Event laden ────────────────────────────────────────────
$sql    = "
    SELECT
        id,
        title,
        slug,
        short_description,
        description,
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
    WHERE ";

$params = [];

if ($slug) {
    $sql           .= 'slug = :slug';
    $params[':slug'] = $slug;
} else {
    $sql         .= 'id = :id';
    $params[':id'] = (int) $id;
}

$sql .= ' LIMIT 1';

try {
    $stmt  = $pdo->prepare($sql);
    $stmt->execute($params);
    $event = $stmt->fetch();

    if (!$event) {
        sendError('Event nicht gefunden.', 404);
    }

    $event['id']          = (int) $event['id'];
    $event['is_featured'] = (bool) $event['is_featured'];
    $eventId              = $event['id'];

    // ── 2. Bilder laden ──────────────────────────────────────────
    $imgStmt = $pdo->prepare("
        SELECT
            id,
            image_path,
            alt_text,
            caption,
            sort_order,
            created_at
        FROM event_images
        WHERE event_id = :event_id
        ORDER BY sort_order ASC, id ASC
    ");
    $imgStmt->execute([':event_id' => $eventId]);
    $images = $imgStmt->fetchAll();

    foreach ($images as &$img) {
        $img['id']         = (int) $img['id'];
        $img['sort_order'] = (int) $img['sort_order'];
    }
    unset($img);

    $event['images'] = $images;

    // ── 3. Sponsoren laden (via event_sponsors JOIN sponsors) ─────
    $sponStmt = $pdo->prepare("
        SELECT
            s.id,
            s.name,
            s.slug,
            s.tier,
            s.logo_path,
            s.website_url,
            s.short_description
        FROM event_sponsors es
        INNER JOIN sponsors s ON s.id = es.sponsor_id
        WHERE es.event_id = :event_id
          AND s.is_active = 1
        ORDER BY s.sort_order ASC, s.name ASC
    ");
    $sponStmt->execute([':event_id' => $eventId]);
    $sponsors = $sponStmt->fetchAll();

    foreach ($sponsors as &$sponsor) {
        $sponsor['id'] = (int) $sponsor['id'];
    }
    unset($sponsor);

    $event['sponsors'] = $sponsors;

    // ── 4. Zusammengebautes Event-Objekt senden ──────────────────
    sendSuccess($event);

} catch (PDOException $e) {
    $msg = (APP_ENV === 'development') ? $e->getMessage() : 'Fehler beim Laden des Events.';
    sendError($msg, 500);
}
