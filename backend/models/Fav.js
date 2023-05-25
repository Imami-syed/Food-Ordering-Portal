const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FavSchema = new Schema({
	bemail: {
		type: String,
		// required: true
	},
	vemail: {
		type: String,
		// required: true
	},
	date:{
		type: Date,
		required: false
	},
	food:{
		type:String,
		// required: true
	}
});

module.exports = Fav = mongoose.model("Fav", FavSchema);
