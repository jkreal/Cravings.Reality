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
			appendItems();
		});
		// onclick food items to pull from api
		$(document).on("click", ".arrayItems", function () {
			var loadingImg = $("<div>");
			loadingImg.text('loading...');
			$("#addedItems").append(loadingImg);

			$(this).addClass("animated tada");
			setTimeout(function() {
				$(this).removeClass("animated tada");
			}, 300);

			var inputItem = $(this).text();
			// api url pulling from food only queries
			var queryURL = "https://api.walmartlabs.com/v1/search?query=" + inputItem + "&format=json&apiKey=t4a2y6c96t4m3mffyc4fmvcc&categoryId=976759";
			$.ajax({
				url: queryURL,
				method: "GET",
				crossDomain: true
			}).then(function (response) {
				$('#addedItems').html("");
				// adding 10 results from the api in this variable
				var results = response.items;
				// loop through all 10 items to grab info individualy
				console.log(results)
				for (var i = 0; i < results.length; i++) {
					var price = results[i].salePrice;
					var foodName = results[i].name;
					var thumbNail = results[i].thumbnailImage;
					var itemId = results[i].itemId;

					// running function to add items and their attributes to the page
					addItem(thumbNail, foodName, price, itemId);
				}
			}

			);
		});
	};
	// function to add items and their attributes to the page
	findingItems();

	function addItem(thumbNail, foodName, price, itemId) {
		$("#addedItems").append("<tr class = 'foodName' data-itemid=" + itemId + "><td><img src='" + thumbNail + "' /></td><td>" + foodName + "</td><td>" + price + "</td></tr>");
	};
	function appendItems() {
		for (var l = 0; l < foodItem.length; l++) {
			$("#recipeList").append("<p class='arrayItems'>" + foodItem[l] + "</p>");
		};
	};
});

$(document).on("click", ".foodName", function () {
	foodName = this;
	
	$("#addedList").append(foodName);

	$(this).addClass('animated pulse');
	//wait amount of time
	setTimeout(function(){
		$(this).removeClass('animated ' + animation)
	}, 300);

});

$(document).on("click", "#recipeList", function() {
	$(this).addClass('animated pulse');
	setTimeout(function() {
		$(this).removeClass('animated pulse');
		$(this).hide();
	}, 300);
});
