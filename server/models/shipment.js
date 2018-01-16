var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ShipmentsSchema = new Schema({
  "adjusted_fulfillment_date": Date,
  "name": String,
  "prod_id": Number
}
);

var Shipments = mongoose.model("Shipment", ShipmentsSchema, "Shipment");
module.exports = Shipments;
