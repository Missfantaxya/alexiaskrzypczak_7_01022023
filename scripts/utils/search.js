//TODO faire une réinitialisation des recettes affichées quand recherche vidée ou changée (s'accumule si plusieurs recherches et ne se reinitailse pas si slisk qur la croix  )
const searchForm = document.querySelector( ".header__containerSearch" )

function noSubmit ( evt )
{
  evt.preventDefault()
}
searchForm.addEventListener( "submit", noSubmit)

const SearchInput = document.querySelector( ".search__input" )

// searchForm.addEventListener( "input", search )
searchForm.addEventListener( "submit", search )

var recipesSearched = []
let newRecipesSearch = []
function search ()
{
  // recupération de la recherche entrée
  const searchValue = SearchInput.value

  // Mise en forme en minuscules
  const searchValueLowerCase = searchValue.toLowerCase()

  // retrait des espaces en début et fin de recherche
  const searchValueTrim = searchValueLowerCase.trim()


  
  // validation du champs de recherche
  if ( searchValueTrim.length > 2 || searchValueTrim.length === 0 )
  {
    for ( const recipe of recipes )
    {
      var recipeSearched = []
      recipeSearched.push( recipe.name )
      for ( const ingredient of recipe.ingredients )
      {
        recipeSearched.push( ingredient.ingredient )
      }
      recipeSearched.push( recipe.description )
      

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

    // Retrait des doublons du tableau
    const setRecipesSearch = new Set( recipesSearched )
    newRecipesSearch = [ ...setRecipesSearch ]
  
    const recipesList = document.querySelector( ".recipes__list" )
    if ( newRecipesSearch.length > 0 )
    {
      recipesList.innerHTML = ""
      newRecipesSearch.forEach( recipe =>
        getRecipe( recipe )
      )
    }
    else
    {
      recipesList.innerHTML = "<div class='notFound'> Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc </div>"
    }
  }
}


