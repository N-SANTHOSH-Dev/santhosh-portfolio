/* =========================================================
   PRELOADER
========================================================= */

window.addEventListener("load", () => {

    const preloader =
        document.getElementById("preloader");

    setTimeout(() => {

        preloader.classList.add("hide");

    }, 700);

});



/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("menu-toggle");

const navbar =
    document.getElementById("navbar");

const navLinks =
    document.querySelectorAll(".nav-link");


menuToggle.addEventListener("click", () => {

    navbar.classList.toggle("active");

});


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

    });

});



/* =========================================================
   THEME TOGGLE
========================================================= */

const themeToggle =
    document.getElementById("theme-toggle");

const themeIcon =
    themeToggle.querySelector("i");


const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    document.body.classList.add("light-theme");

    themeIcon.classList.remove("fa-moon");

    themeIcon.classList.add("fa-sun");

}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    const isLight =
        document.body.classList.contains("light-theme");


    if (isLight) {

        themeIcon.classList.remove("fa-moon");

        themeIcon.classList.add("fa-sun");

        localStorage.setItem(
            "portfolio-theme",
            "light"
        );

    } else {

        themeIcon.classList.remove("fa-sun");

        themeIcon.classList.add("fa-moon");

        localStorage.setItem(
            "portfolio-theme",
            "dark"
        );

    }

});



/* =========================================================
   TYPING ANIMATION
========================================================= */

const typingText =
    document.getElementById("typing-text");


const words = [

    "Full Stack Developer",

    "Web Developer",

    "Java Developer",

    "Software Developer",


];


let wordIndex = 0;

let charIndex = 0;

let deleting = false;


function typeEffect() {

    const currentWord =
        words[wordIndex];


    if (!deleting) {

        typingText.textContent =
            currentWord.substring(
                0,
                charIndex + 1
            );

        charIndex++;


        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1600);

            return;

        }

    } else {

        typingText.textContent =
            currentWord.substring(
                0,
                charIndex - 1
            );

        charIndex--;


        if (charIndex === 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1) % words.length;

        }

    }


    const speed =
        deleting ? 55 : 90;

    setTimeout(typeEffect, speed);

}


typeEffect();



/* =========================================================
   HEADER SCROLL
========================================================= */

const header =
    document.getElementById("header");


window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});



/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");


function updateActiveNav() {

    let current = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav
);



/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================================
   COUNTERS
========================================================= */

const counters =
    document.querySelectorAll(".counter");


const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting)
                    return;


                const counter =
                    entry.target;

                const target =
                    parseFloat(
                        counter.dataset.target
                    );

                const decimal =
                    counter.dataset.decimal ===
                    "true";


                let current = 0;

                const increment =
                    target / 60;


                function updateCounter() {

                    current += increment;


                    if (current >= target) {

                        counter.textContent =
                            decimal
                                ? target.toFixed(2)
                                : target;

                        return;

                    }


                    counter.textContent =
                        decimal
                            ? current.toFixed(2)
                            : Math.floor(current);


                    requestAnimationFrame(
                        updateCounter
                    );

                }


                updateCounter();


                counterObserver.unobserve(counter);

            });

        },

        {
            threshold: 0.7
        }

    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});



/* =========================================================
   SCROLL TO TOP
========================================================= */

const scrollTop =
    document.getElementById("scroll-top");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        scrollTop.classList.add("show");

    } else {

        scrollTop.classList.remove("show");

    }

});


scrollTop.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});



/* =========================================================
   CONTACT FORM - WEB3FORMS
========================================================= */

const contactForm =
    document.getElementById("contact-form");

const formStatus =
    document.getElementById("form-status");

const submitBtn =
    document.getElementById("submit-btn");

const submitText =
    document.getElementById("submit-text");

const submitIcon =
    document.getElementById("submit-icon");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            /* -------------------------
               Loading State
            ------------------------- */

            submitBtn.disabled = true;

            submitText.textContent =
                "Sending...";

            submitIcon.className =
                "fas fa-spinner fa-spin";

            formStatus.textContent = "";

            formStatus.className =
                "form-status";


            /* -------------------------
               Get Form Data
            ------------------------- */

            const formData =
                new FormData(contactForm);


            try {

                /* -------------------------
                   Send to Web3Forms
                ------------------------- */

                const response =
                    await fetch(
                        "https://api.web3forms.com/submit",
                        {
                            method: "POST",
                            body: formData
                        }
                    );


                const result =
                    await response.json();


                /* -------------------------
                   Success
                ------------------------- */

                if (result.success) {

                    formStatus.textContent =
                        "Message sent successfully! I'll get back to you soon.";

                    formStatus.classList.add(
                        "success"
                    );


                    /* Clear form */

                    contactForm.reset();


                } else {

                    throw new Error(
                        result.message ||
                        "Something went wrong."
                    );

                }


            } catch (error) {

                /* -------------------------
                   Error
                ------------------------- */

                formStatus.textContent =
                    "Unable to send your message. Please try again.";

                formStatus.classList.add(
                    "error"
                );

                console.error(
                    "Contact form error:",
                    error
                );

            }


            /* -------------------------
               Reset Button
            ------------------------- */

            submitBtn.disabled = false;

            submitText.textContent =
                "Send Message";

            submitIcon.className =
                "fas fa-paper-plane";

        }
    );

}
/* =========================================================
   CURRENT YEAR
========================================================= */

