<?php
require_once __DIR__ . '/../../api/helpers.php';
require_once __DIR__ . '/../../config/db.php';
setCorsHeaders();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Nur POST-Anfragen sind erlaubt.', 405);
}
$pdo  = getDbConnection();
$data = getPostData();
$requiredError = validateRequired($data, ['name', 'email', 'subject', 'message']);
if ($requiredError) { sendError($requiredError, 422); }
$name     = trim($data['name']);
$email    = trim($data['email']);
$subject  = trim($data['subject']);
$message  = trim($data['message']);
$category = isset($data['category']) ? trim($data['category']) : 'general';
if (mb_strlen($name) < 2 || mb_strlen($name) > 100) { sendError('Name muss 2–100 Zeichen lang sein.', 422); }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { sendError('Ungültige E-Mail-Adresse.', 422); }
if (mb_strlen($subject) < 1 || mb_strlen($subject) > 200) { sendError('Betreff max. 200 Zeichen.', 422); }
if (mb_strlen($message) < 10) { sendError('Nachricht min. 10 Zeichen.', 422); }
$allowedCategories = ['general', 'partnership', 'press', 'support', 'other'];
if (!in_array($category, $allowedCategories, true)) { $category = 'general'; }
$sql = "INSERT INTO contact_requests (name, email, subject, message, category, is_read, created_at)
        VALUES (:name, :email, :subject, :message, :category, 0, NOW())";
try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':name' => $name, ':email' => $email, ':subject' => $subject, ':message' => $message, ':category' => $category]);
    $newId = (int) $pdo->lastInsertId();

    // ── E-Mail senden ──────────────────────────────────────
    $to      = 'lennyamstutz@gmail.com'; // <-- HIER DEINE E-MAIL EINTRAGEN
    $mailSubject = '[Wasserchocher] ' . $subject;
    $mailBody    = "Neue Kontaktanfrage von der Wasserchocher Website\n\n";
    $mailBody   .= "Name:     $name\n";
    $mailBody   .= "E-Mail:   $email\n";
    $mailBody   .= "Kategorie: $category\n";
    $mailBody   .= "Betreff:  $subject\n\n";
    $mailBody   .= "Nachricht:\n$message\n";
    $headers  = "From: noreply@wasserchocher.ch\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    mail($to, $mailSubject, $mailBody, $headers);

    sendSuccess(['id' => $newId, 'message' => 'Deine Anfrage wurde erfolgreich gesendet.'], 201);
} catch (PDOException $e) {
    $msg = (APP_ENV === 'development') ? $e->getMessage() : 'Fehler beim Speichern der Anfrage.';
    sendError($msg, 500);
}
