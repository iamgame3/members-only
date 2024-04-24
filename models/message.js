const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  messageTitle: { type: String, required: true, minLength: 1, maxLength: 200 },
  time_stamp: { type: Date, required: true },
  body: { type: String, required: true, minLength: 1, maxLength: 1000 },
  author: { type: Object, ref: "Author", required: true },
});

MessageSchema.virtual("time_stamp_formatted").get(function () {
    return this.time_stamp ? DateTime.fromJSDate(this.time_stamp).toLocaleString(DateTime.DATETIME_MED) : '';
});

module.exports = mongoose.model("Message", MessageSchema);
