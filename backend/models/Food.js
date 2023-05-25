const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FoodSchema = new Schema({
	name: {
		type: String,
		// required: true
	},
	email:{
		type: String,
	},
	date:{
		type: Date,
	},
	price: {
		type: Number,
		// required: true
	},
	rating:{
		type: Number,
		// required: false
	},
    vornv:{
        type: String,
        // required: true
    },
	canteenname:{
		type: String,
	}

});

module.exports = Food = mongoose.model("Foods", FoodSchema);
