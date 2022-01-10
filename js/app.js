$(document).ready(function () {
  $(".slider").slick({
    arrows: false,
    dots: true,
    appendDots: ".slider-dots",
    dotsClass: "dots",
    // autoplay: true,
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

  var modal = document.getElementById("project-modal");

  openModal = function (project) {
    modal.style.display = "block";
    let list = document.querySelectorAll("." + project);
    list.forEach((item) => {
      item.classList.add("active");
    });
  };

  var span = document.getElementsByClassName("close-modal")[0];

  span.onclick = function () {
    modal.style.display = "none";
    let list = document.querySelectorAll(".modal-details");

    list.forEach((item) => {
      item.classList.remove("active");
    });
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      let list = document.querySelectorAll(".modal-details");
      list.forEach((item) => {
        item.classList.remove("active");
      });
    }
  };
});
