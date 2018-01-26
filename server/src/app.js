require('dotenv').config()

const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const pino = require('pino')()
const request = require('request');

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
	let subscription = db.collection('Subscriptions');

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
		let params = req.query.next ? req.query.next : '';
		let options = {
			url: 'http://api.cratejoy.com/v1/shipments/' + params,
			headers: {
				'User-Agent': 'request',
				Authorization: process.env.API_AUTH,
			},
		}
		let next = false;
		request.get(options, function (error, response, body) {
			let data = JSON.parse(body);
			for (var item in data.results) {
				let body = JSON.stringify(data.results[item])
				let options = {
					url: 'http://localhost:8081/shipments',
					body
				}
				request.post(options, function (error, response, body) {
					if (error) {
						throw error;
					}
				})
			}
			if (data.next) {
				let options = {
					url: 'http://localhost:8081/api/shipments',
					qs: {
						next: data.next,
					},
				}
				request.get(options, function (error, response, body) {
					if (error) {
						pino.error(error);
					}
				})
			} else {
				res.send({
					success: 1,
					type: 'success'
				})
			}
		})
	})

	app.get('/api/subscriptions', (req, res) => {
		let params = req.query.next ? req.query.next : '';
		let options = {
			url: 'http://api.cratejoy.com/v1/subscriptions/' + params,
			headers: {
				'User-Agent': 'request',
				Authorization: process.env.API_AUTH,
				"Content-Type": "application/json",
			},
		}
		let next = false;
		request.get(options, function (error, response, body) {
			let data = JSON.parse(body);
			for (var item in data.results) {
				let body = JSON.stringify(data.results[item])
				let options = {
					url: 'http://localhost:8081/subscriptions',
					body
				}
				request.post(options, function (error, response, body) {
					if (error) {
						throw error;
					}
				})
			}
			if (data.next) {
				let options = {
					url: 'http://localhost:8081/api/subscriptions',
					qs: {
						next: data.next,
					},
				}
				request.get(options, function (error, response, body) {
					if (error) {
						pino.error(error);
					}
				})
			} else {
				res.send({
					success: 1,
					type: 'success'
				})
			}
		})
	})

	app.post('/shipments', (req, res) => {

		var body = '';
		req.on('data', function (data) { body += data; });
		req.on('end', function (data) {
			req.body = JSON.parse(body);

			const item = req.body;
			let _id = item.id;

			console.log(item, _id);

			shipment.count({ _id }, function (error, results) {
				if (error) {
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
		});
	});



	app.post('/subscriptions', (req, res) => {

		var body = '';
		req.on('data', function (data) { body += data; });
		req.on('end', function (data) {
			req.body = JSON.parse(body);

			const item = req.body;
			let _id = item.id;

			console.log(item, _id);

			subscription.count({ _id }, function (error, results) {
				if (error) {
					pino.error(error);
				}
				const item = req.body;
				let _id = item.id;
				if (results == 0) {
					if (item.status === 'active') {
						let itemObj = helpers.buildSubscription(item);

						helpers.postSubscription(shipment, itemObj);
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
					if (item.status !== 'active') {
						helpers.deleteSubscription(shipment, item);
						res.send({
							deleted: 1,
							type: 'deleted'
						});
					} else {
						pino.info("Subscription Already Exists")
						res.send({
							skipped: 1,
							type: 'skipped'
						});
					}
				}
			})
		});
	});

	app.listen(process.env.PORT || 8081)

});