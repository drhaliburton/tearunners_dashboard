const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const moment = require('moment');


const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
let db = mongodb_conn_module.connect();

let Products = require("../models/product");
let Shipments = require("../models/shipment");


app.get('/products', (req, res) => {
	Products.find({}, function (error, products) {
		if (error) { console.error(error); }
		res.send({
			products: products
		})
	}).sort({ _id: -1 })
})

app.get('/shipments', (req, res) => {
	Shipments.find({}, function (error, shipments) {
		if (error) { console.error(error); }
		res.send({
			shipments: shipments
		})
	}).sort({ _id: -1 })
})

app.post('/shipments', (req, res) => {
	const db = req.db;
	let id = req.body.id;


	Shipments.findById(req.body.id, function (error, results) {
		if (error) { console.error(error); }
		if (!results) {
			req.body.fulfillments.map(item => {
				if (req.body.status === 'unshipped') {
					let adjusted_fulfillment_date = item.adjusted_fulfillment_date;
					let name = item.instance.product.name;
					let _id = req.body.id;
					let created_at = moment().format();
					let end_date = item.order.subscriptions[0].end_date ? item.order.subscriptions[0].end_date : null;
					let autorenew = item.order.subscriptions[0].autorenew ? item.order.subscriptions[0].autorenew : null;

					console.log(req.body.id, end_date, autorenew);

					let data = new Shipments({
						adjusted_fulfillment_date,
						name,
						created_at,
						end_date,
						autorenew,
						_id
					})
					data.save(function (error) {
						if (error) {
							console.error(error)
							return;
						}
						console.log("Shipment Added: ", 'id: ' + req.body.id, 'status: ' + req.body.status)
						res.send({
							success: true
						})
					})
				} else {
					console.log("Shipment Already Shipped: ", 'id: ' + req.body.id, 'status: ' + req.body.status)
					res.send({
						skipped: true
					})
				}
			})
		} else {
			if (req.body.status !== 'unshipped') {
				Shipments.remove({
					_id: req.body.id
				}, function (err, post) {
					if (err) {
						res.send(err)
						console.error(error)
					}
					console.log("Shipment Deleted: ", 'id: ' + req.body.id, 'status: ' + req.body.status)
					res.send({
						deleted: true
					})
				})
			} else {
				console.log("Shipment Already Exists: ", 'id: ' + req.body.id, 'status: ' + req.body.status)
				res.send({
					skipped: true
				})
			}
		}
	})


});

app.listen(process.env.PORT || 8081)
