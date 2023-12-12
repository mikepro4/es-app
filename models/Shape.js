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
    default: "unreviewed",
  },
  algo: { type: Schema.Types.ObjectId, ref: "Algo" },
  track: { type: Schema.Types.ObjectId, ref: "Track" },
  imageLink: { type: String },
  params: Object,
  genesis: Boolean,
  origin: { type: Schema.Types.ObjectId, ref: "Shape" },
  iteration: Boolean,
  inCollection: Boolean,
  tiers: [
    {
      tier: { type: Schema.Types.ObjectId, ref: "Tier" },
      tierLetter: String,
    }
  ],
  iterationsUnverified: Number,
  iterationsVerified: Number,
  iterationsRejected: Number
});


// Single field index
ShapeSchema.index({ 'track': 1 });

// Compound index
ShapeSchema.index({ 'origin': 1, 'status': 1 });

// For fields used in sorting
ShapeSchema.index({ 'createdAt': -1 });

// For fields used in $lookup
ShapeSchema.index({ 'algo': 1 });

ShapeSchema.index({ 'origin': 1 });
ShapeSchema.index({ 'genesis': 1 });
ShapeSchema.index({ 'inCollection': 1 });

ShapeSchema.index({ 'iterationsUnverified': 1 });
ShapeSchema.index({ 'iterationsVerified': 1 });
ShapeSchema.index({ 'iterationsRejected': 1 });


// For fields used in $match
ShapeSchema.index({ 'status': 1, 'iteration': 1 });

// Text index for string searches
ShapeSchema.index({ 'name': 'text' });

module.exports = mongoose.model("Shape", ShapeSchema);
