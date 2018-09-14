import 'css/common.css';
import './cart_base.css';
import './cart_trade.css';
import './cart.css';

import Vue from 'vue';
import axios from 'axios';
import mixin from 'js/mixin'
import url from 'js/api';

import Velocity from 'velocity-animate';

var cartApp = new Vue({
  el: '#cart-app',
  data: {
    cartList: null,
    totalPrice: 0,
    editingShop: null,
    editingShopIndex: -1,
    removePopup: false,
    removeMsg: '',
    removeData: null,
  },
  computed: {
    allSelected: {
      get() {
        let {cartList} = this;
        if (cartList && cartList.length) {
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
        if (this.editingShop) {
          return this.editingShop.removeChecked;
        }
        return false;
      },
      set(newVal) {
        if (this.editingShop) {
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
      if (editingShop) {
        editingShop.goodsList.forEach(goods => {
          if (goods.removeChecked) {
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
      if (cartList && cartList.length) {
        cartList.forEach(shop => {
          shop.goodsList.forEach(goods => {
            if (goods.checked) {
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
        if (i !== shopIndex) {
          item.editing = false;
          item.editMsg = item.editing ? '' : '编辑';
        }
      })
      this.editingShop = shop.editing ? shop : null;
      this.editingShopIndex = shop.editing ? shopIndex : -1;
    },
    reduceGoods(goods) {
      if (goods.number === 1) return;
      axios.post(url.cartReduce, {
        id: goods.id,
        number: 1,
      }).then(res => {
        if (res.data.status === 200) {
          goods.number--;
        }
      })
    },
    addGoods(goods) {
      axios.post(url.cartAdd, {
        id: goods.id,
        number: 1,
      }).then(res => {
        if (res.data.status === 200) {
          goods.number++;
        }
      })
    },
    removeGoods(shop, goods, shopIndex, goodsIndex) {
      this.removePopup = true;
      this.removeMsg = '确定要删除该商品吗？';
      this.removeData = {
        shop,
        goods,
        shopIndex,
        goodsIndex,
      }
    },
    removeGoodsList() {
      this.removePopup = true;
      this.removeMsg = `确定要删除所选的${this.removeList.length}个商品吗？`;
    },
    removeConfirm() {
      let {removeMsg, cartList, removeList, removeShop} = this;
      if(removeMsg === '确定要删除该商品吗？') {
        let {shop, goods, shopIndex, goodsIndex} = this.removeData;
        axios.post(url.cartRemove, {
          id: goods.id,
        }).then(res => {
          console.log(res)
          if (res.data.status === 200) {
            shop.goodsList.splice(goodsIndex, 1);
            if(!shop.goodsList.length) {
              cartList.splice(shopIndex, 1);
              removeShop()
            }
            this.removePopup = false;
          }
        })
      } else {
        let ids = [];
        removeList.forEach(goods => {
          ids.push(goods.id);
        })
        axios.post(url.cartRemove, {
          ids
        }).then(res => {
          if(res.data.status === 200) {
            let arr = [];
            this.editingShop.goodsList.forEach(goods => {
              let index = removeList.findIndex(item => {
                return item.id === goods.id;
              })
              if(index === -1) {
                arr.push(goods);
              }
            });
            if(arr.length) {
              this.editingShop.goodsList = arr;
            } else {
              this.cartList.splice(this.editingShopIndex, 1);
              this.removeShop();
            }
            this.removePopup = false;
          }
        })
      }
    },
    removeShop() {
      this.editingShop = null;
      this.editingShopIndex = -1;
      this.cartList.forEach(shop => {
        shop.editing = false;
        shop.editMsg = '编辑';
      })
    },
    removeCancel() {
      this.removeData = null;
      this.removePopup = false;
    },
    touchStart(e, goods) {
      goods.startX = e.changedTouches[0].clientX;
    },
    touchEnd(e, shop, goods, shopIndex, goodsIndex) {
      let endX = e.changedTouches[0].clientX;
      let left = '0px';
      if(goods.startX - endX > 80) {
        left = '-60px';
      } else if(endX - goods.startX  > 80) {
        left = '0px';
      }
      let goodsNode = this.$refs[`goods-${shopIndex}-${goodsIndex}`];
      Velocity(goodsNode, {
        left,
      });
    }
  },
  mixins: [mixin],
})
