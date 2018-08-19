import FootNav from 'components/FootNav.vue';

var mixin = {
  filters: {
    priceNumber(price) {
      return parseFloat(price).toFixed(2);
    }
  },
  components: {
    FootNav,
  }
}

export default mixin;
