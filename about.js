// About page animations
$(document).ready(function () {
    // Hero section
    let aboutLoadTl = gsap.timeline();

    aboutLoadTl.from(".about_title", {
        y: "2rem",
        opacity: 0,
        duration: 0.5,
    });
    aboutLoadTl.from(
        ".about_header",
        {
            y: "3rem",
            opacity: 0,
            duration: 0.5,
        },
        "<0.25"
    );
    aboutLoadTl.from(
        ".about_hero_graphics_wrap",
        { scale: 0.8, opacity: 0, duration: 0.5, ease: "power2.out" },
        "<0.25"
    );
    aboutLoadTl.from(
        "[data-gsap=abs-right] .abs_line_wrap",
        {
            x: "-100%",
            duration: 0.5,
            stagger: { amount: 0.3, from: "center" },
            ease: "elastic.out(1,0.5)",
        },
        ">-0.1"
    );
    aboutLoadTl.from(
        "[data-gsap=abs-left] .abs_line_wrap",
        {
            x: "100%",
            duration: 0.5,
            stagger: { amount: 0.3, from: "center" },
            ease: "elastic.out(1,0.5)",
        },
        "<"
    );
    aboutLoadTl.from(
        ".about_carousel_image",
        {
            y: "2rem",
            opacity: 0,
            stagger: 0.1,
            onComplete: startCarousel(),
        },
        0
    );


    // let loadCarousel = gsap.timeline({
    //     scrollTrigger: {
    //         markers: true,
    //         trigger: ".carousel_main",
    //         start: "top 80%",
    //         end: "bottom bottom",
    //     },
    // });

    // loadCarousel.from(".carousel_main", { opacity: 0, scale: 0.8 });
});

// Image carousel
function startCarousel() {
    const carouselContainer = document.querySelector(".about_carousel");
    const images = Array.from(
        carouselContainer.querySelectorAll(".about_carousel_image_wrap")
    );
    const delayBetweenMoves = 2500; // 2 seconds

    // Function to move each image forward by one slot according to specified logic
    function moveImages() {
        // Check if the first element has .slot1, indicating it's time to reset
        if (images[0].classList.contains("slot1")) {
            resetCarousel();
            return;
        }

        // Find and update slot classes
        const slot5Element = images.find((img) => img.classList.contains("slot5"));
        if (slot5Element) slot5Element.classList.replace("slot5", "slot-end");

        const slot4Element = images.find((img) => img.classList.contains("slot4"));
        if (slot4Element) slot4Element.classList.replace("slot4", "slot5");

        const slot3Element = images.find((img) => img.classList.contains("slot3"));
        if (slot3Element) slot3Element.classList.replace("slot3", "slot4");

        const slot2Element = images.find((img) => img.classList.contains("slot2"));
        if (slot2Element) slot2Element.classList.replace("slot2", "slot3");

        const slot1Element = images.find((img) => img.classList.contains("slot1"));
        if (slot1Element) slot1Element.classList.replace("slot1", "slot2");

        // Find the last element in the initial state (no slot class) and apply .slot1
        const lastInitialSlotElement = [...images].reverse().find((img) => {
            return (
                !img.classList.contains("slot1") &&
                !img.classList.contains("slot2") &&
                !img.classList.contains("slot3") &&
                !img.classList.contains("slot4") &&
                !img.classList.contains("slot5") &&
                !img.classList.contains("slot-end")
            );
        });
        if (lastInitialSlotElement) lastInitialSlotElement.classList.add("slot1");

        // Schedule the next move
        setTimeout(moveImages, delayBetweenMoves);
    }

    // Function to reset the carousel after reaching the end point
    function resetCarousel() {
        // Disable transition globally by adding .no-transition class
        carouselContainer.classList.add("no-transition");

        // Remove all slot classes from each image to reset to the initial state
        images.forEach((img) => {
            img.classList.remove(
                "slot1",
                "slot2",
                "slot3",
                "slot4",
                "slot5",
                "slot-end"
            );
        });

        // Reapply correct slot classes for elements 7-12
        images.slice(6, 12).forEach((img, index) => {
            if (index < 5) {
                img.classList.add(`slot${index + 1}`); // Assign slot1 through slot5
            } else {
                img.classList.add("slot-end"); // Assign slot-end to the last element
            }
        });

        // Re-enable transition after a short delay and restart the carousel
        setTimeout(() => {
            carouselContainer.classList.remove("no-transition");
            moveImages(); // Restart carousel
        }, 30); // Small delay to allow reset without transition
    }

    // Start the initial move after the delay
    setTimeout(moveImages, delayBetweenMoves);
}
