const images = ['terraza.jpg', 'tapa1.jpg', 'tapa2.jpg'];
let i = 0;
const slider = document.getElementById('background-slider');

function updateSlider() {
    // Cambiar imagen
    slider.style.backgroundImage = `url(${images[i]})`;
    
    // Reiniciar animación de zoom
    slider.style.transition = 'none';
    slider.style.transform = 'scale(1.2)';
    
    setTimeout(() => {
        slider.style.transition = 'background-image 2s ease, transform 10s linear';
        slider.style.transform = 'scale(1)';
    }, 50);

    i = (i + 1) % images.length;
}

setInterval(updateSlider, 6000);
updateSlider();

// Scroll detector para la barra
window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    window.scrollY > 100 ? nav.classList.add('scrolled') : nav.classList.remove('scrolled');
});
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.8s ease-out";
    observer.observe(card);
});
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('touchstart', function() {
        this.classList.toggle('active-mobile');
    });
});
document.querySelector('.back-to-top').addEventListener('click', function(e) {
    e.preventDefault(); // Bloqueamos el salto brusco por defecto
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // El efecto "seda" que hace que suba fluido
    });
});
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.style.opacity = "1";
        backToTop.style.pointerEvents = "auto";
    } else {
        backToTop.style.opacity = "0";
        backToTop.style.pointerEvents = "none";
    }
});
const modal = document.getElementById("carta-modal");
const btnCarta = document.querySelectorAll('.nav-carta, .btn-card');
const span = document.getElementsByClassName("close-modal")[0];

// Al hacer clic en cualquier botón de carta, se abre
btnCarta.forEach(btn => {
    btn.onclick = function(e) {
        e.preventDefault();
        modal.style.display = "flex";
        modal.style.alignItems = "center";
    }
});

// Cerrar al darle a la X o fuera de la imagen
span.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
}
// --- 1. FUNCIÓN VIBRACIÓN DE LUJO (Haptic Feedback) ---
// Solo funciona en Android con soporte de vibración, pero queda mortal.
function vibrarToque() {
    if (navigator.vibrate) {
        navigator.vibrate(15); // Un toque de 15ms casi imperceptible pero elegante
    }
}

// Aplicar a todos los botones importantes
document.querySelectorAll('.gold-btn, .nav-reserva-gold, .mobile-whatsapp-btn, .close-modal').forEach(boton => {
    boton.addEventListener('click', vibrarToque);
});


// --- 2. CONTROL DEL BOTÓN "ATRÁS" (Para el Modal de la Carta) ---
// Si abren la carta y dan atrás en el móvil, cerramos el modal en vez de ir a Google
const btnCartaMobile = document.querySelectorAll('.nav-carta, .btn-card');
const modalCarta = document.getElementById("carta-modal");

btnCartaMobile.forEach(btn => {
    btn.addEventListener('click', () => {
        // Al abrir, añadimos un estado al historial
        history.pushState({modalOpen: true}, "");
    });
});

// Detectamos cuando el usuario da atrás
window.onpopstate = function(event) {
    if (modalCarta.style.display === "flex") {
        modalCarta.style.display = "none";
    }
};


// --- 3. REFRESH DEL SLIDER PARA MÓVIL (Optimización) ---
// Evita que el zoom del slider se quede pillado si el móvil cambia de orientación
window.addEventListener('orientationchange', () => {
    updateSlider();
});


// --- 4. MEJORA DEL SCROLL EN EL NAV ---
// Hacemos que la barra se esconda al bajar y aparezca al subir (ahorra espacio)
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const nav = document.getElementById('mainNav');

    if (currentScroll > lastScroll && currentScroll > 150) {
        // Bajando: escondemos nav
        nav.style.transform = "translateY(-100%)";
    } else {
        // Subiendo: mostramos nav
        nav.style.transform = "translateY(0)";
    }
    lastScroll = currentScroll;
});
