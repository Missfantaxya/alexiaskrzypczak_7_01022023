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

  // vérification du tag --------------
  const tagsDom = document.querySelectorAll( ".tag__item" )
  const tagsExist = []
  // récupération du contenu des tags existants
  if ( tagsDom.length > 0 )
  {
    tagsDom.forEach( tag => {
      const tagContent = tag.textContent
      tagsExist.push(tagContent)
    } )
  }
  // comparaison avec choiceSelected
  const oldTag = tagsExist.includes( choiceSelected )
  
   // construction du DOM si le tag n'existe pas -----------
  if (!oldTag)
  {const headerContainerTag = document.querySelector( ".header__containerTag" )

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
  tagPicture.src = "../../assets/cross-tag.svg"
  tagPicture.alt = "cross"
  tagButton.appendChild( tagPicture )}

  advancedSearch ()

  //événements----------------------

  const tagButtons = document.querySelectorAll( ".tag__button" )
  
  tagButtons.forEach( tagButton =>
  {
    const currentTag = tagButton.closest( ".tag__item" )
    function closeTag ()
    {
      currentTag.remove()
      console.log("recipes de closeTag: ", recipes)
      advancedSearch()
    }
    
    tagButton.addEventListener( "click", closeTag )
  } )
}
