// Auto-hide ring-indicator label on scroll and smooth load in
window.addEventListener('DOMContentLoaded', () => {
  const ringIndicator = document.querySelector('.ring-indicator');
  if (!ringIndicator) return;

  // Smooth load in
  ringIndicator.style.opacity = '0';
  ringIndicator.style.transform = 'translateY(-10px)';
  setTimeout(() => {
    ringIndicator.style.opacity = '1';
    ringIndicator.style.transform = 'translateY(0)';
  }, 300);

  // Scroll-based auto-hide
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 40) {
      ringIndicator.classList.add('hidden');
    } else {
      ringIndicator.classList.remove('hidden');
    }
  });
});
