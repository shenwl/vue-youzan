import 'css/common.css';
import './search.css';

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api';
import qs from 'qs';

import mixin from 'js/mixin';
import Velocity from 'velocity-animate';

var {keyword, id} = qs.parse(window.location.search.substr(1));

var appSearch = new Vue({
  el: '#app-search',
  data: {
    keyword: keyword,
    searchList: null,
    showGotop: false,
  },
  created() {
    this.getSearchList()
  },
  methods: {
    getSearchList() {
      axios.post(url.searchList, {keyword, id}).then(res => {
        this.searchList = res.data.lists;
      })
    },
    bodyScroll() {
      // BUG: document.body.scrollTop一直为0 应使用documentElement
      if(document.documentElement.scrollTop > 150) {
        this.showGotop = true;
      } else {
        this.showGotop = false;
      }
    },
    toTop() {
      Velocity(document.body, 'scroll', {duration: 1000});
    },
  },
  mixins: [mixin],
})
