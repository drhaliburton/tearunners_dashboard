<template>
  <div class="upcoming-shipments">
    {{this.countUpcomingShipments(shipments)}}

    <div v-for="month in productCount" :key="month.prod_id">
      <div class="title">{{month.title}}</div>

        <tr><div class="row-title">Subscriptions</div></tr>
        <span class="flex-grid">
          <span v-for="item in month.shipments" :key="item.count">
              <DataCell :item="item"></DataCell>
            </span>
        </span>

      <tr><div class="row-title">Renewals</div></tr>
      <span class="flex-grid">
        <span v-for="item in month.renewals" :key="item.count">
            <DataCell :item="item"></DataCell>
          </span>
      </span>

      <div class="row-title total">Totals</div>
      <span class="flex-grid">
        <span v-for="item in month.count" :key="item.count">
            <DataCell :item="item"></DataCell>
          </span>
      </span>

    </div>
  </div>
</template>

<script>
import helpers from "@/services/helpers";
import DataCell from "./partials/DataCell";

export default {
  name: "UpcomingShipments",
  props: ["shipments"],
  components: {
    DataCell
  },
  mounted() {},
  methods: {
    countUpcomingShipments(shipments) {
      let $this = this;
      if (shipments.length) {
        shipments.map(item => {
          if (item.name) {
            let name = item.name.includes("Christmas")
              ? helpers.cleanName(helpers.christmasBox(item.name))
              : helpers.cleanName(item.name);

            if (!name.includes("Test")) {
              let shipmentMonth = helpers.getShipmentMonth(
                item["adjusted_fulfillment_date"]
              );
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
          ? helpers.cleanName(helpers.christmasBox(item.name))
          : helpers.cleanName(item.name);
        let shipmentMonth = helpers.getShipmentMonth(item["end_date"]);

        if (!$this.productCount[shipmentMonth]["renewals"][name]) {
          $this.productCount[shipmentMonth]["renewals"][name] = {
            name,
            count: 1
          };
        } else {
          $this.productCount[shipmentMonth]["renewals"][name].count++;
        }
        this.countProductTotals(shipmentMonth, name);
        helpers.orderKeys($this.productCount[shipmentMonth]["count"]);
        helpers.orderKeys($this.productCount[shipmentMonth]["renewals"]);
        helpers.orderKeys($this.productCount[shipmentMonth]["shipments"]);
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
    }
  },

  data() {
    return {
      productCount: {
        0: {
          title: "January",
          count: {},
          shipments: {},
          renewals: {}
        },
        1: {
          title: "February",
          count: {},
          shipments: {},
          renewals: {}
        },
        2: {
          title: "March",
          count: {},
          shipments: {},
          renewals: {}
        },
        3: {
          title: "April",
          count: {},
          shipments: {},
          renewals: {}
        },
        4: {
          title: "May",
          count: {},
          shipments: {},
          renewals: {}
        },
        5: {
          title: "June",
          count: {},
          shipments: {},
          renewals: {}
        },
        6: {
          title: "July",
          count: {},
          shipments: {},
          renewals: {}
        },
        7: {
          title: "August",
          count: {},
          shipments: {},
          renewals: {}
        },
        8: {
          title: "September",
          count: {},
          shipments: {},
          renewals: {}
        },
        9: {
          title: "October",
          count: {},
          shipments: {},
          renewals: {}
        },
        10: {
          title: "November",
          count: {},
          shipments: {},
          renewals: {}
        },
        11: {
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
