document.addEventListener("DOMContentLoaded", () => {
  // sticky header
  const stickyHeader = document.getElementById("stickyHeader");
  const hero = document.querySelector(".hero");

  window.addEventListener("scroll", () => {
    const heroBottom = hero.getBoundingClientRect().bottom;

    if (heroBottom < 0) {
      stickyHeader.classList.add("visible");
    } else {
      stickyHeader.classList.remove("visible");
    }
  });

  //  hamburger
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  hamburger.addEventListener("click", () => {
    console.log("hamburger clicked");
    hamburger.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });

  // image carousel
  const mainImage = document.querySelector("#main-image img");
  const thumbs = document.querySelectorAll(".thumb");
  const prevBtn = document.getElementById("prev-btn");
  const nxtBtn = document.getElementById("next-btn");

  const images = [
    "assets/hero-img1.jpg",
    "",
    "",
    "assets/portfolio-img1.jpg",
    "",
    "",
  ];

  let currentIndex = 0;

  function goToSlide(index) {
    currentIndex = index;
    console.log(currentIndex);

    mainImage.src = images[currentIndex];
    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle("active", i === currentIndex);
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    goToSlide(currentIndex);
  });

  nxtBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    goToSlide(currentIndex);
  });

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", () => goToSlide(i));
  });

  goToSlide(0);

  // zoom and lens feature

  // image zoom on hover
  const mainImageContainer = document.getElementById("main-image");
  const img = mainImageContainer.querySelector("img");

  // creating LensElement
  const lens = document.createElement("div");
  lens.classList.add("zoom-lens");
  mainImageContainer.appendChild(lens);

  // creating zoom result
  const zoomResult = document.createElement("div");
  zoomResult.classList.add("zoom-result");
  mainImageContainer.appendChild(zoomResult);

  const ZOOM_LEVEL = 2;

  mainImageContainer.addEventListener("mousemove", (e) => {
    if (!img.src || img.src === window.location.href) return;
    const rect = mainImageContainer.getBoundingClientRect();

    // Cursor position relative to image
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Position lens exactly on cursor
    lens.style.left = `${x - 50}px`;
    lens.style.top = `${y - 50}px`;

    // setting zoom preview
    zoomResult.style.backgroundImage = `url('${img.src}')`;
    zoomResult.style.backgroundSize = `${rect.width * ZOOM_LEVEL}px ${rect.height * ZOOM_LEVEL}px`;
    zoomResult.style.backgroundPosition = `-${x * ZOOM_LEVEL - zoomResult.offsetWidth / 2}px -${y * ZOOM_LEVEL - zoomResult.offsetHeight / 2}px`;

    const hasImage = () => img.src.includes("assets/");

    mainImageContainer.addEventListener("mouseenter", () => {
      if (!hasImage()) return;
      lens.style.display = "block";
      zoomResult.style.display = "block";
    });

    mainImageContainer.addEventListener("mouseleave", () => {
      if (!hasImage()) return;
      lens.style.display = "none";
      zoomResult.style.display = "none";
    });
  });

  // Application Carousel

  const appTrack = document.querySelector(".vers-app-sec .row-images");
  const appPrev = document.querySelector(".vers-app-sec .prev-btn");
  const appNext = document.querySelector(".vers-app-sec .next-btn");
  const appCards = document.querySelectorAll(".app-card");

  let appIndex = 0;
  // const cardWidth = 420 + 16;

  const cardWidth = appCards[0].offsetWidth + 16;

  appPrev.addEventListener("click", () => {
    appIndex = Math.max(0, appIndex - 1);
    appTrack.style.transform = `translateX(-${appIndex * cardWidth}px)`;
  });

  appNext.addEventListener("click", () => {
    appIndex = Math.min(appCards.length - 1, appIndex + 1);
    appTrack.style.transform = `translateX(-${appIndex * cardWidth}px)`;
  });

  // process tabs

  const tabs = document.querySelectorAll(".tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });
});
