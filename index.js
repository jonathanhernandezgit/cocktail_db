'use strict'

const API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a'
const API_BY_ID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='
const API_SEARCH = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

const fetchCocktail = async () => {
    const response = await fetch(API)
    const cocktails = await response.json()
    return cocktails
}

fetchCocktail().then(cocktail => {
  displayCocktails(cocktail.drinks)
})

const displayCocktails = (allCocktails) => {
    const container = document.querySelector('.cocktails-container');
    container.innerHTML = '';

    let itemHTML = ''

    allCocktails.forEach((item, index) =>{
        itemHTML +=     `<a class="cocktail-card" data-my-id=''>    
                            <article>
                                <div class="cocktail-img"> 
                                    <img src="${ item.strDrinkThumb }" alt="${ item.strDrink }" title="" ">
                                </div>
                                <div class="cocktail-info" data-id=''> 
                                    <h2> ${ item.strDrink } </h2>
                                    <h3> ${ item.strGlass } </h3>
                                    <h4> ${ item.strAlcoholic } </h4>
                                    <p><span class="cocktail-ingredients" id="${ item.idDrink}"></span> </p> 
                                    <button class="btnReadMore" value="${ item.idDrink }">Read more info</button>         
                                </div>
                            </article>
                         </a>`
    })
    
    container.innerHTML = itemHTML;

    document.querySelectorAll('.btnReadMore').forEach((item, index)=>{
        
        item.addEventListener('click',(evt) => {
            
            getIngredientsCocktail(item.value)
            let span = document.getElementById(item.value)
            let button = document.getElementsByTagName('button')[index]

            if(span.style.display === "inline") {
                span.style.display = "none";
                button.innerText = "Read more info"
            }else {
                span.style.display = "inline";
                button.innerText = "Read less info"
            }
        })
    })    
}

function getIngredientsCocktail(idCocktail){
    
    const fetchCocktailByID = async () => {
        const response = await fetch(API_BY_ID + idCocktail)
        const cocktails = await response.json()

        return cocktails
    }
    fetchCocktailByID().then(cocktail => {
        let ingredientsArray = []
        for (let i = 1; i <= 15; i++) {
            if(cocktail.drinks[0]['strIngredient' + i]!= null ){
                ingredientsArray.push(cocktail.drinks[0]['strIngredient' + i])
            }
        }
  
        printIngredientsAndMore(ingredientsArray, cocktail.drinks[0].idDrink, cocktail.drinks[0].strInstructions)
    })  

}

function printIngredientsAndMore (array, idDrink, strInstructions){
    let ingredientsString = ""
    
    for (let i = 0; i < array.length; i++){

        if(i <= array.length-2){
            ingredientsString += array[i] + ", "
        }else{
             ingredientsString += array[i]
        }
    }
        const span = document.getElementById(idDrink)
        span.innerHTML = "<br/> <span>Ingredients:</span> <em> "  + ingredientsString + "<br/> " + " </em><span> Instructions: </span> " + strInstructions + "</em>"
    }


document.addEventListener('DOMContentLoaded',() => {
    try{
        document.querySelector('.form-control').addEventListener('keyup', (evt) =>{
            let searchValue = evt.target.value
            if (searchValue.length == 0){
                document.location.reload()
                return false
            }      
            const fetchCocktailByName = async () => {
                const response = await fetch(API_SEARCH + searchValue)
                const cocktails = await response.json()
                return cocktails
            }
            fetchCocktailByName().then(cocktail => {
                displayCocktails(cocktail.drinks)
            })
        })
    }catch(error){
        console.error(error)
    }
  
})

 

