const searchForm = document.querySelector( ".header__containerSearch" )
function noSubmit ( evt )
{
  evt.preventDefault()
}
searchForm.addEventListener( "submit", noSubmit)

const SearchInput = document.querySelector( ".search__input" )

searchForm.addEventListener( "input", search )


function search ()
{
  // recupération de la recherche entrée
  const searchValue = SearchInput.value

    //TODO mettre en minuscule
  const searchValueLowerCase = searchValue.toLowerCase()

  // retrait des espaces en début et fin de recherche
  const searchValueTrim = searchValueLowerCase.trim()



  // validation du champs de recherche
  if ( searchValueTrim.length > 2 || searchValueTrim.length === 0 )
  {
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

      // conversion du tableau en string
      const stringRecipe = recipeSearched.join( " " )

      //mise en forme en minuscule
      const stringRecipeLowerCase = stringRecipe.toLowerCase()
      const searchValueTrimToLowerCase = searchValueTrim.toLowerCase()

      // vérirfication des correspondances dans les données
      const match = stringRecipeLowerCase.includes( searchValueTrimToLowerCase )

      // construction du tableau des recettes filtrées
      if ( match )
      {
        recipesSearched.push( recipe )
      }
    }
  
    const recipesList = document.querySelector( ".recipes__list" )
    if ( recipesSearched.length > 0 )
    {
      recipesList.innerHTML = ""
      recipesSearched.forEach( recipe =>
        getRecipe( recipe )
      )
    }
    else
    {
      recipesList.innerHTML = "<div class='notFound'> Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc </div>"
    }
  }
  console.log ("recipesSearched dans search : ", recipesSearched) //*
  return recipesSearched //!
}


