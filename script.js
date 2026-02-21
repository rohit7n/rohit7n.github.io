function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

// Animate skill bars on scroll
const fills = document.querySelectorAll(".fill");

function animateSkills() {
    fills.forEach(fill => {
        const position = fill.getBoundingClientRect().top;
        if(position < window.innerHeight - 100) {
            fill.style.width = fill.getAttribute("data-width");
        }
    });
}

window.addEventListener("scroll", animateSkills);
