// ===== MAIN JAVASCRIPT =====

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initFeaturedTabs();
    initScrollAnimations();
});

// ===== FUNCIONALIDAD DE PESTAÑAS DESTACADOS =====
function initFeaturedTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remover clase active de todos los botones
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Remover clase active de todos los contenidos
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            // Mostrar el contenido correspondiente
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// ===== ANIMACIONES DE SCROLL =====
function initScrollAnimations() {
    // Configuración de AOS (Animate On Scroll) si está disponible
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Animación personalizada para las tarjetas destacadas
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar todas las tarjetas destacadas
    const featuredCards = document.querySelectorAll('.featured-card');
    featuredCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ===== SMOOTH SCROLL PARA ENLACES INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== LAZY LOADING PARA IMÁGENES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ===== UTILIDADES =====
// Función para mostrar/ocultar elementos con animación
function toggleElement(element, show = true) {
    if (show) {
        element.style.display = 'block';
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 10);
    } else {
        element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, 300);
    }
}

// Función para formatear precios
function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(price);
}

// Datos de productos para el modal
const productData = {
    'Mesa de Centro Moderna': {
        title: 'Mesa de Centro Moderna',
        price: '$650.000',
        description: 'Mesa de centro con diseño contemporáneo, perfecta para salas modernas. Combina funcionalidad y estilo elegante.',
        mainImage: 'assets/ImagenesParaUsar/RPZ08172.jpg',
        thumbnails: [
            'assets/ImagenesParaUsar/RPZ08172.jpg',
            'assets/ImagenesParaUsar/RPZ08174.jpg',
            'assets/ImagenesParaUsar/RPZ08180.jpg'
        ],
        specs: [
            { label: 'Material', value: 'Madera de nogal' },
            { label: 'Dimensiones', value: '120 x 60 x 45 cm' },
            { label: 'Peso', value: '25 kg' },
            { label: 'Color', value: 'Natural' },
            { label: 'Garantía', value: '2 años' }
        ]
    },
    'Estantería Minimalista': {
        title: 'Estantería Minimalista',
        price: '$850.000',
        description: 'Estantería de diseño minimalista con líneas limpias, ideal para espacios modernos y organizados.',
        mainImage: 'assets/ImagenesParaUsar/RPZ08134.jpg',
        thumbnails: [
            'assets/ImagenesParaUsar/RPZ08134.jpg',
            'assets/ImagenesParaUsar/RPZ08145.jpg',
            'assets/ImagenesParaUsar/RPZ08122.jpg'
        ],
        specs: [
            { label: 'Material', value: 'MDF lacado' },
            { label: 'Dimensiones', value: '160 x 35 x 180 cm' },
            { label: 'Estantes', value: '5 niveles' },
            { label: 'Peso', value: '30 kg' },
            { label: 'Garantía', value: '2 años' }
        ]
    },
    'Rack TV Premium': {
        title: 'Rack TV Premium',
        price: '$750.000',
        description: 'Rack para TV con diseño premium, incluye compartimentos para equipos y cable management integrado.',
        mainImage: 'assets/ImagenesParaUsar/RACK 1.jpg',
        thumbnails: [
            'assets/ImagenesParaUsar/RACK 1.jpg',
            'assets/ImagenesParaUsar/RACK 3.jpg',
            'assets/ImagenesParaUsar/RPZ08082.jpg'
        ],
        specs: [
            { label: 'Material', value: 'Melamina resistente' },
            { label: 'Dimensiones', value: '150 x 45 x 55 cm' },
            { label: 'Soporte TV', value: 'Hasta 65 pulgadas' },
            { label: 'Peso', value: '28 kg' },
            { label: 'Garantía', value: '2 años' }
        ]
    },
    'Escritorio Ejecutivo': {
        title: 'Escritorio Ejecutivo',
        price: '$950.000',
        description: 'Elegante escritorio ejecutivo perfecto para oficinas modernas. Diseñado con materiales de alta calidad que combinan funcionalidad y estilo.',
        mainImage: 'assets/ImagenesParaUsar/RPZ08206.jpg',
        thumbnails: [
            'assets/ImagenesParaUsar/RPZ08206.jpg',
            'assets/ImagenesParaUsar/RPZ08212.jpg',
            'assets/ImagenesParaUsar/RPZ08236.jpg'
        ],
        specs: [
            { label: 'Material', value: 'Madera de roble' },
            { label: 'Dimensiones', value: '150 x 80 x 75 cm' },
            { label: 'Peso', value: '35 kg' },
            { label: 'Color', value: 'Natural' },
            { label: 'Garantía', value: '2 años' }
        ]
    },
    'Mesa Comedor Familiar': {
        title: 'Mesa Comedor Familiar',
        price: '$1.450.000',
        description: 'Mesa de comedor espaciosa perfecta para reuniones familiares. Construida con materiales duraderos y acabados elegantes.',
        mainImage: 'assets/ImagenesParaUsar/RPZ08245.jpg',
        thumbnails: [
            'assets/ImagenesParaUsar/RPZ08245.jpg',
            'assets/ImagenesParaUsar/RPZ08281.jpg',
            'assets/ImagenesParaUsar/RPZ08293.jpg'
        ],
        specs: [
            { label: 'Material', value: 'Madera maciza' },
            { label: 'Dimensiones', value: '200 x 100 x 75 cm' },
            { label: 'Capacidad', value: '8 personas' },
            { label: 'Peso', value: '45 kg' },
            { label: 'Garantía', value: '3 años' }
        ]
    },
    'Biblioteca Clásica': {
        title: 'Biblioteca Clásica',
        price: '$1.200.000',
        description: 'Biblioteca de diseño clásico con múltiples compartimentos para organizar libros y objetos decorativos.',
        mainImage: 'assets/ImagenesParaUsar/RPZ08281.jpg',
        thumbnails: [
            'assets/ImagenesParaUsar/RPZ08281.jpg',
            'assets/ImagenesParaUsar/RPZ08285.jpg',
            'assets/ImagenesParaUsar/RPZ08293.jpg'
        ],
        specs: [
            { label: 'Material', value: 'MDF enchapado' },
            { label: 'Dimensiones', value: '180 x 40 x 200 cm' },
            { label: 'Estantes', value: '6 niveles ajustables' },
            { label: 'Peso', value: '40 kg' },
            { label: 'Garantía', value: '2 años' }
        ]
    },
    'Cómoda Vintage': {
        title: 'Cómoda Vintage',
        price: '$890.000',
        description: 'Cómoda con estilo vintage, perfecta para dormitorios con personalidad. Incluye múltiples cajones con herrajes de calidad.',
        mainImage: 'assets/ImagenesParaUsar/RPZ08311.jpg',
        thumbnails: [
            'assets/ImagenesParaUsar/RPZ08311.jpg',
            'assets/ImagenesParaUsar/RPZ08313.jpg',
            'assets/ImagenesParaUsar/RPZ08321.jpg'
        ],
        specs: [
            { label: 'Material', value: 'Madera recuperada' },
            { label: 'Dimensiones', value: '120 x 45 x 85 cm' },
            { label: 'Cajones', value: '6 cajones' },
            { label: 'Peso', value: '32 kg' },
            { label: 'Garantía', value: '2 años' }
        ]
    },
    'Banco Artesanal': {
        title: 'Banco Artesanal',
        price: '$450.000',
        description: 'Banco artesanal tallado a mano con técnicas tradicionales. Pieza única que combina funcionalidad y arte.',
        mainImage: 'assets/ImagenesParaUsar/RPZ08335.jpg',
        thumbnails: [
            'assets/ImagenesParaUsar/RPZ08335.jpg',
            'assets/ImagenesParaUsar/RPZ08337.jpg',
            'assets/ImagenesParaUsar/RPZ00539.jpg'
        ],
        specs: [
            { label: 'Material', value: 'Madera maciza' },
            { label: 'Dimensiones', value: '100 x 35 x 45 cm' },
            { label: 'Capacidad', value: '2 personas' },
            { label: 'Peso', value: '18 kg' },
            { label: 'Garantía', value: '1 año' }
        ]
    },
    'Set Sala Completo': {
        title: 'Set Sala Completo',
        price: '$2.850.000',
        description: 'Set completo para sala que incluye sofá de 3 puestos, 2 poltronas y mesa de centro. Diseño moderno y confortable.',
        mainImage: 'assets/ImagenesParaUsar/RPZ00543.jpg',
        thumbnails: [
            'assets/ImagenesParaUsar/RPZ00543.jpg',
            'assets/ImagenesParaUsar/RPZ00573.jpg',
            'assets/ImagenesParaUsar/RPZ00575.jpg'
        ],
        specs: [
            { label: 'Material', value: 'Estructura de madera' },
            { label: 'Tapizado', value: 'Tela premium' },
            { label: 'Incluye', value: 'Sofá + 2 poltronas + mesa' },
            { label: 'Peso total', value: '120 kg' },
            { label: 'Garantía', value: '3 años' }
        ]
    },
    'Mueble Bar Premium': {
        title: 'Mueble Bar Premium',
        price: '$1.350.000',
        description: 'Mueble bar elegante con compartimentos especializados para botellas y copas. Perfecto para entretenimiento.',
        mainImage: 'assets/ImagenesParaUsar/RPZ00650.jpg',
        thumbnails: [
            'assets/ImagenesParaUsar/RPZ00650.jpg',
            'assets/ImagenesParaUsar/RPZ00653.jpg',
            'assets/ImagenesParaUsar/RPZ00659.jpg'
        ],
        specs: [
            { label: 'Material', value: 'Madera de cerezo' },
            { label: 'Dimensiones', value: '140 x 50 x 110 cm' },
            { label: 'Capacidad', value: '24 botellas' },
            { label: 'Peso', value: '45 kg' },
            { label: 'Garantía', value: '2 años' }
        ]
    },
    'Mesa Auxiliar Moderna': {
        title: 'Mesa Auxiliar Moderna',
        price: '$380.000',
        description: 'Mesa auxiliar con diseño moderno y funcional. Perfecta como apoyo en salas o dormitorios.',
        mainImage: 'assets/ImagenesParaUsar/RPZ00667.jpg',
        thumbnails: [
            'assets/ImagenesParaUsar/RPZ00667.jpg',
            'assets/ImagenesParaUsar/RPZ07864-Mejorado-NR.jpg',
            'assets/ImagenesParaUsar/RPZ07904.jpg'
        ],
        specs: [
            { label: 'Material', value: 'MDF lacado' },
            { label: 'Dimensiones', value: '50 x 50 x 55 cm' },
            { label: 'Peso', value: '12 kg' },
            { label: 'Color', value: 'Blanco mate' },
            { label: 'Garantía', value: '1 año' }
        ]
    },
    'Organizador Multifuncional': {
        title: 'Organizador Multifuncional',
        price: '$720.000',
        description: 'Organizador versátil con múltiples compartimentos. Ideal para oficinas o espacios de trabajo.',
        mainImage: 'assets/ImagenesParaUsar/RPZ07928.jpg',
        thumbnails: [
            'assets/ImagenesParaUsar/RPZ07928.jpg',
            'assets/ImagenesParaUsar/RPZ07932.jpg',
            'assets/ImagenesParaUsar/RPZ07938.jpg'
        ],
        specs: [
            { label: 'Material', value: 'Melamina texturizada' },
            { label: 'Dimensiones', value: '80 x 40 x 120 cm' },
            { label: 'Compartimentos', value: '8 espacios' },
            { label: 'Peso', value: '22 kg' },
            { label: 'Garantía', value: '2 años' }
        ]
    }
};

