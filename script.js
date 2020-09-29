const getMealButton = document.getElementById('get-meal'); // selecionando botão
const mealContainer = document.getElementById('meal'); // selecionando div onde vai ficar as refeições

// adicionando um ouvinte de evento para o click e por dentro faço uma solicitação à API
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
        if(meal[`strIngredients${i}`]) {
            ingredients.push(
                `${meal[`strIngredients${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        } else {
            // stop if there are no more ingredients
            break;
        }
    }

const newInnerHTML = `
    <div>
        <div>
            <img src="${meal.strMealThumb}" alt="Imagem da Refeição">
            ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strArea}</p>` : '-'}

            ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : '-'}

            ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}

            <h3>Ingredientes:</h3>

            <ul>${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
        </div>

        <div>
            <h4>${meal.strMeal}</h4>
            <p>${meal.strInstructions}</p>
        </div>
    </div>
    ${meal.strYoutube ? `
    
    <div>
        <h5>Video da receita</h5>
        <div>
            <iframe with="500" height:"340" src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"></iframe>
        </div>
    </div>` : '-'
    }
`;

mealContainer.innerHTML = newInnerHTML;
};