// Используйте для того, чтоб упростить создание объектов, проще генерировать экземпляры объектов, не требует использования конструктора.
// Factory Pattern //
// Несколько конструкторов для нашей фабрики
function Cat(options) {
  this.sound = 'Meow';
  this.name = options.name;
}

function Dog(options) {
  this.sound = 'Rawr';
  this.name = options.name;
}

// Animal Factory
function AnimalFactory() {}
// Тип Cat по умолчанию
AnimalFactory.prototype.animalType = Cat;
// метод для создания новых животных
AnimalFactory.prototype.createAnimal = function(options) {
  switch(options.animalType) {
    case "cat":
      this.animalType = Cat;
      break;
    case "dog":
      this.animalType = Dog;
      break;
    default:
      this.animalType = Cat;
      break;
  }
  return new this.animalType(options);
}

var animalFactory = new AnimalFactory();
var doge = animalFactory.createAnimal({
  animalType: 'dog',
  name: 'Doge'
});

var snowball = animalFactory.createAnimal({name: 'Snowball'});
console.log(doge instanceof Dog);     // true
console.log(doge);                    // выводит doge как cat объект
console.log(snowball instanceof Cat); // true
console.log(snowball);                // выводит snowball как cat объект