function getTag (
  choiceSelected,
  choiceSort)
{
  var choiceClass = ""
  if ( choiceSort === "ingrédients" )
  {
    choiceClass = "ingredients"
  }
  else if ( choiceSort === "appareils" )
  {
    choiceClass = "appliances"
  }
  else if ( choiceSort === "ustensils" )
  {
    choiceClass = "tools"
  }

    // FIXME empêcher la génération de tag identiques
  // vérification du tag --------------
  // TODO 
  // récupérer dans les DOM les text.content des tag
  // les comparer avec choiceSelected
  // si inexistant alors création d'un nouveau tag
  
  // construction du DOM---------------
  const headerContainerTag = document.querySelector( ".header__containerTag" )

  const tagList = document.createElement( "ul" )
  tagList.className = `tag__list tag__list--${ choiceClass }`
  headerContainerTag.appendChild( tagList )

  const tagItem = document.createElement( "li" )
  tagItem.className = `tag__item tag__item--${ choiceClass }`
  tagItem.textContent = choiceSelected
  tagList.appendChild( tagItem )
  
  const tagButton = document.createElement( "button" )
  tagButton.className = `tag__button tag__button--${ choiceClass }`
  tagButton.type = "button"
  tagItem.appendChild( tagButton )
  
  const tagPicture = document.createElement( "img" )
  tagPicture.className = "tag__picture"
  tagPicture.src = "../../assets/cross.svg"
  tagPicture.alt = "cross"
  tagButton.appendChild( tagPicture )

  advancedSearch ()

  //événements----------------------

  const tagButtons = document.querySelectorAll( ".tag__button" )
  
  tagButtons.forEach( tagButton =>
  {
    const currentTag = tagButton.closest( ".tag__item" )
    function closeTag ()
    {
      currentTag.remove()
    }
    tagButton.addEventListener( "click", closeTag )
    // FIXME appel advancedSearch même sans suppression de tag
    tagButton.addEventListener( "click", advancedSearch) //~
  } )
}