// Función para abrir el modal del producto
function openProductModal(productName) {
    const modal = document.getElementById('productModal');
    const data = productData[productName];
    
    if (!data) {
        console.error('Producto no encontrado:', productName);
        return;
    }
    
    // Actualizar contenido del modal
    document.getElementById('modalProductTitle').textContent = data.title;
    document.getElementById('modalProductPrice').textContent = data.price;
    document.getElementById('modalProductDescription').textContent = data.description;
    document.getElementById('modalMainImage').src = data.mainImage;
    
    // Actualizar thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (data.thumbnails[index]) {
            thumb.src = data.thumbnails[index];
            thumb.style.display = 'block';
            thumb.onclick = () => changeMainImage(data.thumbnails[index]);
        } else {
            thumb.style.display = 'none';
        }
    });
    
    // Actualizar especificaciones
    const specsList = document.getElementById('modalProductSpecs');
    specsList.innerHTML = '';
    data.specs.forEach(spec => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${spec.label}:</strong> <span>${spec.value}</span>`;
        specsList.appendChild(li);
    });
    
    // Mostrar modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal
function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Función para cambiar la imagen principal
function changeMainImage(imageSrc) {
    document.getElementById('modalMainImage').src = imageSrc;
    
    // Actualizar thumbnail activo
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src.includes(imageSrc.split('/').pop())) {
            thumb.classList.add('active');
        }
    });
}

// Cerrar modal al hacer click fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeProductModal();
    }
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProductModal();
    }
});

console.log('🪵 Landing Page de Carpintería - JavaScript cargado correctamente');