import 'css/common.css';
import './search.css';

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api';
import qs from 'qs';

var {keyword, id} = qs.parse(window.location.search.substr(1));

var appSearch = new Vue({
  el: '#app-search',
  data: {
    keyword: keyword,
    searchList: null,
  },
  created() {
    this.getSearchList()
  },
  methods: {
    getSearchList() {
      axios.post(url.searchList, {keyword, id}).then(res => {
        this.searchList = res.data.lists;
        console.log(this.searchList)
      })
    },
  },
  filters: {
    priceNumber(price) {
      return parseFloat(price).toFixed(2)
    }
  }
})
