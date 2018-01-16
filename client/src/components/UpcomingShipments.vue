<template>

  <div class="upcoming-shipments">
    {{this.countUpcomingShipments(shipments)}}
      <div v-for="month in productCount" :key="month.prod_id">
        <div class="title">{{month.title}}</div>
          <span class="flex-grid">
            <template v-for="product in month" v-if="product.count">
              <div :key="product.name" class="col">
                <td>
                  <span class="product-name">{{product.name}}</span>
                  <br>{{product.count}}
                </td>
              </div>
            </template>
          </span>
      </div>
  </div>
</template>

<script>
export default {
  name: "UpcomingShipments",
  props: ["shipments"],
  mounted() {},
  methods: {
    countUpcomingShipments(shipments) {
      if (shipments.length) {
        shipments.map(item => {
          if (item.name) {
            let name = item.name.split(" - ")[0].replace("Tea Runners", "");
            let shipmentDate = new Date(item["adjusted_fulfillment_date"]);
            let shipmentMonth = shipmentDate.getMonth();
            if (!this.productCount[shipmentMonth][name]) {
              this.productCount[shipmentMonth][name] = {
                name,
                count: 1
              };
            } else {
              this.productCount[shipmentMonth][name].count++;
            }
          }
        });
      }
    }
  },
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
        9: {
          title: "October"
        },
        10: {
          title: "November"
        },
        11: {
          title: "December"
        }
      }
    };
  }
};
</script>
<style type="text/scss">
.upcoming-shipments {
  padding: 2rem;
  margin: auto;
  width: 60%;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
}
.item {
  width: 100%;
}
.product-name {
  font-weight: 600;
}
td {
  text-align: center;
  width: 33%;
  border-bottom: none;
}
tr {
  border-collapse: collapse;
}
.flex-grid {
  display: flex;
  min-height: 5rem;
}
.title {
  display: block;
  text-align: left;
  border-bottom: 1px solid #e1e1e1;
  font-weight: 500;
  margin-top: 2rem;
  padding: 1rem;
  font-size: 1.5rem;
}
.col {
  flex: 1;
}
</style>
