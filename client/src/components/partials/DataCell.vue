<template>
  <div class="col">
    <td>
      <span class="product-name">{{item.name}}</span>
      <br>
      {{item.count}}
    </td>
  </div>
</template>

<script>
export default {
  name: "DataCell",
  props: ["item"],
  mounted() {},
  methods: {}
};
</script>
<style type="text/scss">
.flex-grid {
  display: flex;
  flex-wrap: wrap;
  min-height: 5rem;
}
.col {
  flex: 2;
}
.product-name {
  font-weight: 600;
}
</style>
