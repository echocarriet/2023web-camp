// ====== Swiper 
// Logo
const swiperLogo = new Swiper('.swiperLogo', {
  autoplay: {
    delay: 3000,
    loop: true,
    pauseOnMouseEnter: true,
  },
  slidesPerView: 3,
  spaceBetween: 20,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 768px
    768: {
      slidesPerView: 4,
      spaceBetween: 20
    },
    // when window width is >= 992px
    992: {
      slidesPerView: 5,
      spaceBetween: 20
    },
  },
});
// Feedback
const swiperFeedback = new Swiper('.swiperFeedback', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 768px
    768: {
      slidesPerView: 2,
      spaceBetween: 20 //slide之間的距離 (單位px)
    },
    // when window width is >= 992px
    992: {
      slidesPerView: 3,
      spaceBetween: 20
    },
  },
});

// ===== GSAP
const timeline2 = gsap.timeline({repeat:-1, ease: "slow(0.9, 0.9, false)"});
timeline2
.fromTo('.deco3', 
{ y: 180,},
{ y: 0, duration: 2, delay: 1}
)
.fromTo('.deco2', 
{ y: 180,},
{ y: 0, duration: 2, delay: .5}, '<'
)
.fromTo('.deco1', 
{ y: 180,},
{ y: 0, duration: 2, delay: .5}, '<'
)
.fromTo('.deco3',
{ y: 0,},
{ y: -180, delay: .5}
)
.fromTo('.deco2',
{ y: 0,},
{ y: -180, delay: .3}, '<'
)
.fromTo('.deco1',
{ y: 0,},
{ y: -180, delay: .3}, '<'
)
