function getSortChoice ()
{ 
  function setIngredients (data)
  {
    // récupérations de tous les ingrédients de toutes les recettes dans un tableau
    var allRecipesIngredients = []
    data.forEach( recipe =>
    {
      recipe.ingredients.forEach( ingredient =>
      {
        //mise en forme en minuscule
        const ingredientLowerCase = ingredient.ingredient.toLowerCase()
        allRecipesIngredients.push(ingredientLowerCase)
      })
    } )
    
    // retrait des doublons du tableau des ingrédients
    const newSetIngredients = new Set( allRecipesIngredients )
    allIngredients = [ ...newSetIngredients ]
    // pour facilité les cas d'utilisation mais n'est pas sur la maquette
    return allIngredients
  }
  
  function setAppliances (data)
  {
    // Récupération de tous les appareils
    allRecipesAppliances = []
    data.forEach( recipe =>
    {
      //mise en forme en minuscule 
      const appliance = recipe.appliance
      const applianceLowerCase = appliance.toLowerCase()
      allRecipesAppliances.push( applianceLowerCase)
    } )

    // retrait des doublons du tableau des appareils
    const newSetAppliances = new Set( allRecipesAppliances )
    allAppliances = [ ...newSetAppliances ]
    return allAppliances
  }

  function setTools ( data )
  {
    //récupérations de tous les ustensils de toutes les recettes dans un tableau
    allRecipesTools = []
    data.forEach( recipe =>
    {
      recipe.ustensils.forEach( ustensil =>
      {
        const ustensilLoxerCase = ustensil.toLowerCase()
        allRecipesTools.push( ustensilLoxerCase )
      } )
    } )
    
    // retrait des doublons du tableau des ustensils
    const newSetTools = new Set( allRecipesTools )
    allTools = [ ...newSetTools ]
    return allTools
  }

  var allIngredients = setIngredients( recipes )
  var allAppliances = setAppliances( recipes )
  var allTools = setTools(recipes)

  sortTypes = [
    {
      type: "ingrédients",
      placeholder : "ingrédient",
      class : "ingredients",
      items: allIngredients,
    },
    {
      type: "appareils",
      placeholder : "appareil",
      class : "appliances",
      items: allAppliances,
    },
    {
      type: "ustensils",
      placeholder : "ustensil",
      class : "tools",
      items: allTools,
    }
  ]

  // construction du DOM ----------------
  const sortList = document.querySelector( ".sort__list" )

  function getSortDropdown ( typeOfSorting ) 
  {
    const sortItem = document.createElement( "li" )
    sortItem.className = `sort__item sort__item--close sort__item--${typeOfSorting.class}`
    sortList.appendChild( sortItem )
    
    const sortButton = document.createElement( "button" )
    sortButton.className = `sort__button sort__button--${typeOfSorting.class}`
    sortButton.type = "button"
    sortButton.textContent = typeOfSorting.type
    sortItem.appendChild( sortButton )
    
    const sortArrow = document.createElement( "img" )
    sortArrow.className = `{sort__arrow sort__arrow--${typeOfSorting.class}`
    sortArrow.src = "../../assets/arrow-down.svg"
    sortArrow.alt = "arrow"
    sortButton.appendChild( sortArrow )
  }

  function getSortForm ( typeOfSorting, sortItem, currentTexte )
  {
    const sorType = (element) => element.type===currentTexte
    const currentSort = typeOfSorting.findIndex( sorType )
    
    const sortForm = document.createElement( "form" )
    sortForm.className = `sort__form sort__form--${ typeOfSorting[ currentSort ].class }`
    sortItem.appendChild( sortForm )
    
    const sortWrapper = document.createElement( "div" )
    sortWrapper.className = `sort__wrapper sort__wrapper--${typeOfSorting[currentSort].class}`
    sortForm.appendChild( sortWrapper
    )

    const sortField = document.createElement( "fieldset" )
    sortField.className = `sort__field sort__field--${typeOfSorting[currentSort].class}`
    sortWrapper.appendChild( sortField )
    
    const sortLabel = document.createElement( "label" )
    sortLabel.className = "sort__label"
    sortLabel.setAttribute( "for", `sort__inputText--${typeOfSorting[currentSort].class}` )
    sortField.appendChild( sortLabel )

    const sortInputText = document.createElement( "input" )
    sortInputText.id = `sort__inputText--${typeOfSorting[currentSort].class}`
    sortInputText.className = `sort__inputText sort__inputText--${typeOfSorting[currentSort].class}`
    sortInputText.name = `sort__inputText--${typeOfSorting[currentSort].class}`
    sortInputText.type = "search"
    sortInputText.placeholder = `Rechercher un ${typeOfSorting[currentSort].placeholder}`
    sortField.appendChild( sortInputText
    )

    const formButton = document.createElement( "button" )
    formButton.className = `form__button form__button--${typeOfSorting[currentSort].class}`
    formButton.type = "button"
    sortWrapper.appendChild( formButton )
    
    const formArrow = document.createElement( "img" )
    formArrow.className = `sort__arrow sort__arrow--up sort__arrow${typeOfSorting[currentSort].class}`
    formArrow.src = "../../assets/arrow-down.svg"
    formArrow.alt = "arrow"
    formButton.appendChild( formArrow )

    const itemsLength = typeOfSorting[ currentSort ].items.length
    const gridRows =  itemsLength > 10  ? 10 : itemsLength
    const sortChoice = document.createElement( "div" )
    sortChoice.className = `sort__choice sort__choice--${ typeOfSorting[ currentSort ].class }`
    sortChoice.style.gridTemplateRows = `repeat(${ gridRows }, 1fr)`
    sortForm.appendChild( sortChoice )

    typeOfSorting[currentSort].items.forEach( item =>
    {
      var choiceValue = document.createElement( "p" )
      choiceValue.className = "choice__value"
      choiceValue.textContent = item
      choiceValue.tabIndex = 0
      sortChoice.appendChild( choiceValue )
    } )
  }

  sortTypes.forEach( sortType =>
  {
    getSortDropdown( sortType )
  } )
  
  //événements-----------
  
  var sortButtons = document.querySelectorAll( ".sort__button" )
  sortButtons.forEach( sortButton => 
  {
    const currentTexte = sortButton.textContent
    const sortItem = sortButton.parentElement

    function setFormSort (  )
    {
      console.log("[tags] dans setFormSort : ", tags) //*
      console.log( "[recipesToSort] dans setFormSort() : ", recipesToSort ) //*
      console.log( "[newRecipesSearch] dans setFormSort() : ", newRecipesSearch ) //*
    
      if ( sortItem.classList.contains( "sort__item--close" ) )
      {
        sortItem.classList.remove( "sort__item--close" )
        sortItem.classList.add( "sort__item--open" )

        // s'il y a eu une recherche mais pas de recherche avancée
        if ( newRecipesSearch.length > 0 && tags.length === 0 )
        {
          sortTypes[ 0 ].items = setIngredients( newRecipesSearch )
          sortTypes[ 1 ].items = setAppliances( newRecipesSearch )
          sortTypes[2].items = setTools( newRecipesSearch )
        }
        // s'il y a eu une recherche avancée mais pas de recherche dans la barre
        // de recherche
        else if ( newRecipesSearch.length === 0 && tags.length > 0 )
        {
          sortTypes[ 0 ].items = setIngredients( recipesToSort )
          sortTypes[ 1 ].items = setAppliances( recipesToSort )
          sortTypes[2].items = setTools( recipesToSort )
        }
        //FIXME avec tag ET recherche (quelque soit le sens)
        // s'il y a eu une recherche et une recherche avancée
        // else if ( newRecipesSearch.length > 0 && tags.length > 0 )
        // {
        //   // TODO newRecipesSearch c'est après une recherche
        //   // TODO le faire aussi après un tag
        //   sortTypes[ 0 ].items = setIngredients( recipesToSort )
        //   sortTypes[ 1 ].items = setAppliances( recipesToSort )
        //   sortTypes[2].items = setTools( recipesToSort )
        // }
        
        getSortForm( sortTypes, sortItem, currentTexte )
        formButton = document.querySelector( ".form__button" )
        const inputSort = document.querySelector( ".sort__inputText" )
        function notSubmitForm ( event )
        {
          event.preventDefault()
        }
        const formSort = inputSort.closest( ".sort__form" )
        formSort.addEventListener( "submit", notSubmitForm )
        const inputText = document.querySelector(".sort__inputText")
        inputText.focus()

        function oneFormOpened ()
        {
          // création d'un tableau vide
          const arrayFormOpened = []
          // récupération des noeuds des formulaire dans le DOM
          const nodeFormOpened = document.querySelectorAll( ".sort__item--open" )

          // remplissage du tableau avec les noeuds récupérés
          nodeFormOpened.forEach( item =>
          {
            arrayFormOpened.push(item)
          } )

          arrayFormOpened.forEach( item =>
          {
            // récupération du parent de chaque formulaire
            const parentButton = sortButton.parentNode

            // vérification pour ne pas atteindre le dernier tri ouvert
            if(item != parentButton)
            {
              item.classList.remove( "sort__item--open" )
              item.classList.add( "sort__item--close" )
              const form = item.lastChild
              form.remove()
            }
          } )
        }
        oneFormOpened()
      }
    }
    sortButton.addEventListener( "click", setFormSort )
  } )

  const toObserveSort = document.querySelector( ".sort__list" )

  // Création d'un observateur pour le changement du DOM
  const observer = new MutationObserver( () =>
  {
    const inputSort = document.querySelector( ".sort__inputText" )

    function filtering ()
    {
      const sortForm = inputSort.closest( ".sort__form" )
      // récupération de la valeur de la recherche avancée
      var inputValue = inputSort.value
      // Mise en forme en minuscules
      const inputValueLowerCase = inputValue.toLowerCase()
      // Ciblage et récupération de la valeur du type de tri
      var sortItem = inputSort.closest( ".sort__item" )
      var sortButton = sortItem.firstChild
      const currentTexte = sortButton.textContent

      //récupération de l'index de l'objet du tri
      const sorType = ( element ) => element.type === currentTexte
      const currentSort = sortTypes.findIndex( sorType )

      // items du tri
      const currentItems = sortTypes[ currentSort ].items

      const newItems = []
      // vérification des correspondances
      currentItems.forEach( item =>
      {
        if ( item.includes( inputValueLowerCase ) )
        {
          newItems.push(item)
        }
      } )

      // nouveau DOM avec le tri
      const newItemsLength = newItems.length
      if ( newItemsLength > 0 )
      {
        const sortChoice = document.querySelector( ".sort__choice" )
        sortChoice.remove()
        const newSortChoice = document.createElement("div")
        const gridRows =  newItemsLength > 10  ? 10 : newItemsLength
        newSortChoice.className = `sort__choice sort__choice--${ sortTypes[ currentSort ].class }`
        newSortChoice.style.gridTemplateRows = `repeat(${ gridRows }, 1fr)`
        sortForm.appendChild( newSortChoice )
        newItems.forEach( item =>
        {
          var choiceValue = document.createElement( "p" )
          choiceValue.className = "choice__value"
          choiceValue.textContent = item
          newSortChoice.appendChild( choiceValue )
        } )
      }
    }
    if (inputSort){
      inputSort.addEventListener( "input", filtering )
    }

    const choices = document.querySelectorAll( ".choice__value" )
    choices.forEach( choice =>
    {
      function selectChoice ()
      {
        const choiceSelected = choice.textContent 
        const sortItem = choice.closest( ".sort__item" )
        const sortChoiceButton = sortItem.firstChild
        const sortChoice = sortChoiceButton.textContent
        getTag(
          choiceSelected,
          sortChoice )
      }
      choice.addEventListener( "click", selectChoice )

      function closeForm ()
      {
        const sortItem = formButton.closest( '.sort__item' )
        sortItem.classList.remove( "sort__item--open" )
        sortItem.classList.add( "sort__item--close" )
        const sortForm = choice.closest( ".sort__form" )
        sortForm.remove()
      }
      choice.addEventListener( "click", closeForm )
    } )

    const formButtons = document.querySelectorAll( ".form__button" )
    formButtons.forEach( formButton =>
    {
      const sortItem = formButton.closest( '.sort__item' )
      function closeFormSort ()
      {
        if ( sortItem.classList.contains( "sort__item--open" ) )
        {
          sortItem.classList.remove( "sort__item--open" )
          sortItem.classList.add( "sort__item--close" )
          const sortForm = formButton.closest( ".sort__form" )
          sortForm.remove()
        }
      }
      formButton.addEventListener( "click", closeFormSort )
    } )
  } )
  observer.observe( toObserveSort, { subtree: true, childList: true } )
}
