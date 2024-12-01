let menubtn = document.querySelector(".menubtn");
let closebtn = document.querySelectorAll(".closebtn");
let mobileHeader = document.querySelector(".mobileHeader");
menubtn.addEventListener("click", function () {
  mobileHeader.style.transform = `translateX(0%)`;
});
closebtn.forEach((element) => {
  element.addEventListener("click", function () {
    mobileHeader.style.transform = `translateX(100%)`;
  });
});

// about-options

let optionsBtn = document.querySelectorAll(".option-btn");
let resultPages = document.querySelectorAll(".result-about");
optionsBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    optionsBtn.forEach((b) => {
      b.classList.remove("selected-option");
    });
    btn.classList.add("selected-option");
    let selectedDiv = document.querySelector(`#${btn.id}-page`);
    resultPages.forEach((page) => {
      page.style.display = "none";
    });
    selectedDiv.style.display = "block";
  });
});

// change logo color when hover

let skillCard = document.querySelectorAll(".skill");
skillCard.forEach((card) => {
  let img = card.lastElementChild;
  card.addEventListener("mouseenter", function () {
    if (img.tagName == "IMG") {
      img.src = img.src.slice(0, -4) + "2.png";
    }
  });
  card.addEventListener("mouseleave", function () {
    if (img.tagName == "IMG") {
      img.src = img.src.slice(0, -5) + ".png";
    }
  });
});

// work section for the slider

let projectsContainer = document.querySelector(".project-image");
let projectsNav = document.querySelector(".projects-nav");

let projects = [
  {
    id: 1,
    title: "instagram clone",
    description:
      "The front-end of the Instagram Clone showcases a responsive, visually appealing interface for displaying photo and video feeds and user profiles.",
    source: "imgs/projects/instagram-clone.png",
    stack: "Html5, Css3",
    liveProject: "https://abdellahak.github.io/instagram-clone/",
    githubResp: "https://github.com/abdellahak/instagram-clone/",
  },
  {
    id: 2,
    title: "Library Book Loan",
    description:
      "The Library Book Loan project, built with Python and Tkinter, enables users to manage book loans and maintain a catalog of available books through a simple graphical interface.",
    source: "/imgs/projects/library project.png",
    stack: "Python",
    liveProject: null,
    githubResp: "https://github.com/abdellahak/projet-bibliotheque",
  },
  {
    id: 3,
    title: "Eshoping cart",
    description:
      "EShopping Cart project uses HTML, CSS, and JavaScript to provide an interactive online shopping experience with dynamic product listings and a responsive checkout process.",
    source: "/imgs/projects/eshoping cart project.png",
    stack: "Html5, Css3, JavaScript",
    liveProject: "https://abdellahak.github.io/eshoping-Cart/",
    githubResp: "https://github.com/abdellahak/eshoping-Cart",
  },
];

let projectsNavigationHtml = projects
  .map(
    (prj) => `
        <button class="project-card" id="card-${prj.id}" onclick = "changeProject(${prj.id})">
            <div class="card-bg"></div>
            <img src="${prj.source}" alt="${prj.title}" class="prj-icon">
            <div>
                <h1>${prj.title}</h1>
            </div>
        </button>
                `
  )
  .join("");
projectsNav.innerHTML = projectsNavigationHtml;

let projectsCards = document.querySelectorAll(".project-card");
function changeNavColor(id) {
  let targetedCard = document.getElementById(`card-${id}`);
  projectsCards.forEach((card) => {
    card.classList.remove("selected-card");
  });
  targetedCard.classList.add("selected-card");
}
let globalid = 0;
function showProject(id) {
  let targetedProject = projects.find((prj) => prj.id == id);
  projectsContainer.innerHTML = `
        <div class="image-container">
            <img
            src="${targetedProject.source}"
            alt="${targetedProject.title}"
            class="prj-img"
          />
          </div>
          <div class="img-infos">
            <div class="prj-infos">
              <div class="img-btns">
                ${
                  targetedProject.liveProject
                    ? `<a href="${targetedProject.liveProject}" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i>Live project</a>`
                    : ""
                }
                ${
                  targetedProject.githubResp
                    ? `<a href="${targetedProject.githubResp}" target="_blank">
                  <i class="fa-brands fa-github"></i>
                  Github respository
                </a>`
                    : ""
                }
              </div>
              <h1>${targetedProject.title}</h1>
            </div>
          </div>
        `;
}
function sliderMovement(id = globalid) {
  globalid++;
  if (globalid > projects.length) {
    globalid = 1;
  }
  showProject(globalid);
  changeNavColor(globalid);
}
let sliderInterval;

function changeProject(id) {
  if (sliderInterval) {
    clearInterval(sliderInterval);
  }
  globalid = id - 1;
  sliderMovement(globalid - 1);
  sliderInterval = setInterval(sliderMovement, 8000);
}

changeProject(1);

// for contact section
let inputs = document.querySelectorAll(".forminput");
inputs.forEach((input) => {
  let label = input.previousElementSibling;
  if (input.value.length != 0) {
    for (let i = 0; i < label.children.length; i++) {
      label.children[i].style.transform = "translateY(0px)";
      label.children[i].classList.toggle("labelstyle");
    }
  }
  input.addEventListener("focus", moveOnFocus);
  input.addEventListener("focusout", moveOutFocus);
});

function moveOnFocus() {
  let label = this.previousElementSibling;
  if (this.value.length == 0) {
    for (let i = 0; i < label.children.length; i++) {
      label.children[i].style.transition = `transform 0.2s ease ${
        i / 10
      }s, color 0.2s linear`;
      label.children[i].style.transform = "translateY(0px)";
      label.children[i].classList.toggle("labelstyle");
    }
  }
}
function moveOutFocus() {
  let label = this.previousElementSibling;
  if (this.value.length == 0) {
    for (let i = 0; i < label.children.length; i++) {
      label.children[i].style.transition = `transform 0.2s ease ${i / 10}s`;
      label.children[i].style.transform = "translateY(43px)";
      label.children[i].classList.toggle("labelstyle");
    }
  }
}

// clear form after submission
const form = document.querySelector("#contactform");
form.addEventListener("submit", function () {
  event.preventDefault();
  this.submit();
  this.reset();
});

// year for footer page

let year = document.querySelector("#year");
year.innerHTML = new Date().getFullYear();

// loader code
document.body.style.overflow = "hidden";

window.addEventListener("load", function () {
  const loader = document.querySelector(".loader-screen");
  loader.classList.add("hidden");
  document.body.style.overflow = "visible";
});