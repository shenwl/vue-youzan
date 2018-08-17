<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="item in list" :key="item.img">
        <a class="js-no-follow" :href="item.clickUrl">
          <img class="goods-main-photo fadeIn" :src="item.img">
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

export default {
  name: 'swipe',
  props: {
    list: {
      type: Array,
      required: true,
      default: [{
        img: 'https://img.yzcdn.cn/upload_files/2016/07/29/Fl3T06Mu7TpIhR4L1s2tzm8cZrgt.jpg',
        clickUrl: 'https://h5.koudaitong.com/v2/index/rukou',
      }],
    },
    name: {},
  },
  created() {
  },
  mounted() {
    new Swiper ('.swiper-container', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
      autoplay: {
        delay: 2000,
      }
    })
  },
}
</script>

<style scoped>
</style>

