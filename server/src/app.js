const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

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

	Shipments.find({ "prod_id": id }, function (error, results) {
		if (error) { console.error(error); }

		console.log(results, req.body.id);

		if (results[0] == null) {
			if (req.body.fulfillments) {
				req.body.fulfillments.map(item => {
					let adjusted_fulfillment_date = item.adjusted_fulfillment_date;
					let name = item.instance.product.name;
					let prod_id = item.id;
					let data = new Shipments({
						adjusted_fulfillment_date,
						name,
						prod_id
					})
					data.save(function (error) {
						if (error) {
							console.log(error)
							return;
						}
						res.send({
							success: true
						})
					})
				})
			} else {
				console.log(req.body);
			}
		}
	})
});



app.listen(process.env.PORT || 8081)
