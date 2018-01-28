
export default {
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