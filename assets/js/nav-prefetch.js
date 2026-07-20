/* Prefetch same-site nav targets on hover/touch so the next page is
   already in cache by the time the click lands. Cheap, safe, one-shot
   per URL. No effect if the browser lacks rel=prefetch support. */
(function () {
  var prefetched = new Set();

  function prefetch(url) {
    if (!url || prefetched.has(url)) return;
    prefetched.add(url);
    var link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  }

  function sameOriginHtml(a) {
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return null;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || /^(mailto:|tel:|javascript:)/i.test(href)) return null;
    var u;
    try { u = new URL(a.href, location.href); } catch (e) { return null; }
    if (u.origin !== location.origin) return null;
    if (u.pathname === location.pathname) return null;       // current page
    return u.href;
  }

  function onHover(e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (a) prefetch(sameOriginHtml(a));
  }

  document.addEventListener('mouseover', onHover, { passive: true });
  document.addEventListener('touchstart', onHover, { passive: true });
})();
