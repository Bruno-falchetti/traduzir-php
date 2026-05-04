// ================= COOKIE =================
function saveCookieHistory(data) {
    const json = JSON.stringify(data);
    const encoded = btoa(unescape(encodeURIComponent(json)));

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    document.cookie = `tr_history=${encoded}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

function getCookieHistory() {
    const match = document.cookie.match(/(^| )tr_history=([^;]+)/);
    if (!match) return [];

    try {
        return JSON.parse(decodeURIComponent(escape(atob(match[2]))));
    } catch {
        return [];
    }
}

function deleteCookie(name) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
}

// ================= HISTÓRICO =================
function saveToHistory() {
    if (localStorage.getItem('cookie_consent') !== 'true');
    if (!PHP_DATA.query || !PHP_DATA.result) return;

    let history = getCookieHistory();

    // evita duplicado
    if (history[0]?.orig === PHP_DATA.query) return;

    history.unshift({
        orig: PHP_DATA.query,
        trad: PHP_DATA.result,
        lang: PHP_DATA.langs,
        date: new Date().toLocaleString()
    });

    saveCookieHistory(history.slice(0, 15));
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

    if (localStorage.getItem('cookie_consent')) {
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

    if (localStorage.getItem('cookie_consent') === 'true') {
        saveToHistory();
    }

    
    clearBtn?.addEventListener('click', () => {
        input.value = '';
        output.value = '';
        updateCounter();
    });

    copyBtn?.addEventListener('click', () => {
        if (!output.value) return;
        navigator.clipboard.writeText(output.value);
        copyBtn.textContent = 'Copiado!';
        setTimeout(() => copyBtn.textContent = 'Copiar', 1200);
    });

    // ================= SWAP =================
    swapBtn?.addEventListener('click', () => {
        [selOrig.value, selDest.value] = [selDest.value, selOrig.value];
        [input.value, output.value] = [output.value, input.value];
        updateCounter();
    });

    // ================= CONTADOR =================
    let counter = document.querySelector('.char-counter');

    function updateCounter() {
        if (!counter) return;
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

})
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