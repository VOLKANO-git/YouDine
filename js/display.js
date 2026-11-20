const recipesEl = document.getElementById("recipes");
const statusEl = document.getElementById("status");
const emptyEl = document.getElementById("aucun-resultat");

export function showLoading() {
  statusEl.textContent = "Chargement...";
}

export function renderRecipes(recipes) {
  recipesEl.replaceChildren(...recipes.map(createCard));
  majCompteur(recipes.length);
}

export function ajouterCarte(recipe) {
  recipesEl.prepend(createCard(recipe));
  majCompteur(recipesEl.children.length);
}

export function afficherErreurs(erreurs) {
  document.querySelectorAll(".erreur").forEach((p) => {
    const msg = erreurs[p.dataset.champ] || "";
    p.textContent = msg;
    p.classList.toggle("hidden", !msg);
  });
}

function majCompteur(n) {
  statusEl.textContent = `${n} recettes`;
  emptyEl.classList.toggle("hidden", n > 0);
}

function createCard(recipe) {
  const card = document.createElement("article");
  card.className = "bg-white rounded-xl shadow p-4";

  const img = document.createElement("img");
  img.src = recipe.image || "https://placehold.co/400x300?text=Recette";
  img.alt = recipe.name;
  img.className = "h-40 w-full object-cover rounded";

  const titre = document.createElement("h2");
  titre.textContent = recipe.name;
  titre.className = "text-lg font-semibold mt-2";

  const infos = document.createElement("p");
  infos.textContent = `${recipe.cuisine} · ${recipe.difficulty} · ${recipe.prepTimeMinutes} min`;
  infos.className = "text-sm text-gray-600";

  card.dataset.id = recipe.id;
  const bouton = document.createElement("button");
  bouton.textContent = "Supprimer";
  bouton.className = "supprimer mt-3 bg-red-500 text-white px-3 py-1 rounded";

  card.append(img, titre, infos, bouton);
  return card;
}

export function retirerCarte(card) {
  card.remove();
  majCompteur(recipesEl.children.length);
  statusEl.textContent += " · Recette supprimée";
}
