let slideIndex = 1;
showSlides(slideIndex);

let timer = setInterval(function() {
plusSlides(1);
}, 3000);

function plusSlides(n) {
    clearInterval(timer); // Clear the previous timer
    showSlides(slideIndex += n);
    timer = setInterval(function() {
    plusSlides(1);
    }, 3000); // Restart the timer
}

function currentSlide(n) {
    clearInterval(timer); // Clear the previous timer
    showSlides(slideIndex = n);
    timer = setInterval(function() {
    plusSlides(1);
    }, 3000); // Restart the timer
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}