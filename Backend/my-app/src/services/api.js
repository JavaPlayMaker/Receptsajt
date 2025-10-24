const BASE_URL = "https://grupp2-vtsor.reky.se";

export async function postRating(recipeId, rating) {
  const res = await fetch(`${BASE_URL}/recipes/${recipeId}/ratings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating }),
  });
  if (!res.ok) throw new Error("Kunde inte skicka betyge");
  return null; // change the return to null from res.json. respons have no j.son so the app was catching error eve tho the API worked
}

export async function getComments(recipeId) {
  const res = await fetch(`${BASE_URL}/recipes/${recipeId}/comments`);
  if (!res.ok) throw new Error("Kunde inte hämta kommentarer.");
  return res.json();
}

export async function postComment(recipeId, name, comment) {
  const res = await fetch(`${BASE_URL}/recipes/${recipeId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, comment }),
  });
  if (!res.ok) throw new Error("Kunde inte skicka kommentar.");
  return res.json();
}

export async function getRecipe(recipeId) {
  // added my fetch here, do we want all the fetch in api.js?
  const res = await fetch(`${BASE_URL}/recipes/${recipeId}`);
  if (!res.ok) throw new Error("Response Error");
  return res.json();
}

export async function getAllCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getRecipesByCategory(categoryName) {
  const res = await fetch(`${BASE_URL}/categories/${encodeURIComponent(categoryName)}/recipes`);
  if (!res.ok) throw new Error('Failed to fetch recipes for category');
  return res.json();
}
