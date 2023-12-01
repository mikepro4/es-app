const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlgoSchema = new Schema({
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    name: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    slug: { type: String },
    default: { type: Boolean, default: false },
    params: [Object],
    code: Object,
    input: [Object]
});

module.exports = mongoose.model("Algo", AlgoSchema);
