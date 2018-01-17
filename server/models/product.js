var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({

}
);

var Products = mongoose.model("Product", ProductSchema);
module.exports = Products;
