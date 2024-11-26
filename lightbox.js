function numWithZeros(num) {
    if (num < 10) {
        return "00" + num;
    } else if (num < 100) {
        return "0" + num;
    } else {
        return num;
    }
}

$(".lightbox_wrap").each(function (index) {
    // Update total number of slides
    let totalSlides = numWithZeros(
        $(this).find(".swiper-slide.is-lightbox-info").length
    );
    $(".lbx_total_slides").text(totalSlides);

    const bgSwiper = new Swiper($(this).find(".swiper.is-lightbox-bg")[0], {
        slidesPerView: 1,
        speed: 500,
        effect: "fade",
        allowTouchMove: false,
        loop: true,
    });

    const thumbsSwiper = new Swiper(
        $(this).find(".swiper.is-lightbox-thumbs")[0],
        {
            slidesPerView: 1,
            speed: 500,
            loop: true,
            slideToClickedSlide: true,
            mousewheel: true,
            slideActiveClass: "is-active",
            slideDuplicateActiveClass: "is-active",
        }
    );

    const imageSwiper = new Swiper($(this).find(".swiper.is-lightbox-image")[0], {
        slidesPerView: 1,
        speed: 300,
        loop: true,
        allowTouchMove: false,
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
        thumbs: {
            swiper: bgSwiper,
        },
    });

    const infoSwiper = new Swiper($(this).find(".swiper.is-lightbox-info")[0], {
        slidesPerView: 1,
        speed: 300,
        keyboard: true,
        mousewheel: true,
        allowTouchMove: false,
        loop: true,
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
        thumbs: {
            swiper: imageSwiper,
        },
        navigation: {
            nextEl: $(this).find(".swiper-next")[0],
            prevEl: $(this).find(".swiper-prev")[0],
        },
    });

    infoSwiper.controller.control = thumbsSwiper;
    thumbsSwiper.controller.control = infoSwiper;

    infoSwiper.on("slideChange", function (e) {
        let slideNum = numWithZeros(e.realIndex + 1);

        $(".lbx_this_slide").text(slideNum);
    });
});