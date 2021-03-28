// Module Pattern //
// Используется для инкапсуляции кода
var myModule = (function() {
  // Приватная переменная
  var memes = ['cats', 'doge', 'harambe'];

  var getMemes = function() {
    return memes;
  };
  // возвращает то, к чему вы хотите разрешить доступ в объекте
  // то, как он это возвращает действительно делает его показателем модульного шаблона проектирования
  return {
    getMemes: getMemes
  };
})();
console.log(myModule.getMemes()); // массив мемов
console.log(myModule.memes); // undefined