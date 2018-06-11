require('dotenv').config();

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const pino = require('pino')()
const request = require('request');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(express.static('public'));

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

let options = {
	socketTimeoutMS: 240000
};

MongoClient.connect(url, options, function (err, client) {
	if (err) {
		throw error;
		pino.error('Could not connect to the databse');
	}

	const db = client.db(dbName);

	let shipment = db.collection('Shipments');
	let subscription = db.collection('Subscriptions');
	let helpers = require("./helpers");
	let datahelpers = require("./datahelpers");



	app.get('/shipments', (req, res) => {

		shipment.find({}).toArray(function (error, shipments) {
			if (error) {
				throw error;
				pino.error(error);
			}
			let shipmentData = datahelpers.countShipments(shipments);
			shipmentsDb = shipments;

			subscription.find({}).toArray(function (error, subscriptions) {
				if (error) {
					throw error;
					pino.error(error);
				}
				if (shipmentData) {
					let subscriptionData = datahelpers.countRenewals(subscriptions, shipmentData[0]);
					res.send({ orders: subscriptionData[0], lastSync: [shipmentData[1], subscriptionData[1]] });
				}
			});
		});
	});



	let prev = '?adjusted_ordered_at__ge=2018-1-15T00:00:00Z';
	let next = false;

	app.get('/api/shipments/', (req, res) => {

		let params = req.query.next ? req.query.next : next ? next : prev;

		let options = {
			url: 'http://api.cratejoy.com/v1/shipments/' + params,
			headers: {
				'User-Agent': 'request',
				Authorization: process.env.API_AUTH,
			},
		}
		pino.info(params);

		if (params) {
			let shipmentsRequest = new Promise((resolve, reject) => {
				shipment.find({}).toArray(function (error, shipments) {
					if (error) {
						reject(error);
						pino.error(error);
					} else {
						resolve(shipments)
					}
				});
			})

			let cratejoyRequest = new Promise((resolve, reject) => {
				request.get(options, (error, response, body) => {
					if (error) {
						if (response.statusCode !== 502) {
							reject(error);
						}
					}
					if (response.statusCode === 200) {
						let data = JSON.parse(body);
						resolve(data);
					}
				})
			})

			Promise.all([cratejoyRequest, shipmentsRequest])
				.then(promiseData => {
					let cratejoyData = promiseData[0];
					let shipmentsDb = promiseData[1];
					let shipmentPromises = [];

					cratejoyData.results.map(item => {
						let cratejoyId = item.id;

						for (var shipment in shipmentsDb) {
							if (shipmentsDb[shipment]["_id"] === cratejoyId) {
								if (item.status !== 'unshipped') {
									let itemObj = helpers.buildShipment(item);
									let deletePromise = helpers.deleteShipment(db.collection('Shipments'), item);
									console.log(deletions);
									shipmentPromises.push(deletePromise);
									break;
								} else {
									let itemObj = helpers.buildShipment(item);
									let updatePromise = helpers.updateShipment(db.collection('Shipments'), itemObj);
									shipmentPromises.push(updatePromise);
									break;
								}
							} else {
								if (item.status === 'unshipped') {
									let itemObj = helpers.buildShipment(item);
									let postPromise = helpers.postShipment(db.collection('Shipments'), itemObj);
									shipmentPromises.push(postPromise);
									break;
								}
							}
						}
					})

					return [shipmentPromises, cratejoyData.next];
				})
				.then(data => {
					let cratejoyNext = data[1];
					if (cratejoyNext) {
						next = cratejoyNext;
					}
					Promise.all(data[0])
						.then(data => {

							if (next) {
								let options = {
									url: process.env.BASE_URL + 'api/shipments/',
									qs: {
										next: next,
									}
								}
								request.get(options, function (error, response, body) {
									if (error) {
										pino.error(error);
									}
								}).end()
							}
						})
				})
				.catch(err => {
					pino.error(err);
				})
		} else {
			res.send({ success: true })
		}
	})

	let subPrev = "?";
	let subNext = false;

	app.get('/api/subscriptions', (req, res) => {
		let params = req.query.next ? req.query.next : subNext ? encodeURIComponent(subNext) : subPrev;
		let options = {
			url: 'http://api.cratejoy.com/v1/subscriptions/' + params,
			headers: {
				'User-Agent': 'request',
				Authorization: process.env.API_AUTH,
			},
		}
		pino.info(params);
		if (params) {

			let subscriptionRequest = new Promise((resolve, reject) => {
				request.get(options, (error, response, body) => {
					if (error) {
						if (response.statusCode !== 502) {
							throw error;
						}
					}
					if (response.statusCode === 200) {
						let data = JSON.parse(body);
						resolve(data);
					}
				})
			})

			subscriptionRequest.then(subscriptionData => {
				subscriptionData.results.map(item => {
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
								helpers.deleteSubscription(subscription, item);
							}
						}
					})
				})
				if (subscriptionData.next) {
					subNext = subscriptionData.next;
					return subscriptionData.next;
				} else {
					subPrev = subNext;
				}
			})
				.then(next => {
					if (next) {
						let query = decodeURIComponent(next);
						let options = {
							url: process.env.BASE_URL + 'api/subscriptions/',
							qs: {
								next: query,
							}
						}
						request.get(options, function (error, response, body) {
							if (error) {
								pino.error(error);
							}
						}).end()
					}
				})
				.catch(err => {
					pino.error(err);
				})
		} else {
			res.send({ success: true })
		}
	})

	const server = app.listen(process.env.PORT || 8081)
	server.timeout = 240000;

});
