# JuegoFrameworks
Frameworks y Librerías
Objetivo:
Desarrollar un juego de asociación de imágenes poniendo en práctica tus conocimientos en los frameworks y librerías de JavaScript, haciendo uso de animaciones y efectos.

Requerimientos generales:
Para el desarrollo de este proyecto debes basarte en el siguiente Proyecto Base . Allí encontrarás el diseño de la página, el tablero de juego con una estructura de 7 filas y 7 columnas para ubicar los dulces, las imágenes de los dulces, y las pantallas que muestran información sobre el juego.

El videojuego que desarrolles debe permitir a un jugador iniciar una partida, en la que debe hacer emparejamientos de mínimo 3 dulces del mismo tipo en línea, al lograrlo, se deben sumar los puntos correspondientes y los dulces en cuestión deben desaparecer, permitiendo que más dulces generados aleatoriamente ocupen su lugar. El jugador con mayor cantidad de puntos al finalizar el tiempo es el ganador.

Los requerimientos específicos de este proyecto son:
1. El título “Match Game” debe tener una animación que cambie de color después de determinado tiempo, posteriormente vuelva al color original, y permanezca cambiando entre dos colores indefinidamente.
2. Se deben generar los dulces aleatoriamente en el tablero, llenándolo todo al principio del juego. Cada vez que se realice una combinación de 3 dulces o más en línea, y posteriormente desaparezcan, estos espacios se deben llenar con los dulces inmediatamente anteriores verticalmente a los espacios; creando nuevos dulces aleatorios para llenar en la parte de arriba del tablero. Esto debe mostrar un efecto en el que la gravedad hace que todos los dulces se desplacen hacia abajo y se llenen los nuevos desde la parte superior del tablero.
3. Verificar si hay como mínimo tres dulces del mismo tipo en línea, en caso tal, deben desaparecer con un efecto animado. Esto debe sumar puntos en el puntaje general.
4. El juego debe tener un temporizador a dos minutos, que inicie con el juego y al cumplirse el tiempo, cambie mediante animaciones el aspecto de la página eliminando el tablero de juego, y mostrando en toda la página el puntaje y el número de movimientos. Puedes aplicar un plugin externo de código abierto para implementar el temporizador en el proyecto.
5. Cada vez que el jugador realice un movimiento, debe aumentarse un contador que se muestra en pantalla.
6. El botón de Iniciar en la parte inferior izquierda, debe cambiar su contenido a Reiniciar una vez se oprima por primera vez. Al presionar reiniciar se debe volver a cargar la página para empezar un nuevo juego.
7. La interacción del usuario con el elemento dulce debe ser de drag & drop.
8. Cada vez que se alteren los elementos del tablero, se debe verificar si hay dulces en línea, no necesariamente con un movimiento del jugador se pueden anotar puntos.
9. Debes usar la función setTimeout de JavaScript para retrasar la ejecución de funciones según un tiempo determinado, con el fin de darle un orden a las animaciones y acciones que interactúan en el juego.
