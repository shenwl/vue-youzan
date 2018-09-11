import 'css/common.css';
import './cart_base.css';
import './cart_trade.css';
import './cart.css';

import Vue from 'vue';
import axios from 'axios';
import mixin from 'js/mixin'
import url from 'js/api';

var cartApp = new Vue({
  el: '#cart-app',
  data: {
    cartList: null,
  },
  created() {
    let {getCartList} = this
    getCartList()
  },
  computed: {

  },
  methods: {
    getCartList() {
      axios.post(url.cartList).then(res => {
        console.log(res.data.cartList)
        this.cartList = res.data.cartList
      })
    },
  },
  mixins: [mixin],
})
