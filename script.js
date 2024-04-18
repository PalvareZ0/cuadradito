// reloj

function mostrarReloj() {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const ahora = new Date();
    const diaSemana = diasSemana[ahora.getDay()];
    const dia = ahora.getDate();
    const mes = meses[ahora.getMonth()];
    const año = ahora.getFullYear();
    let hora = ahora.getHours();
    let minuto = ahora.getMinutes();

    // Agregar un cero inicial si los minutos son menores a 10
    if (minuto < 10) {
        minuto = '0' + minuto;
    }

    const reloj = document.getElementById('clock');
    reloj.innerHTML = `Hoy es ${diaSemana}, ${dia} de ${mes} de ${año}<br>${hora}:${minuto}`;

    setTimeout(mostrarReloj, 1000); // Actualizar cada segundo
}

// Llamar a la función para iniciar el reloj
mostrarReloj();

// boton

document.getElementById('jugar-btn').addEventListener('click', function() {
    // Ocultar todos los elementos en la pantalla
    document.querySelectorAll('.container, #clock').forEach(function(element) {
        element.style.display = 'none';
    });

    // Crear un cuadrado negro
    const square = document.createElement('div');
    square.id = 'square';
    square.classList.add('square');
    document.body.appendChild(square);

    // Posición inicial del cuadrado
    let x = window.innerWidth / 2 - 7.5; // Mitad del ancho del cuadrado
    let y = window.innerHeight / 2 - 7.5; // Mitad del alto del cuadrado
    square.style.left = x + 'px';
    square.style.top = y + 'px';

    // Mover el cuadrado con las flechas del teclado
    document.addEventListener('keydown', function(event) {
        const speed = 10; // Velocidad de movimiento del cuadrado

        switch(event.key) {
            case 'ArrowUp':
                y -= speed;
                break;
            case 'ArrowDown':
                y += speed;
                break;
            case 'ArrowLeft':
                x -= speed;
                break;
            case 'ArrowRight':
                x += speed;
                break;
        }

        // Limitar el movimiento del cuadrado para que no salga de la pantalla
        x = Math.max(0, Math.min(window.innerWidth - 15, x)); // Evita que el cuadrado salga del borde izquierdo y derecho
        y = Math.max(0, Math.min(window.innerHeight - 15, y)); // Evita que el cuadrado salga del borde superior e inferior

        square.style.left = x + 'px';
        square.style.top = y + 'px';
    });
});

// disparar
// Variable para mantener un registro de los proyectiles
let projectiles = [];

// Función para crear un proyectil y agregarlo al array de proyectiles
function createProjectile(x, y, direction) {
    const projectile = document.createElement('div');
    projectile.classList.add('projectile');
    projectile.style.backgroundColor = 'yellow';
    projectile.style.width = '5px';
    projectile.style.height = '5px';
    projectile.style.position = 'fixed';
    projectile.style.left = x + 'px';
    projectile.style.top = y + 'px';
    document.body.appendChild(projectile);

    // Actualizar la posición del proyectil
    const speed = 5; // Velocidad del proyectil
    const moveInterval = setInterval(function() {
        switch(direction) {
            case 'left':
                x -= speed;
                break;
            case 'right':
                x += speed;
                break;
            case 'up':
                y -= speed;
                break;
            case 'down':
                y += speed;
                break;
        }
        // Eliminar el proyectil si sale de la pantalla
        if (x < 0 || x > window.innerWidth || y < 0 || y > window.innerHeight) {
            clearInterval(moveInterval);
            projectile.remove();
        } else {
            projectile.style.left = x + 'px';
            projectile.style.top = y + 'px';
        }
    }, 10);

    projectiles.push({element: projectile, intervalId: moveInterval});
}

// Escuchar el evento de teclas presionadas
document.addEventListener('keydown', function(event) {
    if (event.key === 'Shift') {
        const square = document.getElementById('square');
        const squareRect = square.getBoundingClientRect();
        const squareX = squareRect.left + squareRect.width / 2;
        const squareY = squareRect.top + squareRect.height / 2;

        // Crear proyectil dependiendo de la dirección
        createProjectile(squareX, squareY, 'left');
        createProjectile(squareX, squareY, 'right');
        createProjectile(squareX, squareY, 'up');
        createProjectile(squareX, squareY, 'down');
    }
});
