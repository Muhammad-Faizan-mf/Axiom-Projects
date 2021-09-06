//get dom elements
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const generateBtn = document.getElementById('generate-btn');
const resultsHeading = document.getElementById('results-heading');
const mealsElement = document.getElementById('meals');
const selectedMealElement = document.getElementById('selected-meal');

function findMeals(e){
    //stop page from reload
    e.preventDefault();
    //clear the search text
    selectedMealElement.innerHTML = '';
    //store the search text
    const searchText = search.value;
    //checking that the search has text
    if(searchText.trim()){
        //search text exists
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`).then(res => res.json()).then(
            data => {
                console.log(data);
                //display the result heading
                resultsHeading.innerHTML = `<h2>Search results for ${searchText}</h2>`;
                //check to see if any data has returned 
                if(data.meals ===null){
                    //display heading that results not found
                    resultsHeading.innerHTML=`<h2>No results for ${searchText}</h2>`;
                }
                else{
                    //result exists so display the result
                    mealsElement.innerHTML = data.meals.map(
                        meal =>`
                        <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                        <div class="meal-info" data-mealID = "${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                        
                        </div>
                        </div>
                        `
                    ).join('')  
                };
                search.value= '';
            }
        ) }
    else{
        //if search text does not exist
        alert("Please provide a text for search");
    }

};

function getFullDetails(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`).then(res =>res.json()).then(
        data => {
            const meal =data.meals[0];
            renderMeal(meal);
        }
    )

};

// function to render selected meals
function renderMeal(meal){
    //hiding search result heading
    resultsHeading.innerHTML='';
    //hide the search results
    mealsElement.innerHTML ='';
    //initialize array for ingredients
    const ingredients = [];
    //loop for 20 ingredients
    for(let i=1;i<= 20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient$[i]`]} - ${
                meal[`strMeasure${i}`]
            }`)
        }else{
            break;
        }
    };
    //add data of meal to DOM
    selectedMealElement.innerHTML = `
        <div class="selected-meal-details">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="selected-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="selected-meal-instructions">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map( ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
};

//function to render random meal
function randomMeal(e){
    // fetch(`www.themealdb.com/api/json/v1/1/random.php`).then( res => res.json()).then(
    //         data => {
    //             console.log(data);
    //         }
    //     );
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then( res => res.json() )
    .then( data => {
        // Save the meal data
        const meal = data.meals[0];
        console.log(meal);
        // Add the meal to the DOM
        renderMeal(meal);
    })
};
//Event listner to listen on sub,it button
submit.addEventListener('submit',findMeals);

//listen for click on meal elements
mealsElement.addEventListener('click', e =>{
    //get all items clicked
    const mealInfo = e.path.find(item => {
        if(item.classList){
            return item.classList.contains('meal-info');

        }
        else{
            return false;

        }
    });
    if(mealInfo){
        const mealID  = mealInfo.getAttribute('data-mealID');
        getFullDetails(mealID);
    }
} )

//liten for click on radom meal generator button
generateBtn.addEventListener('click',randomMeal);
