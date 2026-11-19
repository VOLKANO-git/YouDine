export function validerRecette(recette) {
  const erreurs = {};

  if (recette.name.length < 3 || recette.name.length > 60) {
    erreurs.name = "Le nom doit avoir entre 3 et 60 caractères.";
  }
  if (recette.cuisine === "") {
    erreurs.cuisine = "Indiquez la cuisine.";
  }
  if (recette.difficulty === "") {
    erreurs.difficulty = "Choisissez une difficulté.";
  }
  if (
    !Number.isInteger(recette.prepTimeMinutes) ||
    recette.prepTimeMinutes < 1 ||
    recette.prepTimeMinutes > 300
  ) {
    erreurs.prepTimeMinutes = "Le temps doit être entre 1 et 300 minutes.";
  }

  return erreurs;
}
export function validerRecette(recette) {
  const erreurs = {};

  if (recette.name.length < 3 || recette.name.length > 60) {
    erreurs.name = "Le nom doit avoir entre 3 et 60 caractères.";
  }
  if (recette.cuisine === "") {
    erreurs.cuisine = "Indiquez la cuisine.";
  }
  if (recette.difficulty === "") {
    erreurs.difficulty = "Choisissez une difficulté.";
  }
  if (
    !Number.isInteger(recette.prepTimeMinutes) ||
    recette.prepTimeMinutes < 1 ||
    recette.prepTimeMinutes > 300
  ) {
    erreurs.prepTimeMinutes = "Le temps doit être entre 1 et 300 minutes.";
  }

  return erreurs;
}
