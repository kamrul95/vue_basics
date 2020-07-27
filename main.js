var app = new Vue({
    el:'#app',
    data: {
        brand: 'Nokia',
        product: 'Socks',
        // image: './assets/vmSocks-green-onWhite.jpg',
        selectedVariant: 0,
        url: 'https://vuejs.org/',
        details: ["80% cotton","20% polyster", "Male"],
        variants: [
            {
                variantId:1,
                variantColor: 'green',
                variantImage: './assets/vmSocks-green-onWhite.jpg',
                variantQuantity: 10
            },
            {
                variantId:2,
                variantColor: 'blue',
                variantImage: './assets/vmSocks-blue-onWhite.jpg',
                variantQuantity: 0
            },
        ],
        cart: 0,
    },
    methods: {
        addToCart: function () {
            this.cart += 1;
        },
        updateProduct: function (index) {
            this.selectedVariant = index;
        },
        decrementFromCart(){
            this.cart -= 1;
        }
    },
    computed: {
        title: function () {
            return this.brand + ' ' + this.product;
        },
        image: function () {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStoke () {
            return this.variants[this.selectedVariant].variantQuantity;
        }
    }
}) 