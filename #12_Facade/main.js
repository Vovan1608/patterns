// !Используйте для создания простого интерфейса (упрощает функциональность, как например jQuery).
// Facade Pattern //
// абстрагирует он некоторых сложных/неряшлевых вещей
var $ = function (target) {
  return new MemeQuery(target);
};

function MemeQuery (target) {
  this.target = document.querySelector(target);
}

MemeQuery.prototype.html = function(html) {
  this.target.innerHTML = html;
  return this;
};

// теперь, все, что мы будем видеть и использовать это  $
$('#myParagraph').html('Meeemee').html('Some JS design patterns');
// окей, возможно это и не лучший пример..
// просто посмотрите в исходный код jQuery, там полно примеров фасада
// он нужен просто для того, чтоб увести нас от того, чтоб заострять внимание на сложностях проектирования и сделать проектирование быстрее и проще.