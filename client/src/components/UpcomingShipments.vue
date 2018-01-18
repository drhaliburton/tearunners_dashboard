<template>
  <div class="upcoming-shipments">
    {{this.countUpcomingShipments(shipments)}}
      <div v-for="month in productCount" :key="month.prod_id">
        <div class="title">{{month.title}}</div>
          <span class="flex-grid">
            <span v-for="shipments in month" v-if="shipments['shipments']" :key="shipments.name">
              <span v-for="product in shipment" v-if="product.count" :key="product.name">
              <div class="col">
                <td>
                  <span class="product-name">{{product}}</span>
                  <br>
                </td>
              </div>
              </span>
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
                  .replace(" Box ", "")
                  .replace(" All ", "");

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
            }
            $this.countUpcomingRenewals(item);
            console.log($this.productCount);
          }
        });
      }
    },
    countUpcomingRenewals(item) {
      let $this = this;
      if (item.autorenew) {
        let name = item.name.includes("Christmas")
          ? item.name.replace(item.name, "Christmas Box")
          : item.name
              .split(" - ")[0]
              .replace("Tea Runners ", "")
              .replace(" Box ", "")
              .replace(" All ", "");
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
      }
    }
  },

  data() {
    return {
      productCount: {
        11: {
          title: "January",
          shipments: {},
          renewals: {}
        },
        0: {
          title: "February",
          shipments: {},
          renewals: {}
        },
        1: {
          title: "March",
          shipments: {},
          renewals: {}
        },
        2: {
          title: "April",
          shipments: {},
          renewals: {}
        },
        3: {
          title: "May",
          shipments: {},
          renewals: {}
        },
        4: {
          title: "June",
          shipments: {},
          renewals: {}
        },
        5: {
          title: "July",
          shipments: {},
          renewals: {}
        },
        6: {
          title: "August",
          shipments: {},
          renewals: {}
        },
        7: {
          title: "September",
          shipments: {},
          renewals: {}
        },
        8: {
          title: "October",
          shipments: {},
          renewals: {}
        },
        9: {
          title: "November",
          shipments: {},
          renewals: {}
        },
        10: {
          title: "December",
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
  border: 1px solid #e1e1e1;
  border-radius: 10px;
}
.item {
  width: 100%;
}
.product-name {
  font-weight: 600;
}
td {
  text-align: center;
  width: 33%;
  border-bottom: none;
}

tr {
  border-collapse: collapse;
}
.flex-grid {
  display: flex;
  flex-wrap: wrap;
  min-height: 5rem;
}
.title {
  display: block;
  text-align: left;
  border-bottom: 1px solid #e1e1e1;
  font-weight: 500;
  margin-top: 2rem;
  padding: 1rem;
  font-size: 1.2rem;
}
.col {
  flex: 2;
}

@media only screen and (max-width: 600px) {
  .col {
    margin: 0 4rem;
  }
}
</style>
