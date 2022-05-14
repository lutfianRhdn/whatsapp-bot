const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	session: {
		type: Object,
		immune: true,
		default: {},
	},
	refreshToken: {
		type: String,
		default: "",
	},
	createdAt: {
		type: Date,
		immutable: true,
		default: () => Date.now(),
	},
});
UserSchema.options.toJSON = {
	transform: function (doc, ret, options) {
		delete ret._id;
		delete ret.password;
		delete ret.__v;
		delete ret.refreshToken;
		return ret;
	},
};
UserSchema.statics.sayHi = function () {
	console.log("test");
};
module.exports = mongoose.model("User", UserSchema);
