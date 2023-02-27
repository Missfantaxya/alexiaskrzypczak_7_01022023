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
  const searchValue = SearchInput.value 
  console.log( "searchValue : ", searchValue ) //*
  const searchValueTrim = searchValue.trim()
  console.log ("searchValueTrim.length : ",searchValueTrim.length) //*
  if (searchValueTrim.length>2 || searchValueTrim.length===0){
    var recipesSearched = []
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
    const searchValueTrimToLowerCase = searchValueTrim.toLowerCase()
    const match = stringRecipeLowerCase.includes( searchValueTrimToLowerCase )
    if ( match )
    {
      recipesSearched.push(recipe)
    }
  }
  console.log( "recipesSearched : ", recipesSearched ) //*
  const recipesList = document.querySelector( ".recipes__list" )
  if ( recipesSearched.length > 0 )
  {
  recipesList.innerHTML = ""
  recipesSearched.forEach( recipe => 
  getRecipe(recipe)
    )
  }
  else
  {
    recipesList.innerHTML = "<div class='notFound'> Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc </div>"
    }
  }
  else
  {
    console.log ("au moins 3 caractères")
  }
}



