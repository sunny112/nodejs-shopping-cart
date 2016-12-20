var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//格式JSON 校验：true
var productSchema = new Schema({
	title:{
		type:String,
		required:true
	},
	imagePath:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	price:{
		type:Number,
		required:true
	}
});

module.exports = mongoose.model('Product',productSchema);