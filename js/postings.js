(function($) {

  /*
 * The posting model
 */
  window.PostingModel = Backbone.Model.extend({
    defaults : {
      selected : false
    }
  });


  window.PostingsList = Backbone.Collection.extend({});
  

})(jQuery);
