function getRecipe( data )
{
  const { description, ingredients, name, time } = data
// console.log ("ingredients : ", ingredients)

  const recipeList = document.querySelector( ".recipes__list" )
  const recipeCard = document.createElement( "li" )
  recipeCard.className = "recipe__card"
  recipeList.appendChild(recipeCard)
  
  const recipePictureContainer = document.createElement( "div" )
  recipePictureContainer.className = "recipe__pictureContainer"
  recipeCard.appendChild( recipePictureContainer )
  
  const recipeTitleContainer = document.createElement( "div" )
  recipeTitleContainer.className = "recipe__titleContainer"
  recipeCard.appendChild( recipeTitleContainer )
  
  const recipeContent = document.createElement( "div" )
  recipeContent.className = "recipe__content"
  recipeTitleContainer.appendChild( recipeContent )

  const recipeTitle = document.createElement( "h3" )
  recipeTitle.className = "recipe__title"
  recipeTitle.textContent = name
  recipeContent.appendChild( recipeTitle )

  const recipeTime = document.createElement( "div" )
  recipeTime.className = "recipe__time"
  recipeContent.appendChild( recipeTime )
  
  const recipeClock = document.createElement( "img" )
  recipeClock.className = "recipe__clock"
  recipeClock.src = "../assets/clock.svg"
  recipeClock.alt = "clock"
  recipeTime.appendChild( recipeClock )
  
  const recipeDuration = document.createElement( "p" )
  recipeDuration.className = "recipe__duration"
  recipeDuration.textContent = time + " min"
  recipeTime.appendChild( recipeDuration )
  
  const recipeDetailsContainer = document.createElement( "div" )
  recipeDetailsContainer.className = "recipe__detailsContainer"
  recipeTitleContainer.appendChild( recipeDetailsContainer )
  
  const recipeIngredientsList = document.createElement( "ul" )
  recipeIngredientsList.className = "recipe__ingredientsList"
  recipeDetailsContainer.appendChild( recipeIngredientsList )
  
  ingredients.forEach( ingredient =>
  {
    var recipeIngredienstItem = document.createElement( "li" )
    recipeIngredienstItem.className = "recipe__ingredientsItem"
    recipeIngredientsList.appendChild( recipeIngredienstItem )

    var recipeIngredient = document.createElement( "p" )
    recipeIngredient.className = "recipe__ingredient"
    if ( ingredient.quantity != undefined )
    {
      recipeIngredient.textContent = ingredient.ingredient + "\u00a0:\u00a0"
    }
    else
    {
      recipeIngredient.textContent = ingredient.ingredient
    }
    recipeIngredienstItem.appendChild( recipeIngredient )

    var recipeQuantity = document.createElement( "p" )
    recipeQuantity.className = "recipe__quantity"
    if ( ingredient.quantity != undefined )
    {
      recipeQuantity.textContent = ingredient.quantity + "\u00a0"
    }
    recipeIngredienstItem.appendChild( recipeQuantity )

    if ( ingredient.hasOwnProperty( "unit" ) )
    {
      var recipeUnit = document.createElement( "p" )
      recipeUnit.className = "recipe__unit"
      var unitText = ingredient.unit
      var unitSplit = unitText.split( " " )
      if ( unitSplit[0] === "grammes" )
      {
        unitSplit[0] = "g"
      }
      recipeUnit.textContent = unitSplit[ 0 ]
      recipeIngredienstItem.appendChild( recipeUnit )
    }
  })  
  
  const recipeProcess = document.createElement( "p" )
  recipeProcess.className = "recipe__process"
  recipeProcess.textContent = description
  recipeDetailsContainer.appendChild(recipeProcess)

}
