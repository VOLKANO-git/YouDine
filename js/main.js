import { getRecipes, searchRecipes, addRecipe } from "./api.js";
import {
  showLoading,
  renderRecipes,
  ajouterCarte,
  afficherErreurs,
} from "./display.js";
import { validerRecette } from "./validation.js";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const revoirBtns = document.querySelectorAll(".revoir");
const formRecette = document.getElementById("form-recette");
const nomInput = document.getElementById("nom");
const cuisineInput = document.getElementById("cuisine");
const difficulteInput = document.getElementById("difficulte");
const tempsInput = document.getElementById("temps");
const btnAjouter = document.getElementById("btn-ajouter");
const formSucces = document.getElementById("form-succes");

async function afficher(recherche = "") {
  showLoading();
  try {
    renderRecipes(
      recherche ? await searchRecipes(recherche) : await getRecipes(),
    );
  } catch (error) {
    console.error(error);
  }
}

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
  if (Object.keys(erreurs).length > 0) return;

  btnAjouter.disabled = true;
  try {
    ajouterCarte(await addRecipe(recette));
    formRecette.reset();
    formSucces.classList.remove("hidden");
  } catch (error) {
    console.error(error);
  } finally {
    btnAjouter.disabled = false;
  }
});

afficher();
