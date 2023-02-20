function getSortChoice ( data )
{
  //récupérations de tous les ingrédients de toutes les recettes dans un tableau
  AllRecipesIngredients = []
  data.forEach( recipe => recipe.ingredients.forEach( ingredient => AllRecipesIngredients.push( ingredient.ingredient ) ) )
  console.log( "AllRecipesIngredients : ", AllRecipesIngredients )
  
  // retirer les doublons du tableau
  const newSet = new Set( AllRecipesIngredients )
  console.log( "newSet : ", newSet )
  const AllIngredients = [ ...newSet ]
  console.log( "AllIngredients : ", AllIngredients )
  
  // construction du DOM ----------------
  // TODO construction avec --ingrédient mais le faire de façon générique et le spécialiser avec le js
  const sortList = document.querySelector( ".sort__list" )
  // console.log ("sortList : ", sortList) //*
  const sortItem = document.createElement( "li" )
  sortItem.className = "sort__item sort__item--close sort__item--ingredients"
  sortList.appendChild( sortItem )
  
  const sortButton = document.createElement( "button" )
  sortButton.className = "sort__button sort__button--ingredients"
  sortButton.type = "button"
  sortButton.textContent = "Ingrédients"
  sortItem.appendChild( sortButton )
  
  const sortArrow = document.createElement( "img" )
  sortArrow.className = "sort__arrow sort__arrow--ingredients"
  sortArrow.src = "../../assets/arrow-down.svg"
  sortArrow.alt = "arrow"
  sortButton.appendChild( sortArrow )
  
  const sortForm = document.createElement( "form" )
  sortForm.className = "sort__form sort__form--ingredients"
  sortItem.appendChild( sortForm )
  
  const sortWrapper = document.createElement( "div" )
  sortWrapper.className = "sort__wrapper sort__wrapper--ingredients"
  sortForm.appendChild( sortWrapper
  )

  const sortField = document.createElement( "fieldset" )
  sortField.className = "sort__field sort__field--ingredients"
  sortWrapper.appendChild( sortField )
  
  const sortLabel = document.createElement( "label" )
  sortLabel.className = "sort__label"
  sortLabel.setAttribute( "for", "sort__inputText--ingredients" )
  sortField.appendChild( sortLabel )

  const sortInputText = document.createElement( "input" )
  sortInputText.id = "sort__inputText--ingredients"
  sortInputText.className = "sort__inputText"
  sortInputText.name = "sort__inputText--ingredients"
  sortInputText.type = "text"
  sortInputText.placeholder = "Rechercher un ingrédient"
  sortField.appendChild( sortInputText
  )

  const formButton = document.createElement( "button" )
  formButton.className = "form__button form__button--ingredients"
  formButton.type = "button"
  sortWrapper.appendChild( formButton )
  
  const formArrow = document.createElement( "img" )
  formArrow.className = "sort__arrow sort__arrow--up sort__arrow--ingredients"
  formArrow.src = "../../assets/arrow-down.svg"
  formArrow.alt = "arrow"
  formButton.appendChild( formArrow )
  
  const sortChoice = document.createElement( "div" )
  sortChoice.className = "sort__choice sort__choice--ingredients"
  sortForm.appendChild( sortChoice )
  
  AllIngredients.forEach( ingredient =>
  {
    var choiceValue = document.createElement( "p" )
    choiceValue.className = "choice__value"
    choiceValue.textContent = ingredient
    sortChoice.appendChild( choiceValue )
  } )
  
  //événements-----------

  function handleSortButton() {
    if ( sortItem.classList.contains( "sort__item--close" ) )
    {
      sortItem.classList.remove( "sort__item--close" )
      sortItem.classList.add("sort__item--open")
    }
  }
  sortButton.addEventListener( "click", handleSortButton )
  
  function handleFormButton() {
    if ( sortItem.classList.contains( "sort__item--open" ) )
    {
      sortItem.classList.remove( "sort__item--open" )
      sortItem.classList.add("sort__item--close")
    }
  }
  formButton.addEventListener( "click", handleFormButton )

}
