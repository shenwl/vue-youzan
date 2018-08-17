import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';
import { InfiniteScroll } from 'mint-ui';
import 'css/common.css';
import './index.css';

Vue.use(InfiniteScroll);

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
    });
  },
  methods: {
    loadMore() {
      this.loading = true;
      axios.post(url.hotLists, {
        pageNum: 1,
        pageSize: 6,
      }).then(res => {
        this.list = this.list.concat(res.data.lists);
        this.loading = false;
      });
    },
  }
})
