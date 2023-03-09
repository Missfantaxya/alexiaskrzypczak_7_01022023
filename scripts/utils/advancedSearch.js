var tags = [] 
var newRecipes = [] 
var recipesToSort = []

//FIXME recipes === recipesToSort 
//FIXME (suite) quand on ferme un tag
function advancedSearch ()
{
  console.log("recipes 0 : ", recipes) //! avec les lignes empty après closeTag
  newRecipes = ( newRecipesSearch.length > 0 ? newRecipesSearch : recipes )
  console.log("newRecipes 1 : ", newRecipes)
  const tagsCards = document.querySelectorAll( ".tag__item" )
  tagsCards.forEach( tag =>
  {
    const tagText =  tag.textContent
    tags.push( tagText )
  } )
  // Suppression des doublons
  const newSetTags = new Set( tags )
  const allTags = [ ...newSetTags ]

  if ( allTags.length > 0 )
  {
    function sortRecipes ()
    {
      recipesToSort.forEach( recipe =>
      {
        // tableau vide pour chaque recette bouclée
        var inRecipeSearched = []

        // mise des appareils de la recette dans le tableau de la recette
        inRecipeSearched.push( recipe.appliance )

        // mise des ingrédients de la recette dans le tableau de la recette
        recipe.ingredients.forEach( ingredient =>
        {
          inRecipeSearched.push(ingredient.ingredient)
        } )

        // mise des ustensils de la recette dans le tableau de la recette
        recipe.ustensils.forEach( ustensil =>
        {
          inRecipeSearched.push(ustensil)
        } )

        // conversion du tableau de la recette en string
        const stringRecipe = inRecipeSearched.join( " " )

        // mise en forme de la string de la recette en minuscules
        const stringRecipeLowerCase = stringRecipe.toLowerCase()
      
        allTags.forEach( tag =>
        {
          const matchTag = stringRecipeLowerCase.includes( tag )
          const recipeId = recipesToSort.indexOf( recipe )
          
          if ( !matchTag )
          {
            // Supression de la recette du tableau en la remplaçant par undefined 
            delete recipesToSort[recipeId] 
          }
        } )
      } )
      
      const recipesList = document.querySelector( ".recipes__list" )
      recipesList.innerHTML = " "
      recipesToSort.forEach( recipe =>
      {
        getRecipe(recipe)
      } )
    }
    const search = newRecipesSearch.length > 0

    if ( !search )
    {
       console.log("recipes 1 : ", recipes) //! avec empty après closeTag
      recipesToSort = recipes
    }
    else
    {
      recipesToSort = newRecipesSearch
    }
    sortRecipes( recipesToSort )
  }
  else
  {
    recipes.forEach( recipe =>
      {
        getRecipe(recipe)
      } )
  }
}
