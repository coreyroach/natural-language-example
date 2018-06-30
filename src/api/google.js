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
		const language = require('@google-cloud/language');
		const client = new language.LanguageServiceClient();

		https.get(body.url, (response) => {
			let body = '';
			response.on('data', (chunk) => {
				body += chunk
			});
			response.on('end', () => {
				const content = extractor(body);
				const document = {
					content: content.text,
					type: 'PLAIN_TEXT'
				};

				client
					.annotateText({
						document: document,
						features: {
							extractSyntax: false,
							extractEntities: true,
							extractDocumentSentiment: true,
							extractEntitySentiment: true,
							classifyText: true
						}
					})
					.then(results => {
						res.json(results);
					});
			});

		});
	},
});