document.getElementById(
    "current-year"
).textContent = new Date().getFullYear();



/* =========================================================
   PHOTO MOUSE EFFECT
========================================================= */

const photoWrapper =
    document.querySelector(".photo-wrapper");


if (photoWrapper && window.innerWidth > 900) {

    photoWrapper.addEventListener(
        "mousemove",
        event => {

            const rect =
                photoWrapper.getBoundingClientRect();


            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                (y - centerY) / 30;

            const rotateY =
                (centerX - x) / 30;


            photoWrapper.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    photoWrapper.addEventListener(
        "mouseleave",
        () => {

            photoWrapper.style.transform =
                "";

        }
    );

}



/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "%c SN.DEV ",
    "background:#7c5cff;color:white;font-size:18px;font-weight:bold;padding:8px;"
);

console.log(
    "%c Santhosh N | Full Stack Developer ",
    "color:#7c5cff;font-size:14px;font-weight:bold;"
);
/* =========================================================
   MOVING SKILLS ANIMATION
========================================================= */

const movingSkills = {

    frontend: [
        {
            name: "HTML",
            icon: "fab fa-html5"
        },
        {
            name: "CSS",
            icon: "fab fa-css3-alt"
        },
        {
            name: "JavaScript",
            icon: "fab fa-js"
        },
        {
            name: "React",
            icon: "fab fa-react"
        }
    ],

    backend: [
        {
            name: "Java",
            icon: "fab fa-java"
        },
        {
            name: "Spring Boot",
            icon: "fas fa-leaf"
        },
        {
            name: "Python",
            icon: "fab fa-python"
        },
        {
            name: "REST API",
            icon: "fas fa-plug"
        }
    ],

    database: [
        {
            name: "MySQL",
            icon: "fas fa-database"
        },
        {
            name: "SQL",
            icon: "fas fa-table"
        },
        {
            name: "SQLite",
            icon: "fas fa-database"
        },
        {
            name: "Database Design",
            icon: "fas fa-project-diagram"
        }
    ],

    programming: [
        {
            name: "Java",
            icon: "fab fa-java"
        },
        {
            name: "Python",
            icon: "fab fa-python"
        },
        {
            name: "JavaScript",
            icon: "fab fa-js"
        },
        {
            name: "DSA",
            icon: "fas fa-code"
        }
    ],

    data: [
        {
            name: "Python",
            icon: "fab fa-python"
        },
        {
            name: "Pandas",
            icon: "fas fa-table"
        },
        {
            name: "NumPy",
            icon: "fas fa-chart-area"
        },
        {
            name: "Power BI",
            icon: "fas fa-chart-bar"
        }
    ],

    tools: [
        {
            name: "Git",
            icon: "fab fa-git-alt"
        },
        {
            name: "GitHub",
            icon: "fab fa-github"
        },
        {
            name: "VS Code",
            icon: "fas fa-code"
        },
        {
            name: "Postman",
            icon: "fas fa-paper-plane"
        }
    ]

};


const skillDisplays =
    document.querySelectorAll(".moving-skill-display");


skillDisplays.forEach(display => {

    const category =
        display.dataset.category;

    const skills =
        movingSkills[category];

    if (!skills) return;


    let currentIndex = 0;


    const card =
        display.closest(".moving-skill-card");

    const dots =
        card.querySelectorAll(".skill-dots span");


    function showSkill(index) {

        const oldItem =
            display.querySelector(".moving-skill-item");

        if (oldItem) {

            oldItem.classList.remove("active");

            setTimeout(() => {

                oldItem.remove();

            }, 500);
        }


        const skill =
            skills[index];


        const newItem =
            document.createElement("div");

        newItem.className =
            "moving-skill-item";


        newItem.innerHTML = `
            <i class="${skill.icon}"></i>
            <span>${skill.name}</span>
        `;


        display.appendChild(newItem);


        requestAnimationFrame(() => {

            newItem.classList.add("active");

        });


        dots.forEach(dot => {

            dot.classList.remove("active");

        });


        if (dots[index]) {

            dots[index].classList.add("active");

        }
    }


    setInterval(() => {

        currentIndex++;

        if (currentIndex >= skills.length) {

            currentIndex = 0;

        }

        showSkill(currentIndex);

    }, 2500);

});