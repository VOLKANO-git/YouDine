import { getRecipes, searchRecipes } from "./api.js";
import { showLoading, renderRecipes } from "./display.js";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const revoirBtn = document.getElementById("revoir-tout");

async function afficher(query) {
  showLoading();
  try {
    const recipes = query ? await searchRecipes(query) : await getRecipes();
    renderRecipes(recipes);
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  afficher(input.value.trim());
});

revoirBtn.addEventListener("click", () => {
  input.value = "";
  afficher("");
});

afficher("");