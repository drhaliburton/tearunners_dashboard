<template>
  <div class="upcoming-shipments">
    <template v-if="productCount">

    <div v-for="month in this.productCount" :key="month.prod_id">
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
        <span v-for="item in month.count" :key="item.name + item.count">
            <DataCell :item="item"></DataCell>
          </span>
      </span>

    </div>
    </template>

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
  mounted() {
    this.productCount = this.shipments;
  },
  updated() {},
  watch: {
    shipments: function(val) {
      this.productCount = this.shipments;
    }
  },
  methods: {
    fillEmptyCells(month) {
      if (this.productCount) {
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
      }
    }
  },
  data() {
    return {
      products: {
        "Original Box": "Original Box",
        "Christmas Box": "Christmas Box",
        "Black Tea Box": "Black Tea Box",
        "Herbal Tea Box": "Herbal Tea Box"
      },
      productCount: {}
    };
  }
};
</script>

<style type="text/css">
.upcoming-shipments {
  min-height: 400px;
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
  justify-content: center;
}
.title {
  display: block;
  text-align: left;
  border-bottom: 1px solid #bbbbbb;
  font-weight: 500;
  margin-top: 1rem;
  padding: 1.5rem;
  font-size: 1.4rem;
}
.col {
  flex: 2;
}

@media only screen and (max-width: 600px) {
  .col {
    margin: 0 0.8rem;
    width: 125px;
  }
}
</style>
