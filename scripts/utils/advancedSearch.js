var tags = [] 
var newRecipes = [] 
var recipesToSort = []
const recipesList = document.querySelector( ".recipes__list" )

function advancedSearch ()
{
  // console.log("recipes 0 : ", recipes) //*
  newRecipes = ( newRecipesSearch.length > 0 ? newRecipesSearch : recipes )
  // console.log("newRecipes 1 : ", newRecipes)
  const tagsCards = document.querySelectorAll( ".tag__item" )
  tags=[]
  tagsCards.forEach( tag =>
  {
    const tagText =  tag.textContent
    tags.push( tagText )
  } )
  
  recipesList.innerHTML = " "
  if ( tags.length > 0 )
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
      
        tags.forEach( tag =>
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
      
      recipesToSort.forEach( recipe =>
      {
        getRecipe(recipe)
      } )
    }
    const search = newRecipesSearch.length > 0

    if ( !search )
    {
      // vidage du tableau
      recipesToSort = []
      //remplissage du tableau
      recipesToSort = recipes.map(recipe => recipe)
    }
    else
    {
      // vidage du tableau
      recipesToSort = []
      //remplissage du tableau
      recipesToSort = newRecipesSearch.map(recipe => recipe)
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
