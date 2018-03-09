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

var recipeTitle = [];
var recipeID = [];
var recipeImage = [];
$("#searchedItem").on('click', function (event) {
	event.preventDefault();
	var inputItem = $("#user-input").val();
	var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=" + inputItem;
	$.ajax({
		url: queryURL , // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
		method: 'GET', // The HTTP Method
		data: {}, // Additional parameters here
		dataType: 'json',
		error: function (err) { console.log(err); },
		beforeSend: function (xhr) {
			xhr.setRequestHeader("X-Mashape-Authorization", "f1DmFEzv4smshk3RQgAed5kwAGr0p1JlMf6jsn8ht3R07iwPwK"); // Enter here your Mashape key
		},
		success: function (response) {
			var result = response.results
			console.log("test", response.results[1]);
			for (var i = 0; i < result.length; i++) {
				recipeTitle.push(result[i].title);
				recipeID.push(result[i].id);
				recipeImage.push(result[i].imageUrls)
				// console.log("what is passed to the array", arr[i]);
			}
			console.log("all data",response);
			console.log(recipeTitle)
			console.log(recipeID)
			console.log(recipeImage)
			
		},
		function()
	})});















