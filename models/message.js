const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 200 },
  time_stamp: { type: Date, required: true },
  body: { type: String, required: true, minLength: 1, maxLength: 1000 },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
});

MessageSchema.virtual("time_stamp_formatted").get(function () {
    return this.time_stamp ? DateTime.fromJSDate(this.time_stamp).toLocaleString(DateTime.DATE_MED) : '';
});

module.exports = mongoose.model("Message", MessageSchema);
