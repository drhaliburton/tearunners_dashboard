<template>
<span>

  <Loading :loading='loading'></Loading>
  <button @click="loading = !loading" class="sync">{{loading ? this.count + ' Loaded...' : ' Sync Shipments'}}</button>
  <UpcomingShipments :shipments='shipments'></UpcomingShipments>
</span>
</template>

<script>
import Api from "@/services/ApiServices";
import UpcomingShipments from "./UpcomingShipments";
import Loading from "./Loading";

import moment from "moment";

export default {
  name: "dashboard",
  components: {
    UpcomingShipments,
    Loading
  },
  data() {
    return {
      products: [],
      shipments: {},
      next: "",
      loading: true,
      count: 0
    };
  },
  mounted() {
    this.getShipments();
    this.loading = false;
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
      if (response.data.success) {
        this.count++;
      }
    },
    updateShippingData(next) {
      let currentDate = moment().format("YYYY-MM-DD");
      let url = `?fulfillments.adjusted_fulfillment_date__gt=${currentDate}T00:00:00Z&status=unshipped`;
      if (next) {
        this.fetchShippingDetails(next);
      } else {
        if (next !== false) {
          this.fetchShippingDetails(url);
        }
      }
    },
    fetchShippingDetails(url) {
      let $this = this;
      $this.loading = true;
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
            $this.loading = false;
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
.sync {
  margin: 1rem auto 5rem;
  font-size: 0.2rem;
  width: 160px;
}
.sync:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}
</style>
