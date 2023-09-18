
  const container = document.querySelector(".container");
  const carousel = document.querySelector(".carousel");
  const firstCardWidth = carousel.querySelector(".card").offsetWidth;
  const arrowBtns = document.querySelectorAll(".container i");
  const carouselChildrens = [...carousel.children];

  let isDragging = false, isAutoPlay = false, startX, startScrollLeft, timeoutId;

  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

  carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

 carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
 });

 carousel.classList.add("no-transition");
 carousel.scrollLeft = carousel.offsetWidth
 carousel.classList.remove("no-transition");

 arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
 });

 const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
 }

 const dragging = (e) => {
  if(!isDragging) return; 
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
 }

 const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
 }

 const infiniteScroll = () => {
  if(carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  } 
  else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
  carousel.classList.add("no-transition");
  carousel.scrollLeft = carousel.offsetWidth;
  carousel.classList.remove("no-transition")
  } 
}

 const autoPlay = () => {
  if(window.innerWidth < 900 || !isAutoPlay) return;
  timeoutId = setTimeout(() => carousel.scrollLeft + firstCardWidth, 2500);
 }

 autoPlay();

 carousel.addEventListener("mousedown", dragStart);
 carousel.addEventListener("mousemove", dragging);
 document.addEventListener("mouseup", dragStop);
 carousel.addEventListener("scroll", infiniteScroll);
 container.addEventListener("mouseenter", () => clearTimeout(timeoutId));
 container.addEventListener("mouseleave", autoPlay);

 $(document).ready(function () {
  $(".hamburguer").click(function () {
      $(this).toggleClass("active");
      $(".navegacao").toggleClass("active");
  });
});


