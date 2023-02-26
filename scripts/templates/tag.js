function getTag (
  choiceSelected,
  choiceSort)
{
  console.log( "choiceSelected tag : ", choiceSelected )//!
  console.log( "choiceSort tag : ", choiceSort )//!
  
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

  console.log( "choiceClass tag : ", choiceClass )//!

  // construction du DOM---------------
  const headerContainerTag = document.querySelector( ".header__containerTag" )

  // tagTypes.forEach(tagType => {
    const tagList = document.createElement( "ul" )
    tagList.className = `tag__list tag__list--${ choiceClass }`
    headerContainerTag.appendChild( tagList )

    // tagType.items.forEach( item =>
    // {
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
      tagButton.appendChild(tagPicture)
    // } )

    //événements----------------------

    tagButtons = document.querySelectorAll( ".tag__button" )
    
    tagButtons.forEach( tagButton =>
    {
      const currentTag = tagButton.closest( ".tag__item" )
      function closeTag ()
      {
        currentTag.remove()
      }
      tagButton.addEventListener( "click", closeTag)
    } )
  // })
  
  
}
