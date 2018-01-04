const mongoose = require("mongoose");
const Schema = mongoose.Schema;
console.log("models/User.js");
//create Schema:
const UserSchema = new Schema({
	"name":{
		type:String,
		required:true,
	},
	"email":{
		type:String,
		required:true,
	},
	"password":{
		type:String,
		required:true,
	},
	"date":{
		type:Date,
		default:Date.now,
	}
});

mongoose.model("Users",UserSchema);