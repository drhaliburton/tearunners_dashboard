const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment');
const helmet = require('helmet')
const pino = require('pino')()

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(helmet())


const mongodb_conn_module = require('./mongodbConnModule');
let db = mongodb_conn_module.connect();

let Products = require("../models/product");
let Shipments = require("../models/shipment");

let shipment = db.collection('Shipments');


// app.get('/products', (req, res) => {
// 	Products.find({}, function (error, products) {
// 		if (error) { pino.error(error); }
// 		res.send({
// 			products: products
// 		})
// 	}).sort({ _id: -1 })
// })

app.get('/shipments', (req, res) => {
	shipment.find({}).toArray(function (error, shipments) {
		if (error) {
			throw error;
			pino.error(error);
		}
		res.send(shipments);
	});
})

app.post('/shipments', (req, res) => {
	let created_at = moment().format();

	const item = req.body;
	let fulfillments = item.fulfillments[0];
	let subscriptions = fulfillments.order.subscriptions[0];
	let _id = item.id;
	let adjusted_fulfillment_date = fulfillments.adjusted_fulfillment_date;
	let name = fulfillments.instance.product.name;
	let end_date = subscriptions ? subscriptions.end_date : null;
	let autorenew = subscriptions ? subscriptions.autorenew : null;


	shipment.count({ _id }, function (error, results) {
		if (error) {
			throw err
			pino.error(error);
		}

		if (results == 0) {
			if (item.status === 'unshipped') {
				let item = {
					adjusted_fulfillment_date,
					name,
					created_at,
					end_date,
					autorenew,
					_id
				};
				shipment.insertOne(item, function (err, r) {
					if (err) { pino.error(err); }
					pino.info(r);
					res.send({
						success: 1,
						type: 'success'
					});
					pino.info("Shipments Added")
				})
			} else {
				pino.info("Order Already Shipped");
				res.send({
					skipped: 1,
					type: 'skipped'
				});
			}
		} else {
			if (item.status !== 'unshipped') {
				shipment.deleteOne({ _id }, function (error, results) {
					if (error) { pino.error(error); }
					pino.info("Shipment Deleted")
					res.send({ deleted: 1, type: 'deleted' });
				})
			} else {
				pino.info("Shipment Already Exists")
				res.send({ skipped: 1, type: 'skipped' });
			}
		}
	})


});

app.listen(process.env.PORT || 8081)
