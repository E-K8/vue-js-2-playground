Vue.component('product-review', {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
  
  <p v-if="errors.length">
    <b>Please correct the following errors(s): </b>
    <ul>
      <li v-for="error in errors">{{error}}</li>
    </ul>
  </p>
  
  <p>
    <label for="name">Name:</label>
    <input id="name" v-model="name" placeholder="name">
  </p>
  
  <p>
    <label for="review">Review:</label>      
    <textarea id="review" v-model="review" ></textarea>
  </p>
  
  <p>
    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>
  </p>

  <p>Would you recommend this product?</p>
  <label>
    Yes
    <input type="radio" value="Yes" name="selectOne" v-model="recommend"/>
  </label>
  <label>
    No
    <input type="radio" value="No" name="selectOne" v-model="recommend"/>
  </label>
      
  <p>
    <input type="submit" value="Submit">  
  </p>    

</form>`,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      this.errors = [];
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend,
        };
        this.$emit('review-submitted', productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      } else {
        if (!this.name) this.errors.push('Name required.');
        if (!this.review) this.errors.push('Review required.');
        if (!this.rating) this.errors.push('Rating required.');
        if (!this.recommend) this.errors.push('Recommendation required.');
      }
    },
  },
});

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
    <button
      v-on:click="addToCart"
      :disabled="!inStock"
      :class="{disabledButton: !inStock}"
    >
      Add to cart
    </button>
    <button @click="removeFromCart">Remove from cart</button>
  </div> 

  <div>
  <h2>Reviews</h2>
  <p v-if="!reviews.length">There are no reviews yet.</p>
  <ul v-else>
      <li v-for="(review, index) in reviews" :key="index">
        <p>{{ review.name }}</p>
        <p>Rating:{{ review.rating }}</p>
        <p>{{ review.review }}</p>
      </li>
  </ul>
  </div>
  <product-review @review-submitted="addReview"></product-review>
</div>
`,
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
      reviews: [],
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
    },
    addReview(productReview) {
      this.reviews.push(productReview);
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
