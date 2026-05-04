// ================= LOCALSTORAGE =================
function getHistory() {
    try {
        return JSON.parse(localStorage.getItem('tr_history')) || [];
    } catch {
        return [];
    }
}

function saveHistory(history) {
    localStorage.setItem('tr_history', JSON.stringify(history));
}

function addToHistory(entry) {
    let history = getHistory();

    // Evita duplicata consecutiva
    if (history[0]?.orig === entry.orig) return;

    history.unshift(entry);

    // Limita a 15 entradas
    history = history.slice(0, 15);

    saveHistory(history);
}

// ================= SALVAR HISTÓRICO =================
function saveToHistory() {
    if (typeof PHP_DATA === 'undefined') return;
    if (!PHP_DATA.query || !PHP_DATA.result) return;

    const entry = {
        orig: PHP_DATA.query,
        trad: PHP_DATA.result,
        lang: PHP_DATA.langs,
        date: new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    addToHistory(entry);
}

// ================= ESCAPE HTML =================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ================= INIT =================
document.addEventListener('DOMContentLoaded', () => {

    const input    = document.getElementById('inputTxt');
    const output   = document.getElementById('outputTxt');
    const clearBtn = document.getElementById('clearInput');
    const copyBtn  = document.getElementById('copyBtn');
    const swapBtn  = document.getElementById('swapBtn');
    const selOrig  = document.getElementById('selOrig');
    const selDest  = document.getElementById('selDest');

    // Salva no histórico assim que a página carrega (se vier resultado do PHP)
    saveToHistory();

    // ================= LIMPAR TEXTO =================
    clearBtn?.addEventListener('click', () => {
        if (input)  input.value  = '';
        if (output) output.value = '';
        updateCounter();
    });

    // ================= COPIAR =================
    copyBtn?.addEventListener('click', () => {
        if (!output?.value) return;

        navigator.clipboard.writeText(output.value).then(() => {
            copyBtn.textContent = '✓ Copiado!';
            setTimeout(() => { copyBtn.textContent = 'Copiar'; }, 1400);
        });
    });

    // ================= SWAP =================
    swapBtn?.addEventListener('click', () => {
        if (!selOrig || !selDest) return;

        [selOrig.value, selDest.value] = [selDest.value, selOrig.value];

        if (input && output) {
            [input.value, output.value] = [output.value, input.value];
        }

        updateCounter();
    });

    // ================= CONTADOR DE CHARS =================
    let counter = document.querySelector('.char-counter');

    function updateCounter() {
        if (!input || !counter) return;
        const len = input.value.length;
        counter.textContent = `${len}/500`;
        counter.style.color = len > 450 ? 'var(--err)' : 'var(--muted)';
    }

    if (input) {
        // Cria o contador se não existir no HTML
        if (!counter) {
            counter = document.createElement('span');
            counter.className = 'char-counter';
            input.parentElement.appendChild(counter);
        }
        input.addEventListener('input', updateCounter);
        updateCounter();
    }

    // ================= PÁGINA DE HISTÓRICO =================
    const historyList = document.getElementById('fullHistoryList');
    const delHistBtn  = document.getElementById('delHist');

    if (historyList) {
        renderHistory();
    }

    function renderHistory() {
        const history = getHistory();

        if (history.length === 0) {
            historyList.innerHTML = `
                <div class="hist-empty">
                    <span class="hist-empty-icon">📭</span>
                    <p>Nenhuma tradução encontrada.</p>
                    <a href="home.php">Fazer minha primeira tradução →</a>
                </div>`;
            return;
        }

        historyList.innerHTML = history.map((item, i) => `
            <div class="hist-item" style="animation-delay: ${i * 0.05}s">
                <div class="hist-meta">
                    <span class="hist-langs">${escapeHtml(item.lang)}</span>
                    <span class="hist-time">⏱ ${escapeHtml(item.date)}</span>
                </div>
                <div class="hist-body">
                    <div class="hist-col">
                        <span class="hist-label">Original</span>
                        <p>${escapeHtml(item.orig)}</p>
                    </div>
                    <div class="hist-arrow">→</div>
                    <div class="hist-col">
                        <span class="hist-label">Tradução</span>
                        <p>${escapeHtml(item.trad)}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // ================= LIMPAR HISTÓRICO =================
    delHistBtn?.addEventListener('click', () => {
        if (!confirm('Tem certeza que deseja limpar todo o histórico?')) return;
        localStorage.removeItem('tr_history');
        if (historyList) renderHistory();
    });
});

// ================= PAGE TRANSITION =================
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('fade-in');

    document.querySelectorAll('a').forEach(link => {
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const url = this.href;
                document.body.classList.remove('fade-in');
                document.body.classList.add('fade-out');
                setTimeout(() => { window.location.href = url; }, 300);
            });
        }
    });
});