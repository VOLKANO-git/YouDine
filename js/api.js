const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000,
});

export async function getRecipes() {
  const response = await api.get("/recipes", { params: { limit: 12 } });
  return response.data.recipes;
}

export async function searchRecipes(query) {
  const response = await api.get("/recipes/search", { params: { q: query } });
  return response.data.recipes;
}