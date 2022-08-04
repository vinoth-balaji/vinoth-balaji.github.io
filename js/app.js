$(document).ready(function () {
  // console.log(window.screen.width);

  function syntaxHighlight(json) {
    // console.log(json)
    json = json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
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

        return '<span class="' + cls + '">' + match + "</span>";
      }
    );
  }

  myDetails = {
    From: "Vellore, Tamil Nadu",
    "Graduated In": "Computer Science (2013-2017)",
    "Working In": "Flutura Business Solutions, Bangalore",
    Designation: "Associate Tech Lead - Full Stack",
    "Years of Experience": "4.5+",
  };

  ewb = {
    Organization: "Flutura Business Solutions, Bangalore",
    Duration: "Jan 2020 - Till Date",
    Designation: "Associate Tech Lead / Senior Programmer",
    "Team Size": "8-10",
  };

  qp = {
    Organization: "Flutura Business Solutions, Bangalore",
    Duration: "June 2019 - Dec 2019",
    Designation: "Programmer",
    "Team Size": "6-8",
  };

  qd = {
    Organization: "Flutura Business Solutions, Bangalore",
    Duration: "Sep 2018 - May 2019",
    Designation: "Programmer",
    "Team Size": "10-12",
  };

  sc = {
    Organization: "Flutura Business Solutions, Bangalore",
    Duration: "Oct 2017 - Aug 2018",
    Designation: "Programmer",
    "Team Size": "4-6",
  };

  myDetails = JSON.stringify(myDetails, undefined, 4);
  myDetails = syntaxHighlight(myDetails);
  document.getElementById("myDetails").innerHTML =
    '<span class="json-string json-title">Vinoth: </span>' + myDetails;

  ewb = JSON.stringify(ewb, undefined, 4);
  ewb = syntaxHighlight(ewb);
  document.getElementById("ewb").innerHTML =
    '<span class="json-string json-title">Engineering Workbench: </span>' + ewb;

  qp = JSON.stringify(qp, undefined, 4);
  qp = syntaxHighlight(qp);
  document.getElementById("qp").innerHTML =
    '<span class="json-string json-title">Quality Pulse: </span>' + qp;

  qd = JSON.stringify(qd, undefined, 4);
  qd = syntaxHighlight(qd);
  document.getElementById("qd").innerHTML =
    '<span class="json-string json-title">Quality Diagnostics and Prognostics: </span>' +
    qd;

  sc = JSON.stringify(sc, undefined, 4);
  sc = syntaxHighlight(sc);
  document.getElementById("sc").innerHTML =
    '<span class="json-string json-title">PFEP (Plan for Every Part): </span>' +
    sc;

  if (window.screen.width > 780) {
    $(".slider").slick({
      arrows: false,
      dots: true,
      appendDots: ".slider-dots",
      dotsClass: "dots",
      autoplay: true,
    });
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
});
