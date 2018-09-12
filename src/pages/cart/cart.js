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
    totalPrice: 0,
    editingShop: null,
    editingShopIndex: -1,
  },
  computed: {
    allSelected: {
      get() {
        let {cartList} = this;
        if(cartList && cartList.length) {
          return cartList.every(shop => {
            return shop.checked;
          })
        }
        return false
      },
      set(newVal) {
        this.cartList.forEach(shop => {
          shop.checked = newVal;
          shop.goodsList.forEach(goods => {
            goods.checked = newVal;
          })
        })
      }
    },
    allRemoveSelected: {
      get() {
        if(this.editingShop) {
          return this.editingShop.removeChecked;
        }
      },
      set(newVal) {
        if(this.editingShop) {
          this.editingShop.removeChecked = newVal;
          this.editingShop.goodsList.forEach(goods => {
            goods.removeChecked = newVal;
          })
        }
      }
    },
    removeList() {
      let {editingShop} = this;
      let arr = [];
      if(editingShop) {
        editingShop.goodsList.forEach(goods => {
          if(goods.removeChecked) {
            arr.push(goods);
          }
        })
      }
      return arr;
    },
    selectedList() {
      let {cartList} = this;
      let list = [];
      let totalPrice = 0;
      if(cartList && cartList.length) {
        cartList.forEach(shop => {
          shop.goodsList.forEach(goods => {
            if(goods.checked) {
              list.push(goods);
              totalPrice += goods.price * goods.number;
            }
          })
        });
        this.totalPrice = totalPrice;
      }
      return list;
    },
  },
  created() {
    let {getCartList} = this;
    getCartList();
  },
  methods: {
    getCartList() {
      axios.post(url.cartList).then(res => {
        const list = res.data.cartList;
        list.forEach(shop => {
          shop.checked = true;
          shop.removeChecked = false;
          shop.editing = false;
          shop.editMsg = '编辑';
          shop.goodsList.forEach(goods => {
            goods.checked = true;
            goods.removeChecked = false;
          });
        });
        this.cartList = list;
      });
    },
    selectGoods(shop, goods) {
      let attr = this.editingShop ? 'removeChecked' : 'checked';
      goods[attr] = !goods[attr];
      shop[attr] = shop.goodsList.every(goods => {
        return goods[attr]
      })
    },
    selectShop(shop) {
      let attr = this.editingShop ? 'removeChecked' : 'checked';
      shop[attr] = !shop[attr];
      shop.goodsList.forEach(goods => {
        goods[attr] = shop[attr];
      });
    },
    selectAll() {
      let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected';
      this[attr] = !this[attr]
    },
    editShop(shop, shopIndex) {
      shop.editing = !shop.editing;
      shop.editMsg = shop.editing ? '完成' : '编辑';
      this.cartList.forEach((item, i) => {
        if(i !== shopIndex) {
          item.editing = false;
          item.editMsg = item.editing ? '' : '编辑';
        }
      })
      this.editingShop = shop.editing ? shop : null;
      this.editingShopIndex = shop.editing ? shopIndex : -1;
    },
    reduceGoods(goods) {
      if(goods.number === 1) return;
      axios.post(url.cartReduce, {
        id: goods.id,
        number: 1,
      }).then(res => {
        if(res.data.status === 200) {
          goods.number--;
        }
      })
    },
    addGoods(goods) {
      axios.post(url.cartAdd, {
        id: goods.id,
        number: 1,
      }).then(res => {
        if(res.data.status === 200) {
          goods.number++;
        }
      })
    },
  },
  mixins: [mixin],
})
