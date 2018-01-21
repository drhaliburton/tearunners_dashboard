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

app.post('/shipments', (req, res) => {
	const item = req.body;
	let _id = item.id;

	shipment.count({ _id }, function (error, results) {
		if (error) {
			throw err
			pino.error(error);
		}

		if (results == 0) {
			if (item.status === 'unshipped') {
				let item = helpers.buildShipment(item);

				helpers.postShipment(shipment, item);
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

app.listen(process.env.PORT || 8081)
