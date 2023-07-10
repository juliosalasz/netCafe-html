$(document).ready(function () {
  const wrapper = $(".wrapper");
  const wrapper2 = $(".wrapper2");
  const carousel = $(".carouselM");
  const carousel2 = $(".carousel2");
  const firstCardWidth = carousel.find(".atlanta-card").outerWidth();
  const arrowBtns = $(".wrapper i");
  const arrowBtns2 = $(".wrapper2 i");
  const carouselChildrens = carousel.children().get();
  const carousel2Childrens = carousel2.children().get();

  let isDragging = false,
    startX,
    startScrollLeft,
    timeoutId;

  // Get the number of cards that can fit in the carousel at once
  let cardPerView = Math.round(carousel.width() / firstCardWidth);

  // Insert copies of the last few cards to the beginning of the carousel for infinite scrolling

  $(carouselChildrens.slice(-cardPerView).reverse()).each(function (
    index,
    card
  ) {
    carousel.prepend($(card).prop("outerHTML"));
  });

  $(carousel2Childrens.slice(-cardPerView).reverse()).each(function (
    index,
    card
  ) {
    carousel2.prepend($(card).prop("outerHTML"));
  });

  // Insert copies of the first few cards to the end of the carousel for infinite scrolling
  $(carouselChildrens)
    .slice(0, cardPerView)
    .each(function (index, card) {
      carousel.append($(card).prop("outerHTML"));
    });

  $(carousel2Childrens)
    .slice(0, cardPerView)
    .each(function (index, card) {
      carousel2.append($(card).prop("outerHTML"));
    });

  // Scroll the carousel at the appropriate position to hide the first few duplicate cards on Firefox
  carousel.addClass("no-transition");
  carousel.scrollLeft(carousel.width());
  carousel.removeClass("no-transition");

  // Add event listeners for the arrow buttons to scroll the carousel left and right
  arrowBtns.each(function (index, btn) {
    $(btn).on("click", function () {
      carousel.animate(
        {
          scrollLeft:
            carousel.scrollLeft() +
            (this.id == "left" ? -firstCardWidth : firstCardWidth),
        },
        600
      );
    });
  });

  arrowBtns2.each(function (index, btn) {
    $(btn).on("click", function () {
      console.log(btn);
      carousel2.animate(
        {
          scrollLeft:
            carousel2.scrollLeft() +
            (this.id == "left1" ? -firstCardWidth : firstCardWidth),
        },
        600
      );
    });
  });

  const dragStart = function (e) {
    isDragging = true;
    carousel.addClass("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft();
  };

  const dragging = function (e) {
    if (!isDragging) return; // If isDragging is false, return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft(startScrollLeft - (e.pageX - startX));
  };

  const dragStop = function () {
    isDragging = false;
    carousel.removeClass("dragging");
  };

  const infiniteScroll = function () {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft() === 0) {
      carousel.addClass("no-transition");
      carousel.scrollLeft(carousel.get(0).scrollWidth - 2 * carousel.width());
      carousel.removeClass("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (
      Math.ceil(carousel.scrollLeft()) ===
      carousel.get(0).scrollWidth - carousel.width()
    ) {
      carousel.addClass("no-transition");
      carousel.scrollLeft(carousel.width());
      carousel.removeClass("no-transition");
    }

    // Clear existing timeout & start autoplay if the mouse is not hovering over the carousel
    clearTimeout(timeoutId);
  };

  carousel.on("mousedown", dragStart);
  carousel.on("mousemove", dragging);
  $(document).on("mouseup", dragStop);
  carousel.on("scroll", infiniteScroll);
  wrapper.on("mouseenter", function () {
    clearTimeout(timeoutId);
  });
});
