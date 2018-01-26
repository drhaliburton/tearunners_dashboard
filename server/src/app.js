require('dotenv').config()

const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const pino = require('pino')()
const fetch = require('fetch');


const app = express()
app.use(express.static('public'));

app.use(bodyParser.json())
app.use(cors())
app.use(helmet())

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

MongoClient.connect(url, function (err, client) {
	if (err) {
		throw error;
		pino.error("Could not connect to the databse");
	}

	const db = client.db(dbName);

	let shipment = db.collection('Shipments');
	let helpers = require("./helpers");

	app.get('/shipments', (req, res) => {
		shipment.find({}).toArray(function (error, shipments) {
			if (error) {
				throw error;
				pino.error(error);
			}
			res.send(shipments);
		});
	})

	app.get('/api/shipments', (req, res) => {

		let options = {
			headers: {
				Authorization: process.env.API_AUTH,
				"Content-Type": "application/json",
			}
		};

		let apiUrl = 'http://api.cratejoy/v1/shipments/';
		fetch(apiUrl, options)
			.then(function (response) {
				// if (response.status == 502) {
				// 	setTimeout(function () {
				// 		$this.fetchShippingDetails($this.next);
				// 	}, 10000);
				// } else {
				return response.json();
				// }
			})
			.then(data => {
				const item = req.body;
				let _id = item.id;
				data.results.map(item => {
					shipment.count({ _id }, function (error, results) {
						if (error) {
							throw err
							pino.error(error);
						}
						const item = req.body;
						let _id = item.id;
						if (results == 0) {
							if (item.status === 'unshipped') {
								let itemObj = helpers.buildShipment(item);

								helpers.postShipment(shipment, itemObj);
								res.send({
									success: 1,
									type: 'success'
								});
							} else {
								pino.info("Order Already Shipped");
								res.send({
									skipped: 1,
									type: 'skipped'
								});
							}
						} else {
							if (item.status !== 'unshipped') {
								helpers.deleteShipment(shipment, item);
								res.send({
									deleted: 1,
									type: 'deleted'
								});
							} else {
								pino.info("Shipment Already Exists")
								res.send({
									skipped: 1,
									type: 'skipped'
								});
							}
						}
					})
				})
			})
	})


	app.post('/shipments', (req, res) => {


	});
	app.listen(process.env.PORT || 8081)

});