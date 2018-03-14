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

$(document).ready(function () {

	var foodItem = [];
	var foodId = null;

	// on click for sumbit change for loading page
	function findingItems(event) {

		dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
			// adding firebase items to variables
			foodItem = snapshot.val().ingredients;
			foodId = snapshot.val().title;
			console.log("line 24 snap", snapshot.val().ingredients);
			console.log(foodItem);
			console.log(foodId);
			appendItems();
		});
		// onclick food items to pull from api
		$(document).on("click", ".arrayItems", function () {

			var loadingImg = $("<div>");
			loadingImg.text('loading...');
			$("#addedItems").append(loadingImg);

			var inputItem = $(this).text();
			// api url pulling from food only queries
			var queryURL = "http://api.walmartlabs.com/v1/search?query=" + inputItem + "&format=json&apiKey=t4a2y6c96t4m3mffyc4fmvcc&categoryId=976759";

			console.log(queryURL);
			$.ajax({
				url: queryURL,
				method: "GET",
				crossDomain: true
			}).then(function (response) {
				$('#addedItems').html("");
				// adding 10 results from the api in this variable
				var results = response.items;
				// loop through all 10 items to grab info individualy
				for (var i = 0; i < results.length; i++) {
					var price = results[i].salePrice;
					var foodName = results[i].name;
					var thumbNail = results[i].thumbnailImage;
					// running function to add items and their attributes to the page
					addItem(thumbNail, foodName, price);
				}
			}

			);
		});
	};
	// function to add items and their attributes to the page
	findingItems();

	function addItem(thumbNail, foodName, price) {
		$("#addedItems").append("<tr><td><img src='" + thumbNail + "' /></td><td>" + foodName + "</td><td>" + price + "</td></tr><br>");
	};

	function appendItems() {
		for (var l = 0; l < foodItem.length; l++) {
			console.log("food Items", foodItem[l]);
			$("#recipeList").append("<p class='arrayItems'>" + foodItem[l] + "</p>");
		};
	};
});


// add title to recipe
// add hover color to the items to select on the cernter console
// add items to list colume
// add button to purchase items at walmart