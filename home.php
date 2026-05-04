<?php
require_once 'funcoes.php';

$texto_input = '';
$resultado_traducao = '';
$idioma_origem = 'pt';
$idioma_destino = 'en';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $texto_input = $_POST['texto'] ?? '';
    $idioma_origem = $_POST['idioma_origem'] ?? 'pt';
    $idioma_destino = $_POST['idioma_destino'] ?? 'en';
    
    $res = traduzir($texto_input, $idioma_origem, $idioma_destino);
    if ($res['ok']) {
        $resultado_traducao = $res['resultado'];
    }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tradutor Pro - Home</title>

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>

<body>
<div class="container">

    <!-- SIDEBAR -->
    <nav class="sidebar">
        <div class="logo">T<span>.</span></div>
        <a href="home.php" class="nav-item active" title="Tradutor">🌐</a>
        <a href="historico.php" class="nav-item" title="Histórico">📜</a>
    </nav>

    <!-- CONTEÚDO -->
    <main class="content">
        <header>
            <h1>Tradutor <span>Pro</span></h1>
            <p>Traduza textos rapidamente usando a API MyMemory.</p>
        </header>

        <section class="main-card">
            <form method="POST" id="transForm">

                <!-- IDIOMAS -->
                <div class="lang-select">
                    <select name="idioma_origem" id="selOrig">
                        <?php foreach ($idiomas as $code => $nome): ?>
                            <option value="<?= $code ?>" <?= $code === $idioma_origem ? 'selected' : '' ?>>
                                <?= $nome ?>
                            </option>
                        <?php endforeach; ?>
                    </select>

                    <button type="button" class="swap-btn" id="swapBtn">⇄</button>

                    <select name="idioma_destino" id="selDest">
                        <?php foreach ($idiomas as $code => $nome): ?>
                            <option value="<?= $code ?>" <?= $code === $idioma_destino ? 'selected' : '' ?>>
                                <?= $nome ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <!-- TEXTOS -->
                <div class="text-areas">

                    <!-- INPUT -->
                    <div class="area-box">
                        <textarea 
                            name="texto" 
                            id="inputTxt" 
                            placeholder="Digite o texto aqui..." 
                            maxlength="500"><?= h($texto_input) ?></textarea>

                        <button type="button" class="clear-btn" id="clearInput">Limpar</button>
                        <span class="char-counter">0/500</span>
                    </div>

                    <!-- OUTPUT -->
                    <div class="area-box">
                        <textarea 
                            id="outputTxt" 
                            readonly 
                            placeholder="A tradução aparecerá aqui..."><?= h($resultado_traducao) ?></textarea>

                        <button type="button" class="copy-btn" id="copyBtn">Copiar</button>
                    </div>

                </div>

                <button type="submit" class="btn-main">Traduzir</button>
            </form>
        </section>
    </main>
</div>

<!-- BANNER DE COOKIES -->
<div id="cookieBanner" class="cookie-banner">
    <p>Deseja aceitar os cookies?</p>
    <div class="btn-row">
        <button id="acceptCookies" class="btn-main" style="padding: 8px 20px; width: auto;">Aceitar</button>
        <button id="rejectCookies" class="btn-clear" style="padding: 8px 20px;">Recusar</button>
    </div>
</div>

<!-- DADOS PHP → JS -->
<script>
const PHP_DATA = {
    query: <?= json_encode($texto_input) ?>,
    result: <?= json_encode($resultado_traducao) ?>,
    langs: "<?= strtoupper($idioma_origem) ?> → <?= strtoupper($idioma_destino) ?>"
};
</script>

<!-- SCRIPT -->
<script src="js/script.js"></script>

</body>
</html>