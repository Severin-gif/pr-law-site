<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'ok' => false,
        'error' => 'method_not_allowed',
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$rawBody = file_get_contents('php://input');
$contentType = strtolower((string)($_SERVER['CONTENT_TYPE'] ?? ''));
$data = [];

if (str_contains($contentType, 'application/json')) {
    $decoded = json_decode((string)$rawBody, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
} elseif (!empty($_POST)) {
    $data = $_POST;
}

$name = trim((string)($data['name'] ?? ''));
$contact = trim((string)($data['contact'] ?? ''));
$message = trim((string)($data['message'] ?? ''));
$hp = trim((string)($data['hp'] ?? ''));
$consentRaw = $data['consent'] ?? false;
$consent = in_array($consentRaw, [true, 1, '1', 'true', 'on', 'yes'], true);

if ($hp !== '') {
    http_response_code(200);
    echo json_encode([
        'ok' => true,
        'skipped' => 'honeypot',
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if ($name === '' || $contact === '' || $message === '' || $consent !== true) {
    http_response_code(400);
    echo json_encode([
        'ok' => false,
        'error' => 'invalid_payload',
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

http_response_code(200);
echo json_encode([
    'ok' => true,
    'queued' => false,
    'runtime' => 'php',
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
