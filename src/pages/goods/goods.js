import './goods_common.css';
import './goods_custom.css';
import './goods.css';
import './goods_theme.css';
import './goods_mars.css';
import './goods_sku.css';

import Vue from 'vue';
import url from 'js/api';
import axios from 'axios';
import mixin from 'js/mixin'
import qs from 'qs';

import Swipe from 'components/Swipe';

var {id} = qs.parse(window.location.search.substr(1));

var detailTabs = ['商品详情', '本店成交']

var appGoods = new Vue({
  el: '#app-goods',
  components: {
    Swipe,
  },
  data: {
    id: id,
    details: null,
    dealList: null,
    detailTabs: detailTabs,
    tabIndex: 0,
    bannerList: null,
  },
  created() {
    this.getDetails();
  },
  methods: {
    getDetails() {
      axios.post(url.goodsDetails, {id}).then(res => {
        this.details = res.data.data;
        this.bannerList = [];
        this.details.imgs.forEach(item => {
          this.bannerList.push({
            clickUrl: '',
            img: item,
          });
        });
      })
    },
    changeTab(index) {
      this.tabIndex = index;
      if(index === 1) {
        this.getDeal()
      }
    },
    getDeal() {
      axios.post(url.goodsDeal, {id}).then(res => {
        console.log(res.data.data.lists)
        this.dealList = res.data.data.lists;
      })
    }
  },
  mixins: [mixin],
})


