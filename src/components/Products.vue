<template>
  <div>
    <h1 class="title">All Products</h1>
    <p>{{ length }} products</p>
    <table class="table is-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Processor</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" track-by="id" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.processor }}</td>
          <td>${{ product.price }}</td>
          <td>
            <button @click="addItemsToCart(product)" class="button is-info">
              Add to cart
            </button>
          </td>
        </tr>
      </tbody>
    </table>

	<template v-if="dialog">
    <article class="message is-danger div-centered">
      <div class="message-header">
        <p>Danger</p>
        <button class="delete" aria-label="delete" @click="() => dialog=false"></button>
      </div>
      <div class="message-body">
        Item out of stock.
      </div>
    </article>
	</template>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  name: "app",
  data() {
	  return {
		  dialog: false
	  }
  },
  computed: mapGetters({
    products: "allProducts",
    length: "getNumberOfProducts",
	cartProducts: 'cartProducts'
  }),
  ...mapState({
    inventory: (state) => state.inventory,
  }),

  methods: {
    addItemsToCart(product) {
      const productItem = this.$store.state.inventory.find((p) => p.id === product.id);
	  const cartItem = this.cartProducts.find((p) => p.id === product.id);
	  const cartProduct = cartItem===undefined?{quantity:0}:cartItem;
	  if(productItem.quantity>cartProduct.quantity)
      this.$store.dispatch("addToCart", product);
	  else
	  this.dialog = true;
    },
  },
};
</script>

<style lang="scss">
.div-centered {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index:9999;
  }

</style>
