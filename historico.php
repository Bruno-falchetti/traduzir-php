<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Histórico - Tradutor Pro</title>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <nav class="sidebar">
            <div class="logo">T<span>.</span></div>
            <a href="home.php" class="nav-item" title="Tradutor">&#127760;</a>
            <a href="historico.php" class="nav-item active" title="Histórico">&#128220;</a>
        </nav>

        <main class="content">
            <header style="display:flex; justify-content:space-between; align-items:center; flex-wrap: wrap; gap: 15px;">
                <div>
                    <h1>Seu <span>Histórico</span></h1>
                    <p>Traduções salvas localmente via cookies (sem banco de dados).</p>
                </div>
                <button id="delHist" class="btn-clear" style="color:var(--err); border-color:var(--err);">Limpar Tudo</button>
            </header>

            <div id="fullHistoryList" class="history-grid">
                <!-- Preenchido via JavaScript -->
            </div>
        </main>
    </div>

    <script src="js/script.js"></script>
</body>
</html>
