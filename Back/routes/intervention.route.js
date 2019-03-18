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

interventionRoutes.route('/update/:id').put(function(req, res) {
	console.log('********REQ************');
	console.log(req.body.id);
	Intervention.findByIdAndUpdate(req.body.id, req.body, { new: true }, (err, intervention) => {
		// Handle any possible database errors
		if (err) return res.status(500).send(err);
		return res.send(intervention);
	});
	/*
	Intervention.findById(req.body.id, function(err, next, intervention) {
		result = res.send(next.body);
		if (!result) {
			console.log('intervention is false');
			return next(new Error('Could not load Document'));
		} else {
			intervention = req.body;
			console.log('**************************');
			console.log(intervention);
			console.log('++++++++++++++++++++++++++++++');
			console.log(result);
			intervention.save()
				.then((intervention) => {
					res.json('Update complete');
				})
				.catch((err) => {
					res.status(400).send('unable to update the database');
				});
		}
	});
*/
});

module.exports = interventionRoutes;
