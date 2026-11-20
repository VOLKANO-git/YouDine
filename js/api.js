const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000,
});

export async function getRecipes() {
  const response = await api.get("/recipes", { params: { limit: 12 } });
  return response.data.recipes;
}

export async function searchRecipes(recherche) {
  const response = await api.get("/recipes/search", {
    params: { q: recherche },
  });
  return response.data.recipes;
}

export async function addRecipe(recette) {
  const response = await api.post("/recipes/add", recette);
  return response.data;
}
