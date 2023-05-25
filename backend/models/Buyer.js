const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	date:{
		type: Date,
		required: false
	},
    contact_number:{
        type: Number,
        required: true
    },
	age:{
		type: Number,
		required: true
	},
    Batch_name:{
        type: String,
        required: true
    },
	Password:{
		type: String,
		required: true
	},
	wallet:{
		type:Number,
		default:0
	}
});

module.exports = Buyer = mongoose.model("Buyers", BuyerSchema);
