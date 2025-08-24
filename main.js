function initProjectModal() {
  const projectData = [
    {
      title: 'Mesa de Centro',
      img: 'assets/AgresteTransparente.png',
      desc: 'Diseño minimalista con madera de roble.'
    },
    {
      title: 'Estantería Modular',
      img: 'assets/logo.png',
      desc: 'Solución personalizada para espacios reducidos.'
    },
    {
      title: 'Mobiliario Comercial',
      img: 'assets/Agreste_logo_black.png',
      desc: 'Diseño integral para tienda de ropa.'
    }
  ];

  const projectModal = document.getElementById('projectModal');
  const projectModalLabel = document.getElementById('projectModalLabel');
  const projectModalImg = document.getElementById('projectModalImg');
  const projectModalDesc = document.getElementById('projectModalDesc');

  document.querySelectorAll('.btn-view').forEach((btn, idx) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const data = projectData[idx] || projectData[0];
      projectModalLabel.textContent = data.title;
      projectModalImg.src = data.img;
      projectModalDesc.textContent = data.desc;
      const modal = new bootstrap.Modal(projectModal);
      modal.show();
    });
  });

  const verTodosBtn = document.querySelector('.btn.btn-custom.btn-lg');
  if (verTodosBtn) {
    verTodosBtn.addEventListener('click', function (e) {
      e.preventDefault();
      projectModalLabel.textContent = 'Todos los Proyectos';
      projectModalImg.src = 'assets/Agreste_logo_white.png';
      projectModalDesc.textContent = 'Aquí podrías mostrar una galería o listado de todos tus proyectos destacados.';
      const modal = new bootstrap.Modal(projectModal);
      modal.show();
    });
  }
}

function initCategorySlider() {
  const catSlider = document.getElementById('catSlider');
  const cards = Array.from(catSlider.getElementsByClassName('category-card'));
  let start = 0;
  const visible = 4; // Número de categorías visibles a la vez

  function updateSliderWidth() {
    catSlider.style.width = (cards.length * 340 + (cards.length - 1) * 24) + 'px';
  }
  updateSliderWidth();

  function updateSlider() {
    const offset = start * (340 + 24); // ancho tarjeta + gap
    catSlider.style.transform = `translateX(-${offset}px)`;
    catSlider.style.transition = 'transform 0.5s cubic-bezier(.4,1.4,.6,1)';
  }

  document.getElementById('catPrev').onclick = function () {
    if (start > 0) {
      start--;
      updateSlider();
    }
  };
  document.getElementById('catNext').onclick = function () {
    if (start < cards.length - visible) {
      start++;
      updateSlider();
    }
  };
  updateSlider();
}

document.addEventListener('DOMContentLoaded', () => {
  initProjectModal();
  initCategorySlider();
});
