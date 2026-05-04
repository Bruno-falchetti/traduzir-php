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

    // evita duplicado
    if (history[0]?.orig === entry.orig) return;

    history.unshift(entry);

    // limita a 15
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
        date: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    addToHistory(entry);
}

// ================= INIT =================
document.addEventListener('DOMContentLoaded', () => {

    const input = document.getElementById('inputTxt');
    const output = document.getElementById('outputTxt');
    const clearBtn = document.getElementById('clearInput');
    const copyBtn = document.getElementById('copyBtn');
    const swapBtn = document.getElementById('swapBtn');
    const selOrig = document.getElementById('selOrig');
    const selDest = document.getElementById('selDest');

    const banner = document.getElementById('cookieBanner');

    // ================= COOKIE BANNER (OPCIONAL) =================
    const consent = localStorage.getItem('cookie_consent');

    if (consent === null && banner) {
        setTimeout(() => banner.style.display = 'flex', 500);
    }

    document.getElementById('acceptCookies')?.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'true');
        banner.style.display = 'none';
        saveToHistory();
    });

    document.getElementById('rejectCookies')?.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'false');
        banner.style.display = 'none';
    });

    // salva direto (independente de cookie)
    saveToHistory();

    // ================= LIMPAR TEXTO =================
    clearBtn?.addEventListener('click', () => {
        if (input) input.value = '';
        if (output) output.value = '';
        updateCounter();
    });

    // ================= COPIAR =================
    copyBtn?.addEventListener('click', () => {
        if (!output?.value) return;

        navigator.clipboard.writeText(output.value);
        copyBtn.textContent = 'Copiado!';

        setTimeout(() => {
            copyBtn.textContent = 'Copiar';
        }, 1200);
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

    // ================= CONTADOR =================
    let counter = document.querySelector('.char-counter');

    function updateCounter() {
        if (!input || !counter) return;

        const len = input.value.length;
        counter.textContent = `${len}/500`;
        counter.style.color = len > 500 ? 'var(--err)' : 'var(--muted)';
    }

    if (input) {
        if (!counter) {
            counter = document.createElement('span');
            counter.className = 'char-counter';
            input.parentElement.appendChild(counter);
        }

        input.addEventListener('input', updateCounter);
        updateCounter();
    }

    // ================= HISTÓRICO PAGE =================
    const historyList = document.getElementById('fullHistoryList');
    const delHistBtn = document.getElementById('delHist');

    if (historyList) {
        const history = getHistory();

        if (history.length === 0) {
            historyList.innerHTML = '<p id="emptyMsg">Nenhuma tradução encontrada.</p>';
        } else {
            historyList.innerHTML = history.map(item => `
                <div class="hist-item">
                    <div class="hist-meta">${item.lang} - ${item.date}</div>
                    <p><strong>Original:</strong> ${escapeHtml(item.orig)}</p>
                    <p><strong>Tradução:</strong> ${escapeHtml(item.trad)}</p>
                </div>
            `).join('');
        }
    }

    // ================= LIMPAR HISTÓRICO =================
    delHistBtn?.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja limpar o histórico?')) {
            localStorage.removeItem('tr_history');

            if (historyList) {
                historyList.innerHTML = '<p id="emptyMsg">Histórico vazio.</p>';
            }
        }
    });
});

// ================= PAGE TRANSITION =================
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-in");

    const links = document.querySelectorAll("a");

    links.forEach(link => {
        if (link.hostname === window.location.hostname) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                const url = this.href;

                document.body.classList.remove("fade-in");
                document.body.classList.add("fade-out");

                setTimeout(() => {
                    window.location.href = url;
                }, 300);
            });
        }
    });
});

// ================= ESCAPE HTML =================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}