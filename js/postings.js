(function($) {

  /*
  * The posting model
  */
  window.PostingModel = Backbone.Model.extend({
    defaults : {
      selected : false
    }
  });


  /*
  * Collection of postings
  */
  window.PostingsList = Backbone.Collection.extend({
    model : PostingModel,

    selected : function(){
      return this.filter(function(posting){
        return posting.selected;
      });
    }
  });

  window.postingsList = new PostingsList();

  window.PostingView = Backbone.View.extend({
    tagName : "li", 
    className : "posting",
    template : _.template($("#posting_template").html()),

    initialize : function (){
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
    }, 

    render : function(){
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }, 

    remove : function (){
      $(this.el).remove();
    }
  });

  /*
  * Postings List View
  */
  window.PostingsListView = Backbone.View.extend({

    initialize : function (){
     postingsList.bind("reset", this.addAll, this);
    },

    addAll : function(){
      postingsList.each(this.addOne);
    }, 

    addOne : function(posting){
      var view = new PostingView({model : posting});
      this.$("ul.postings").append(view.render().el);
    }
    
  });

})(jQuery);
