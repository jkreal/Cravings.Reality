// t4a2y6c96t4m3mffyc4fmvccs


$("#submitPress").on('click', function (event) {
	event.preventDefault();
	var inputItem = $("#user-input").val();
	var queryURL = "http://api.walmartlabs.com/v1/search?query=" + inputItem + "&format=json&apiKey=t4a2y6c96t4m3mffyc4fmvcc";
	console.log(queryURL);
	$.ajax({
		url: queryURL,
		method: "GET",
		crossDomain: true
	}).then(function (response) {
		console.log("response", response);
		var results = response.items;
		for (var i = 0; i < results.length; i++) {
				var price = results[i].salePrice;
				var foodName = results[i].name;
				var thumbNail = results[i].imageEntities[0].thumbnailImage;
				addItem(thumbNail, foodName, price);
		}
	}


		);

});

function addItem(thumbNail, foodName, price) {
	$("#addedItems").append("<tr><td><img src='" + thumbNail + "' /></td><td>" + foodName + "</td><td>" + price + "</td></tr>");
};


// work on array error thumbnail
// use food only products