<?php

// ============================================================
// events/list.php – Alle sichtbaren Events laden
// GET /api/events/list.php
// GET /api/events/list.php?status=upcoming   (optional Filter)
// ============================================================

require_once __DIR__ . '/../../api/helpers.php';
require_once __DIR__ . '/../../config/db.php';

setCorsHeaders();

$pdo = getDbConnection();

// Optionaler Status-Filter via Query-Parameter (?status=upcoming)
$statusFilter = getParam('status');

$allowedStatuses = ['upcoming', 'ongoing', 'past', 'cancelled'];

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
    WHERE 1=1
";

$params = [];

// Status-Filter nur übernehmen, wenn gültig
if ($statusFilter && in_array($statusFilter, $allowedStatuses, true)) {
    $sql    .= ' AND status = :status';
    $params[':status'] = $statusFilter;
} else {
    // Standardmässig keine gecancelten Events anzeigen
    $sql .= " AND status != 'cancelled'";
}

$sql .= ' ORDER BY event_date ASC';

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $events = $stmt->fetchAll();

    // Typen sauber casten
    foreach ($events as &$event) {
        $event['id']          = (int) $event['id'];
        $event['is_featured'] = (bool) $event['is_featured'];
    }
    unset($event);

    sendSuccess($events);
} catch (PDOException $e) {
    $msg = (APP_ENV === 'development') ? $e->getMessage() : 'Fehler beim Laden der Events.';
    sendError($msg, 500);
}
