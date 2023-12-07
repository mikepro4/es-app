const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeneratorSchema = new Schema({
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    name: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
});

module.exports = mongoose.model("Generator", GeneratorSchema);
