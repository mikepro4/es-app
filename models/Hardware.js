const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HardwareSchema = new Schema({
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    name: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    imageLink: { type: String }
});

module.exports = mongoose.model("Hardware", HardwareSchema);
