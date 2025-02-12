// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

class ScrollAnimations {
    constructor() {
        this.init();
    }

    init() {
        // Hero section animations
        this.animateHero();
        
        // About section animations
        this.animateAbout();
        
        // Projects animations
        this.animateProjects();
        
        // Skills section animations
        this.animateSkills();
        
        // Blog section animations
        this.animateBlog();
        
        // Contact section animations
        this.animateContact();
    }

    animateHero() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero",
                start: "top center",
                end: "bottom top",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(".profile-picture", {
            scale: 0,
            rotation: 360,
            duration: 1.5,
            ease: "back.out(1.7)"
        })
        .from(".hero h1", {
            y: 100,
            opacity: 0,
            duration: 1
        }, "-=1")
        .from(".tagline", {
            y: 50,
            opacity: 0,
            duration: 1
        }, "-=0.5");
    }

    animateAbout() {
        gsap.from("#about p", {
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2
        });
    }

    animateProjects() {
        gsap.from(".project-card", {
            scrollTrigger: {
                trigger: "#projects",
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            ease: "back.out(1.2)"
        });
    }

    animateSkills() {
        // Animate skill circles with a stagger effect
        gsap.from(".skill-circle", {
            scrollTrigger: {
                trigger: ".skills-container",
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            scale: 0,
            rotation: -180,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.7)"
        });

        // Animate chart container
        gsap.from(".chart-container", {
            scrollTrigger: {
                trigger: ".chart-container",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1
        });

        // Timeline items animation
        gsap.from(".timeline-item", {
            scrollTrigger: {
                trigger: ".timeline",
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            x: (i) => i % 2 === 0 ? -100 : 100,
            opacity: 0,
            duration: 1,
            stagger: 0.3
        });
    }

    animateBlog() {
        gsap.from(".blog-post", {
            scrollTrigger: {
                trigger: "#blog",
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2
        });
    }

    animateContact() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#contact",
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(".social-links a", {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1
        })
        .from("form", {
            y: 50,
            opacity: 0,
            duration: 1
        }, "-=0.5");
    }

    // Parallax effect for background particles
    initParallax() {
        gsap.to("#particles-3d", {
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1
            },
            y: (i, target) => -ScrollTrigger.maxScroll(window) * 0.1,
            ease: "none"
        });
    }
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
}); 