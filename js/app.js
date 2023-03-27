// $(document).ready(function () {
// console.log(window.screen.width);

// Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");

// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  // Get current scroll position
  let scrollY = window.pageYOffset;

  // Now we loop through sections to get height, top and ID values for each
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 150;
    sectionId = current.getAttribute("id");
    // console.log(sections);
    // console.log(sectionId);

    /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */

    const doc = document.querySelector(
      ".header-texts a[href*=" + sectionId + "]"
    );

    if (doc) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        doc.classList.add("active");
      } else {
        doc.classList.remove("active");
      }
    }
  });
}

const scrollProgress = document.getElementById("scroll-progress");
const height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener("scroll", () => {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
});

function syntaxHighlight(json) {
  // console.log(json)

  let idx = 0;
  let key = "",
    value = "";

  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // console.log(json);
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "json-key";
          match = match.substring(1, match.length - 2) + ": ";
        } else {
          cls = "json-string";
          match = match.substring(1, match.length - 1);
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }

      // console.log(match, match.substring(1, match.length - 1));

      // console.log(match);

      // if (idx % 2 == 0) {
      //   key = '<span class="' + cls + '">' + match + "</span>";
      //   idx += 1;
      // } else {
      //   value = '<span class="' + cls + '">' + match + "</span>";
      //   idx += 1;
      //   return "<div>" + key + value + " </div>";
      // }

      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}

// myDetails = {
//   From: "Vellore, Tamil Nadu",
//   Education: "B.E C.S.E (2013-2017)",
//   "Working In": "Flutura Business Solutions, Bangalore",
//   Designation: "Associate Tech Lead - Full Stack",
//   "Years of Experience": "5+",
// };

// ewb = {
//   Organization: "Flutura Business Solutions, Bangalore",
//   Duration: "Jan 2020 - Till Date",
//   Designation: "Associate Tech Lead / Senior Programmer",
//   "Team Size": "10-15",
// };

// qp = {
//   Organization: "Flutura Business Solutions, Bangalore",
//   Duration: "June 2019 - Dec 2019",
//   Designation: "Programmer",
//   "Team Size": "6-8",
// };

// qd = {
//   Organization: "Flutura Business Solutions, Bangalore",
//   Duration: "Sep 2018 - May 2019",
//   Designation: "Programmer",
//   "Team Size": "10-12",
// };

// sc = {
//   Organization: "Flutura Business Solutions, Bangalore",
//   Duration: "Oct 2017 - Aug 2018",
//   Designation: "Programmer",
//   "Team Size": "4-6",
// };

// myDetails = JSON.stringify(myDetails, undefined, 4);
// myDetails = syntaxHighlight(myDetails);
// document.getElementById("myDetails").innerHTML =
//   '<span class="json-string json-title">Vinoth: </span>' + myDetails;

// ewb = JSON.stringify(ewb, undefined, 4);
// ewb = syntaxHighlight(ewb);
// document.getElementById("ewb").innerHTML =
//   '<span class="json-string json-title">Engineering Workbench: </span>' + ewb;

// qp = JSON.stringify(qp, undefined, 4);
// qp = syntaxHighlight(qp);
// document.getElementById("qp").innerHTML =
//   '<span class="json-string json-title">Quality Pulse: </span>' + qp;

// qd = JSON.stringify(qd, undefined, 4);
// qd = syntaxHighlight(qd);
// document.getElementById("qd").innerHTML =
//   '<span class="json-string json-title">Quality Diagnostics and Prognostics: </span>' +
//   qd;

// sc = JSON.stringify(sc, undefined, 4);
// sc = syntaxHighlight(sc);
// document.getElementById("sc").innerHTML =
//   '<span class="json-string json-title">PFEP (Plan for Every Part): </span>' +
//   sc;

if (window.screen.width > 780) {
  // $(".slider").slick({
  //   arrows: false,
  //   dots: true,
  //   appendDots: ".slider-dots",
  //   dotsClass: "dots",
  //   autoplay: true,
  // });
}
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

function reveal() {
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

function isElementPartiallyInViewport(el, threshold = 10) {
  const rect = el.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
  const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

  if (vertInView && horInView) {
    const partialVisible =
      (rect.top < 0 && rect.bottom > 0) ||
      (rect.top >= 0 && rect.bottom <= windowHeight);
    if (partialVisible) {
      const percentage =
        ((Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)) /
          rect.height) *
        100;
      return percentage >= threshold ? el : null;
    }
    return el;
  }
  return null;
}

function handleScroll() {
  const reveals = document.querySelectorAll(".reveal");
  for (const reveal of reveals) {
    const active = isElementPartiallyInViewport(reveal);
    if (active) {
      active.classList.add("active");
    } else {
      reveal.classList.remove("active");
    }
  }
}

window.addEventListener("scroll", handleScroll);
// });
