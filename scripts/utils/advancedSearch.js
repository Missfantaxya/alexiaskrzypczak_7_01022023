var recipesAdvancedSearched = []
var tags = []
var newRecipes = []
console.log ("newRecipesSearch 1 : ", newRecipesSearch)

// FIXME fonctionne que pour le 1er tag avec ou sans recherche

// FIXME remet après un premier tri les 50 recettes au 2ème tag avec ou sans recherche

// TODO voir où est lancer advancedSearch()

function advancedSearch ()
{
  newRecipes = ( newRecipesSearch.length > 0 ? newRecipesSearch : recipes )
  console.log ("newRecipes 1 : ",newRecipes)
  const tagsCards = document.querySelectorAll( ".tag__item" )
  console.log ("newRecipesSearch 2 : ", newRecipesSearch)
  tagsCards.forEach( tag =>
  {
    const tagText =  tag.textContent
    tags.push( tagText )
  } )
  const newSetTags = new Set( tags )
  const allTags = [ ...newSetTags ]
  console.log ("allTags : ", allTags) //*
  if ( allTags.length === 1 )
  {
    const stringTags = allTags.join( " " )
    console.log( "stringTags : ", stringTags )//*
    console.log("newRecipes 2 : ", newRecipes)
    console.log("newRecipesSearch : ", newRecipesSearch) //*
    
    function sortRecipes (recipesToSort)
    {
      recipesToSort.forEach( recipe =>
      {
        var inRecipeSearched = []
        inRecipeSearched.push( recipe.appliance )
        recipe.ingredients.forEach( ingredient =>
        {
          inRecipeSearched.push(ingredient.ingredient)
        } )
        recipe.ustensils.forEach( ustensil =>
        {
          inRecipeSearched.push(ustensil)
        } )
        const stringRecipe = inRecipeSearched.join( " " )
        const stringRecipeLowerCase = stringRecipe.toLowerCase()
        const match = stringRecipeLowerCase.includes( stringTags )
        if ( match )
        {
          recipesAdvancedSearched.push( recipe )
          const newSetRecipes = new Set( recipesAdvancedSearched )
          newRecipes = [ ...newSetRecipes ]
        }
      } )
      // const newSetRecipes = new Set( recipesAdvancedSearched )
      // newRecipes = [ ...newSetRecipes ]
      console.log("newRecipes 3 : ", newRecipes)
      const recipesList = document.querySelector( ".recipes__list" )
      recipesList.innerHTML = " "
      newRecipes.forEach( recipe =>
      {
        getRecipe(recipe)
      } )
    }
    const search = newRecipesSearch.length > 0
    console.log( "search : ", search ) //*

    if ( !search )
    {
      sortRecipes(newRecipes)
    }
    else
    {
      sortRecipes( newRecipesSearch )
    }
  }
  else
  {
    recipes.forEach( recipe =>
      {
        getRecipe(recipe)
      } )
  }
}
