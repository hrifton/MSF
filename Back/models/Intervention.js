const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Intervention = new Schema(
	{
		departement: { type: String },
		locality: { type: String },
		priority: { type: String },
		day: { type: String },
		description: { type: String },
		status: { type: String }
	},
	{
		collection: 'intervention'
	}
);

module.exports = mongoose.model('Intervention', Intervention);
