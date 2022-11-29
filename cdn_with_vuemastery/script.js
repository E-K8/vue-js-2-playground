let app = new Vue({
  el: '#app',
  data: {
    product: 'Socks',
    image: './assets/vmSocks-green-onWhite.jpg',
    link: 'https://www.amazon.co.uk/s?k=socks&crid=1O6JFBN6VDNLK&sprefix=socks%2Caps%2C73&ref=nb_sb_noss_1',
    inStock: true,
    // onSale: true,
    // inventory: 8,
    details: ['80% cotton', '20% polyester', 'gender-neutral'],
    variants: [
      {
        variantId: 2234,
        variantColour: 'green',
        variantImage: './assets/vmSocks-green-onWhite.jpg',
      },
      {
        variantId: 2235,
        variantColour: 'blue',
        variantImage: './assets/vmSocks-blue-onWhite.jpg',
      },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    cart: 0,
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },

    updateProduct(variantImage) {
      this.image = variantImage;
    },
    removeFromCart() {
      this.cart -= 1;
    },
  },
});
