const recipesEl = document.getElementById("recipes");
const statusEl = document.getElementById("status");
const emptyEl = document.getElementById("aucun-resultat");

export function showLoading() {
  statusEl.textContent = "Chargement...";
}

export function renderRecipes(recipes) {
  statusEl.textContent = `${recipes.length} recettes`;
  emptyEl.classList.toggle("hidden", recipes.length > 0);
  recipesEl.replaceChildren(...recipes.map(createCard));
}

export function ajouterCarte(recipe) {
  recipesEl.prepend(createCard(recipe));
  statusEl.textContent = `${recipesEl.children.length} recettes`;
}

export function afficherErreurs(erreurs) {
  document.querySelectorAll(".erreur").forEach((p) => {
    const message = erreurs[p.dataset.champ];
    p.textContent = message || "";
    p.classList.toggle("hidden", !message);
  });
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