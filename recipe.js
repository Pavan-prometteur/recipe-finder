import { recipe } from "./recipeadd.js";

function generateRecipeHTML(recipes) {
    let recipeHTML = "";
    for (let i = 0; i < recipes.length; i++) {
        let recipeObject = recipes[i];
        const { title, ingredients, instructions, description, image } = recipeObject;
        const html = `
        <div class="recipe-item">
            <img src="${image}" alt="" data-index="${i}">
            <p>${description}</p>
        </div>
        `;
        recipeHTML += html;
    }
    return recipeHTML;
}

function showRecipe(index) {
    const instructions = recipe[index].instructions;
    const overlay = document.getElementById('recipeInstructionsOverlay');
    document.querySelector('.recipe-instructions').innerHTML = `<p>${instructions}</p>`;
    overlay.style.display = 'flex';
}

function closeRecipe() {
    const overlay = document.getElementById('recipeInstructionsOverlay');
    overlay.style.display = 'none';
}

function addImageClickListeners() {
    document.querySelectorAll('.recipe-item img').forEach(img => {
        img.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            showRecipe(index);
        });
    });
}

document.querySelector('.recipe-container').innerHTML = generateRecipeHTML(recipe);
addImageClickListeners();

document.getElementById('btn').addEventListener('click', () => {
    let ing = document.querySelector('.input-value').value;
    let filteredRecipes = ingSearch(ing);

    if (filteredRecipes.length > 0) {
        document.querySelector('.recipe-container').innerHTML = generateRecipeHTML(filteredRecipes);
        addImageClickListeners(); 
    } else {
        document.querySelector('.recipe-container').innerHTML = "<p>No recipes found.</p>";
    }
});

function ingSearch(ing) {
    return recipe.filter((item) => {
        return item.ingredients.includes(ing);
    });
}

document.getElementById('closeBtn').addEventListener('click', closeRecipe);


document.getElementById('recipeInstructionsOverlay').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        closeRecipe();
    }
});