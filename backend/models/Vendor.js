const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
	Manager_name: {
		type: String,
		required: true
	},
	Shop_name: {
		type: String,
		// required: true
	},
	date:{
		type: Date,
		required: false
	},
    contact_number:{
        type: String,
        // required: true
    },
	open_time:{
		type: String,
		// required: true
	},
    close_time:{
		type: String,
		// required: true
	},
    email:{
        type: String,
        required: true
    },
	Password:{
		type: String,
		required: true
	}
});

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
