/*
  ROHIT7N PORTFOLIO
  -----------------
  CONTENT CONFIGURATION
  -----------------
  Add/edit projects, skills and metrics here.
  No HTML layout changes are required.
*/

const SITE_DATA = {
  metrics: [
    { value: "AZ-900", label: "Azure Fundamentals" },
    { value: "AI-900", label: "Azure AI Fundamentals" },
    { value: "2025", label: "Computer Engineering" }
  ],

  stack: [
    {
      code: "LANG / 01",
      title: "Programming",
      description: "Core languages for software development and problem solving.",
      tags: ["Python", "Java", "C++", "JavaScript"]
    },
    {
      code: "WEB / 02",
      title: "Web Technologies",
      description: "Front-end foundations for modern web experiences.",
      tags: ["HTML", "CSS", "JavaScript"]
    },
    {
      code: "CLOUD / 03",
      title: "Microsoft Azure",
      description: "Cloud fundamentals across compute, storage, networking and AI.",
      tags: ["Azure", "Compute", "Storage", "Networking", "AI"]
    },
    {
      code: "PLATFORM / 04",
      title: "Platforms & Tools",
      description: "Development platforms and tools used for building and managing projects.",
      tags: ["ServiceNow", "Git", "GitHub", "VS Code"]
    }
  ],

  /*
    Every project here has its own direct destination.
    Use url: null for a project that is not publicly available yet.

    The portfolio site itself, Digitroms (its own Venture section) and
    Void-Sector are intentionally excluded — they either aren't standalone
    projects or aren't ready to show yet.
  */
  projects: [
    {
      number: "PROJECT / 01",
      type: "LIVE SHOWCASE",
      title: "Projects",
      description: "A live showcase of project collections, implementations and development work.",
      tags: ["Projects", "Development"],
      url: "https://rohit7n.github.io/projects/",
      linkText: "View Projects"
    }
  ]
};

function renderMetrics() {
  const root = document.querySelector("#metrics");

  root.innerHTML = SITE_DATA.metrics.map(item => `
    <article class="metric">
      <span class="metric-value">${item.value}</span>
      <span class="metric-label">${item.label}</span>
    </article>
  `).join("");
}

function renderStack() {
  const root = document.querySelector("#stackGrid");

  root.innerHTML = SITE_DATA.stack.map(item => `
    <article class="stack-card reveal">
      <span class="stack-code">${item.code}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="tags">
        ${item.tags.map(tag => `<span>${tag}</span>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderProjects() {
  const root = document.querySelector("#projectGrid");

  root.innerHTML = SITE_DATA.projects.map(item => {
    const link = item.url
      ? `<a class="project-link" href="${item.url}" target="_blank" rel="noopener noreferrer">${item.linkText} <b>↗</b></a>`
      : `<span class="project-link disabled">${item.linkText} <b>•</b></span>`;

    return `
      <article class="project-card reveal">
        <span class="project-number">${item.number}</span>
        <span class="project-type">${item.type}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="tags">
          ${item.tags.map(tag => `<span>${tag}</span>`).join("")}
        </div>
        ${link}
      </article>
    `;
  }).join("");
}

function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.classList.toggle("active", open);
    toggle.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupReveal() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("show"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(element => observer.observe(element));
}

function setYear() {
  document.querySelector("#year").textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderMetrics();
  renderStack();
  renderProjects();
  setupNavigation();
  setupReveal();
  setYear();
});

/* ==========================================
   LEGAL SECTION ENHANCEMENTS
========================================== */


document.addEventListener("DOMContentLoaded", () => {


    const legalSections = document.querySelectorAll("#legal h3, #legal p, #legal li");


    // Initial state

    legalSections.forEach(element => {

        element.style.opacity = "0";

        element.style.transform = "translateY(20px)";

        element.style.transition = 
        "opacity 0.6s ease, transform 0.6s ease";

    });



    // Scroll reveal animation

    const legalObserver = new IntersectionObserver((entries)=>{


        entries.forEach(entry=>{


            if(entry.isIntersecting){


                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";


                legalObserver.unobserve(entry.target);


            }


        });


    },{


        threshold:0.15


    });



    legalSections.forEach(element=>{

        legalObserver.observe(element);

    });



});

