//intiallize data
var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/shopping');

var products = [
new Product({
	title:"nails2",
	imagePath:"22.png",
	description:"nails2",
	price:120
}),
new Product({
	title:"nails3",
	imagePath:"33.png",
	description:"nails3",
	price:130
}),
new Product({
	title:"nails4",
	imagePath:"44.png",
	description:"nails4",
	price:140
}),
new Product({
	title:"nails2",
	imagePath:"22.png",
	description:"nails2",
	price:120
})
]

//save data to database
var done = 0;
for(var i = 0; i < products.length; i++){
	products[i].save(function(err,result){
		done++;
		if(done === products.length){
			exit();
		}
	});
}

function exit(){
	mongoose.disconnect();
}