let data = require("./data");
const moment = require('moment');


module.exports = {
  countShipments(shipments) {
    let $this = this;
    let result = JSON.parse(JSON.stringify(data.productCount));
    if (shipments.length) {
      let lastSync = shipments[0]["created_at"];
      if (shipments.length) {
        shipments.map(item => {
          if (item.name) {
            if (moment(item.created_at).isAfter(lastSync)) {
              lastSync = item.created_at;
            }
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
              result[shipmentMonth]["count"]["atotal"]["count"] += 1;
              result[shipmentMonth]["shipments"]["atotal"]["count"] += 1;
            }
          }
        });
      }
      return [result, lastSync];
    }
  },
  countRenewals(renewals, shipments) {
    let $this = this;
    let result = shipments;
    let lastSync = false;

    if (renewals.length) {
      renewals.map(item => {
        if (item.autorenew && !item.name.includes("Test")) {
          if (item.created_at) {
            if (!lastSync) {
              lastSync = item.created_at;
            }
            if (moment(item.created_at).isAfter(lastSync)) {
              lastSync = item.created_at;
            }
          }
          let name = item.name.includes("Christmas")
            ? $this.cleanName($this.christmasBox(item.name))
            : $this.cleanName(item.name);
          let shipmentMonth = $this.getRenewalMonth(
            item["end_date"]
          );
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
          result[shipmentMonth]["count"]["atotal"]["count"] += 1;
          result[shipmentMonth]["renewals"]["atotal"]["count"] += 1;
        }
      });
    }
    return [result, lastSync];
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

    let shipmentMonth = month > 11 ? month - 12 : month;
    return shipmentMonth;
  },
  getRenewalMonth(param) {
    let shipmentDate = new Date(param);
    let month = shipmentDate.getMonth() + 1;
    let date = shipmentDate.getDate();
    let shipmentMonth = month > 11 ? month - 12 : month;
    return shipmentMonth;
  }

};