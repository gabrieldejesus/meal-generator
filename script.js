const getMealButton = document.getElementById('get-meal'); // selecting button
const mealContainer = document.getElementById('meal'); // selecting div where meals will be

// adding an event listener for the click and inside I make a request to the API
getMealButton.addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
        createMeal(res.meals[0]);
    })
    .catch(e => {
        console.warn(e);
    })
})

const createMeal = meal => {
    const ingredients = [];

    // get all ingredients from the object. Up to 20
    for(let i = 1; i <= 20; i++) {
        if(meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        } else {
            // stop if there are no more ingredients
            break;
        }
    }

const newInnerHTML = `
    <div class="meal-container">
        <div class="meal-thumb column">
            <label class="column">
                <img src="${meal.strMealThumb}" alt="Imagem da Refeição">
                ${meal.strMeal} <!-- meal title -->
            </label>

            ${meal.strYoutube ? `
            <div>
                <h5>Recipe tutorial</h5>
                <iframe src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"></iframe>
            </div>` : '-'
            }
        </div>
        
        <div class="meal-body column">
            ${meal.strCategory ? `<p><strong>Category:</strong> <label>${meal.strArea}</label></p>` : '-'}

            ${meal.strArea ? `<p><strong>Area:</strong> <label>${meal.strArea}</label></p>` : '-'}

            ${meal.strTags ? `<p><strong>Tags:</strong> <label>${meal.strTags.split(',').join(', ')}</label></p>` : ' '}

            <h3>Ingredientes:</h3>

            <ul>${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
            
            <div class="instructions">${meal.strInstructions}</div> <!-- instructions -->
        </div>

        <div>
            
        </div>
    </div>
    
`;

mealContainer.innerHTML = newInnerHTML;
};