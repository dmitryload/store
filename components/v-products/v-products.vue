<template>
    <div class="products">
      <v-product v-for="(prod, index) in products"
                 :product="prod"
                 :key="index"/>
    </div>
</template>

<script>
export default {
  props: {
    products: Array
  },
}
</script>

<style scoped lang="scss">
  .products {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
  }
</style>