const recipesEl = document.getElementById('recipes');
const statusEl = document.getElementById('status');

export function showLoading() {
  statusEl.textContent = 'Chargement...';
}

export function renderRecipes(recipes) {
  statusEl.textContent = `${recipes.length} recettes`;
  recipesEl.innerHTML = recipes.map((r) => `
    <article class="bg-white rounded-xl shadow p-4">
      <img src="${r.image}" alt="${r.name}" class="h-40 w-full object-cover rounded">
      <h2 class="text-lg font-semibold mt-2">${r.name}</h2>
      <p class="text-sm text-gray-600">${r.cuisine} · ${r.difficulty} · ${r.prepTimeMinutes} min</p>
    </article>
  `).join('');
}