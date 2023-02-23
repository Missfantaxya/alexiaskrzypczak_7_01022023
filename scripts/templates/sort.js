function getSortChoice ( data )
{
  //récupérations de tous les ingrédients de toutes les recettes dans un tableau
  allRecipesIngredients = []
  data.forEach( recipe => recipe.ingredients.forEach( ingredient => allRecipesIngredients.push( ingredient.ingredient ) ) )
  
  // retrait des doublons du tableau des ingrédients
  const newSetIngredients = new Set( allRecipesIngredients )
  const allIngredients = [ ...newSetIngredients ]
  
  // Récupération de tous les appareils
  allRecipesAppliances = []
  data.forEach( recipe => allRecipesAppliances.push( recipe.appliance ) )

  // retrait des doublons du tableau des appareils
  const newSetAppliances = new Set( allRecipesAppliances )
  const allAppliances = [ ...newSetAppliances ]

  //récupérations de tous les ustensils de toutes les recettes dans un tableau
  allRecipesTools = []
  data.forEach( recipe => recipe.ustensils.forEach( ustensil => allRecipesTools.push( ustensil ) ) )
  
  // retrait des doublons du tableau des ustensils
  const newSetTools = new Set( allRecipesTools )
  const allTools = [ ...newSetTools ]

  sortTypes = [
    {
      name: "ingredients",
      placeholder : "ingrédient",
      class : "ingredients",
      items: allIngredients,
    },
    {
      name: "appareils",
      placeholder : "appareil",
      class : "appliances",
      items: allAppliances,
    },
    {
      name: "ustensils",
      placeholder : "ustensil",
      class : "tools",
      items: allTools,
    }
  ]

  // construction du DOM ----------------
  const sortList = document.querySelector( ".sort__list" )
// TODO améliorer le dropdown en construisant le sort__choice seulement à l'ouverture au lieu de jouer avec les class
  function sortDropdown ( typeOfSorting )
  {
    const sortItem = document.createElement( "li" )
    sortItem.className = `sort__item sort__item--close sort__item--${typeOfSorting.class}`
    sortList.appendChild( sortItem )
    
    const sortButton = document.createElement( "button" )
    sortButton.className = `sort__button sort__button--${typeOfSorting.class}`
    sortButton.type = "button"
    sortButton.textContent = typeOfSorting.name
    sortItem.appendChild( sortButton )
    
    const sortArrow = document.createElement( "img" )
    sortArrow.className = `{sort__arrow sort__arrow--${typeOfSorting.class}`
    sortArrow.src = "../../assets/arrow-down.svg"
    sortArrow.alt = "arrow"
    sortButton.appendChild( sortArrow )
    
    const sortForm = document.createElement( "form" )
    sortForm.className = `sort__form sort__form--${typeOfSorting.class}`
    sortItem.appendChild( sortForm )
    
    const sortWrapper = document.createElement( "div" )
    sortWrapper.className = `sort__wrapper sort__wrapper--${typeOfSorting.class}`
    sortForm.appendChild( sortWrapper
    )

    const sortField = document.createElement( "fieldset" )
    sortField.className = `sort__field sort__field--${typeOfSorting.class}`
    sortWrapper.appendChild( sortField )
    
    const sortLabel = document.createElement( "label" )
    sortLabel.className = "sort__label"
    sortLabel.setAttribute( "for", `sort__inputText--${typeOfSorting.class}` )
    sortField.appendChild( sortLabel )

    const sortInputText = document.createElement( "input" )
    sortInputText.id = `sort__inputText--${typeOfSorting.class}`
    sortInputText.className = `sort__inputText sort__inputText--${typeOfSorting.class}`
    sortInputText.name = `sort__inputText--${typeOfSorting.class}`
    sortInputText.type = "text"
    sortInputText.placeholder = `Rechercher un ${typeOfSorting.placeholder}`
    sortField.appendChild( sortInputText
    )

    const formButton = document.createElement( "button" )
    formButton.className = `form__button form__button${typeOfSorting.class}`
    formButton.type = "button"
    sortWrapper.appendChild( formButton )
    
    const formArrow = document.createElement( "img" )
    formArrow.className = `sort__arrow sort__arrow--up sort__arrow${typeOfSorting.class}`
    formArrow.src = "../../assets/arrow-down.svg"
    formArrow.alt = "arrow"
    formButton.appendChild( formArrow )
    
    const sortChoice = document.createElement( "div" )
    sortChoice.className = `sort__choice sort__choice${typeOfSorting.class}`
    sortForm.appendChild( sortChoice )
    
    typeOfSorting.items.forEach( item =>
    {
      var choiceValue = document.createElement( "p" )
      choiceValue.className = "choice__value"
      choiceValue.textContent = item
      sortChoice.appendChild( choiceValue )
    } )
  }

  sortTypes.forEach( sortType =>
  {
    sortDropdown (sortType)
  } )
  
  //événements-----------
 // TODO fermer le dropdown ouvert si un autre est ouvert
  sortButtons = document.querySelectorAll( ".sort__button" )
  sortButtons.forEach( sortButton => 
  {
    const sortItem = sortButton.parentElement
    function handleSortButton (  )
    {
      if ( sortItem.classList.contains( "sort__item--close" ) )
      {
        sortItem.classList.remove( "sort__item--close" )
        sortItem.classList.add("sort__item--open")
      }
    }
    sortButton.addEventListener( "click", handleSortButton )
  } )

  formButtons = document.querySelectorAll( ".form__button" )
  formButtons.forEach( formButton => 
  {
    const sortItem = formButton.closest('.sort__item')
    function handleFormButton ()
    {
      
      if ( sortItem.classList.contains( "sort__item--open" ) )
      {
        sortItem.classList.remove( "sort__item--open" )
        sortItem.classList.add("sort__item--close")
      }
    }
    formButton.addEventListener( "click", handleFormButton )
  } 
  )
}
