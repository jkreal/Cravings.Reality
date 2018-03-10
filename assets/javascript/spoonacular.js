// KEEP*****
// var rapid = new RapidAPI('default-application_5a9f46e0e4b084deb4ea687a', 'b660274c-9753-4523-9d06-f338b1444d77');
// console.log('RapidAPI', RapidAPI);
// console.log('rapid', rapid);


//TEST API
// $(document).on('click', () => {
// 	alert('hi');
// })

// $.ajax({
//   url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?apikey=f1DmFEzv4smshk3RQgAed5kwAGr0p1JlMf6jsn8ht3R07iwPwK&query=burger",
//   type: "GET"
// }).done(function(response) {
//   console.log(response);
// });



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAML7xzBjrJan2eVVRSqo1H9idSlUB5gpY",
    authDomain: "recipe-project-24f9b.firebaseapp.com",
    databaseURL: "https://recipe-project-24f9b.firebaseio.com",
    projectId: "recipe-project-24f9b",
    storageBucket: "recipe-project-24f9b.appspot.com",
    messagingSenderId: "876746465234"
  };
  firebase.initializeApp(config);

  var dataRef = firebase.database();

  

var currentRecipe = {
    title: "",
    instructions: "",
    ingredients: [],
    image: "",

}

// added by spencer
$('#recipeDetails').hide();
var baseURL = "https://spoonacular.com/recipeImages/"
$("#searchedRecipe").on('click', function (event) {

    event.preventDefault();
    var inputItem = $("#user-input").val();
    var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=" + inputItem;
    $.ajax({
        url: queryURL, // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
        method: 'GET', // The HTTP Method
        data: {}, // Additional parameters here
        dataType: 'json',
        error: function (err) { console.log(err); },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "f1DmFEzv4smshk3RQgAed5kwAGr0p1JlMf6jsn8ht3R07iwPwK"); // Enter here your Mashape key
        },
        success: function (response) {
            //clears the recipe table
            $("#recipe").empty();
            // console.log("test", response.results[1]);
            for (var i = 0; i < response.results.length; i++) {
                var recipeTitle = response.results[i].title;
                var recipeID = response.results[i].id;
                var recipeImage = response.results[i].imageUrls;
                // console.log("what is passed to the array", arr[i]);
                addRecipe(recipeTitle, recipeID);
            }
        },
    })
});
function addRecipe(recipeTitle, recipeID) {
    $("#recipe").append('<tr><td class="recipeTitle" data-recipe-id="' + recipeID + '">' + recipeTitle + '</td></tr>');
}
$("body").on("click", ".recipeTitle", function () {

    // added by spencer
    $('#foodCarousel').hide();
    // added by spencer
    currentRecipe.ingredients = [];
    currentRecipe.image = "";
    $('#image').empty();
    $('#ingredientsList').empty();
    $('#recipeDetails').show();

    var recipeID = $(this).attr("data-recipe-id");
    console.log("recipe", recipeID)
    $.ajax({
        url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipeID + "/information",
        method: 'GET',
        data: {},
        dataType: 'json',
        error: function (err) { console.log(err); },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "f1DmFEzv4smshk3RQgAed5kwAGr0p1JlMf6jsn8ht3R07iwPwK"); // Enter here your Mashape key
        },
        success: function (response) {
            for (var i = 0; i < response.extendedIngredients.length; i++) {
                currentRecipe.ingredients.push(response.extendedIngredients[i].name);
                currentRecipe.image = response.image;
                currentRecipe.instructions=response.instructions;
                currentRecipe.title= response.title;
                
                // console.log("ingrediants", response.extendedIngredients[i].name)
            }
            // console.log(response);
            console.log(currentRecipe.ingredients)
            // added by spencer
            $('#title').html("<h1>" + currentRecipe.title + "</h1>");
            for (var i = 0; i < currentRecipe.ingredients.length; i++) {
                $('#ingredientsList').append("<li>" + currentRecipe.ingredients[i] + "</li>");
            }

            $('#image').html("<img src=" + currentRecipe.image +">" + "</img>");
            $('#instructions').text(currentRecipe.instructions);
        }
    })
})

$('#buyIngredients').on('click', function() {
    dataRef.ref().push({
    
        title: currentRecipe.title,
        ingredients: currentRecipe.ingredients,
        // id: recipeID,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
})



//TODO 


