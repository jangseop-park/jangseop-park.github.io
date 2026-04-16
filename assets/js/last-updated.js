(function () {
  const el = document.getElementById('last-updated');
  if (!el) return;

  const API = 'https://api.github.com/repos/jangseop-park/jangseop-park.github.io/commits/main';

  fetch(API)
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((data) => {
      const d = new Date(data.commit.committer.date);
      el.textContent = d.toISOString().split('T')[0];
    })
    .catch(() => {
      el.textContent = '—';
    });
})();
