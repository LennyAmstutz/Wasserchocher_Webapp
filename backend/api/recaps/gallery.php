<?php
require_once __DIR__ . '/../../api/helpers.php';
require_once __DIR__ . '/../../config/db.php';
setCorsHeaders();
$pdo = getDbConnection();
try {
    $covers = $pdo->query("SELECT DISTINCT cover_image_path AS image_path, title AS alt_text FROM recaps WHERE cover_image_path IS NOT NULL ORDER BY published_at DESC")->fetchAll();
    $gallery = $pdo->query("SELECT DISTINCT image_path, alt_text FROM event_images ORDER BY id ASC")->fetchAll();
    sendSuccess(array_merge($covers, $gallery));
} catch (PDOException $e) {
    sendError($e->getMessage(), 500);
}
