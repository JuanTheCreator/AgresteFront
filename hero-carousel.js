document.addEventListener('DOMContentLoaded', function () {
  const heroCarousel = document.querySelector('#heroCarousel');
  if (heroCarousel) {
    new bootstrap.Carousel(heroCarousel, {
      interval: 5000,
      ride: 'carousel',
      pause: false
    });
  }
});
