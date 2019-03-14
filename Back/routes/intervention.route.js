const express = require('express');
const app = express();
const interventionRoutes = express.Router();

let Intervention = require('../models/Intervention');

interventionRoutes.route('/add').post(function(req, res) {
	let intervention = new Intervention(req.body);

	console.log(intervention);
	intervention
		.save()
		.then((intervention) => {
			res.status(200).json({ business: 'intervention in added successfully' });
		})
		.catch((err) => {
			res.status(400).send('unable to save to database');
		});
});

interventionRoutes.route('/').get(function(req, res) {
	Intervention.find(function(err, interventions) {
		if (err) {
			console.log(err + ' on est la ');
		} else {
			res.json(interventions);
		}
	});
});

module.exports = interventionRoutes;
