const searchForm = document.querySelector( ".header__containerSearch" )
const searchInput = document.querySelector( ".search__input" )

// initialisation du tableau avec toutes les recettes
const allRecipes = recipes

// initialisation du tableau vide pour les recettes filtrées
let recipesSearched = []

//initialisation d'un tableau vide pour le retrait des doublons
let newRecipesSearch = []

// éviter le comportement par défault du formulaire
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
    
    // fonction de tri des recettes avec une boucle
    function sortingRecipes(data)
    {
      for ( const recipe of data )
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

        // vérirfication des correspondances dans les données
        const match = stringRecipeLowerCase.includes( searchValueTrim )

        // remplissage du tableau des recettes filtrées
        if ( match )
        {
          recipesSearched.push( recipe )
        }
      }
    }

    // si une recherche avancée a été faite
    if (tags.length === 0)
    {
      // afficher les recettes filtrées parmis toutes les recettes
      sortingRecipes(allRecipes)
    }
    else
    {
      let recipesToDisplay = []
      // retrait des lignes vide dans le tableau des recettes filtrer via les tags
      recipesToSort.forEach( recipe => 
      {
        if ( recipe != undefined ) 
        {
          recipesToDisplay.push(recipe)
        }
      } )
      // afficher les recettes filtrées parmis les recettes contenant le(s) tag(s)
      sortingRecipes(recipesToDisplay)
    }

    // Retrait des doublons du tableau
    const setRecipesSearch = new Set( recipesSearched )
    newRecipesSearch = [ ...setRecipesSearch ]
  
    const recipesList = document.querySelector( ".recipes__list" )

    // si une recherche est faite
    if ( newRecipesSearch.length > 0 )
    {
      // vidage du DOM des recettes précedement affichées
      recipesList.innerHTML = " "
      // affichage des recettes filtrées par la recherche
      newRecipesSearch.forEach( recipe =>
        getRecipe( recipe )
      )
    }
    else
    {
      // vidage du DOM des recettes précedement affichées
      recipesList.innerHTML = " "
      // affichage du message d'erreur
      recipesList.innerHTML = "<div class='notFound'> Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc </div>"
    }
  }
  
  //fonction de création du bouton d'effacement du formulaire
  function getDeleteInputButton ()
  {
    const deleteButton = document.querySelector( ".input__button" )
    // s'il n'y a pas le bouton
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

  // fonction de nettoyage du champs de recherche
  function clearInput ()
  {
    searchForm.reset()
    removeDeleteInputButton()
    newRecipesSearch = []
    const recipesList = document.querySelector( ".recipes__list" )
    recipesList.innerHTML = ""
    // S'il n'y a pas de tag
    if(tags.length === 0 )
    {
      // affichage de toutes les recettes
      allRecipes.forEach( recipe =>
    {
      getRecipe(recipe)
      } )
    } else
    {
      // affichage des recettes filrtées par les tags
      advancedSearch()
    }
  }

  // fonction de suppression du boutton de nettoyage
  function removeDeleteInputButton ()
  {
    const deleteButton = document.querySelector( ".input__button" )
    if ( deleteButton )
    {
      deleteButton.remove()
    }
  }
  
  getDeleteInputButton()

  const deleteButton = document.querySelector( ".input__button" )

  // supression du bouton si suppression de la recherche
  if ( deleteButton && searchValue.length === 0 )
  {
    removeDeleteInputButton()
    newRecipesSearch = [] 
    if ( tags.length > 0 )
    {
      advancedSearch()
    }
    
  }

  // suppression du bouton au click
  if ( deleteButton )
  {
    deleteButton.addEventListener( "click", clearInput )
  }
}

searchForm.addEventListener( "input", search )
searchForm.addEventListener( "submit", search )
searchForm.addEventListener( "submit", noSubmit)
