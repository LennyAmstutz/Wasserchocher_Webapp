<?php
require_once __DIR__ . '/../../api/helpers.php';
require_once __DIR__ . '/../../config/db.php';
setCorsHeaders();
$pdo      = getDbConnection();
$id       = getParam('id');
$eventId  = getParam('event_id');
if (!$id && !$eventId) {
    sendError("Parameter 'id' oder 'event_id' ist erforderlich.", 400);
}
$sql = "
    SELECT r.id, r.event_id, r.title, r.content, r.cover_image_path,
           r.published_at, r.created_at, r.updated_at,
           e.title AS event_title, e.slug AS event_slug,
           e.event_date AS event_date, e.location AS event_location
    FROM recaps r
    LEFT JOIN events e ON e.id = r.event_id
    WHERE r.published_at IS NOT NULL AND r.published_at <= NOW() AND ";
$params = [];
if ($id) {
    $sql .= 'r.id = :id';
    $params[':id'] = (int) $id;
} else {
    $sql .= 'r.event_id = :event_id';
    $params[':event_id'] = (int) $eventId;
}
$sql .= ' LIMIT 1';
try {
    $stmt  = $pdo->prepare($sql);
    $stmt->execute($params);
    $recap = $stmt->fetch();
    if (!$recap) { sendError('Rückblick nicht gefunden.', 404); }
    $recap['id']       = (int) $recap['id'];
    $recap['event_id'] = (int) $recap['event_id'];
    $imgStmt = $pdo->prepare("
        SELECT image_path, alt_text, caption, sort_order
        FROM event_images
        WHERE event_id = :event_id
        ORDER BY sort_order ASC
    ");
    $imgStmt->execute([':event_id' => $recap['event_id']]);
    $recap['images'] = $imgStmt->fetchAll();
    sendSuccess($recap);
} catch (PDOException $e) {
    $msg = (APP_ENV === 'development') ? $e->getMessage() : 'Fehler beim Laden des Rückblicks.';
    sendError($msg, 500);
}
