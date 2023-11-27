const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShapeSchema = new Schema({
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    name: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
        type: String,
        enum: ["unreviewed", "approved", "rejected", "potential"],
        default: "unreviewed"
    },
    algo: { type: Schema.Types.ObjectId, ref: "Algo" }
});

module.exports = mongoose.model("Shape", ShapeSchema);
