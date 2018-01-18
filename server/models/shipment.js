var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ShipmentsSchema = new Schema({
  adjusted_fulfillment_date: Date,
  name: String,
  created_at: Date,
  end_date: Date,
  autorenew: Boolean,
  _id: Number
}, { _id: false }
);

var Shipments = mongoose.model("Shipment", ShipmentsSchema, "Shipment");
module.exports = Shipments;
