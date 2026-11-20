# Scénarios de test

Tester dans cet ordre, avec l'onglet Network ouvert (F12).

| # | Story | Action | Résultat attendu |
|---|---|---|---|
| 1 | US-01 | Ouvrir la page | 12 cartes, « 12 recettes ». `GET /recipes?limit=12` renvoie 200. |
| 2 | US-02 | Chercher `pasta` | Seules les recettes correspondantes s'affichent. `GET /recipes/search?q=pasta` renvoie 200. |
| 3 | US-02 | Chercher `xyzabc` | « Aucune recette trouvée » et le bouton « Revoir toutes les recettes » s'affichent. Le statut indique « 0 recettes ». |
| 4 | US-02 | Cliquer sur « Revoir toutes les recettes » | Le champ se vide et les 12 cartes reviennent. |
| 5 | US-03   | Soumettre le formulaire vide | Chaque champ affiche son message. Aucune requête POST n'apparaît. |
| 6 | US-03 | Nom de 2 lettres, temps à 0 | Les deux messages s'affichent. Aucune requête POST. |
| 7 | US-03 | Remplir le formulaire correctement et soumettre | `POST /recipes/add` renvoie 200. La carte apparaît en premier, le compteur augmente de 1, « Recette ajoutée ! » s'affiche. |
| 8 | US-04 | Cliquer sur « Supprimer », puis « Non » | La carte reste. La confirmation disparaît. |
| 9 | US-04 | Cliquer sur « Supprimer », puis « Oui » sur une recette de la liste | `DELETE /recipes/{id}` renvoie 200. La carte disparaît et le statut se termine par « · Recette supprimée ». |
| 10 | US-04 | Supprimer une recette ajoutée | `DELETE` renvoie 404. Le message « Recette introuvable (404) » s'affiche. La carte reste. |
| 11 | US-05 | Couper le réseau, puis recharger | « Serveur injoignable » s'affiche. Le bouton « Réessayer » apparaît. |
| 12 | US-05 | Rétablir le réseau, puis cliquer sur « Réessayer » | La liste se charge et le message d'erreur disparaît. |

## Notes

- Un rechargement de la page remet la liste d'origine. Les recettes ajoutées disparaissent, car l'API ne les sauvegarde pas.
- Pour le test 10, le 404 vient du fait que la recette ajoutée n'existe pas sur le serveur.