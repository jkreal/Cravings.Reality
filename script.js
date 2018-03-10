var foodItem = [];
var foodId = null;

// on click for sumbit change for loading page
$("#submitPress").on('click', function (event) {
	event.preventDefault();

	var config = {
		apiKey: "AIzaSyAML7xzBjrJan2eVVRSqo1H9idSlUB5gpY",
		authDomain: "recipe-project-24f9b.firebaseapp.com",
		databaseURL: "https://recipe-project-24f9b.firebaseio.com",
		projectId: "recipe-project-24f9b",
		storageBucket: "recipe-project-24f9b.appspot.com",
		messagingSenderId: "876746465234"
	};
	firebase.initializeApp(config);

	dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
		// adding firebase items to variables
		foodItem = snapshot.val().ingredients;
		foodId = snapshot.val().title;

		console.log(foodItem);
		console.log(foodId);
	});
	// onclick food items to pull from api
	$("#itemArray").on("click", function () {
		for (var j = 0; j > foodItem.length; j++) {


			var inputItem = foodItem[j];
			// api url pulling from food only queries
			var queryURL = "http://api.walmartlabs.com/v1/search?query=" + inputItem + "&format=json&apiKey=t4a2y6c96t4m3mffyc4fmvcc&categoryId=976759";

			$.ajax({
				url: queryURL,
				method: "GET",
				crossDomain: true
			}).then(function (response) {
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
		};
	});
});
// function to add items and their attributes to the page
function addItem(thumbNail, foodName, price) {
	$("#addedItems").append("<tr><td><img src='" + thumbNail + "' /></td><td>" + foodName + "</td><td>" + price + "</td></tr>");
};


// SessionStorage.getItem("timeStamp")