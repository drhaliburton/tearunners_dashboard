let data = require("./data");

module.exports = {
  countShipments(shipments) {
    let $this = this;
    let result = data.productCount;
    if (shipments.length) {
      shipments.map(item => {
        if (item.name) {
          let name = item.name.includes("Christmas")
            ? $this.cleanName($this.christmasBox(item.name))
            : $this.cleanName(item.name);

          if (!name.includes("Test")) {
            let shipmentMonth = $this.getShipmentMonth(
              item["adjusted_fulfillment_date"]
            );

            if (!result[shipmentMonth]["shipments"][name]) {
              result[shipmentMonth]["shipments"][name] = {
                name,
                count: 1,
                id: item.id
              };
            } else {
              result[shipmentMonth]["shipments"][name].count++;
            }
            if (result[shipmentMonth]["count"][name]) {
              result[shipmentMonth]["count"][name]["count"] += 1;
            } else {
              result[shipmentMonth]["count"][name] = {
                name: name,
                count: 1,
                id: item.id
              }
            }
          }
        }
      });
    }
    return result;
  },
  countRenewals(renewals, shipments) {
    let $this = this;
    let result = shipments;
    if (renewals.length) {
      renewals.map(item => {
        if (item.autorenew && !item.name.includes("Test")) {
          let name = item.name.includes("Christmas")
            ? $this.cleanName($this.christmasBox(item.name))
            : $this.cleanName(item.name);
          let shipmentMonth = $this.getShipmentMonth(item["end_date"]);
          if (!result[shipmentMonth]["renewals"][name]) {
            result[shipmentMonth]["renewals"][name] = {
              name,
              count: 1,
              id: item.id
            };
          } else {
            result[shipmentMonth]["renewals"][name].count++;
          }
          if (result[shipmentMonth]["count"][name]) {
            result[shipmentMonth]["count"][name]["count"] += 1;
          } else {
            result[shipmentMonth]["count"][name] = {
              name: name,
              count: 1,
              id: item.id
            }
          }
        }
      });
    }
    return result;
  },
  refresh() {
    window.location.reload()
  },
  getLastCreatedAt(obj) {
    return obj.reduce((a, b) => {
      return a.created_at > b.created_at ? a.created_at : b.created_at
    });
  },
  cleanName(name) {
    return name.split(" - ")[0]
      .replace("Tea Runners ", "")
      .replace("All ", "");
  },
  christmasBox(name) {
    return name.replace(name, "Christmas Box");
  },
  getShipmentMonth(param) {
    let shipmentDate = new Date(param);
    let month = shipmentDate.getMonth() + 1;
    let date = shipmentDate.getDate();

    if (date >= 16) {
      month + 1
    } else {
      month + 2
    }
    let shipmentMonth = month > 11 ? month - 12 : month;
    return shipmentMonth;
  },
  orderKeys(obj, expected) {
    var keys = Object.keys(obj).sort(function keyOrder(k1, k2) {
      if (k1 > k2) return -1;
      else if (k1 < k2) return +1;
      else return 0;
    });

    var i,
      after = {};
    for (i = 0; i < keys.length; i++) {
      after[keys[i]] = obj[keys[i]];
      delete obj[keys[i]];
    }

    for (i = 0; i < keys.length; i++) {
      obj[keys[i]] = after[keys[i]];
    }
    return obj;
  }
};