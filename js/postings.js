(function($) {

  /*
  * The posting model
  */
  window.PostingModel = Backbone.Model.extend({
    defaults : {
      selected : false
    }, 

    toggleSelect : function(){
      this.set({selected : !this.get("selected")});
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
 
/*
 *  The view for one posting
 */
  window.PostingView = Backbone.View.extend({
    tagName : "li", 
    className : "posting",
    events : {
      "click input[type=checkbox]" : "toggleSelect"
    }, 

    initialize : function (){
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
      // todo: this just assumes a jquery obj for the template text
      this.template = _.template('<h3><%=name%></h3>');
    },

    render : function(){
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    }, 

    remove : function (){
      $(this.el).remove();
    }, 

    toggleSelect : function (){
      this.model.toggleSelect();
    }
  });

  /*
  * Postings List View
  */
  window.PostingsListView = Backbone.View.extend({
    tagName : 'ul', 

    initialize : function (){
      // all methods are bound to 'this'
      _.bindAll(this);
      this.model.bind("reset", this.addAll, this);
      if(this.model.length > 0) { 
        this.addAll();
      }
    },

    addAll : function(){
      this.model.each(this.addOne);
    },

    /*
    * add a PostingView for each posting
    */
    addOne : function(posting){
      var view = new PostingView({model : posting });
      $(this.el).append(view.render().el);
    }
    
  });

})(jQuery);
