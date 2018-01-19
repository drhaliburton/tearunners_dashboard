<template>
  <div class="upcoming-shipments">
    {{this.countUpcomingShipments(shipments)}}
      <div v-for="month in productCount" :key="month.prod_id">
        <div class="title">{{month.title}}</div>
          <tr><div class="row-title">Subscriptions</div></tr>
          <span class="flex-grid">
            <span v-for="shipment in month.shipments" v-if="shipment" :key="shipment.name">
              <div class="col">
                <td>
                  <span class="product-name">{{shipment.name}}</span>
                  <br>
                  {{shipment.count}}
                </td>
              </div>
            </span>
          </span>
        <tr><div class="row-title">Renewals</div></tr>
        <span class="flex-grid">
          <span v-for="renewal in month.renewals" v-if="renewal" :key="renewal.name">
            <div class="col">
              <td>
                <span class="product-name">{{renewal.name}}</span>
                <br>
                {{renewal.count}}
              </td>
            </div>
          </span>
        </span>
        <div class="row-title total">Totals</div>
        <span class="flex-grid">
          <span v-for="item in month.count" v-if="item.count" :key="item.count">
            <div class="col">
              <td>
                <span class="product-name">{{item.name}}</span>
                <br>
                {{item.count}}
              </td>
            </div>
          </span>
        </span>
      </div>
  </div>
</template>

<script>
export default {
  name: "UpcomingShipments",
  props: ["shipments"],
  mounted() {},
  methods: {
    countUpcomingShipments(shipments) {
      let $this = this;

      if (shipments.length) {
        shipments.map(item => {
          if (item.name) {
            let name = item.name.includes("Christmas")
              ? item.name.replace(item.name, "Christmas Box")
              : item.name
                  .split(" - ")[0]
                  .replace("Tea Runners ", "")
                  .replace("All ", "");

            if (!name.includes("Test")) {
              let shipmentDate = new Date(item["adjusted_fulfillment_date"]);
              let shipmentMonth = shipmentDate.getMonth();

              if (!$this.productCount[shipmentMonth]["shipments"][name]) {
                $this.productCount[shipmentMonth]["shipments"][name] = {
                  name,
                  count: 1
                };
              } else {
                $this.productCount[shipmentMonth]["shipments"][name].count++;
              }
              this.countProductTotals(shipmentMonth, name);
            }
            $this.countUpcomingRenewals(item);
          }
        });
      }
    },
    countUpcomingRenewals(item) {
      let $this = this;
      if (item.autorenew && !item.name.includes("Test")) {
        let name = item.name.includes("Christmas")
          ? item.name.replace(item.name, "Christmas Box")
          : item.name
              .split(" - ")[0]
              .replace("Tea Runners ", "")
              .replace(" Box ", "")
              .replace("All ", "");
        let shipmentDate = new Date(item["end_date"]);
        let shipmentMonth = shipmentDate.getMonth();
        if (!$this.productCount[shipmentMonth]["renewals"][name]) {
          $this.productCount[shipmentMonth]["renewals"][name] = {
            name,
            count: 1
          };
        } else {
          $this.productCount[shipmentMonth]["renewals"][name].count++;
        }
        this.countProductTotals(shipmentMonth, name);

        this.orderKeys($this.productCount[shipmentMonth]["renewals"]);
        this.orderKeys($this.productCount[shipmentMonth]["shipments"]);
      }
    },
    countProductTotals(shipmentMonth, name) {
      if (!this.productCount[shipmentMonth]["count"][name]) {
        this.productCount[shipmentMonth].count[name] = {
          name,
          count: 1
        };
      } else {
        this.productCount[shipmentMonth]["count"][name].count++;
      }
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
  },

  data() {
    return {
      productCount: {
        11: {
          title: "January",
          count: {},
          shipments: {},
          renewals: {}
        },
        0: {
          title: "February",
          count: {},
          shipments: {},
          renewals: {}
        },
        1: {
          title: "March",
          count: {},
          shipments: {},
          renewals: {}
        },
        2: {
          title: "April",
          count: {},
          shipments: {},
          renewals: {}
        },
        3: {
          title: "May",
          count: {},
          shipments: {},
          renewals: {}
        },
        4: {
          title: "June",
          count: {},
          shipments: {},
          renewals: {}
        },
        5: {
          title: "July",
          count: {},
          shipments: {},
          renewals: {}
        },
        6: {
          title: "August",
          count: {},
          shipments: {},
          renewals: {}
        },
        7: {
          title: "September",
          count: {},
          shipments: {},
          renewals: {}
        },
        8: {
          title: "October",
          count: {},
          shipments: {},
          renewals: {}
        },
        9: {
          title: "November",
          count: {},
          shipments: {},
          renewals: {}
        },
        10: {
          title: "December",
          count: {},
          shipments: {},
          renewals: {}
        }
      }
    };
  }
};
</script>
<style type="text/scss">
.upcoming-shipments {
  padding: 0 2rem 4rem;
  margin: auto;
  margin-bottom: 8rem;
  width: 80%;
  max-width: 800px;
  border: 1px solid #bbbbbb;
  border-radius: 10px;
}
.item {
  width: 100%;
}
.product-name {
  font-weight: 600;
}
.total {
  background-image: linear-gradient(
    to right,
    #bbbbbb 33%,
    rgba(255, 255, 255, 0) 0%
  );
  background-position: bottom;
  background-size: 4px 1px;
  background-repeat: repeat-x;
  margin-bottom: 1rem;
  text-align: left;
}
td {
  text-align: center;
  width: 200px;
  border-bottom: none;
}

tr {
  border-collapse: collapse;
}
.row-title {
  margin: 1.8rem;
}
.flex-grid {
  display: flex;
  flex-wrap: wrap;
  min-height: 5rem;
}
.title {
  display: block;
  text-align: left;
  border-bottom: 1px solid #bbbbbb;
  font-weight: 500;
  margin-top: 2rem;
  padding: 1rem;
  font-size: 1.4rem;
}
.col {
  flex: 2;
}

@media only screen and (max-width: 800px) {
  .col {
    margin: 0 1.3rem;
    width: 100px;
  }
  .flex-grid {
    justify-content: center;
  }
  .upcoming-shipments {
    padding: 0 1rem 1rem;
  }
  .title {
    margin-top: 1rem;
  }
}
</style>
