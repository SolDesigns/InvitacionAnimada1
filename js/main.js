//////////////////////////////////////
// Detectar scroll y marcar dot///////
//////////////////////////////////////

const track = document.querySelector('.carrusel-track');
const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.carrusel-track img');

function updateDots(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

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

//////////////////////////////////////
// ///////Cuenta Regresiva///////////
//////////////////////////////////////
async function iniciarCuenta() {
  try {
    const response = await fetch('/assets/data/evento.json');
    const data = await response.json();
    const fechaEvento = new Date(data.evento.fecha).getTime();

    function actualizarCuenta() {
      const ahora = new Date().getTime();
      const diferencia = fechaEvento - ahora;

      if (diferencia <= 0) {
        document.getElementById("dias").innerText = "00";
        document.getElementById("horas").innerText = "00";
        document.getElementById("minutos").innerText = "00";
        document.getElementById("segundos").innerText = "00";
        clearInterval(intervalo);
        return;
      }

      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

      document.getElementById("dias").innerText = dias.toString().padStart(2, "0");
      document.getElementById("horas").innerText = horas.toString().padStart(2, "0");
      document.getElementById("minutos").innerText = minutos.toString().padStart(2, "0");
      document.getElementById("segundos").innerText = segundos.toString().padStart(2, "0");
    }

    actualizarCuenta(); // actualizar inmediatamente
    const intervalo = setInterval(actualizarCuenta, 1000);
  } catch (error) {
    console.error("Error cargando la fecha del evento:", error);
  }
}

document.addEventListener("DOMContentLoaded", iniciarCuenta);