import resource from 'resource-router-middleware';

const extractor = require('unfluff');
const https = require('https');

export default ({ config, db }) => resource({
	/** GET / - List all entities */
	index({ params }, res) {
		res.status(200).json(params);
	},

	// /** POST / - Create a new entity */
	create({ body }, res) {
		const NLUV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
		const nlu = new NLUV1({
			username: process.env.WATSON_USER,
			password: process.env.WATSON_PASS,
			version: '2018-03-16'
		});

		const parameters = {
			url: body.url,
			features: {
				entities: {
					sentiment: true
				},
				concepts: {
					// limit: 3
				},
				keywords: {
					sentiment: true,
					emotion: true
				}
			}
		};

		nlu.analyze(parameters, (err, response) => {
			if (err) {
				res.status(500).json(err);
			} else {
				res.status(200).json(response);
			}
		});
	},
});
