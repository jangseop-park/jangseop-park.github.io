// 스크롤 시 네비게이션 배경 변경
(function () {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 모바일 메뉴: 링크 클릭 시 자동으로 닫기
  const navLinks = document.querySelectorAll('#navMenu .nav-link');
  const collapseEl = document.getElementById('navMenu');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (collapseEl.classList.contains('show')) {
        new bootstrap.Collapse(collapseEl).hide();
      }
    });
  });
})();
