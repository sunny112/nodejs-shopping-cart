var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//格式JSON 校验：true
var orderSchema = new Schema({
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	cart: {type: Object, required: true},
	name: {type: String, required: true}
});

module.exports = mongoose.model('Order',orderSchema);