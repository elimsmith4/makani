// Carousel
export function initInfoCarousel() {
    console.log("Initializing carousel");
    // Load animations
    let loadCarouselTl = gsap.timeline({
        scrollTrigger: {
            // markers: true,
            trigger: ".carousel_main",
            start: "top bottom",
            end: "top 70%",
            toggleActions: "none play none reset"
        },
    });
    loadCarouselTl.from(".carousel-slides_num", { opacity: 0, scale: 0.5 });
    loadCarouselTl.from(".carousel_static_header", { opacity: 0, y: "2rem" }, "<0.2");
    loadCarouselTl.from(".carousel-slides_header", { opacity: 0, y: "2rem" }, "<");
    loadCarouselTl.from(".carousel-slides_text", { opacity: 0, y: "2rem" }, "<0.2");
    loadCarouselTl.from(".carousel_image_wrap", { scale: 0.8, opacity: 0, duration: 0.5, ease: "power2.out" }, "<0.2");
    loadCarouselTl.from(
        "[data-carousel=abs-right] .abs_line_wrap",
        {
            x: "-100%",
            duration: 0.5,
            stagger: { amount: 0.3, from: "center" },
            ease: "elastic.out(1,0.5)",
        },
        ">-0.1"
    );
    loadCarouselTl.from(
        "[data-carousel=abs-left] .abs_line_wrap",
        {
            x: "100%",
            duration: 0.5,
            stagger: { amount: 0.3, from: "center" },
            ease: "elastic.out(1,0.5)",
        },
        "<"
    );

    // Animation behavior on click
    $(".carousel_main").each(function () {
        const carousel = $(this);
        const slideSets = [
            ".carousel-slides_header",
            ".carousel-slides_text",
            ".carousel-slides_image",
            ".carousel-slides_num",
        ];
        const imageContainer = carousel.find(".circular_image_wrap");
        const abstractRight = carousel.find(
            "[data-carousel=abs-right] .abs_line_wrap"
        );
        const abstractLeft = carousel.find(
            "[data-carousel=abs-left] .abs_line_wrap"
        );

        let activeIndex = 0; // Track the currently active slide index (0-indexed)
        let isTransitioning = false; // Track if a transition is happening

        const durationOut = 0.2;
        const durationIn = 0.3;
        const durationPress = 0.05;

        const shakeImage = () => {
            const tl = gsap.timeline();
            if (imageContainer) {
                tl.to(imageContainer, {
                    scale: 0.95,
                    duration: durationPress,
                    ease: "power1.out",
                });
                tl.to(imageContainer, {
                    scale: 1,
                    duration: durationOut * 2 - durationPress,
                    ease: "elastic.out",
                });
            }
            if (abstractLeft) {
                tl.to(
                    abstractLeft,
                    {
                        x: "10%",
                        duration: durationPress,
                        ease: "power1.out",
                        stagger: { each: 0.01, from: "random" },
                    },
                    0 // Start immediately
                );
                tl.to(
                    abstractLeft,
                    {
                        x: "-7%",
                        duration: durationPress * 1.5,
                        ease: "power1.out",
                        stagger: { each: 0.01, from: "random" },
                    },
                    ">"
                );
                tl.to(
                    abstractLeft,
                    {
                        x: 0,
                        duration: durationOut * 2 - durationPress,
                        ease: "elastic.out",
                        stagger: { each: 0.01, from: "random" },
                    },
                    ">"
                );
            }
            if (abstractRight) {
                tl.to(
                    abstractRight,
                    {
                        x: "-10%",
                        duration: durationPress,
                        ease: "power1.out",
                        stagger: { each: 0.01, from: "random" },
                    },
                    0 // Start immediately
                );
                tl.to(
                    abstractRight,
                    {
                        x: "7%",
                        duration: durationPress * 1.5,
                        ease: "power1.out",
                        stagger: { each: 0.01, from: "random" },
                    },
                    ">"
                );
                tl.to(
                    abstractRight,
                    {
                        x: 0,
                        duration: durationOut * 2 - durationPress,
                        ease: "elastic.out",
                        stagger: { each: 0.01, from: "random" },
                    },
                    ">"
                );
            }
            return tl;
        };

        // Define the animation functions for each slide set
        const animationFunctions = {
            ".carousel-slides_header": (parent, currentSlide, newSlide) => {
                const tl = gsap.timeline();
                if (currentSlide) {
                    tl.fromTo(
                        currentSlide,
                        { opacity: 1, scale: 1 },
                        {
                            opacity: 0,
                            scale: 0.9,
                            duration: durationOut,
                            ease: "power2.out",
                            display: "none",
                        }
                    );
                }
                if (newSlide) {
                    tl.set(newSlide, { display: "block" });
                    tl.fromTo(
                        newSlide,
                        { opacity: 0, x: "2rem", scale: 1 },
                        { opacity: 1, x: 0, duration: durationIn * 1.5 }
                    );
                }
                return tl;
            },
            ".carousel-slides_text": (parent, currentSlide, newSlide) => {
                const tl = gsap.timeline();
                if (currentSlide) {
                    tl.fromTo(
                        currentSlide,
                        { opacity: 1, scale: 1 },
                        {
                            opacity: 0,
                            scale: 0.9,
                            duration: durationOut,
                            ease: "power2.out",
                            display: "none",
                        }
                    );
                }
                if (newSlide) {
                    tl.set(newSlide, { display: "block" });
                    tl.fromTo(
                        newSlide,
                        { opacity: 0, y: "2rem", scale: 1 },
                        { opacity: 1, y: 0, duration: durationIn }
                    );
                }
                return tl;
            },
            ".carousel-slides_image": (parent, currentSlide, newSlide) => {
                const tl = gsap.timeline();
                const newSlideImages = newSlide.children()[0];
                if (newSlide) {
                    tl.set(newSlide, { display: "block" }, 0);
                    tl.fromTo(
                        newSlide,
                        { zIndex: 1, opacity: 0 },
                        { opacity: 1, duration: durationIn },
                        0 // Start immediately
                    );
                    tl.fromTo(
                        newSlideImages,
                        { scale: 1.5 },
                        { scale: 1, duration: durationIn },
                        0 // Start immediately
                    );
                    tl.set(currentSlide, { display: "none" }, durationIn);
                    tl.set(newSlide, { zIndex: "auto" }, durationIn);
                }
                return tl;
            },
            ".carousel-slides_num": (parent, currentSlide, newSlide) => {
                const tl = gsap.timeline();
                if (currentSlide) {
                    tl.fromTo(
                        currentSlide,
                        { opacity: 1, scale: 1 },
                        {
                            opacity: 0,
                            scale: 0.9,
                            duration: durationOut,
                            ease: "power2.out",
                            display: "none",
                        }
                    );
                }
                if (newSlide) {
                    tl.set(newSlide, { display: "block" });
                    tl.fromTo(
                        newSlide,
                        { opacity: 0, y: "100%", scale: 1 },
                        { opacity: 1, y: 0, duration: durationIn / 1.5 }
                    );
                }
                return tl;
            },
        };

        // Function to update slides
        function updateSlides(newIndex) {
            slideSets.forEach((slideSet) => {
                const parent = carousel.find(slideSet);
                const currentSlide = parent.find(`.slide${activeIndex + 1}`);
                const newSlide = parent.find(`.slide${newIndex + 1}`);

                // // Ensure new slide is visible but hidden initially
                // gsap.set(newSlide, { display: "block", opacity: 0 });

                // Call the appropriate animation function
                const animate = animationFunctions[slideSet];
                if (animate) {
                    animate(parent, currentSlide, newSlide).then(() => {
                        // Allow transitions after the last slide set is done
                        if (slideSet === slideSets[slideSets.length - 1]) {
                            activeIndex = newIndex;
                            isTransitioning = false;
                        }
                    });
                }
            });

            isTransitioning = true; // Prevent clicks during transition
        }

        function nextSlide() {
            if (isTransitioning) return;
            const newIndex = (activeIndex + 1) % 4; // Assuming 4 slides total
            updateSlides(newIndex);
            shakeImage();
        }

        function prevSlide() {
            if (isTransitioning) return;
            const newIndex = (activeIndex - 1 + 4) % 4; // Assuming 4 slides total
            updateSlides(newIndex);
            shakeImage();
        }

        // Initial state: ensure slide1 is active for all sets and others are hidden
        slideSets.forEach((slideSet) => {
            for (let i = 1; i <= 4; i++) {
                const slide = carousel.find(`${slideSet} .slide${i}`);
                if (i === 1) {
                    slide.css({ display: "block", opacity: 1 });
                } else {
                    slide.css({ display: "none", opacity: 0 });
                }
            }
        });

        // Event handlers for next and previous buttons
        carousel.find(".carousel_next").on("click", nextSlide);
        carousel.find(".carousel_prev").on("click", prevSlide);
    });
}
