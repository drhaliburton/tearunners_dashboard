var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  "0": {
    "base_term_prices": {
      "type": [
        "Mixed"
      ]
    },
    "billing": {
      "id": {
        "type": "Number"
      },
      "rebill_day": {
        "type": "Number"
      },
      "rebill_months": {
        "type": "Number"
      },
      "rebill_weeks": {
        "type": "Mixed"
      },
      "rebill_window": {
        "type": "Number"
      },
      "store_id": {
        "type": "Number"
      },
      "type": {
        "type": "String"
      }
    },
    "deleted": {
      "type": "Boolean"
    },
    "description": {
      "type": "String"
    },
    "flat_ship_price": {
      "type": "Number"
    },
    "gift_shipping": {
      "type": "Number"
    },
    "gift_term_prices": {
      "type": [
        "Mixed"
      ]
    },
    "gift_terms": {
      "type": [
        "Mixed"
      ]
    },
    "giftable": {
      "type": "Boolean"
    },
    "giftinstances": {
      "type": [
        "Mixed"
      ]
    },
    "has_subscribers": {
      "type": "Boolean"
    },
    "id": {
      "type": "Number"
    },
    "images": {
      "type": [
        "Mixed"
      ]
    },
    "instances": {
      "type": [
        "Mixed"
      ]
    },
    "listed": {
      "type": "Boolean"
    },
    "meta": {},
    "metadata": {
      "type": "Array"
    },
    "name": {
      "type": "String"
    },
    "product_billing_id": {
      "type": "Number"
    },
    "product_type": {
      "type": "String"
    },
    "reviewable": {
      "type": "Boolean"
    },
    "rulesets": {
      "type": "Array"
    },
    "ruletypes": {
      "ruletypes": {
        "type": [
          "Array"
        ]
      }
    },
    "ship_option": {
      "type": "String"
    },
    "ship_weight": {
      "type": "Number"
    },
    "single_purchasable": {
      "type": "Boolean"
    },
    "sku": {
      "type": "String"
    },
    "slug": {
      "type": "String"
    },
    "store_id": {
      "type": "Number"
    },
    "subscription_types": {
      "type": [
        "Mixed"
      ]
    },
    "taxonomy": {
      "type": "Array"
    },
    "type": {
      "type": "String"
    },
    "url": {
      "type": "String"
    },
    "variants": {
      "type": "Array"
    },
    "visible": {
      "type": "Boolean"
    }
  }
}
);

var Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
