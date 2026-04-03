document.addEventListener("DOMContentLoaded", () => {
  // 1. PERFECT TYPING ENGINE (Only runs if #typed-text exists on the page)
  const typedTextSpan = document.getElementById("typed-text");

  if (typedTextSpan) {
    const wordsArray = ["Zenith.", "Creative.", "Awesome."];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = wordsArray[wordIndex];

      if (isDeleting) {
        // Remove a character
        typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        // Add a character
        typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      // Base speeds
      let typeSpeed = isDeleting ? 40 : 120;

      if (!isDeleting && charIndex === currentWord.length) {
        // Pause at the end of the word before deleting
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        // Move to next word
        wordIndex = (wordIndex + 1) % wordsArray.length;
        // Pause before typing next word
        typeSpeed = 500;
      }

      setTimeout(typeEffect, typeSpeed);
    }

    // Start typing
    setTimeout(typeEffect, 1000);
  }

  // 2. SLIDER LOGIC (Only runs if it finds the slider HTML elements)
  const slide1 = document.getElementById("bg-slide-1");
  const slide2 = document.getElementById("bg-slide-2");
  const dotContainer = document.getElementById("carousel-dots");

  if (slide1 && slide2 && dotContainer) {
    const sliderImages = [
      "./Image/Slider-1.jpg",
      "./Image/Slider-2.jpg",
      "./Image/Slider-3.jpg",
    ];
    let slideIndex = 0;
    let activeSlideDiv = 1;
    let sliderInterval;

    sliderImages.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        slideIndex = index;
        applyImage(sliderImages[slideIndex]);
        updateDots();
        stopSlider();
        startSlider();
      });
      dotContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function updateDots() {
      dots.forEach((dot, index) => {
        if (index === slideIndex) dot.classList.add("active");
        else dot.classList.remove("active");
      });
    }

    function applyImage(imgUrl) {
      const currentSlide = activeSlideDiv === 1 ? slide1 : slide2;
      const nextSlide = activeSlideDiv === 1 ? slide2 : slide1;

      nextSlide.style.backgroundImage = `url('${imgUrl}')`;
      nextSlide.classList.add("active");
      currentSlide.classList.remove("active");

      activeSlideDiv = activeSlideDiv === 1 ? 2 : 1;
    }

    function startSlider() {
      sliderInterval = setInterval(() => {
        slideIndex = (slideIndex + 1) % sliderImages.length;
        applyImage(sliderImages[slideIndex]);
        updateDots();
      }, 6000);
    }

    function stopSlider() {
      if (sliderInterval) clearInterval(sliderInterval);
    }

    slide1.style.backgroundImage = `url('${sliderImages[0]}')`;
    startSlider();
  }
});
