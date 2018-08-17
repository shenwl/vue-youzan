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
    subList: null,
  },
  components: {
    FootNav,
  },
  created() {
    this.getTopList();
  },
  methods: {
    getTopList() {
      axios.post(url.topList).then(res => {
        this.topList = res.data.lists;
      }).catch(e => {
        console.log(e);
      })
    },
    getSubList(id, index) {
      this.topIndex = index;
    },
  }
})
