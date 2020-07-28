Vue.component('product', {
    props: {
        premium:{
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
            <div class="product-image">
                <a v-bind:href="url" target="_blank">
                <img v-bind:src="image"  alt="logo" srcset="">
                </a>
            </div>
            <div class="product-info">
                <h1>{{title}}</h1>
                <p v-if="inStoke">In stoke</p>
                <p v-else :class="{outOfStokeDecoration: !inStoke}">Out of stoke</p>
                <p>Shipping : {{shipping}}</p>
                <ul>
                    <li v-for="detail in details"> {{detail}}</li>
                </ul>
                <div v-for="(variant,index) in variants" v-bind:key="variant.variantId" class="color-box"
                    :style="{backgroundColor: variant.variantColor}"
                    v-on:mouseover="updateProduct(index)">
                </div>
                
                <button v-on:click="addToCart" :disabled="!inStoke" :class="{disabledButton:!inStoke}">Add to
                    Cart</button>
                <button v-on:click="removeFromCart" :disabled="!inStoke" :class="{disabledButton:!inStoke}">Remove From
                    Cart</button>
            </div> 

            <product-tab></product-tab>

            <div>
                <h2>Review</h2>
                <p v-if="!reviews.length">There are no reviews</p>
                <ul>
                <div v-for="review in reviews">
                    <p>Name: {{review.name}}</p>
                    <p>Review: {{review.review}}</p>
                    <p>Rating: {{review.rating}}</p>
                </div>
                </ul>
            </div>
            <product-review @submit-review="addReview"></product-review> 
    </div>
    `,
    data() {
        return {
            brand: 'Nokia',
            product: 'Socks',
            // image: './assets/vmSocks-green-onWhite.jpg',
            selectedVariant: 0,
            url: 'https://vuejs.org/',
            details: ["80% cotton", "20% polyster", "Male"],
            variants: [
                {
                    variantId: 1,
                    variantColor: 'green',
                    variantImage: './assets/vmSocks-green-onWhite.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2,
                    variantColor: 'blue',
                    variantImage: './assets/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 0
                },
            ],
            reviews: []
        }
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeFromCart () {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct: function (index) {
            this.selectedVariant = index;
        },
        decrementFromCart() {
            this.cart -= 1;
        },
        addReview(reviewItem){
            this.reviews.push(reviewItem)
        }
    },
    computed: {
        title: function () {
            return this.brand + ' ' + this.product;
        },
        image: function () {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStoke() {
            return this.variants[this.selectedVariant].variantQuantity;
        },
        shipping() {
            if(this.premium){
                return 'free';
            }
            return 2.99;
        }
    }
})

Vue.component('productdetails',{
    props: {
        details: {
            type: String,
            required: true
        }
    },
    template:`
    <div>
        <h3>{{details}}</h3>
    </div>
    `
});

Vue.component('product-tab', {
    template: `
        <div>
            <span :class="{activeTab: selectedTab === tab}" v-for="tab in tabs" @click="selectedTab = tab">
                {{tab}}
            </span>
        </div>
    `,
    data(){
        return {
            tabs: ["Reviews", "Make a Review"],
            selectedTab: "Reviews"
        }
    }
})

Vue.component('product-review',{
    template:`
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length">Please fix the following error(s)</p>
            <ul>
                <li v-for="error in errors">{{error}}</li>
            </ul>
            <p>
                <label for="name">Name</label>
                <input id="name" v-model="name"/>
            </p>
            <p>
                <label for="review">Review</label>
                <textarea id="review" v-model="review"/>
            </p>
            <p>
                <label for="rating">Rating</label>
                <select id="rating" v-model.number="rating">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </p>
            <p>Would you like to recommend this product?</p>
            <input type="radio" value="Yes" v-model="recommend"/><label>Yes</label>
            <input type="radio" value="No" v-model="recommend"/><label>No</label>
            <p>
                <input type="submit" value="Submit"/>
            </p>
        </form>
    `,
    data(){
        return {
            name: null,
            review: null,
            rating:null,
            recommend:null,
            errors: []
        }
    },
    methods: {
        onSubmit () {
            this.errors = [];
            if(this.name && this.review && this.rating && this.recommend){
                var reviewItem = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend,
                }
                this.$emit('submit-review', reviewItem)
                this.name = null;
                this.review = null;
                this.rating = null;
                this.recommend = null;
            }
            else{
                if(!this.name) this.errors.push('Name required');
                if(!this.review) this.errors.push('Review required');
                if(!this.rating) this.errors.push('Rating required');
                if(!this.recommend) this.errors.push('Recommend required');
            }
            
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        details: `Good to be back in form. after a long time seeing each other. need some break`,
        cart: [],
    },
    methods: {
        updateCart (id) {
            this.cart.push(id);
        },
        removeFromCart(id) {
            // this.cart.pop();
            for(var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                   this.cart.splice(i, 1);
                   break;
                }
              }
        }
    }
}) 