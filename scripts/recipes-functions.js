'use strict'

// Read existing recipe from localStorage

const getSavedRecipes = () => {
  const recipesJSON = localStorage.getItem('recipes')

  try {
    return recipesJSON ? JSON.parse(recipesJSON) : []
  } catch (e) {
    return []
  }
}

// Save recipe to localStorage
const saveRecipes = () => {
  localStorage.setItem('recipes', JSON.stringify(recipes))
}

const removeRecipe = (id) => {
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

  if (recipeIndex > -1) {
    recipes.splice(recipeIndex, 1)
  }
}

// Generate the DOM structure for a recipe
const generateRecipeDOM = (recipe) => {
  const recipeEl = document.createElement('a')
  const textEl = document.createElement('p')
  const ingredientsEl = document.createElement('p')
  const statusEl = document.createElement('p')

  // Setup the recipe title text
  if (recipe.title.length > 0) {
    textEl.textContent = recipe.title
  } else {
    textEl.textContent = 'Unnamed recipe'
  }
  textEl.classList.add('list-item__title')
  recipeEl.appendChild(textEl)

  //setup the link
  recipeEl.setAttribute('href', `./edit.html#${recipe.id}`)
  recipeEl.classList.add('list-item')

  //display if you have ingredients
  //Need to check how many ingredients have been checked
  //If none checked, then say 'you have no ingredients'
  //If all checked, then say 'you have all ingredients'
  //If some checked, then say 'you have some ingredients'

  let ingredientTotal = recipe.ingredients.filter((item) => item.have === true).length
  console.log(ingredientTotal)
  console.log(recipe.ingredients.length)
  if (ingredientTotal === 0 ) {
    ingredientsEl.textContent = 'You have no ingredients'
  } else if (ingredientTotal === recipe.ingredients.length) {
    ingredientsEl.textContent = 'You have all ingredients'
  } else {
    ingredientsEl.textContent = 'You have some ingredients'
  }
  recipeEl.appendChild(ingredientsEl)

  //setup the status message
  statusEl.textContent = generateLastEdited(recipe.updatedAt)
  statusEl.classList.add('list-item__subtitle')
  recipeEl.appendChild(statusEl)
  return recipeEl
}

// Generate ingredients 
const generateIngredientsDOM = (item) => {
  const ingredientEl = document.createElement('label')
  const containerEl = document.createElement('div')
  const checkbox = document.createElement('input')
  const ingredientText = document.createElement('span')
  const removeButton = document.createElement('button')

  checkbox.setAttribute('type', 'checkbox')
  checkbox.checked = item.have
  containerEl.appendChild(checkbox)
  checkbox.addEventListener('change', () => {
    toggleHave(item.id)
    renderIngredients(recipe)
  })

// Setup the ingredient text
  ingredientText.textContent = item.ingredient
  containerEl.appendChild(ingredientText)

// Setup container
  ingredientEl.classList.add('list-item')
  containerEl.classList.add('list-item__container')
  ingredientEl.appendChild(containerEl)

// Setup the remove button
  removeButton.textContent = 'Remove'
  removeButton.classList.add('button', 'button--text')
  containerEl.appendChild(removeButton)
  
  removeButton.addEventListener('click', () => {
  removeIngredients(item.id)
  renderIngredients(recipe)
})
  return ingredientEl
}

// Render ingredients list
const renderIngredients = (recipe) => {
  const ingredientEl = document.querySelector('#recipe-ingredients')
  ingredientEl.innerHTML = ''
  if(recipe.ingredients != undefined) {
    console.log(recipe)
    recipe.ingredients.forEach((item) => {
      ingredientEl.appendChild(generateIngredientsDOM(item))
    })
  }
  else {
    console.log("don't display ingredients")
  }
}

const removeIngredients = (id) => {
  console.log("ingredient ID to remove: " + id)
  console.log("recipes object: " + recipes)
  const ingredientIndex = recipe.ingredients.findIndex((item) => item.id === id)
  console.log("IngredientID: " + ingredientIndex)

  if (ingredientIndex > -1) {
    recipe.ingredients.splice(ingredientIndex, 1)
    saveRecipes()
  }
}

// Render recipes
const renderRecipes = (recipes, filters) => {
  const recipesEl = document.querySelector('#recipes')
  const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))
  recipesEl.innerHTML = ''

  if (filteredRecipes.length > 0) {
    filteredRecipes.forEach((recipe) => {
      const recipeEl = generateRecipeDOM(recipe)
      recipesEl.appendChild(recipeEl)
    })
  } else {
    const emptyMessage = document.createElement('p')
    emptyMessage.textContent = 'No recipes found'
    recipesEl.appendChild(emptyMessage)
  }
}

const toggleHave = (id) => {
  console.log("toggleHave item: " + id)
  const item = recipe.ingredients.find((item) => item.id === id)

  if (item) {
    console.log("item: " + item.have)
    item.have = !item.have
    saveRecipes()
  }
}

//generate last edited
const generateLastEdited = (timestamp) => {
  return `Last edited ${moment(timestamp).fromNow()}`
}