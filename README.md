# Carnet de recettes : Axios en cuisine

Carnet de recettes du club cuisine de YouCode. Les membres peuvent consulter, chercher, proposer et supprimer des recettes.

## Démo

- Dépôt : https://github.com/VOLKANO-git/YouDine
- Application (GitHub Pages) : <ajouter le lien>

## Lancer le projet

Ouvrez le dossier avec VS Code et lancez **Live Server**. N'ouvrez pas `index.html` directement par double-clic, car les modules JavaScript sont bloqués sur `file://`.

## Structure des fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Structure de la page, formulaires et conteneur des recettes. Charge Tailwind et Axios. |
| `js/api.js` | Seul fichier qui fait des requêtes. Contient l'instance Axios (`axios.create`) et les fonctions GET, POST et DELETE. |
| `js/validation.js` | Règles du formulaire d'ajout. Renvoie les messages d'erreur par champ. |
| `js/display.js` | Affichage : cartes, compteur, chargement, erreurs et messages. |
| `js/main.js` | Relie les événements (recherche, formulaire, suppression, réessai) aux autres fichiers. |

## Requêtes

| Méthode | URL | Données envoyées | Réponse |
|---|---|---|---|
| GET | `/recipes?limit=12` | aucune | liste de 12 recettes |
| GET | `/recipes/search?q=...` | mot-clé dans `q` | recettes correspondantes |
| POST | `/recipes/add` | nom, cuisine, difficulté, temps (JSON) | recette ajoutée, avec son `id` |
| DELETE | `/recipes/{id}` | aucune (l'id est dans l'URL) | confirmation de suppression |

## Limites de l'API de démonstration

L'API DummyJSON répond comme un vrai serveur, mais elle n'enregistre rien :

- Une recette ajoutée n'est pas sauvegardée. Elle disparaît au rechargement de la page.
- Une recette ajoutée n'existe pas sur le serveur, donc sa suppression renvoie une erreur 404 (« Recette introuvable »).
- La liste d'origine revient à chaque rechargement.

## Captures

<!-- Ajouter les captures : chargement, liste, erreur, aucun résultat -->

## Scénarios de test

1. **Liste** : ouvrir la page. 12 cartes et « 12 recettes » s'affichent.
2. **Recherche** : chercher `pasta`. Seules les recettes correspondantes restent.
3. **Aucun résultat** : chercher `xyzabc`. « Aucune recette trouvée » s'affiche avec le bouton.
4. **Revoir** : cliquer sur « Revoir toutes les recettes ». Le champ se vide et les 12 cartes reviennent.
5. **Formulaire vide** : soumettre sans rien remplir. Chaque champ affiche son message, et aucune requête POST n'est envoyée.
6. **Ajout** : remplir correctement le formulaire. Une requête POST renvoie 200, la carte apparaît en premier et « Recette ajoutée ! » s'affiche.
7. **Suppression** : cliquer sur « Supprimer », puis « Non » (la carte reste), puis « Supprimer » et « Oui » (la carte disparaît après un DELETE 200).
8. **Erreur réseau** : couper le réseau et recharger. Le message « Serveur injoignable » s'affiche, et « Réessayer » relance l'action.