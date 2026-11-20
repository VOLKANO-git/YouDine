import { getRecipes, searchRecipes, addRecipe, deleteRecipe } from "./api.js";
import {
  showLoading,
  renderRecipes,
  ajouterCarte,
  afficherErreurs,
  retirerCarte,
  showError,
  hideError,
} from "./display.js";
import { validerRecette } from "./validation.js";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const revoirBtns = document.querySelectorAll(".revoir");
const reessayerBtn = document.getElementById("reessayer");
const recipesEl = document.getElementById("recipes");
const formRecette = document.getElementById("form-recette");
const nomInput = document.getElementById("nom");
const cuisineInput = document.getElementById("cuisine");
const difficulteInput = document.getElementById("difficulte");
const tempsInput = document.getElementById("temps");
const btnAjouter = document.getElementById("btn-ajouter");
const formSucces = document.getElementById("form-succes");

let derniereAction = () => afficher();

function messageErreur(error) {
  if (!error.response) return "Serveur injoignable. Vérifiez votre connexion.";
  if (error.response.status === 404) return "Recette introuvable (404).";
  if (error.response.status >= 500) return "Erreur du serveur (500). Réessayez plus tard.";
  return "Une erreur est survenue.";
}

async function afficher(recherche = "") {
  derniereAction = () => afficher(recherche);
  hideError();
  showLoading();
  try {
    renderRecipes(recherche ? await searchRecipes(recherche) : await getRecipes());
  } catch (error) {
    showError(messageErreur(error));
  }
}

reessayerBtn.addEventListener("click", () => derniereAction());

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  afficher(searchInput.value.trim());
});

revoirBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    searchInput.value = "";
    afficher();
  });
});

formRecette.addEventListener("submit", async (e) => {
  e.preventDefault();
  formSucces.classList.add("hidden");

  const recette = {
    name: nomInput.value.trim(),
    cuisine: cuisineInput.value.trim(),
    difficulty: difficulteInput.value,
    prepTimeMinutes: Number(tempsInput.value),
  };

  const erreurs = validerRecette(recette);
  afficherErreurs(erreurs);
  if (erreurs.name || erreurs.cuisine || erreurs.difficulty || erreurs.prepTimeMinutes) return;

  btnAjouter.disabled = true;
  try {
    ajouterCarte(await addRecipe(recette));
    formRecette.reset();
    formSucces.classList.remove("hidden");
  } catch (error) {
    showError(messageErreur(error));
  } finally {
    btnAjouter.disabled = false;
  }
});

recipesEl.addEventListener("click", (e) => {
  if (!e.target.classList.contains("supprimer")) return;

  const card = e.target.closest("article");
  if (card.querySelector(".confirmer")) return;

  const box = document.createElement("div");
  box.className = "confirmer mt-3 flex gap-2 items-center";

  const texte = document.createElement("span");
  texte.textContent = "Supprimer ?";

  const oui = document.createElement("button");
  oui.textContent = "Oui";
  oui.className = "bg-red-600 text-white px-3 py-1 rounded";
  oui.addEventListener("click", async () => {
    try {
      await deleteRecipe(card.dataset.id);
      retirerCarte(card);
    } catch (error) {
      showError(messageErreur(error));
    }
  });

  const non = document.createElement("button");
  non.textContent = "Non";
  non.className = "bg-gray-200 px-3 py-1 rounded";
  non.addEventListener("click", () => box.remove());

  box.append(texte, oui, non);
  card.append(box);
});

afficher();