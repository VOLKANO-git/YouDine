const recipesEl = document.getElementById("recipes");
const statusEl = document.getElementById("status");

export function showLoading() {
  statusEl.textContent = "Chargement...";
}
export function renderRecipes(recipes) {
  statusEl.textContent = `${recipes.length} recettes`;
  recipesEl.replaceChildren(...recipes.map(createCard));
}
function createCard(recipe) {
  const card = document.createElement("article");
  card.className = "bg-white rounded-xl shadow p-4";
  const img = document.createElement("img");
  img.src = recipe.image;
  img.alt = recipe.name;
  img.className = "h-40 w-full object-cover rounded";
  const titre = document.createElement("h2");
  titre.className = "text-lg font-semibold mt-2";
  titre.textContent = recipe.name;
  const infos = document.createElement("p");
  infos.className = "text-sm text-gray-600";
  infos.textContent = `${recipe.cuisine} · ${recipe.difficulty} · ${recipe.prepTimeMinutes} min`;
  card.append(img, titre, infos);
  return card;
}
