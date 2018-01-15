var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ShipmentsSchema = new Schema({
  adjusted_fulfillment_date: {
    "type": "Date"
  },
  name: {
    "type": "String"
  }
}
);

var Shipments = mongoose.model("Shipments", ShipmentsSchema);
module.exports = Shipments;
