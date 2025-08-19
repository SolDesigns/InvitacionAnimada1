const track = document.querySelector('.carrusel-track');
const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.carrusel-track img');

function updateDots(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Detectar scroll y marcar dot
track.addEventListener('scroll', () => {
  const slideWidth = slides[0].offsetWidth + 16; // img + gap
  const index = Math.round(track.scrollLeft / slideWidth);
  updateDots(index);
});

// Click en dots → mover carrusel
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    track.scrollTo({
      left: i * (slides[0].offsetWidth + 16),
      behavior: 'smooth'
    });
  });
});