const BASE_URL = "https://grupp2-vtsor.reky.se";

export async function postRating(recipeId, rating) {
  const res = await fetch(`${BASE_URL}/recipes/${recipeId}/ratings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rating }),
  });
  if (!res.ok) throw new Error("Failed to submit rating");
  return null; // change the return to null from res.json. respons have no j.son so the app was catching error eve tho the API worked
}

export async function getComments(recipeId) {
  const res = await fetch(`${BASE_URL}/recipes/${recipeId}/comments`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
}

export async function postComment(recipeId, name, text) {
  const res = await fetch(`${BASE_URL}/recipes/${recipeId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, text }),
  });
  if (!res.ok) throw new Error("Failed to submit comment");
  return res.json();
}

export async function getRecipe(recipeId) { // added my fetch here, do we want all the fetch in api.js? 
  const res = await fetch(`${BASE_URL}/recipes/${recipeId}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}
