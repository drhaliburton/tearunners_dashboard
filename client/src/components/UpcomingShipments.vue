<template>
  <span>

<table class="u-full-width">
<div v-for="month in productCount" :key="month.id">
    <thead>
    <tr>
      <th>{{month}}</th>
    </tr>
  </thead>
  <span v-for="product in month" :key="product.name">
    <tbody>
    <tr>
      {{product.name}}
    </tr>
    <tr>
{{product.count}}
    </tr>
  </tbody>
  </span>


</div>
</table>
  </span>
</template>

<script>
export default {
  name: "UpcomingShipments",
  props: ["shipments"],
  data() {
    return {
      productCount: {
        0: {},
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
        6: {},
        7: {},
        8: {},
        9: {},
        10: {},
        11: {}
      }
    };
  },
  created() {},
  computed: {
    parentData: function() {
      return this.$parent.$data.shipments; // or whatever you want to access
    }
  },
  watch: {
    parentData: function() {
      this.countUpcomingShipments(this.parentData);
    }
  },
  methods: {
    countUpcomingShipments(shipments = this.parentData) {
      shipments.map(item => {
        let shipmentDate = new Date(item["adjusted_ordered_at"]);
        let shipmentMonth = shipmentDate.getMonth();
        if (
          !this.productCount[shipmentMonth][
            item.fulfillments[0].instance.product.name
          ]
        ) {
          this.productCount[shipmentMonth][
            item.fulfillments[0].instance.product.name
          ] = {
            name: item.fulfillments[0].instance.product.name,
            count: 1
          };
        } else {
          this.productCount[shipmentMonth][
            item.fulfillments[0].instance.product.name
          ].count++;
        }
      });
      console.log(this.productCount);
    }
  }
};
</script>
<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th,
table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
}
table tr:nth-child(1) {
  background: #4d7ef7;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_post_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
