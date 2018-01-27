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

	app.get('/subscriptions', (req, res) => {
		subscription.find({}).toArray(function (error, subscriptions) {
			if (error) {
				throw error;
				pino.error(error);
			}
			res.send(subscriptions);
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
									helpers.postShipment(shipment, itemObj);
								}
							} else {
								if (item.status !== 'unshipped') {
									helpers.deleteShipment(shipment, item);
								}
							}
						})
					})
					if (data.next) {
						next = data.next;
					} else {
						next = false;
					}
				} else {
					retry = true;
				}
				if (next && !retry) {
					prev = next;
					pino.info(next);

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

				} else if (retry) {
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
			if (next) {
				next = prev;
				console.log("SKIPPED ERR", prev)
			} else {
				res.send({ success: true })
			}
		}
	})

	let subPrev = "";

	app.get('/api/subscriptions', (req, res) => {
		let next = false;
		let retry = false;
		let params = req.query.next ? req.query.next : "?status__eq=2";
		let options = {
			url: 'http://api.cratejoy.com/v1/subscriptions/' + params,
			headers: {
				'User-Agent': 'request',
				Authorization: process.env.API_AUTH,
			},
		}
		if (params == "?status__eq=2" || req.query.next) {
			request.get(options, (error, response, body) => {
				if (response.statusCode === 200) {
					let data = JSON.parse(body);
					data.results.map(item => {
						let _id = item.id;
						let count = subscription.count({ _id })
						count.then(results => {
							if (results == 0) {
								if (item.status === 'active') {
									let itemObj = helpers.buildSubscription(item);
									helpers.postSubscription(subscription, itemObj);
								}
							} else {
								if (item.status !== 'active') {
									helpers.deleteSubscription(shipment, item);
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
					subPrev = next;
					pino.info(next)

					let options = {
						url: process.env.BASE_URL + 'api/subscriptions',
						qs: {
							next: next,
						}
					}
					request.get(options, function (error, response, body) {
						if (error) {
							pino.error(error);
						}
					}).end()

				} else if (retry) {
					console.log('retry', subPrev);
					let options = {
						url: process.env.BASE_URL + 'api/subscriptions',
						qs: {
							next: subPrev,
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
			if (next) {
				next = subPrev;
				console.log("SKIPPED ERR", subPrev)
			} else {
				res.send({ success: true })
			}
		}
	})



	const server = app.listen(process.env.PORT || 8081)
	server.timeout = 240000;

});