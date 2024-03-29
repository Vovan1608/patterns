"use strict";

//! ========= Классический шаблон No1: шаблон по умолчанию

/*
Наиболее часто используемый базовый способ заключается в том, что-
бы создать объект с помощью конструктора Parent() и присвоить этот
объект свойству prototype конструктора Child(). Ниже приводится пер-
вый вариант реализации функции inherit():
*/

function inherit(C, P) {
	C.prototype = new P();
}
/*
Важно помнить, что свойство prototype должно ссылаться на объект,
а не на функцию, поэтому здесь в него записывается ссылка на экземп-
ляр (объект), созданный с помощью родительского конструктора, а не
на сам конструктор. Проще говоря, обратите внимание на оператор
new – он совершенно необходим для правильной работы этого шаблона.
*/

// ! =========== Классический шаблон No2: заимствование конструктора

// родительский конструктор
function Article() {
	this.tags = ['js', 'css'];
}
var article = new Article();
// объект сообщения в блоге наследует свойства объекта article
// через классический шаблон No1
function BlogPost() {}

BlogPost.prototype = article;
var blog = new BlogPost();
// обратите внимание, что выше нет необходимости
// использовать выражение `new Article()`,
// потому что уже имеется доступный экземпляр
// статическая страница наследует свойства объекта article
// через шаблон заимствования конструктора
function StaticPage() {
	Article.call(this);
}
var page = new StaticPage();
alert(article.hasOwnProperty('tags')); // true
alert(blog.hasOwnProperty('tags')); // false
alert(page.hasOwnProperty('tags')); // true

/* В этом фрагменте родительский конструктор Article() наследуется дву-
мя разными способами. Шаблон по умолчанию позволяет объекту blog
получить доступ к свойству tags через прототип, поэтому он не имеет
собственного свойства, и функция hasOwnProperty() возвращает false.
Объект page получает собственное свойство tags, потому что при исполь-
зовании шаблона заимствования конструктора новый объект получает
копию родительского члена tags (а не ссылку на него).
Обратите внимание на различия, возникающие при попытке изменить
значение унаследованного свойства tags:
*/
blog.tags.push('html');
page.tags.push('php');
alert(article.tags.join(', ')); // “js, css, html”

//! ========== Классический шаблон No3: заимствование и установка прототипа

// родительский конструктор
function Parent(name) {
	this.name = name || 'Adam';
}
// добавление дополнительной функциональности в прототип
Parent.prototype.say = function () {
	return this.name;
};
// дочерний конструктор
function Child(name) {
	Parent.apply(this, arguments);
}
Child.prototype = new Parent();
var kid = new Child('Patrick');
kid.name; // “Patrick”
kid.say(); // “Patrick”
delete kid.name;
kid.say(); // “Adam”

/*
В отличие от предыдущего шаблона, теперь дочерний объект наследу-
ет метод say(). Можно также заметить, что свойство name было унасле-
довано дважды, и после удаления собственной копии дочерний объект
получает доступ к другому свойству, унаследованному по цепочке про-
тотипов.
*/

//! ========== Классический шаблон No4: совместное использование прототипа

/*
То есть все, что должно наследоваться дочерними объектами, должно находиться в ро-
дительском прототипе. В этом случае достаточно просто присвоить ро-
дительский прототип дочернему прототипу:
*/

function inherit(C, P) {
	C.prototype = P.prototype;
}

/*
Благодаря этому образуется короткая цепочка прототипов, обеспечи-
вающая высокую скорость поиска, так как все объекты фактически бу-
дут совместно использовать один и тот же прототип.
*/

//! ========= Классический шаблон No5: временный конструктор

/*
Заключительная версия функции реализации шаблона классического
наследования будет выглядеть так:
*/

var inherit = (function () {
	var F = function () {};
	return function (C, P) {
		F.prototype = P.prototype;
		C.prototype = new F();
		C.uber = P.prototype;
		C.prototype.constructor = C;
	}
}());

/*
Этот шаблон также называется шаблоном с промежуточной функ-
цией, или шаблоном с промежуточным конструктором, потому
что временный конструктор используется в нем как промежуточ-
ное звено для получения доступа к родительскому прототипу.
*/

//! ========== Наследование копированием свойств

/*
Ниже приводится пример реализации функции extend(),
осуществляющей этот шаблон:
*/
function extendDeep(parent, child) {
	var i,
			toStr = Object.prototype.toString,
			astr = '[object Array]';
	child = child || {};
	for (i in parent) {
		if (parent.hasOwnProperty(i)) {
			if (typeof parent[i] === 'object') {
				child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
				extendDeep(parent[i], child[i]);
			} else {
				child[i] = parent[i];
			}
		}
	}
	return child;
}
/*
Проверим новую реализацию, выполняющую полное копирование объ-
ектов, и убедимся, что изменения в дочернем объекте не оказывают
влияния на родительский объект:
 */
var dad = {
	counts: [1, 2, 3],
	reads: {paper: true}
};
var kid = extendDeep(dad);
kid.counts.push(4);
kid.counts.toString(); // “1,2,3,4”
dad.counts.toString(); // “1,2,3”
dad.reads === kid.reads; // false
kid.reads.paper = false;
kid.reads.web = true;
dad.reads.paper; // true

//! ========= Смешивание
/*
Реализация выглядит просто; достаточно обойти все аргументы и ско-
пировать каждое свойство каждого объекта, переданного функции:
 */
function mix() {
	var arg, prop, child = {};
	for (arg = 0; arg < arguments.length; arg += 1) {
		for (prop in arguments[arg]) {
			if (arguments[arg].hasOwnProperty(prop)) {
				child[prop] = arguments[arg][prop];
			}
		}
	}
	return child;
}
/*
Теперь, когда у вас имеется универсальная функция смешивания, вы
сможете передать ей произвольное количество объектов и получить
в результате новый объект, обладающий свойствами всех исходных объ-
ектов. Например:
	*/
	var cake = mix(
	{eggs: 2, large: true},
	{butter: 1, salted: true},
	{flour: '3 cups'},
	{sugar: 'sure!'}
);

//! Заимствование методов
/*
Массивы обладают множеством полезных методов, которые отсутству-
ют в объектах, напоминающих массивы, таких как arguments. Однако
объект arguments может заимствовать методы массива, например slice(),
как показано в следующем примере:
 */
function f() {
	var args = [].slice.call(arguments, 1, 3);
	return args;
}
// пример
f(1, 2, 3, 4, 5, 6); // вернет [2,3]
/*
В этом примере создается пустой массив, для того чтобы получить воз-
можность использовать его метод. Можно пойти чуть более длинным
путем и получить тот же результат, заимствовав метод непосредствен-
но из прототипа конструктора Array с помощью инструкции Array.proto-
type.slice.call(...). Эта инструкция выглядит длиннее, но она экономит
время, необходимое на создание пустого массива.
 */

