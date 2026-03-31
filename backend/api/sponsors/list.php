<?php

// ============================================================
// sponsors/list.php – Alle aktiven Sponsoren laden
// GET /api/sponsors/list.php
// GET /api/sponsors/list.php?tier=gold   (optionaler Filter)
// ============================================================

require_once __DIR__ . '/../../api/helpers.php';
require_once __DIR__ . '/../../config/db.php';

setCorsHeaders();

$pdo         = getDbConnection();
$tierFilter  = getParam('tier');

$allowedTiers = ['platinum', 'gold', 'silver', 'bronze', 'partner'];

$sql    = "
    SELECT
        id,
        name,
        slug,
        tier,
        logo_path,
        website_url,
        short_description,
        sort_order,
        created_at,
        updated_at
    FROM sponsors
    WHERE is_active = 1
";

$params = [];

// Optionaler Tier-Filter
if ($tierFilter && in_array($tierFilter, $allowedTiers, true)) {
    $sql             .= ' AND tier = :tier';
    $params[':tier']  = $tierFilter;
}

// Sortierung: zuerst nach Tier-Priorität, dann nach sort_order, dann alphabetisch
$sql .= "
    ORDER BY
        FIELD(tier, 'platinum', 'gold', 'silver', 'bronze', 'partner') ASC,
        sort_order ASC,
        name ASC
";

try {
    $stmt     = $pdo->prepare($sql);
    $stmt->execute($params);
    $sponsors = $stmt->fetchAll();

    foreach ($sponsors as &$sponsor) {
        $sponsor['id']         = (int) $sponsor['id'];
        $sponsor['sort_order'] = (int) $sponsor['sort_order'];
    }
    unset($sponsor);

    sendSuccess($sponsors);
} catch (PDOException $e) {
    $msg = (APP_ENV === 'development') ? $e->getMessage() : 'Fehler beim Laden der Sponsoren.';
    sendError($msg, 500);
}
