/*
 * Cookie-Banner für Baeumler Marketing
 * DSGVO-konform | Deutsch | Eigene Farben
 *
 * Einbindung: <script src="cookie-banner.js" defer></script>
 * vor </body> in jeder HTML-Seite einfügen.
 *
 * WICHTIG: GTM-ID, Analytics-ID und Facebook-Pixel-ID unten anpassen!
 */

(function () {
  // ============================================
  // HIER DEINE IDs EINTRAGEN:
  // ============================================
  const CONFIG = {
    gtmId: 'GTM-XXXXXXX',           // Deine Google Tag Manager ID
    analyticsId: 'G-XXXXXXXXXX',     // Deine Google Analytics 4 ID
    facebookPixelId: '0000000000',   // Deine Facebook Pixel ID
    cookieName: 'baeumler_consent',
    cookieDays: 365,
  };

  // Prüfe ob schon eine Einwilligung gespeichert ist
  function getConsent() {
    const cookie = document.cookie.split('; ').find(c => c.startsWith(CONFIG.cookieName + '='));
    if (!cookie) return null;
    try {
      return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
    } catch (e) {
      return null;
    }
  }

  function setConsent(consent) {
    const date = new Date();
    date.setTime(date.getTime() + CONFIG.cookieDays * 24 * 60 * 60 * 1000);
    document.cookie = CONFIG.cookieName + '=' + encodeURIComponent(JSON.stringify(consent)) +
      '; expires=' + date.toUTCString() + '; path=/; SameSite=Lax';
  }

  // ============================================
  // TRACKING-SCRIPTE LADEN
  // ============================================

  function loadGTM() {
    if (document.querySelector('script[src*="googletagmanager.com/gtm.js"]')) return;
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', CONFIG.gtmId);
  }

  function loadAnalytics() {
    if (document.querySelector('script[src*="googletagmanager.com/gtag"]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + CONFIG.analyticsId;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', CONFIG.analyticsId, { anonymize_ip: true });
  }

  function loadFacebookPixel() {
    if (window.fbq) return;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', CONFIG.facebookPixelId);
    fbq('track', 'PageView');
  }

  function applyConsent(consent) {
    if (consent.analytics) {
      loadAnalytics();
    }
    if (consent.marketing) {
      loadGTM();
      loadFacebookPixel();
    }
  }

  // ============================================
  // BANNER HTML & CSS
  // ============================================

  function createBanner() {
    const style = document.createElement('style');
    style.textContent = `
      .cb-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 99998;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .cb-overlay.cb-show { opacity: 1; }

      .cb-banner {
        position: fixed;
        bottom: 0; left: 0; right: 0;
        background: #ffffff;
        z-index: 99999;
        box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
        font-family: 'Inter', system-ui, sans-serif;
        color: #303030;
        transform: translateY(100%);
        transition: transform 0.4s ease;
        max-height: 90vh;
        overflow-y: auto;
      }
      .cb-banner.cb-show { transform: translateY(0); }

      .cb-inner {
        max-width: 900px;
        margin: 0 auto;
        padding: 24px 20px;
      }

      .cb-title {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 20px;
        font-weight: 700;
        margin: 0 0 8px 0;
        color: #1e2d5a;
      }

      .cb-text {
        font-size: 14px;
        line-height: 1.6;
        margin: 0 0 20px 0;
        color: #555;
      }

      .cb-text a {
        color: #e8604c;
        text-decoration: underline;
      }

      .cb-buttons {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-bottom: 0;
      }

      .cb-btn {
        padding: 12px 24px;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s, transform 0.1s;
        font-family: 'Inter', system-ui, sans-serif;
      }
      .cb-btn:hover { transform: translateY(-1px); }
      .cb-btn:active { transform: translateY(0); }

      .cb-btn-accept {
        background: #e8604c;
        color: #fff;
      }
      .cb-btn-accept:hover { background: #d4553f; }

      .cb-btn-necessary {
        background: #f7f7f5;
        color: #303030;
        border: 1px solid #ddd;
      }
      .cb-btn-necessary:hover { background: #eee; }

      .cb-btn-settings {
        background: transparent;
        color: #e8604c;
        border: 1px solid #e8604c;
      }
      .cb-btn-settings:hover { background: #fef5f3; }

      .cb-btn-save {
        background: #2db8a8;
        color: #fff;
      }
      .cb-btn-save:hover { background: #27a597; }

      /* Detail-Einstellungen */
      .cb-details {
        display: none;
        margin-top: 20px;
        padding-top: 16px;
        border-top: 1px solid #eee;
      }
      .cb-details.cb-show { display: block; }

      .cb-category {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 12px 0;
        border-bottom: 1px solid #f0f0f0;
      }
      .cb-category:last-child { border-bottom: none; }

      .cb-cat-info { flex: 1; padding-right: 16px; }

      .cb-cat-name {
        font-size: 15px;
        font-weight: 600;
        margin: 0 0 4px 0;
        color: #303030;
      }

      .cb-cat-desc {
        font-size: 13px;
        color: #777;
        margin: 0;
        line-height: 1.5;
      }

      /* Toggle Switch */
      .cb-toggle {
        position: relative;
        width: 44px;
        height: 24px;
        flex-shrink: 0;
        margin-top: 2px;
      }
      .cb-toggle input {
        opacity: 0;
        width: 0;
        height: 0;
      }
      .cb-slider {
        position: absolute;
        cursor: pointer;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: #ccc;
        transition: 0.3s;
        border-radius: 24px;
      }
      .cb-slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.3s;
        border-radius: 50%;
      }
      .cb-toggle input:checked + .cb-slider {
        background-color: #2db8a8;
      }
      .cb-toggle input:checked + .cb-slider:before {
        transform: translateX(20px);
      }
      .cb-toggle input:disabled + .cb-slider {
        background-color: #2db8a8;
        opacity: 0.6;
        cursor: not-allowed;
      }

      /* Footer-Link */
      .cb-footer-link {
        cursor: pointer;
        color: #e8604c;
        font-size: 13px;
        text-decoration: underline;
        background: none;
        border: none;
        font-family: 'Inter', system-ui, sans-serif;
        padding: 0;
      }
      .cb-footer-link:hover { color: #d4553f; }

      @media (max-width: 600px) {
        .cb-inner { padding: 20px 16px; }
        .cb-buttons { flex-direction: column; }
        .cb-btn { width: 100%; text-align: center; }
      }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.className = 'cb-overlay';
    overlay.id = 'cb-overlay';

    const banner = document.createElement('div');
    banner.className = 'cb-banner';
    banner.id = 'cb-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie-Einstellungen');
    banner.innerHTML = `
      <div class="cb-inner">
        <h2 class="cb-title">Wir respektieren deine Privatsphäre</h2>
        <p class="cb-text">
          Wir verwenden Cookies, um dein Erlebnis auf unserer Webseite zu verbessern.
          Einige sind notwendig, andere helfen uns die Seite zu optimieren und dir relevante Inhalte zu zeigen.
          Mehr dazu in unserer <a href="/datenschutz.html">Datenschutzerklärung</a>.
        </p>

        <div class="cb-buttons" id="cb-main-buttons">
          <button class="cb-btn cb-btn-accept" id="cb-accept-all">Alle akzeptieren</button>
          <button class="cb-btn cb-btn-necessary" id="cb-necessary-only">Nur notwendige</button>
          <button class="cb-btn cb-btn-settings" id="cb-show-settings">Einstellungen</button>
        </div>

        <div class="cb-details" id="cb-details">
          <div class="cb-category">
            <div class="cb-cat-info">
              <p class="cb-cat-name">Notwendig</p>
              <p class="cb-cat-desc">Diese Cookies sind für die Grundfunktionen der Webseite erforderlich und können nicht deaktiviert werden.</p>
            </div>
            <label class="cb-toggle">
              <input type="checkbox" checked disabled>
              <span class="cb-slider"></span>
            </label>
          </div>

          <div class="cb-category">
            <div class="cb-cat-info">
              <p class="cb-cat-name">Analyse</p>
              <p class="cb-cat-desc">Helfen uns zu verstehen, wie Besucher unsere Seite nutzen. Dazu gehören Google Analytics und Looker Studio.</p>
            </div>
            <label class="cb-toggle">
              <input type="checkbox" id="cb-analytics">
              <span class="cb-slider"></span>
            </label>
          </div>

          <div class="cb-category">
            <div class="cb-cat-info">
              <p class="cb-cat-name">Marketing</p>
              <p class="cb-cat-desc">Werden verwendet, um dir relevante Werbung zu zeigen. Dazu gehören Facebook Pixel und Google Tag Manager.</p>
            </div>
            <label class="cb-toggle">
              <input type="checkbox" id="cb-marketing">
              <span class="cb-slider"></span>
            </label>
          </div>

          <div class="cb-buttons" style="margin-top: 16px;">
            <button class="cb-btn cb-btn-save" id="cb-save-settings">Auswahl speichern</button>
            <button class="cb-btn cb-btn-accept" id="cb-accept-all-2">Alle akzeptieren</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(banner);

    // Banner anzeigen mit Animation
    requestAnimationFrame(() => {
      overlay.classList.add('cb-show');
      banner.classList.add('cb-show');
    });

    // Event-Listener
    document.getElementById('cb-accept-all').addEventListener('click', () => {
      saveAndClose({ necessary: true, analytics: true, marketing: true });
    });

    document.getElementById('cb-accept-all-2').addEventListener('click', () => {
      saveAndClose({ necessary: true, analytics: true, marketing: true });
    });

    document.getElementById('cb-necessary-only').addEventListener('click', () => {
      saveAndClose({ necessary: true, analytics: false, marketing: false });
    });

    document.getElementById('cb-show-settings').addEventListener('click', () => {
      document.getElementById('cb-details').classList.toggle('cb-show');
      document.getElementById('cb-main-buttons').style.display =
        document.getElementById('cb-details').classList.contains('cb-show') ? 'none' : 'flex';
    });

    document.getElementById('cb-save-settings').addEventListener('click', () => {
      const consent = {
        necessary: true,
        analytics: document.getElementById('cb-analytics').checked,
        marketing: document.getElementById('cb-marketing').checked,
      };
      saveAndClose(consent);
    });
  }

  function saveAndClose(consent) {
    consent.timestamp = new Date().toISOString();
    setConsent(consent);
    applyConsent(consent);
    closeBanner();
  }

  function closeBanner() {
    const banner = document.getElementById('cb-banner');
    const overlay = document.getElementById('cb-overlay');
    if (banner) {
      banner.classList.remove('cb-show');
      overlay.classList.remove('cb-show');
      setTimeout(() => {
        banner.remove();
        overlay.remove();
      }, 400);
    }
  }

  // ============================================
  // FOOTER-LINK: Cookie-Einstellungen erneut öffnen
  // ============================================

  function setupFooterLink() {
    document.querySelectorAll('[data-cookie-settings]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        // Altes Cookie löschen
        document.cookie = CONFIG.cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        createBanner();
        // Vorherige Einstellungen laden
        const prev = getConsent();
        if (prev) {
          if (prev.analytics) document.getElementById('cb-analytics').checked = true;
          if (prev.marketing) document.getElementById('cb-marketing').checked = true;
        }
      });
    });
  }

  // ============================================
  // START
  // ============================================

  function init() {
    const consent = getConsent();
    if (consent) {
      // Einwilligung vorhanden → Tracking laden
      applyConsent(consent);
    } else {
      // Keine Einwilligung → Banner zeigen
      createBanner();
    }
    setupFooterLink();
  }

  // Warten bis DOM bereit ist
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
