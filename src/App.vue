<template>
  <div id="app">
    <b-carousel>
      <b-carousel-item><img src="./assets/images/0.png"></b-carousel-item>
      <b-carousel-item><img src="./assets/images/1.png"></b-carousel-item>
      <b-carousel-item><img src="./assets/images/2.png"></b-carousel-item>
      <b-carousel-item><img src="./assets/images/3.png"></b-carousel-item>
      <b-carousel-item><img src="./assets/images/4.png"></b-carousel-item>
    </b-carousel>
  </div>
</template>
<script>
  import BCarousel from "./packages/carousel/b-carousel";
  import BCarouselItem from "./packages/carousel/b-carousel-item";
export default {
  components: {
    BCarouselItem,
    BCarousel
  },
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  html,body{
    width: 100%;
    height: 100%;
  }
  html,body,div, ul, li {
    margin: 0;
    padding: 0;
    border: none;
  }
</style>
