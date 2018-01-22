const pino = require('pino')()
const moment = require('moment');


module.exports = {
  buildShipment(item) {
    let created_at = moment().format();

    let fulfillments = item.fulfillments[0];
    let subscriptions = fulfillments.order.subscriptions[0];
    let _id = item.id;
    let adjusted_fulfillment_date = fulfillments.adjusted_fulfillment_date;
    let name = fulfillments.instance.product.name;
    let end_date = subscriptions ? subscriptions.end_date : null;
    let autorenew = subscriptions ? subscriptions.autorenew : null;

    return {
      adjusted_fulfillment_date,
      name,
      created_at,
      end_date,
      autorenew,
      _id
    };
  },
  postShipment(shipment, item) {
    return shipment.insertOne(item, function (err, r) {
      if (err) { pino.error(err); }
      pino.info("Shipments Added")
    })
  },
  deleteShipment(shipment, _id) {
    shipment.deleteOne({ _id }, function (error, results) {
      if (error) { pino.error(error); }
      pino.info("Shipment Deleted")
    })
  }
}