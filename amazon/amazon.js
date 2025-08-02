console.log("Amazon Clone Loaded!");
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showNextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

setInterval(showNextSlide, 2000); // Change slide every 2 seconds

function setStarRatings() {
  const ratings = document.querySelectorAll(".rating-stars");

  ratings.forEach(rating => {
    const value = parseFloat(rating.getAttribute("data-rating"));
    const percentage = (value / 5) * 100;
    const inner = rating.querySelector(".stars-inner");
    inner.style.width = `${percentage}%`;
  });
}

setStarRatings();
