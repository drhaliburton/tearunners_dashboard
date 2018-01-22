<template>
  <div class="upcoming-shipments">
    {{this.countUpcomingShipments(shipments)}}

    <div v-for="month in productCount" :key="month.prod_id">
          {{fillEmptyCells(month.month)}}

      <div class="title">{{month.title}}</div>

        <tr><div class="row-title">Subscriptions</div></tr>
        <span class="flex-grid">
          <span v-for="item in month.shipments" :key="item.id">
              <DataCell :item="item"></DataCell>
            </span>
        </span>

      <tr><div class="row-title">Renewals</div></tr>
      <span class="flex-grid">
        <span v-for="item in month.renewals" :key="item.id">
            <DataCell :item="item"></DataCell>
          </span>
      </span>

      <div class="row-title total">Totals</div>
      <span class="flex-grid">
        <span v-for="item in month.count" :key="item.id">
            <DataCell :item="item"></DataCell>
          </span>
      </span>

    </div>
  </div>
</template>

<script>
import helpers from "@/services/helpers";
import data from "@/services/data";

import DataCell from "./partials/DataCell";

export default {
  name: "UpcomingShipments",
  props: ["shipments"],
  components: {
    DataCell
  },
  mounted() {},
  methods: {
    fillEmptyCells(month) {
      for (var product in this.products) {
        if (!this.productCount[month]["shipments"][product]) {
          this.productCount[month]["shipments"][product] = {
            name: product,
            count: 0
          };
        }
        if (!this.productCount[month]["renewals"][product]) {
          this.productCount[month]["renewals"][product] = {
            name: product,
            count: 0
          };
        }
        if (!this.productCount[month]["count"][product]) {
          this.productCount[month]["count"][product] = {
            name: product,
            count: 0
          };
        }
      }
      helpers.orderKeys(this.productCount[month]["count"]);
      helpers.orderKeys(this.productCount[month]["renewals"]);
      helpers.orderKeys(this.productCount[month]["shipments"]);
    },
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

              if (!$this.products[name]) {
                $this.products[name] = {
                  name: name,
                  count: 0
                };
              }

              if (!$this.productCount[shipmentMonth]["shipments"][name]) {
                $this.productCount[shipmentMonth]["shipments"][name] = {
                  name,
                  count: 1,
                  id: item.id
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
            count: 1,
            id: item.id
          };
        } else {
          $this.productCount[shipmentMonth]["renewals"][name].count++;
        }
        this.countProductTotals(shipmentMonth, name);
      }
    },
    countProductTotals(shipmentMonth, name) {
      if (!this.productCount[shipmentMonth]["count"][name]) {
        this.productCount[shipmentMonth].count[name] = {
          name,
          count: 1,
          id: shipmentMonth + name
        };
      } else {
        this.productCount[shipmentMonth]["count"][name].count++;
      }
    }
  },

  data() {
    return {
      products: {},
      productCount: data.productCount
    };
  }
};
</script>

<style type="text/css">
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
