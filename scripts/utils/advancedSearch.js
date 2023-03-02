function advancedSearch ()
{
  // console.log("recipes dans advancedSearch : ", recipes) //*
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
    var recipesSearched = []
    recipes.forEach( recipe =>
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
        recipesSearched.push(recipe)
      }
      const recipesList = document.querySelector( ".recipes__list" )
      recipesList.innerHTML = " "
      recipesSearched.forEach( recipe =>
      {
        getRecipe(recipe)
      } )
    } )
    
    // si il y a eu une recherhe
    //TODO récupérer [recipesSearched] 
    // console.log("recipesSearched dans advancedSearch : ", recipesSearched) //!
  }
  else
  {
    recipes.forEach( recipe =>
      {
        getRecipe(recipe)
      } )
  }
}
