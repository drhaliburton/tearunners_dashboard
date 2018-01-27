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
  async postShipment(shipment, item) {
    let results = await shipment.insertOne(item, function (err, r) {
      if (err) {
        pino.error(err);
        setTimeout(function () { return }, 10000);
      }
      pino.info("Shipment Added")
    })
    return results;
  },
  async updateShipment(shipment, item) {
    let results = await shipment.findOneAndUpdate({ _id: item.id }, item, { maxTimeMS: 240000 }, function (error, results) {
      if (error) {
        pino.error(error);
        setTimeout(function () { return }, 10000);
      }
      pino.info("Shipment Updated")
    })
    return results;
  },
  async deleteShipment(shipment, item) {
    let results = shipment.deleteOne({ _id: item.id }, function (error, results) {
      if (error) {
        pino.error(error);
        setTimeout(function () { return }, 10000);
      }
      pino.info(results.deletedCount + " Shipment Deleted")
    })
    return results;
  },
  buildSubscription(item) {
    let [_id, autorenew, end_date, start_date, status] = [item.id, item.autorenew, item.end_date, item.start_date, item.status];
    return {
      autorenew, end_date, start_date, status, _id
    };
  },
  postSubscription(subscription, item) {
    return subscription.insertOne(item, function (err, r) {
      if (err) {
        pino.error(err);
        setTimeout(function () { return }, 10000);
      }
      // pino.info("Subscriptions Added")
    })
  },
  deleteSubscription(subscription, item) {
    return subscription.deleteOne({ _id: item.id }, function (error, results) {
      if (error) {
        pino.error(error);
        setTimeout(function () { return }, 10000);
      }
      // pino.info("Subscription Deleted")
    })
  }
}


