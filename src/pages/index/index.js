import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';
import 'css/common.css';
import './index.css';

var appIndex = new Vue({
  el: "#app-index",
  data: {
    list: null,
  },
  created() {
    axios.post(url.hotLists, {
      pageNum: 1,
      pageSize: 6,
    }).then(res => {
      this.list = res.data.lists;
      console.log(res.data.lists)
    });
  },
})
