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

var arr = [];

$.ajax({
	url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?query=burger', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
	method: 'GET', // The HTTP Method
	data: {}, // Additional parameters here
	dataType: 'json',
	error: function(err) { console.log(err); },
	beforeSend: function(xhr) {
		xhr.setRequestHeader("X-Mashape-Authorization", "f1DmFEzv4smshk3RQgAed5kwAGr0p1JlMf6jsn8ht3R07iwPwK"); // Enter here your Mashape key
	},
	success: function(data) { 
		console.log(data.results[1]);
		for(var i = 0; i < data.results.length; i++) {
			console.log(i);
			arr.push(data.results[i].title);
			console.log(arr[i]);
		} 
	console.log(data);
	},
});

















