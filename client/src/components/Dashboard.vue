<template>
<span>
  <UpcomingShipments :shipments='shipments'></UpcomingShipments>
</span>
</template>

<script>
import Api from "@/services/ApiServices";
import UpcomingShipments from "./UpcomingShipments";
import moment from "moment";

export default {
  name: "dashboard",
  components: {
    UpcomingShipments
  },
  data() {
    return {
      products: [],
      shipments: {},
      next: ""
    };
  },
  mounted() {
    this.getShipments();
    // this.updateShippingData();
  },
  methods: {
    async getProducts() {
      const response = await Api.fetchProducts();
      this.products = response.data.products;
    },
    async getShipments() {
      const response = await Api.fetchShipments();
      this.shipments = response.data.shipments;
    },
    async postShipments(data) {
      const response = await Api.updateShippingData(data);
    },
    updateShippingData(next) {
      let currentDate = moment().format("YYYY-MM-DD");
      let url = `?fulfillments.adjusted_fulfillment_date__gt=${currentDate}T00:00:00Z`;
      if (next) {
        console.log("Next", next);
        this.fetchShippingDetails(next);
      } else {
        if (next !== false) {
          this.fetchShippingDetails(url);
        }
      }
    },
    fetchShippingDetails(url) {
      console.log("Url", url);

      let $this = this;
      let options = {
        headers: {
          Authorization: "Basic dGVhX3J1bm5lcnM6TjBxeHFMcHRqRnFNMTdrMg=="
        }
      };
      let apiUrl = "http://api.cratejoy.com/v1/shipments/" + url;
      fetch(apiUrl, options)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          data.results.map(item => {
            $this.postShipments(item);
          });
          if (data.next) {
            $this.next = data.next;
          } else {
            $this.next = false;
          }
          return data;
        })
        .then(function(data) {
          if ($this.next) {
            $this.updateShippingData(data.next);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
<style type="text/css">

</style>
