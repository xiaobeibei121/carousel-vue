# carousel-vue

> A carousel plugin with Vue

```
# 安装依赖
npm install

# 运行demo
npm run dev
```

#### 使用方式

* 导入
```
import Carousel from 'b-carousel';
Vue.use(Carousel);
```

* 组件使用
```vue2html
<b-carousel :defaultIndex="3">
   <b-carousel-item><img src="./assets/images/0.png"></b-carousel-item>
   <b-carousel-item><img src="./assets/images/1.png"></b-carousel-item>
   <b-carousel-item><img src="./assets/images/2.png"></b-carousel-item>
   <b-carousel-item><img src="./assets/images/3.png"></b-carousel-item>
   <b-carousel-item><img src="./assets/images/4.png"></b-carousel-item>
</b-carousel>
```

#### 参数说明

speed：轮播的速度，默认 300ms

defaultIndex： 轮播的起始帧，默认 0

auto：轮播的时间间隔，默认 3000ms，0 代表不自动轮播

showIndicators：是否显示指示点，默认 true
