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
    let {getCartList} = this;
    getCartList();
  },
  computed: {

  },
  methods: {
    getCartList() {
      axios.post(url.cartList).then(res => {
        const list = res.data.cartList;
        list.forEach(shop => {
          shop.checked = true
          shop.goodsList.forEach(goods => {
            goods.checked = true;
          });
        });
        this.cartList = list;
      });
    },
    selectGoods(goods) {
      goods.checked = !goods.checked;
    },
    selectShop(shop) {
      shop.checked = !shop.checked;
      this.cartList.forEach(item => {
        if(shop.shopId === item.shopId) {
          item.goodsList.forEach(goods => {
            goods.checked = shop.checked;
          });
        }
      });
    },
  },
  mixins: [mixin],
})
