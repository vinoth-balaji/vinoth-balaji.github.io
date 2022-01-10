$(document).ready(function () {
  $(".slider").slick({
    arrows: false,
    dots: true,
    appendDots: ".slider-dots",
    dotsClass: "dots",
    autoplay: true,
  });

  let hamberger = document.querySelector(".hamberger");
  let close = document.querySelector(".close");
  let mobileNav = document.querySelector(".mobile-nav");

  hamberger.addEventListener("click", function () {
    mobileNav.classList.add("open");
  });

  close.addEventListener("click", function () {
    mobileNav.classList.remove("open");
  });

  removeMenu = function () {
    mobileNav.classList.remove("open");
  };
});
