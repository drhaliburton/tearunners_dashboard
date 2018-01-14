<template>
<span>
  <div class="products">
    <div v-for="product in products" :key="product.id">
      <h1 >{{product.name}}</h1>
    </div>
  </div>
  <div class="shipments">
    <div v-for="shipment in shipments" :key="shipment.id">
      <h1 >{{shipment.adjusted_ordered_at}}</h1>
      <h1 >{{shipment.fulfillments[0].instance.product.name}}</h1>

    </div>
  </div>
  <UpcomingShipments></UpcomingShipments>
</span>
</template>

<script>
import Api from "@/services/ApiServices";
import UpcomingShipments from "./UpcomingShipments";

export default {
  name: "dashboard",
  components: {
    UpcomingShipments
  },
  data() {
    return {
      products: [],
      shipments: {}
    };
  },
  mounted() {
    this.getProducts();
    this.getShipments();
  },
  methods: {
    async getProducts() {
      const response = await Api.fetchProducts();
      this.products = response.data.products;
    },
    async getShipments() {
      const response = await Api.fetchShipments();
      this.shipments = response.data.shipments;
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
