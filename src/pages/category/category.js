import 'css/common.css';
import './category.css';

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';

import FootNav from 'components/FootNav.vue';

var appCategory = new Vue({
  el: '#app-category',
  data: {
    topList: null,
    topIndex: 0,
    subData: null,
  },
  components: {
    FootNav,
  },
  created() {
    this.getTopList();
    this.getSubList(0, 0);
  },
  methods: {
    getTopList() {
      axios.post(url.topList).then(res => {
        this.topList = res.data.lists;
      }).catch(e => {
        console.log(e);
      })
    },
    getSubList(index, id) {
      this.topIndex = index;
      if(index === 0) {
        this.getRank();
      } else {
        axios.post(url.subList, {id}).then(res => {
          this.subData = res.data.data;
        })
      }
    },
    getRank() {
      axios.post(url.rank).then(res => {
        this.subData = res.data.data;
      })
    },
    toSearch(item) {
      window.location.href = `search.html?keyword=${item.name}&id=${item.id}`
    },
  },
  filters: {
    priceNumber(price) {
      return parseFloat(price).toFixed(2)
    }
  }
})
