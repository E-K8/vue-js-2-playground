let app = new Vue({
  el: '#app',
  data: {
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
    cart: 0,
    onSale: true,
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },

    updateProduct(index) {
      this.selectedVariant = index;
      console.log(index);
    },
    removeFromCart() {
      this.cart -= 1;
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
    sale() {
      if (this.onSale) {
        return this.brand + ' ' + this.product + ' are on sale!';
      }
      return this.brand + ' ' + this.product + ' are not on sale!';
    },
  },
});
