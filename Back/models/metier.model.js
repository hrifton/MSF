const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Metier = new Schema(
	{
		metier: { type: String },
		descriptif: { type: String }
	},
	{
		collection: 'metiers'
	}
);

module.exports = mongoose.model('Metier', Metier);
