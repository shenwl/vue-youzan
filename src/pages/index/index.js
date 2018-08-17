import Vue from 'vue';
import axios from 'axios';
import url from 'js/api.js';
import { InfiniteScroll } from 'mint-ui';
import 'css/common.css';
import './index.css';

Vue.use(InfiniteScroll);

let appIndex = new Vue({
  el: "#app-index",
  data: {
    list: null,
    pageNum: 1,
    pageSize: 6,
    loading: false,
    allLoaded: false,
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
        const curList = res.data.lists;
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
