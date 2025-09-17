let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

function addRecipe() {
  const title = document.getElementById("title").value.trim();
  const ingredients = document.getElementById("ingredients").value.trim();
  const instructions = document.getElementById("instructions").value.trim();

  if (!title) {
    alert("Please enter a recipe title!");
    return;
  }

  const recipe = { title, ingredients, instructions };
  recipes.push(recipe);

  saveToLocal();
  displayRecipes();
  clearForm();
}

function displayRecipes(filter = "") {
  const recipeList = document.getElementById("recipeList");
  const emptyMsg = document.getElementById("emptyMsg");
  recipeList.innerHTML = "";

  const filtered = recipes.filter(r =>
    r.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }

  filtered.forEach((recipe, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${recipe.title}</strong><br>
        <em>Ingredients:</em> ${recipe.ingredients}<br>
        <em>Instructions:</em> ${recipe.instructions}
      </div>
      <button onclick="deleteRecipe(${index})">❌</button>
    `;
    recipeList.appendChild(li);
  });
}

function deleteRecipe(index) {
  recipes.splice(index, 1);
  saveToLocal();
  displayRecipes();
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("ingredients").value = "";
  document.getElementById("instructions").value = "";
  document.getElementById("title").focus();
}

function saveToLocal() {
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

// Initial load
document.addEventListener("DOMContentLoaded", () => displayRecipes());

// Search
document.getElementById("searchBox").addEventListener("input", (e) => {
  displayRecipes(e.target.value);
});
