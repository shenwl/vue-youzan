import 'css/common.css';
import './index.css';

import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

import FootNav from 'components/FootNav.vue';


var appIndex = new Vue({
  el: "#app-index",
  data: {
    list: null,
    pageNum: 1,
    pageSize: 6,
    loading: false,
    allLoaded: false,
  },
  components: {
    FootNav,
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      if(this.allLoaded) { return; }
      this.loading = true;
      axios.post(url.hotLists, {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }).then(res => {
        var curList = res.data.lists;
        if(curList.length < this.pageSize) {
          this.allLoaded = true;
        }
        if(this.list) {
          this.list = this.list.concat(curList);
        } else {
          this.list = curList;
        }
        this.loading = false;
        this.pageNum++;
      });
    },
  }
})
