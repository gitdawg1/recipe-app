'use strict'

const titleElement = document.querySelector('#recipe-name')
const directionsElement = document.querySelector('#recipe-directions')
const removeElement = document.querySelector('#remove-recipe')
const dateElement = document.querySelector('#last-edited')
const recipeId = location.hash.substring(1)

let recipes = getSavedRecipes()
let recipe = recipes.find((recipe) => recipe.id == recipeId)

if (!recipe) {
  location.assign('./index.html')
}

titleElement.value = recipe.title
directionsElement.value = recipe.directions
dateElement.textContent = generateLastEdited(recipe.updatedAt)

titleElement.addEventListener('input', (e) => {
  recipe.title = e.target.value
  recipe.updatedAt = moment().valueOf()
  dateElement.textContent = generateLastEdited(recipe.updatedAt)
  saveRecipes(recipes)
})

directionsElement.addEventListener('input', (e) => {
  recipe.directions = e.target.value
  recipe.updatedAt = moment().valueOf()
  dateElement.textContent = generateLastEdited(recipe.updatedAt)
  saveRecipes(recipes)
})

document.querySelector('#new-ingredient').addEventListener('submit', (e) => {
  const id = uuidv4()
  recipe.ingredients.push({
    id: id,
    ingredient: e.target.elements.text.value.trim(),
    have: false
  })
  recipe.updatedAt = moment().valueOf()
  saveRecipes(recipes)
})

renderIngredients(recipe)

removeElement.addEventListener('click', (e) => {
  removeRecipe(recipe.id)
  saveRecipes(recipes)
  location.assign('./index.html')
})
