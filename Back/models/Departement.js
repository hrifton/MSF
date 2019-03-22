const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Departement = new Schema(
	{
		departement: { type: String }
	},
	{
		collection: 'departement'
	}
);

module.exports = mongoose.model('Departement', Departement);
