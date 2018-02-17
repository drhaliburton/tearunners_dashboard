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

			subscription.find({}).toArray(function (error, subscriptions) {
				if (error) {
					throw error;
					pino.error(error);
				}
				let subscriptionData = datahelpers.countRenewals(subscriptions, shipmentData[0]);
				res.send({ orders: subscriptionData[0], lastSync: [shipmentData[1], subscriptionData[1]] });
			});
		});
	});



	let prev = '?adjusted_ordered_at__ge=2018-1-15T00:00:00Z';
	let next = false;

	app.get('/api/shipments/', (req, res) => {
		let params = req.query.next ? req.query.next : next ? encodeURIComponent(next) : prev;
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

			shipmentsRequest.then(shipmentData => {
				shipmentData.results.map(item => {
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
								console.log(item.status)
								helpers.deleteShipment(shipment, item);
							}
						}
					})
				})
				if (shipmentData.next) {
					let next = shipmentData.next;
					return shipmentData.next;
				} else {
					prev = next;
				}
			})
				.then(next => {
					if (next) {
						let query = decodeURIComponent(next);
						let options = {
							url: process.env.BASE_URL + 'api/shipments/',
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

	let subPrev = "";
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
								console.log(item.status)
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
