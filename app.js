// El título “Match Game” debe tener una animación que cambie de color
function colorBlink(selector) {
	$(selector).animate({
			opacity: '1',
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
			},
			queue: true
		}, 600)
		.delay(500)
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
				colorBlink('h1.main-titulo');
			},
			queue: true
		});
}
// funcion para generar números aleatorios y llenar el tablero con los diferentes dulces
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
//verificar estado del tablero
function checkBoard() {
	fillBoard();
}
// Se deben generar los dulces aleatoriamente en el tablero, llenándolo todo al principio del juego
function fillBoard() {
	var top = 7;
	var column = $('[class^="col-"]');
	column.each(function () {
		var candys = $(this).children().length;
		var agrega = top - candys;
		for (var i = 0; i < agrega; i++) {
			var candyType = getRandomInt(1, 5);
			if (i === 0 && candys < 1) {
				$(this).append('<img src="image/' + candyType + '.png" class="elemento"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + candyType + '.png" class="elemento"></img>');
			}
		}
	});
	addCandyEvents();
	setValidations();
}
//Cada vez que se realice una combinación de 3 dulces o más dulces en línea, y posteriormente desaparezcan,
function setValidations() {
	columnValidation();
	rowValidation();
	// Si hay dulces que borrar
	if ($('img.delete').length !== 0) {
		deletesCandyAnimation();
	}
}
//La interacción del usuario con el elemento dulce debe ser de drag & drop.
function addCandyEvents() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: constrainCandyMovement
	});
	$('img').droppable({
		drop: swapCandy
	});
	enableCandyEvents();
}
// Verificar si hay como mínimo tres dulces del mismo tipo en línea, en caso tal, deben desaparecer con un efecto animado.
//Cada vez que el jugador realice un movimiento, debe aumentarse un contador que se muestra en pantalla.
//para las columnas
function columnValidation() {
	for (var j = 0; j < 7; j++) { 
		var counter = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var candyColumn = candyColumns(j);
		var comparisonValue = candyColumn.eq(0);
		var gap = false;
		for (var i = 1; i < candyColumn.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyColumn.eq(i).attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					candyPosition.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = candyColumn.eq(i);
		}
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		candyCount = candyPosition.length;
		if (candyCount >= 3) {
			deleteColumnCandy(candyPosition, candyColumn);
			setScore(candyCount);
		}
	}
}
function deleteColumnCandy(candyPosition, candyColumn) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyColumn.eq(candyPosition[i]).addClass('delete');
	}
}
// Para las filas
function rowValidation() {
	for (var j = 0; j < 6; j++) {
		var counter = 0;
		var candyPosition = [];
		var extraCandyPosition = [];
		var candyRow = candyRows(j);
		var comparisonValue = candyRow[0];
		var gap = false;
		for (var i = 1; i < candyRow.length; i++) {
			var srcComparison = comparisonValue.attr('src');
			var srcCandy = candyRow[i].attr('src');

			if (srcComparison != srcCandy) {
				if (candyPosition.length >= 3) {
					gap = true;
				} else {
					candyPosition = [];
				}
				counter = 0;
			} else {
				if (counter == 0) {
					if (!gap) {
						candyPosition.push(i - 1);
					} else {
						extraCandyPosition.push(i - 1);
					}
				}
				if (!gap) {
					candyPosition.push(i);
				} else {
					extraCandyPosition.push(i);
				}
				counter += 1;
			}
			comparisonValue = candyRow[i];
		}
		if (extraCandyPosition.length > 2) {
			candyPosition = $.merge(candyPosition, extraCandyPosition);
		}
		if (candyPosition.length <= 2) {
			candyPosition = [];
		}
		candyCount = candyPosition.length;
		if (candyCount >= 3) {
			deleteHorizontal(candyPosition, candyRow);
			setScore(candyCount);
		}
	}
}
function deleteHorizontal(candyPosition, candyRow) {
	for (var i = 0; i < candyPosition.length; i++) {
		candyRow[candyPosition[i]].addClass('delete');
	}
}
function giveCandyArrays(arrayType, index) {
	var candyCol1 = $('.col-1').children();
	var candyCol2 = $('.col-2').children();
	var candyCol3 = $('.col-3').children();
	var candyCol4 = $('.col-4').children();
	var candyCol5 = $('.col-5').children();
	var candyCol6 = $('.col-6').children();
	var candyCol7 = $('.col-7').children();
	var candyColumns = $([candyCol1, candyCol2, candyCol3, candyCol4,
		candyCol5, candyCol6, candyCol7
	]);

	if (typeof index === 'number') {
		var candyRow = $([candyCol1.eq(index), candyCol2.eq(index), candyCol3.eq(index),
			candyCol4.eq(index), candyCol5.eq(index), candyCol6.eq(index),
			candyCol7.eq(index)
		]);
	} else {
		index = '';
	}
	if (arrayType === 'columns') {
		return candyColumns;
	} else if (arrayType === 'rows' && index !== '') {
		return candyRow;
	}
}
// filas Cada vez que se realice una combinación de 3 dulces o más en línea, y posteriormente desaparezcan
function candyRows(index) {
	var candyRow = giveCandyArrays('rows', index);
	return candyRow;
}
//  colunmnas Cada vez que se realice una combinación de 3 dulces o más en línea, y posteriormente desaparezcan
function candyColumns(index) {
	var candyColumn = giveCandyArrays('columns');
	return candyColumn[index];
}
//Llevar puntaje, Cada vez que se alteren los elementos del tablero, 
//se debe verificar si hay dulces en línea, no necesariamente con un movimiento del jugador se pueden anotar puntos.
function setScore(candyCount) {
	var score = Number($('#score-text').text());
	switch (candyCount) {
		case 3:
			score += 25;
			break;
		case 4:
			score += 50;
			break;
		case 5:
			score += 75;
			break;
		case 6:
			score += 100;
			break;
		case 7:
			score += 200;
	}
	$('#score-text').text(score);
}
// Cada vez que se realice una combinación de 3 dulces o más en línea, y posteriormente desaparezcan, 
//estos espacios se deben llenar con los dulces inmediatamente anteriores verticalmente a los espacios; 
//creando nuevos dulces aleatorios para llenar en la parte de arriba del tablero. 
//Esto debe mostrar un efecto en el que la gravedad hace que todos los dulces se desplacen hacia abajo y 
//se llenen los nuevos desde la parte superior del tablero.
function constrainCandyMovement(event, candyDrag) {
	candyDrag.position.top = Math.min(100, candyDrag.position.top);
	candyDrag.position.bottom = Math.min(100, candyDrag.position.bottom);
	candyDrag.position.left = Math.min(100, candyDrag.position.left);
	candyDrag.position.right = Math.min(100, candyDrag.position.right);
}
function swapCandy(event, candyDrag) {
	var candyDrag = $(candyDrag.draggable);
	var dragSrc = candyDrag.attr('src');
	var candyDrop = $(this);
	var dropSrc = candyDrop.attr('src');
	candyDrag.attr('src', dropSrc);
	candyDrop.attr('src', dragSrc);
	setTimeout(function () {
		checkBoard();
		if ($('img.delete').length === 0) {
			candyDrag.attr('src', dragSrc);
			candyDrop.attr('src', dropSrc);
		} else {
			updateMoves();
		}
	}, 500);
}
//Cada vez que se alteren los elementos del tablero, 
//se debe verificar si hay dulces en línea, no necesariamente con un movimiento del jugador se pueden anotar puntos
function checkBoardPromise(result) {
	if (result) {
		checkBoard();
	}
}
function updateMoves() {
	var actualValue = Number($('#movimientos-text').text());
	var result = actualValue += 1;
	$('#movimientos-text').text(result);
}
//Verificar si hay como mínimo tres dulces del mismo tipo en línea, 
//en caso tal, deben desaparecer con un efecto animado. 
function deletesCandyAnimation() {
	disableCandyEvents();
	$('img.delete').effect('pulsate', 400);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				deletesCandy()
					.then(checkBoardPromise)
					.catch(showPromiseError);
			},
			queue: true
		});
}
function showPromiseError(error) {
	console.log(error);
}
function deletesCandy() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar Candy...');
		}
	})
}
function disableCandyEvents() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}
function enableCandyEvents() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}
//El botón de Iniciar en la parte inferior izquierda, debe cambiar su contenido a Reiniciar una vez se oprima por primera vez. 
//Al presionar reiniciar se debe volver a cargar la página para empezar un nuevo juego.
//Fin del juego
function endGame() {
	$('div.panel-tablero, div.time').toggle("scale",500); 
	$('.panel-score').animate({width: "390%", fontSize: "1.5em" }, 1000);
	$( "h2.sub-titulo" ).show();
}
// inicio del juego
function initGame() {
	colorBlink('h1.main-titulo');
	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		checkBoard();
		$(this).text('Reiniciar');
		$('#timer').timer({
			duration: '2m',
      		format: '%M:%S',
      		callback: function() {
        		endGame();
    		}
		})
	});
}
// Prepara el juego
$(function() {
	initGame();
});