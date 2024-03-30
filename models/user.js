const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, minLength: 1, maxLength: 20 },
  last_name: { type: String, required: true, minLength: 1, maxLength: 20 },
  user_name: { type: String, required: true, minLength: 1, maxLength: 20 },
  password: { type: String, required: true },
  is_member: { type: Boolean, required: true },
  is_admin: { type: Boolean, required: true },
});

module.exports = mongoose.model("User", UserSchema);