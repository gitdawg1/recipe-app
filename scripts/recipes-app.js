'use strict'

let recipes = getSavedRecipes()

// const timestamp = moment().valueOf()

// let recipes = [
//   {
//   id: 'abcd',
//   title: 'Mac and Cheese',
//   directions: '1. Mix cheese',
//   ingredients: [{id: uuidv4(), ingredient}]
//   createdAt:  timestamp
//   }
// ]

const filters = {
  searchText: ''
}

// localStorage.setItem('recipe', JSON.stringify(recipes))
renderRecipes(recipes, filters)

document.querySelector('#add-recipe').addEventListener('click', (e) => {
  const id = uuidv4()
  const timestamp = moment().valueOf()


// Create ID for each ingredient element
  recipes.push({
    id: id,
    title: '',
    directions: '',
    ingredients: [],
    createdAt: timestamp
  })
  saveRecipes(recipes)
  location.assign(`./edit.html#${id}`)
})

document.querySelector('#search-recipe').addEventListener('input',  (e) => {
  filters.searchText = e.target.value
  renderRecipes(recipes, filters)
})