/* Cookie consent and the Meta Pixel, in one file, loaded on every page.
 *
 * The pixel sets Meta cookies, and in Spain a non-essential cookie needs prior
 * opt-in. So nothing from Meta loads until the visitor says yes: no script tag,
 * no fbq stub, no request to connect.facebook.net. Refusing is one tap, the same
 * size and style as accepting, and the choice can be changed from the footer's
 * "Cookies" link on every page.
 *
 * This is a different permission from the signup form's "Don't email me" box.
 * That one governs email under the ePrivacy soft opt-in; it says nothing about
 * tracking cookies, and this banner says nothing about email.
 *
 * Until PIXEL_ID is filled in there is nothing to consent to, so the banner
 * never shows and trTrack() does nothing. That makes this file safe to deploy
 * before the pixel exists.
 */
(function () {
  var PIXEL_ID = '28587247294300236';            // Events Manager → Data sources → the pixel's ID
  var KEY = 'tr_consent_v1';    // bump the suffix if the banner's purpose changes
  var loaded = false;

  function read() {
    try { return window.localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function write(v) {
    try { window.localStorage.setItem(KEY, v); } catch (e) {}
  }

  // Meta's standard base code, unchanged apart from running only on consent.
  function loadPixel() {
    if (loaded || !PIXEL_ID) return;
    loaded = true;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  // The one call pages make. A no-op without consent, so a page never has to
  // check consent itself before reporting an event.
  window.trTrack = function (eventName, params) {
    if (loaded && window.fbq) window.fbq('track', eventName, params || {});
  };

  var banner = null;

  function hide() { if (banner) banner.style.display = 'none'; }

  function show() {
    if (!PIXEL_ID) return;
    if (banner) { banner.style.display = ''; return; }
    banner = document.createElement('div');
    banner.className = 'consent-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookie choice');
    banner.innerHTML =
      '<p class="consent-banner-text">' +
        'Can we use a Meta cookie? It shows us which of our ads brought you here, ' +
        'and lets us show our events to you on Instagram and Facebook. ' +
        'Nothing loads unless you accept. ' +
        '<a href="/privacy.html#cookies">More in our privacy notice</a>.' +
      '</p>' +
      '<div class="consent-banner-actions">' +
        '<button type="button" class="consent-btn" data-choice="denied">Reject</button>' +
        '<button type="button" class="consent-btn" data-choice="granted">Accept</button>' +
      '</div>';
    banner.addEventListener('click', function (e) {
      var choice = e.target && e.target.getAttribute('data-choice');
      if (!choice) return;
      write(choice);
      hide();
      if (choice === 'granted') loadPixel();
      // A withdrawal cannot unload a script that already ran on this page,
      // so reload to drop it; the next page load reads "denied" and loads nothing.
      else if (loaded) window.location.reload();
    });
    document.body.appendChild(banner);
  }

  // The footer link that reopens the choice. Pages carry
  // <span data-consent-open> · <a href="#">Cookies</a></span>, separator inside
  // the span so hiding it leaves no stray dot. It stays hidden while there is
  // no pixel, since there would be nothing to choose.
  function wireReopen() {
    var links = document.querySelectorAll('[data-consent-open]');
    for (var i = 0; i < links.length; i++) {
      if (!PIXEL_ID) { links[i].style.display = 'none'; continue; }
      links[i].addEventListener('click', function (e) { e.preventDefault(); show(); });
    }
  }

  function init() {
    wireReopen();
    var choice = read();
    if (choice === 'granted') loadPixel();
    else if (choice !== 'denied') show();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
