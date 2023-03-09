const searchForm = document.querySelector( ".header__containerSearch" )
const searchInput = document.querySelector( ".search__input" )
const searchValue = searchInput.value

var recipesSearched = []
let newRecipesSearch = []

function noSubmit ( evt )
{
  evt.preventDefault()
}

// fonction de tri des recettes
function search ()
{
  // recupération de la recherche entrée
  const searchValue = searchInput.value

  // Mise en forme en minuscules
  const searchValueLowerCase = searchValue.toLowerCase()

  // retrait des espaces en début et fin de recherche
  const searchValueTrim = searchValueLowerCase.trim()
  
  // validation du champs de recherche
  if ( searchValueTrim.length > 2 || searchValueTrim.length === 0 )
  {
    recipesSearched = []
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
      recipesList.innerHTML = " "
      newRecipesSearch.forEach( recipe =>
        getRecipe( recipe )
      )
    }
    else
    {
      recipesList.innerHTML = " "
      recipesList.innerHTML = "<div class='notFound'> Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc </div>"
    }
  }
  
  //fonction de création du bouton d'effacement du formulaire
  function getDeleteInputButton ()
  {
    const deleteButton = document.querySelector( ".input__button" )
    if ( !deleteButton )
    {
      const deleteInputButton = document.createElement( "button" )
      deleteInputButton.className = "input__button"
      deleteInputButton.type = "button"
      searchForm.appendChild( deleteInputButton )

      const crossDeleteInput = document.createElement( "img" )
      crossDeleteInput.className = "input__cross"
      crossDeleteInput.src = "../../assets/cross-input.svg"
      crossDeleteInput.alt = "cross"
      deleteInputButton.appendChild( crossDeleteInput )
    }
  }

  // fonction d'effacement de l'input
  function eraseInput ()
  {
    searchForm.reset()
    removeDeleteInputButton()
  }

  // fonction de suppression du boutton d'effacement
  function removeDeleteInputButton ()
  {
    const deleteButton = document.querySelector( ".input__button" )
    deleteButton.remove()
    // FIXME erreur console : cannot read property of null (reading 'remove')
  }
  
  getDeleteInputButton()

  const deleteButton = document.querySelector( ".input__button" )
  if ( deleteButton && searchValue.length === 0 )
  {
    removeDeleteInputButton()
  }
  
  if ( deleteButton )
  {
    deleteButton.addEventListener( "click", eraseInput )
  }
}

searchForm.addEventListener( "input", search )
searchForm.addEventListener( "submit", search )
searchForm.addEventListener( "submit", noSubmit)
