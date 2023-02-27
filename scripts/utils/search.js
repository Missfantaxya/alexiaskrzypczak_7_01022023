const searchForm = document.querySelector( ".header__containerSearch" )
function noSubmit ( evt )
{
  evt.preventDefault()
}
searchForm.addEventListener( "submit", noSubmit)

const SearchInput = document.querySelector( ".search__input" )
searchForm.addEventListener( "submit", search )


function search ()
{
  //TODO minimum 3 caractères
  var recipesSearched = []
  const searchValue = SearchInput.value 
  for ( const recipe of recipes )
  {
    var recipeSearched = []
    recipeSearched.push( recipe.name )
    recipeSearched.push( recipe.description )
    
    for ( const ingredient of recipe.ingredients )
    {
      recipeSearched.push( ingredient.ingredient )
    }
    const stringRecipe = recipeSearched.join( " " )
    const stringRecipeLowerCase = stringRecipe.toLowerCase()
    const searchValueToLowerCase = searchValue.toLowerCase()
    const match = stringRecipeLowerCase.includes( searchValueToLowerCase )
    if ( match )
    {
      recipesSearched.push(recipe)
    }
  }
  console.log( "recipesSearched : ", recipesSearched ) //*
  if ( recipesSearched.length > 0 )
  {
  const recipesList = document.querySelector( ".recipes__list" )
  recipesList.innerHTML = ""
  recipesSearched.forEach( recipe => 
  getRecipe(recipe)
    )
  }
}



