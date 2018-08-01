// MoorSwitch 是对应组件的名字，要记得在 moor-switch.vue 文件中还是 name 属性哦
import BCarousel from './packages/carousel/b-carousel.vue';
import BCarouselItem from './packages/carousel/b-carousel-item.vue';

const install = function(Vue, opts = {}) {
  Vue.component(BCarousel.name, BCarousel);
  Vue.component(BCarouselItem.name, BCarouselItem);
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

console.log(BCarousel);

export default {
  install,
  BCarousel,
  BCarouselItem
};
