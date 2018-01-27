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

let options = {
	socketTimeoutMS: 240000
};

MongoClient.connect(url, options, function (err, client) {
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

	let prev = '?adjusted_ordered_at__ge=2018-1-15T00:00:00Z';

	app.get('/api/shipments', (req, res) => {
		let next = false;
		let retry = false;
		let params = req.query.next ? req.query.next : prev;
		let options = {
			url: 'http://api.cratejoy.com/v1/shipments/' + params,
			headers: {
				'User-Agent': 'request',
				Authorization: process.env.API_AUTH,
			},
		}
		if (params == "?adjusted_ordered_at__ge=2018-1-15T00:00:00Z" || req.query.next) {
			request.get(options, (error, response, body) => {
				if (response.statusCode === 200) {
					let data = JSON.parse(body);
					data.results.map(item => {
						let _id = item.id;
						let count = shipment.count({ _id })
						count.then(results => {
							if (results == 0) {
								if (item.status === 'unshipped') {
									let itemObj = helpers.buildShipment(item);
									let posted = helpers.postShipment(shipment, itemObj);
									posted.then(result => {
										return result
									});
								} else {
									pino.info('Skipped: ', item.status);
								}
							} else {
								if (item.status !== 'unshipped') {
									let deleted = helpers.deleteShipment(shipment, item);
									deleted.then(result => {
										return result
									});
								} else {
									pino.info("Order already exists")
									// let updated = helpers.updateShipment(shipment, item);
									// updated.then(results)
								}
							}
						})
					})
					if (data.next) {
						next = data.next;
					}
				} else {
					retry = true;
				}
				if (next && !retry) {
					prev = next;

					let options = {
						url: process.env.BASE_URL + 'api/shipments',
						qs: {
							next: next,
						}
					}
					setTimeout(function () {
						request.get(options, function (error, response, body) {
							if (error) {
								pino.error(error);
							}
						}).end()
					}, 1000)

				} else {
					console.log('retry', prev);
					let options = {
						url: process.env.BASE_URL + 'api/shipments',
						qs: {
							next: prev,
						}
					}
					request.get(options, function (error, response, body) {
						if (error) {
							pino.error(error);
						}
					}).end()
				}
			}).end()
		} else {
			next = prev;
			console.log("SKIPPED ERR", prev)
		}
	})



	app.get('/api/subscriptions', (req, res) => {
		let params = req.query.next ? req.query.next : '';
		let options = {
			url: 'http://api.cratejoy.com/v1/subscriptions/' + params,
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
					url: process.env.BASE_URL + 'subscriptions/',
					body,
					agentOptions: {
						ciphers: 'DES-CBC3-SHA'
					}
				}
				request.post(options, function (error, response, body) {
					if (error) {
						console.error(error)
					}
				})
			}
			if (data.next) {
				let options = {
					url: process.env.BASE_URL + 'api/subscriptions',
					qs: {
						next: data.next,
					},
					headers: {
						'accept-encoding': 'gzip, deflate'
					}
				}
				setTimeout(function () {
					request.get(options, function (error, response, body) {
						if (error) {
							pino.error(error);
						}
					})
				}, 50)
			} else {
				res.send({
					success: 1,
					type: 'success'
				})
			}
		})
	})


	app.post('/shipments', (req, res) => {

	});



	app.post('/subscriptions', (req, res) => {

		var body = '';
		req.on('data', function (data) { body += data; });
		req.on('end', function (data) {
			req.body = JSON.parse(body);

			const item = req.body;
			let _id = item.id;

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

	const server = app.listen(process.env.PORT || 8081)
	server.timeout = 240000;

});