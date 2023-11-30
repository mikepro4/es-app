const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GalaxiesSchema = new Schema({
  messier: String,
  ngc: String,
  objet: String,
  saison: String,
  mag: Number,
  english_name_nom_en_anglais: String,
  french_name_nom_francais: String,
  latin_name_nom_latin: String,
  ra: String,
  dec: String,
  distance: Number,
  dimension: String,
  decouvreur: String,
  annee: String,
  image: String,
  image_url: Object,
  const: String,
});

module.exports = mongoose.model("Galaxy", GalaxiesSchema);
