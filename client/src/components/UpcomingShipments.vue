<template>

  <div class="upcoming-shipments">
    {{this.countUpcomingShipments(shipments)}}

      <table class="u-full-width" v-for="month in productCount" :key="month.id">

          <thead>
          <tr>
            <th>{{month.title}}</th>
          </tr>
        </thead>
        <tbody v-for="product in month" :key="product.name">
          <tr class="product-name">
            {{product.name}}
          </tr>
        <tr>
    {{product.count}}
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "UpcomingShipments",
  props: ["shipments"],
  data() {
    return {
      productCount: {
        0: {
          title: "January"
        },
        1: {
          title: "February"
        },
        2: {
          title: "March"
        },
        3: {
          title: "April"
        },
        4: {
          title: "May"
        },
        5: {
          title: "June"
        },
        6: {
          title: "July"
        },
        7: {
          title: "August"
        },
        8: {
          title: "September"
        },
        9: { title: "October" },
        10: {
          title: "November"
        },
        11: {
          title: "December"
        }
      }
    };
  },
  mounted() {},
  methods: {
    countUpcomingShipments(shipments) {
      if (shipments.length) {
        shipments.map(item => {
          item.fulfillments.map(order => {
            let name = order.instance.product.name.split(" - ")[0];
            let shipmentDate = new Date(item["adjusted_ordered_at"]);
            let shipmentMonth = shipmentDate.getMonth();
            if (!this.productCount[shipmentMonth][name]) {
              this.productCount[shipmentMonth][name] = {
                name,
                count: 1
              };
            } else {
              this.productCount[shipmentMonth][name].count++;
            }
          });
        });
      }
      console.log(this.productCount);
    }
  }
};
</script>
<style type="text/css">
.upcoming-shipments {
  padding: 2rem;
  margin: auto;
  width: 80%;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
}
.product-name {
  font-weight: 600;
  padding: 2rem;
}
</style>
