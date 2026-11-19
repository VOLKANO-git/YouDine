import { getRecipes, searchRecipes } from "./api.js";
import { showLoading, renderRecipes } from "./display.js";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const revoirBtns = document.querySelectorAll(".revoir");

async function afficher(formula) {
  showLoading();
  try {
    const recipes = formula ? await searchRecipes(formula) : await getRecipes();
    renderRecipes(recipes);
  } catch (error) {
    console.error(error);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  afficher(input.value.trim());
});

revoirBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    input.value = "";
    afficher("");
  });
});

afficher("");
