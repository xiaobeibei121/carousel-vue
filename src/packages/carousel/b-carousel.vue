<template>
  <div class="carousel-div" :id="docmID">
    <ul>
      <slot></slot>
    </ul>
    <div class="indicator" v-if="showIndicators">
      <span :class="index==now?'active':''" v-for="(item,index) in lis"></span>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'b-carousel',
    props:{
      docmID: {
        type: String,
        default: 'carousel'
      },
      speed: {
        type: Number,
        default: 300
      },
      defaultIndex: {
        type: Number,
        default: 0
      },
      auto: {
        type: Number,
        default: 3000
      },
      showIndicators: {
        type: Boolean,
        default: true
      }
    },
    data () {
        return {
          // 查找相应元素
          touchDoc: null,
          lis: null,
          lisLength: 0,

          // 定义三张图片
          now: 0,
          pre: 0,
          next: 1,

          //屏幕宽度
          windowWidth: document.documentElement.clientWidth || document.body.clientWidth
        };
    },
    methods: {
      init () {
        // 初始化
        this.touchDoc = document.querySelector('#' + this.docmID);
        this.lis = document.querySelectorAll('#' + this.docmID +' li');
        this.lisLength = this.lis.length;
        this.now = this.defaultIndex;
        this.pre = this.defaultIndex === 0 ? this.lisLength - 1: this.defaultIndex - 1;
        this.next = this.defaultIndex === this.lisLength ? 0 : this.defaultIndex + 1;
        // 设置div高度和图片一样高
        this.touchDoc.style.height = getComputedStyle(this.lis[0]).height;
        // 设置每张图片的位置
        this.lis.forEach((item, index) => {
          item.style.transform = 'translateX(' + this.windowWidth + 'px)';
        });

        // 给当前、前、后设置新位置
        this.lis[this.now].style.transform = 'translateX(0px)';
        this.lis[this.pre].style.transform = 'translateX(' + (-this.windowWidth) + 'px)';
        this.lis[this.next].style.transform = 'translateX(' + this.windowWidth + 'px)';

        // 定时滚动
        if (this.auto) {
          this.timer = setInterval(() => {
            this.leftShow();
          }, this.auto);
        }

        var that = this;
        this.touchDoc.addEventListener('touchstart', function() {that.touchstartHandler(that, event);}, false);
        this.touchDoc.addEventListener('touchmove', function() {that.touchmoveHandler(that, event);}, false);
        this.touchDoc.addEventListener('touchend', function() {that.touchendHandler(that, event);}, false);
      },
      touchstartHandler (that, event) {
        // 阻止默认事件
        event.preventDefault();
        event.stopPropagation();
        // 一个手指进行滑动
        if(event.touches.length>1) {
          return;
        }
        // 当开始触摸的时候停止定时轮播
        clearInterval(that.timer);
        // 记录开始时间
        that.startX = event.touches[0].clientX;

        that.lis[that.now].style.transition = 'none';
        that.lis[that.pre].style.transition = 'none';
        that.lis[that.next].style.transition = 'none';
      },
      touchmoveHandler (that, event) {
        // 阻止默认事件
        event.preventDefault();
        event.stopPropagation();
        // 一个手指进行滑动
        if(event.touches.length>1) {
          return;
        }
        clearInterval(that.timer);
        // 得到实时坐标
        var curX = event.touches[0].clientX;
        // 改变位置
        that.lis[that.now].style.transform = 'translateX(' + (curX-that.startX) + 'px)';
        that.lis[that.pre].style.transform = 'translateX(' + (-that.windowWidth+curX-that.startX) + 'px)';
        that.lis[that.next].style.transform = 'translateX(' + (that.windowWidth+curX-that.startX) + 'px)';
      },
      touchendHandler (that, event) {
        // 阻止默认事件
        event.preventDefault();
        event.stopPropagation();

        that.deltaX = event.changedTouches[0].clientX - that.startX;
        if (that.deltaX < -that.windowWidth/3) { // 向左滑
          that.leftShow();
        } else if (that.deltaX > that.windowWidth/3) {
          that.rightShow();
        } else {
          that.stopShow();
        }

        if (that.auto) {
          that.timer = setInterval(function () {
            that.leftShow();
          }, this.auto);
        }
      },
      leftShow () {
        this.pre = this.now;
        this.now = this.next;
        this.next++;
        if (this.next > this.lisLength-1) {
          this.next = 0;
        }

        this.lis[this.now].style.transition = 'all ' + (this.speed / 1000) + 's ease 0s';
        this.lis[this.pre].style.transition = 'all ' + (this.speed / 1000) + 's ease 0s';
        this.lis[this.next].style.transition = 'none';

        this.lis[this.now].style.transform = 'translateX(0px)';
        this.lis[this.pre].style.transform = 'translateX(' + (-this.windowWidth) + 'px)';
        this.lis[this.next].style.transform = 'translateX(' + this.windowWidth + 'px)';
      },
      rightShow () {
        this.next = this.now;
        this.now = this.pre;
        this.pre--;
        if (this.pre < 0) {
          this.pre = 4;
        }

        this.lis[this.now].style.transition = 'all ' + (this.speed / 1000) + 's ease 0s';
        this.lis[this.pre].style.transition = 'none';
        this.lis[this.next].style.transition = 'all ' + (this.speed / 1000) + 's ease 0s';

        this.lis[this.now].style.transform = 'translateX(0px)';
        this.lis[this.pre].style.transform = 'translateX(' + (-this.windowWidth) + 'px)';
        this.lis[this.next].style.transform = 'translateX(' + this.windowWidth + 'px)';
      },
      stopShow () {
        this.lis[this.now].style.transition = 'all ' + (this.speed / 1000) + 's ease 0s';
        this.lis[this.pre].style.transition = 'all ' + (this.speed / 1000) + 's ease 0s';
        this.lis[this.next].style.transition = 'all ' + (this.speed / 1000) + 's ease 0s';

        this.lis[this.now].style.transform = 'translateX(0px)';
        this.lis[this.pre].style.transform = 'translateX(' + (-this.windowWidth) + 'px)';
        this.lis[this.next].style.transform = 'translateX(' + this.windowWidth + 'px)';
      }
    },
    mounted () {
      window.onload = () => {
        this.init();
      };
    },
    destroyed () {
      clearInterval(this.timer);
    }
  }

</script>

<style lang="scss">
  .carousel-div {
    position: relative;
    width: 100%;
    max-width: 750px;
    margin: 0 auto;
    text-align: center;
    ul{
      position: relative;
      list-style: none;
      font-size: 0;
      li {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        img{
          width: 100%;
        }
      }
    }
    .indicator{
      position: absolute;
      bottom: 15px;
      width: 100%;
      text-align: center;
      font-size: 0;
      >span{
        display: inline-block;
        width: 10px;
        height: 10px;
        margin: 0 4px;
        border-radius: 50%;
        background-color: rgba(255,255,255,0.8);
        &.active{
          background-color: rgba(200,200,200,0.8);
        }
      }
    }
  }
</style>
