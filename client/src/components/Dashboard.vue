<template>
<span>
  <UpcomingShipments :shipments='shipments'></UpcomingShipments>
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

</style>
