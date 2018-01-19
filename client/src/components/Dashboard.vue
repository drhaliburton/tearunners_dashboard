<template>
<span>

  <Loading :loading='loading'></Loading>
    <button @click="loaded ? helpers.refresh() : updateShippingData()" class="sync">{{loaded ? 'Refresh Page' : loading ? 'Loading' : 'Sync Shipments'}}
      <span class="saving" v-if="(loading)"><span>.</span><span>.</span><span>.</span></span>
    </button>
    <div class="product-count">
      <template v-if="loading || loaded">
        <span>{{this.success}} added │ </span>
        <span> {{this.skipped}} skipped │ </span>
        <span>{{this.deleted}} deleted</span>
      </template>
    </div>
  <UpcomingShipments :shipments='shipments'></UpcomingShipments>
</span>
</template>

<script>
import Api from "@/services/ApiServices";
import UpcomingShipments from "./UpcomingShipments";
import Loading from "./Loading";
import helpers from "@/services/helpers";

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
      loading: false,
      loaded: false,
      success: 0,
      deleted: 0,
      skipped: 0
    };
  },
  mounted() {
    this.getShipments();
    this.loading = false;
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
      response.data.success
        ? this.success++
        : response.data.skipped
          ? this.skipped++
          : response.data.deleted ? this.deleted++ : false;
    },
    updateShippingData(next) {
      let currentDate = moment().format("YYYY-MM-DD");
      let params =
        "?fulfillments.adjusted_fulfillment_date__ge=2017-12-15T00:00:00Z";
      if (next) {
        this.fetchShippingDetails(next);
      } else {
        if (next !== false) {
          this.fetchShippingDetails(params);
        }
      }
    },
    fetchShippingDetails(params = "") {
      let $this = this;
      $this.loading = true;
      let options = {
        headers: {
          Authorization: API_AUTH,
          "Content-Type": "application/json"
        }
      };
      let apiUrl = API_SHIPMENTS_URL + params;
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
            $this.loaded = true;
            $this.loading = false;
          }
          return data;
        })
        .then(function(data) {
          if ($this.next) {
            $this.updateShippingData($this.next);
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
  margin: 1rem auto 0;
  font-size: 0.2rem;
  width: 160px;
}
.product-count {
  font-size: 0.9rem;
  height: 50px;
  margin: 1rem auto;
}
button {
  transition: all 0.25s ease-in-out;
  -moz-transition: all 0.25s ease-in-out;
  -webkit-transition: all 0.25s ease-in-out;
}
.sync:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}
@keyframes blink {
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

.saving span {
  animation-name: blink;
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

.saving span:nth-child(2) {
  animation-delay: 0.2s;
}

.saving span:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
