var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ShipmentsSchema = new Schema({
  "0": {
    "adjusted_ordered_at": {
      "type": "Date"
    },
    "created_at": {
      "type": "Date"
    },
    "customer": {
      "country": {
        "type": "String"
      },
      "email": {
        "type": "String"
      },
      "first_name": {
        "type": "String"
      },
      "id": {
        "type": "Number"
      },
      "last_name": {
        "type": "String"
      },
      "location": {
        "type": "String"
      },
      "name": {
        "type": "String"
      },
      "type": {
        "type": "String"
      }
    },
    "customer_id": {
      "type": "Number"
    },
    "feedback_responses": {
      "type": "Array"
    },
    "fulfillments": {
      "type": [
        "Mixed"
      ]
    },
    "id": {
      "type": "Number"
    },
    "is_gift": {
      "type": "Boolean"
    },
    "is_test": {
      "type": "Boolean"
    },
    "labels": {
      "type": "Array"
    },
    "ship_address": {
      "city": {
        "type": "String"
      },
      "company": {
        "type": "String"
      },
      "country": {
        "type": "String"
      },
      "icon": {
        "type": "String"
      },
      "id": {
        "type": "Number"
      },
      "phone_number": {
        "type": "String"
      },
      "state": {
        "type": "String"
      },
      "status": {
        "type": "Number"
      },
      "status_message": {
        "type": "Mixed"
      },
      "street": {
        "type": "String"
      },
      "to": {
        "type": "String"
      },
      "type": {
        "type": "String"
      },
      "unit": {
        "type": "Date"
      },
      "zip_code": {
        "type": "Date"
      }
    },
    "shipped_at": {
      "type": "Mixed"
    },
    "status": {
      "type": "String"
    },
    "target_at": {
      "type": "Date"
    },
    "tracking_number": {
      "type": "Mixed"
    },
    "type": {
      "type": "String"
    },
    "url": {
      "type": "String"
    }
  }
}
);

var Shipments = mongoose.model("Shipments", ShipmentsSchema);
module.exports = Shipments;
