//intiallize data
var Product = require('../models/product');
var mongoose = require('mongoose');
var mongodbUri = 'mongodb://root:1234@ds141118.mlab.com:41118/shopping';
mongoose.connect(mongodbUri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {

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
});

function exit(){
	mongoose.disconnect();
}