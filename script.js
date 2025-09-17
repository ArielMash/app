const toggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeIcon.textContent = document.body.classList.contains('dark-mode') ? '🌙' : '🌞';
});
