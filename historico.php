<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Histórico - Tradutor Pro</title>

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">

        <!-- SIDEBAR -->
        <nav class="sidebar">
            <div class="logo">T<span>.</span></div>

            <a href="home.php" class="nav-item" title="Tradutor">🌐</a>
            <a href="historico.php" class="nav-item active" title="Histórico">📜</a>
        </nav>

        <!-- CONTENT -->
        <main class="content">
            
            <div style="width:100%; max-width:1000px;">

                <!-- HEADER -->
                <header style="display:flex; justify-content:space-between; align-items:center; flex-wrap: wrap; gap: 15px;">
                    <div>
                        <h1>Seu <span>Histórico</span></h1>
                        <p>Traduções salvas no seu navegador (localStorage).</p>
                    </div>

                    <button id="delHist" class="btn-clear" style="color:var(--err); border-color:var(--err);">
                        Limpar Tudo
                    </button>
                </header>

                <!-- LISTA -->
                <div id="fullHistoryList" class="history-grid">
                    <!-- JS preenche aqui -->
                </div>

            </div>

        </main>
    </div>

    <script src="js/script.js"></script>
</body>
</html>