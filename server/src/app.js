require('dotenv').config();

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const pino = require('pino')();

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

MongoClient.connect(url, (err, client) => {
	if (err) {
		throw error;
		pino.error('Could not connect to the databse');
	}

	const db = client.db(dbName);

	const shipment = db.collection('Shipments');
	const helpers = require('./helpers');

	app.get('/shipments', (req, res) => {
		shipment.find({}).toArray((error, shipments) => {
			if (error) {
				throw error;
				pino.error(error);
			}
			res.send(shipments);
		});
	});

	app.post('/shipments', (req, res) => {
		const item = req.body;
		const _id = item.id;

		shipment.count({ _id }, (error, results) => {
			if (error) {
				throw err;
				pino.error(error);
			}
			const item = req.body;
			const _id = item.id;
			if (results == 0) {
				if (item.status === 'unshipped') {
					const itemObj = helpers.buildShipment(item);

					helpers.postShipment(shipment, itemObj);
					res.send({
						success: 1,
						type: 'success',
					});
				} else {
					pino.info('Order Already Shipped');
					res.send({
						skipped: 1,
						type: 'skipped',
					});
				}
			} else if (item.status !== 'unshipped') {
				helpers.deleteShipment(shipment, item);
				res.send({
					deleted: 1,
					type: 'deleted',
				});
			} else {
				pino.info('Shipment Already Exists');
				res.send({
					skipped: 1,
					type: 'skipped',
				});
			}
		});
	});
	app.listen(process.env.PORT || 8081);
});
