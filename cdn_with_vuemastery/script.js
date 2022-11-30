Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
  <div class="product">
  <div class="product-image">
    <img :src="image" alt="" />
  </div>
  <div class="product-info">
    <h1>{{title}}</h1>
    <!-- <p v-if="inventory > 10">In Stock</p> -->
    <!-- <p v-else-if="inventory <= 10 && inventory > 0">Almost Sold Out!</p> -->
    <!-- <p v-show="inStock">In Stock</p> -->
    <!-- ^^^ toggles visibility off and on -->
    <p v-if="inStock">In Stock</p>
    <p v-else :class="{outOfStock:!inStock}">Out of Stock</p>
    <p>Shipping: {{shipping}}</p>
    <p>{{sale}}</p>
    <!-- <span v-if="onSale">On Sale!</span> -->
    <a :href="link" target="_blank">More products like this</a>
    <ul>
      <li v-for="detail in details">{{detail}}</li>
    </ul>
    <ul>
      <li v-for="size in sizes">{{ size }}</li>
    </ul>
    <div
      v-for="(variant, index) in variants"
      :key="variant.variantId"
      class="color-box"
      :style="{backgroundColor: variant.variantColour }"
      @mouseover="updateProduct(index)"
    ></div>
  </div> 
  <button
    v-on:click="addToCart"
    :disabled="!inStock"
    :class="{disabledButton: !inStock}"
  >
    Add to cart
  </button>
  <button @click="removeFromCart">Remove from cart</button>
</div>`,
  data() {
    return {
      brand: 'Socktopus',
      product: 'Socks',
      selectedVariant: 0,
      link: 'https://www.amazon.co.uk/s?k=socks&crid=1O6JFBN6VDNLK&sprefix=socks%2Caps%2C73&ref=nb_sb_noss_1',

      // onSale: true,
      // inventory: 8,
      details: ['80% cotton', '20% polyester', 'gender-neutral'],
      variants: [
        {
          variantId: 2234,
          variantColour: '#228E54',
          variantImage: './assets/vmSocks-green-onWhite.jpg',
          variantQuantity: 10,
        },
        {
          variantId: 2235,
          variantColour: '#3A5068',
          variantImage: './assets/vmSocks-blue-onWhite.jpg',
          variantQuantity: 0,
        },
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      onSale: true,
    };
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },

    updateProduct(index) {
      this.selectedVariant = index;
      console.log(index);
    },
    removeFromCart() {
      this.$emit(
        'remove-from-cart',
        this.variants[this.selectedVariant].variantId
      );
      // this.cart -= 1;
    },
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    shipping() {
      if (this.premium) {
        return 'Free';
      }
      return 2.99;
    },
    sale() {
      if (this.onSale) {
        return this.brand + ' ' + this.product + ' are on sale!';
      }
      return this.brand + ' ' + this.product + ' are not on sale!';
    },
  },
});

let app = new Vue({
  el: '#app',
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeItem(id) {
      for (let i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
          this.cart.splice(i, 1);
        }
      }
    },
  },
});
