const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    name: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    songLink: { type: String },
    album: { type: Schema.Types.ObjectId, ref: "Album" },
    hardware: [{ type: Schema.Types.ObjectId, ref: "Hardware" }],
    duration: { type: Number },
});

module.exports = mongoose.model("Track", TrackSchema);
