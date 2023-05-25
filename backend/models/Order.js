const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
    qty: {
		type:Number,
		// required: true
		default:0
	},
	vendorid: {
		type: String
		// ref: 'Vendor'
	},
	date:{
		type: Date,
		required: false
	},
    buyerid:{
		type: String
		// ref: 'Buyer'
    },
	
	orderstatus:{
		type: String,
		default:"Placed"
		// required: true
	},
    shop_name:{
		type: String,
        // required: true
    },
	food_id:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Food'
	},
	itemname:{
		type: String,
        // required: true
    },
	price:{
		type: Number,
        // required: true
    },
	
});

module.exports = Order = mongoose.model("Order", OrderSchema);
