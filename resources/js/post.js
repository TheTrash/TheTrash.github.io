(function () {
  const progress = document.getElementById('progress');
  if (progress) {
    const updateProgress = () => {
      const root = document.documentElement;
      const denominator = root.scrollHeight - root.clientHeight;
      const scrolled = denominator <= 0 ? 0 : (root.scrollTop / denominator) * 100;
      progress.style.width = scrolled + '%';
    };
    document.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  const yearHolder = document.getElementById('y');
  if (yearHolder) {
    yearHolder.textContent = new Date().getFullYear();
  }
})();
