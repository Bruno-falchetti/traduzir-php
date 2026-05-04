<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Histórico — LinguaFlow</title>
 
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
 
        <!-- SIDEBAR -->
        <nav class="sidebar">
            <div class="logo">L<span>.</span></div>
            <a href="home.php"      class="nav-item" title="Tradutor">🌐</a>
            <a href="historico.php" class="nav-item active" title="Histórico">📜</a>
        </nav>
 
        <!-- CONTENT -->
        <main class="content">
            <div class="hist-page">
 
                <!-- HEADER -->
                <header class="hist-header">
                    <div>
                        <h1>Seu <span>Histórico</span></h1>
                        <p>Traduções salvas localmente no seu navegador.</p>
                    </div>
                    <button id="delHist" class="btn-danger">
                        🗑 Limpar Tudo
                    </button>
                </header>
 
                <!-- LISTA -->
                <div id="fullHistoryList" class="history-grid">
                    <!-- preenchido pelo script.js -->
                </div>
 
            </div>
        </main>
    </div>
 
    <script src="js/script.js"></script>
</body>
</html>