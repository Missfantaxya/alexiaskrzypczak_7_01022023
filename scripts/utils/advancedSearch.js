function advancedSearch ()
{
  // console.log("recipes dans advancedSearch : ", recipes) //*
    console.log ("newRecipesSearch dans adsancedSearch : ", newRecipesSearch) 
  
  const tagsCards = document.querySelectorAll( ".tag__item" )

  var tags = []
  tagsCards.forEach( tag =>
  {
    tags.push(tag.textContent)
  } )
  if ( tags.length > 0 )
  {
    const stringTags = tags.join( " " )
    // s'il n'y a pas eu de recherche 
    var recipesAdvancedSearched = []
    const search = newRecipesSearch.length > 0
    console.log( "search : ", search ) //*
    
    function sortRecipes (recipesToSort)
    {
      recipesToSort.forEach( recipe =>
      {
        var recipeSearched = []
        recipeSearched.push( recipe.appliance )
        recipe.ingredients.forEach( ingredient =>
        {
          recipeSearched.push(ingredient.ingredient)
        } )
        recipe.ustensils.forEach( ustensil =>
        {
          recipeSearched.push(ustensil)
        } )
        const stringRecipe = recipeSearched.join( " " )
        const stringRecipeLowerCase = stringRecipe.toLowerCase()
        const match = stringRecipeLowerCase.includes( stringTags )
        if ( match )
        {
          recipesAdvancedSearched.push(recipe)
        }
        const recipesList = document.querySelector( ".recipes__list" )
        recipesList.innerHTML = " "
        recipesAdvancedSearched.forEach( recipe =>
        {
          getRecipe(recipe)
        } )
      } )
    }

    if (!search)
    {
      sortRecipes (recipes)
    }
    else
    {
      sortRecipes(newRecipesSearch)
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
