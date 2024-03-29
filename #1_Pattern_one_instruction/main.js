"use strict";


//todo=================== VAR ===============
/*
Шаблон единственной инструкции var выглядит следующим образом:
*/

function func() {
	var a = 1,
			b = 2,
			sum = a + b,
			myobject = {},
			i,
			j;
	// тело функции...
	}

function updateElement() {
	var el = document.getElementById('result'),
			style = el.style;
	// Выполнение операций над переменными el и style...
}

// todo==================== FOR =============
/*
Именно поэтому при работе с циклами for лучше определять длину мас-
сива (или коллекции) заранее, как показано в следующем примере:

При таком подходе значение свойства length будет извлекаться всего
один раз за все время работы цикла.
*/
var i = 0,
		max = myarray.length;
for (i; i < max; i += 1) {
	// выполнить какие-либо операции над myarray[i]
}

// todo================== OBJECTS ===========

/*При обходе в цикле свойств объекта важно использовать метод
hasOwnProperty(),
чтобы отфильтровать свойства, которые были унаследованы от прототипа.
*/

// todo===================== SWITCH ===========

var inspect_me = 0,
		result = "";
switch (inspect_me) {
case 0:
		result = "zero";
		break;
case 1:
		result = "one";
		break;
default:
		result = "unknown";
}
/*В этом простом примере демонстрируется использование следующих
соглашений по оформлению:
• Каждая инструкция case выравнивается по инструкции switch
	(исключение из правил оформления отступов в фигурных скобках).
• Программный код внутри каждой инструкции case оформляется  с дополнительным отступом.
• Каждая инструкция case завершается явно с помощью инструкции  break;.
• Старайтесь не пользоваться приемом «проваливания» в следующую  инструкцию case
	(когда преднамеренно опускается инструкция break).  Применяйте его, только если вы
	абсолютно уверены, что это наилуч шее решение, при этом обязательно описывайте такие
	инструкции  case в комментариях, потому что те, кто будет читать ваш код, могут
	воспринять отсутствие инструкции break как ошибку.
• Заканчивайте инструкцию switch веткой default:, чтобы гарантиро вать получение
	нормального результата даже в случае отсутствия  совпадений с какой-либо из инструкций case.
*/