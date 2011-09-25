describe("Posting Model", function(){
  
  var model;
  beforeEach(function(){
    model = new PostingModel();
  });
  it("should default to not selected", function(){
    expect(model.get('selected')).toBeFalsy();


  });

  it("should toggle selected", function(){
    model.toggleSelect();
    expect(model.get("selected")).toBeTruthy();
    model.toggleSelect();
    expect(model.get("selected")).toBeFalsy();
  });

});

describe("PostingsList", function(){
  it("should be defined", function(){
    expect(PostingsList).toBeDefined();
  });

  it("should be able to add models", function(){
    var list = new PostingsList();
    list.add(new PostingModel());
    expect(list.models.length).toBeGreaterThan(0);

  });
  
  describe("it's custom methods ", function(){
    var list;
    beforeEach(function(){
        list = new PostingsList([{
        id : "1", selected : true}, 
        { id : "2", selected : false }]);
    });
    it("should return a list of selected items", function(){
      expect(list.selected().length).toEqual(1);
    });
    it("should return a list of selected ids", function(){
      expect(list.selectedIds()).toEqual(['1']);
    });


  });

  it("should have a url", function(){
    var list = new PostingsList;
    expect(list.url).toEqual("/assets");
  });

  describe("It's unpost operation", function(){
    var list;
    beforeEach(function(){
      list = new PostingsList([{ id : "1", selected : true}, {id : "2"}]);
    });

    it("should define a unpost method", function(){
      expect(list.unpost).toBeDefined();
    });

    describe("it's successful communication with the server", function(){
      beforeEach(function(){
        jasmine.Ajax.useMock();
      });

      it("should call post to url with selected ids", function(){
        
        list.unpost();

        var request = mostRecentAjaxRequest();
        var url = list.url + "/unpost";
        expect(request.url).toEqual(url);
        
      });
      it("a successful post should invoke callback", function(){
        var successSpy = spyOn(list, "onUnpost");

        list.unpost();
        var request = mostRecentAjaxRequest();
        request.response(testResponses.unpost.success);

        expect(successSpy).toHaveBeenCalled();
      });
      it("should publish a change event on a successful unpost", function(){
        var callback = jasmine.createSpy();
        list.bind("change", callback);

        list.unpost();
        
        var request = mostRecentAjaxRequest();
        request.response(testResponses.unpost.success);


        expect(callback).toHaveBeenCalled();
      });
    });
  });

});

 
describe("PostingsListView",function(){

  it("can be initialized with a model", function(){
      var view = new PostingsListView({ model : testList });
      expect(view.model).not.toBeEmpty();
  });
  describe("templating", function(){
    it("default template renders h3s", function(){
      var view = new PostingsListView({ model : testList });
      view.render();
      expect($(view.el)).toContain("h3")
    });

    it('takes a template option', function(){
      setFixtures('<script type="text/template" id="template"><span><%= name %></span></script>');
      var view = new PostingsListView({model : testList, itemTemplate : $("#template").html() });
      view.render();

      var spans = $(view.el).find("span");
      expect(spans.length).toEqual(2);
    });


  });
  


});

describe("App View", function(){
  
  it("should create a container", function(){
    var view = new App({model : testList });
    expect($(document.body)).toContain($(view.el));
  });

  describe("It's event handling", function(){
    var view;
    beforeEach(function(){
      // setFixtures('<button class="unpost" />');
      view = new App({model : testList });
      $(view.el).append('<button class="unpost" />');
    });

    it("should call unpost on the model when clicked", function(){
      var spy = spyOn(testList,"unpost");
      $(view.el).find(".unpost").trigger("click");
      expect(testList.unpost).toHaveBeenCalled();
    });
  });
});
