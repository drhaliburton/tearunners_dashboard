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
    let _id = item._id;
    delete item._id

    let result = new Promise((resolve, reject) => {
      shipment.replaceOne({ _id: _id }, item, { upsert: true }, function (err, r) {
        if (err) {
          pino.error(err);
          reject(error)
        } else {
          pino.info("Shipment Added", r);
          resolve(r);
        }
      })
    })
    return result;


    // shipment.insertOne(item, function (err, r) {
    //   if (err) { pino.error(err); }
    //   pino.info("Shipment Added", r)
    // })
  },
  updateShipment(shipment, item) {

    let result = new Promise((resolve, reject) => {
      shipment.findOneAndUpdate({ _id: item._id },
        {
          $set: { "end_date": item.end_date },
          $set: { "subscriptions": item.subscriptions },
          $set: { "fulfillments": item.fulfillments },
          $set: { "adjusted_fulfillment_date": item.adjusted_fulfillment_date },
          $set: { "autorenew": item.autorenew }
        }, function (error, results) {
          if (error) {
            pino.error(error);
            reject(error);
          } else {
            pino.info("Shipment Updated", results.ok)
            resolve(results);
          }
        })
    })
    return result;

  },
  deleteShipment(shipment, item) {
    let result = new Promise((resolve, reject) => {
      shipment.deleteOne({ _id: item.id }, function (error, results) {
        if (error) {
          reject(error);
          pino.error(error);
        } else {
          pino.info(results.deletedCount + " Shipment Deleted")
          resolve(results);
        }
      })
    })
    return result;
  },
  buildSubscription(item) {
    let created_at = moment().format();
    let [_id, autorenew, end_date, start_date, status, name] = [item.id, item.autorenew, item.end_date, item.start_date, item.status, item.product.name];
    return {
      autorenew, end_date, start_date, status, _id, name, created_at
    };
  },
  postSubscription(subscription, item) {
    subscription.insertOne(item, function (err, r) {
      if (err) { pino.error(err); }
      pino.info("Subscriptions Added")
    })
  },
  deleteSubscription(subscription, item) {
    subscription.deleteOne({ _id: item.id }, function (error, results) {
      if (error) { pino.error(error); }
      pino.info(results.deletedCount + " Subscription Deleted")
    })
  }
}


