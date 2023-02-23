//TODO remplir le tableau [items] avec ce qui est tapé dans les champs des tri
tagTypes = [
    {
      name: "ingredient",
      class: "ingredients",
      items: [
        "itemI--1",
        "itemI--2"
      ]
    },
    {
      name: "appliance",
      class: "appliances",
      items: [
        "itemA--1",
      ]
    },
    {
      name: "tools",
      class: "tools",
      items: [
        "itemT--1",
      ]
    }
]
  
function getTag ()
{
  // construction du DOM---------------
  const headerContainerTag = document.querySelector( ".header__containerTag" )

  tagTypes.forEach(tagType => {
    const tagList = document.createElement( "ul" )
    tagList.className = `tag__list tag__list--${ tagType.class }`
    headerContainerTag.appendChild( tagList )

    tagType.items.forEach( item =>
    {
      const tagItem = document.createElement( "li" )
      tagItem.className = `tag__item tag__item--${ tagType.class }`
      tagItem.textContent = item
      tagList.appendChild( tagItem )
      
      const tagButton = document.createElement( "button" )
      tagButton.className = `tag__button tag__button--${ tagType.class }`
      tagButton.type = "button"
      tagItem.appendChild( tagButton )
      
      const tagPicture = document.createElement( "img" )
      tagPicture.className = "tag__picture"
      tagPicture.src = "../../assets/cross.svg"
      tagPicture.alt = "cross"
      tagButton.appendChild(tagPicture)
    } )

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
  })
  
  
}
