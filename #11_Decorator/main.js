// Используйте, чтоб добавлять новую функциональность объектам (Расширяет функциональность).
// !Decorator Pattern //
// Простой конструктор
var Person = function (name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}`);
}

var uniqueBob = new Person('Bob');
// может быть добавлено к нему без изменения конструктора Person
uniqueBob.hobbies = ['Cooking', 'Running'];
uniqueBob.greet = function() {
  Person.prototype.greet.call(this);
  console.log('My hobbies are: ', this.hobbies);
};

uniqueBob.greet();

// ?Другой способ
var CoolPerson = function(name, catchPhrase) {
  Person.call(this, name);
  this.catchPhrase = catchPhrase;
};

// включает в себя prototypes от Person
CoolPerson.prototype = Object.create(Person.prototype);
// изменяет прототип
CoolPerson.prototype.greet = function() {
  Person.prototype.greet.call(this);
  console.log(this.catchPhrase);
};

var coolDude = new CoolPerson('Jeff', 'Aaaayyy');
console.log(coolDude);
coolDude.greet();