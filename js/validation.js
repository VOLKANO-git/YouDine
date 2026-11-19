export function validerRecette(r) {
  const erreurs = {};
  if (r.name.length < 3 || r.name.length > 60)
    erreurs.name = "Entre 3 et 60 caractères.";
  if (!r.cuisine) erreurs.cuisine = "Indiquez la cuisine.";
  if (!r.difficulty) erreurs.difficulty = "Choisissez une difficulté.";
  if (
    !Number.isInteger(r.prepTimeMinutes) ||
    r.prepTimeMinutes < 1 ||
    r.prepTimeMinutes > 300
  ) {
    erreurs.prepTimeMinutes = "Entre 1 et 300 minutes.";
  }
  return erreurs;
}
