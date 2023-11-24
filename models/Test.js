const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    name: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
        type: String,
        enum: ["unreviewed", "approved", "rejected", "potential"],
        default: "unreviewed"
    },
});

module.exports = mongoose.model("test", TestSchema);
