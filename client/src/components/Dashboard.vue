<template>
<span>

  <Loading :loading='loadingShipments || loadingSubscriptions'></Loading>
    <button @click="loaded || error ? refresh() : getCratejoyShippingData()" class="sync">{{loaded || error ? 'Refresh Page' : loadingShipments ? 'Loading' : 'Sync Orders'}}
      <span class="saving" v-if="loadingShipments"><span>.</span><span>.</span><span>.</span></span>
    </button>
    <button @click="loaded || error ? refresh() : getCratejoySubscriptionData()" class="sync">{{loaded || error ? 'Refresh Page' : loadingSubscriptions ? 'Loading' : 'Sync Renewals'}}
      <span class="saving" v-if="loadingSubscriptions"><span>.</span><span>.</span><span>.</span></span>
    </button>
    <div class="product-count">
      <template v-if="loadingShipments || loadingSubscriptions || loaded">
        <span>Syncing Cratejoy data, please wait.</span>
      </template>
      <template v-if="error">
        <span class="error">Error: please refresh and try again.</span>
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
      subscriptions: {},
      shipments: {},
      next: "",
      loadingShipments: false,
      loadingSubscriptions: false,
      loaded: false,
      error: false,
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
    async getCratejoyShippingData() {
      this.loadingShipments = true;
      const response = await Api.getCratejoyShippingData().catch(err => {});
      if (response.success) {
        this.loaded = true;
      }
    },
    async getCratejoySubscriptionData() {
      this.loadingSubscriptions = true;
      const response = await Api.getCratejoySubscriptionData().catch(err => {});
      if (response.success) {
        this.loaded = true;
      }
    },
    async getShipments() {
      const response = await Api.fetchShipments().catch(err => {
        this.error = true;
        this.loading = false;
      });
      this.shipments = response.data;
    },
    refresh() {
      helpers.refresh();
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
.error {
  color: darkred;
}
</style>
