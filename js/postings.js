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
    url : "/assets", 

    initialize : function (){
      _.bindAll(this);
    }, 
    selected : function(){
      return this.filter(function(posting){
        return posting.get('selected');
      });
    }, 
    selectedIds : function(){
      return _.pluck(this.selected(), "id");
    },
    unpost : function() {
      var ids = this.selectedIds();
      
      $.post('/assets/unpost', ids, this.onUnpost);
    }, 

    /*
    * on an unpost loop over the response and set
    * status on the model
    */
    onUnpost : function(data, txtStatus, xhr) { 
      if(data && data.postings){ 
        // var selected = this.selected();
        _.each(data.postings, function(posting){
          var model = this.get(posting.id);
          model.set({"status" : posting.status});
        }, this);
      }
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
      this.template = _.template(this.options.template || '<h3><%=name%></h3>');
    },

    render : function(){
      // console.log('render');
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
    className : 'postings',

    initialize : function (){
      // all methods are bound to 'this'
      _.bindAll(this);
      this.model.bind("reset", this.render, this);
    },
    

    render : function(){
      this.model.each(this.addOne);
      return this;
    },
    
    /*
    * add a PostingView for each posting
    */
    addOne : function(posting){
      var view = new PostingView({model : posting, template : this.options.itemTemplate });
      $(this.el).append(view.render().el);
    }
    
  });
  
  /*
 * The main app view
 */
  window.App = Backbone.View.extend({
    className : "app",
    events : {
     "click .unpost" : "unpost"

    },

    initialize : function (){
      _.bindAll(this);
      this.render();
    }, 

    unpost : function(){
      this.model.unpost();
    },
    render : function (){
      var view = new PostingsListView({model : this.options.model, itemTemplate: this.options.itemTemplate});
      $(this.el).append(view.render().el).append('<button class="unpost">unpost</button>');
      
      $(document.body).append(this.el);

    }
    
    
    
  });

})(jQuery);
