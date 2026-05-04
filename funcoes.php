<?php
declare(strict_types=1);

const MYMEMORY_URL   = 'https://api.mymemory.translated.net/get';
const MYMEMORY_EMAIL = ''; // Opcional
const MAX_CHARS      = 500;
const TIMEOUT        = 10;

function traduzir(string $texto, string $de = 'en', string $para = 'pt'): array {
    $texto = trim($texto);
    if ($texto === '') return ['ok' => false, 'resultado' => 'Texto vazio.'];
    if (mb_strlen($texto) > MAX_CHARS) return ['ok' => false, 'resultado' => 'Limite excedido.'];

    $params = ['q' => $texto, 'langpair' => "$de|$para"];
    if (MYMEMORY_EMAIL !== '') $params['de'] = MYMEMORY_EMAIL;

    $url = MYMEMORY_URL . '?' . http_build_query($params);
    $context = stream_context_create(['http' => ['method' => 'GET', 'timeout' => TIMEOUT, 'ignore_errors' => true]]);
    $response = @file_get_contents($url, false, $context);

    if ($response === false) return ['ok' => false, 'resultado' => 'Falha na rede.'];
    $json = json_decode($response, true);
    
    if (($json['responseStatus'] ?? 0) !== 200) return ['ok' => false, 'resultado' => $json['responseDetails'] ?? 'Erro API'];

    return ['ok' => true, 'resultado' => $json['responseData']['translatedText']];
}

function h(string $s): string { return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }

$idiomas = ['en'=>'Inglês','pt'=>'Português','es'=>'Espanhol','fr'=>'Francês','de'=>'Alemão','it'=>'Italiano','ru'=>'Russo','zh'=>'Chinês','ja'=>'Japonês','ar'=>'Árabe'];
