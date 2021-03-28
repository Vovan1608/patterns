// !Инкапсулирует вызов метода в один объект.
// Command Pattern //
// Пример из:
// https://addyosmani.com/resources/essentialjsdesignpatterns/book/#commandpatternjavascript
(function(){
  var carManager = {
    // Запросить информацию
    requestInfo: function( model, id ){
      return "The information for " + model + " with ID " + id + " is foobar";
    },
    // Купить машину
    buyVehicle: function( model, id ){
      return "You have successfully purchased Item " + id + ", a " + model;
    },
    // Организовать просмотр
    arrangeViewing: function( model, id ){
      return "You have successfully booked a viewing of " + model + " ( " + id + " ) ";
    }
  };
})();
carManager.execute = function ( name ) {
  return carManager[name] && carManager[name].apply( carManager, [].slice.call(arguments, 1) );
};
carManager.execute( "arrangeViewing", "Ferrari", "14523" );
carManager.execute( "requestInfo", "Ford Mondeo", "54323" );