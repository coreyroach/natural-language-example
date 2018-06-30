import { version } from '../../package.json';
import { Router } from 'express';
import google from './google';
import watson from './watson';

require('dotenv').config();

export default ({ config, db }) => {
	let api = Router();

	// mount the google resource
	api.use('/google', google({ config, db }));
	api.use('/watson', watson({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
