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
			res.status(200).json({ intervention: 'intervention in added successfully' });
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

interventionRoutes.route('/update/:id').post(function(req, res) {
	intervention.findById(req.params.id, function(err, next, intervention) {
		if (!intervention) return next(new Error('Could not load Document'));
		else {
			intervention.departement = req.body.departement;
			intervention.locality = req.body.locality;
			intervention.priority = req.body.priority;
			intervention.day = req.body.day;
			intervention.description = req.body.description;
			intervention.status = req.body.status;
			intervention.type = req.body.type;

			intervention
				.save()
				.then((intervention) => {
					res.json('Update complete');
				})
				.catch((err) => {
					res.status(400).send('unable to update the database');
				});
		}
	});
});

module.exports = interventionRoutes;
