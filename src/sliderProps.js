import {
  Autoplay,
  EffectCreative,
  EffectFade,
  Grid,
  Mousewheel,
  Navigation,
  Pagination,
  Virtual,
} from "swiper/modules";

export const sliderProps = {
  testimonial: {
    modules: [Autoplay, Pagination],
    loop: true,
    spaceBetween: 30,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    speed: 500,
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      800: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
    },
  },
};
