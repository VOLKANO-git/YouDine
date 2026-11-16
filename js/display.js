const recipesEl = document.getElementById('recipes');
const statusEl = document.getElementById('status');

export function showLoading() {
  statusEl.textContent = 'Chargement...';
}
