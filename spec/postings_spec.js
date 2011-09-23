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

describe("Postings Collection", function(){
  
  it("should be defined", function(){
    expect(PostingsList).toBeDefined();
  });

  it("should be able to add models", function(){
    var list = new PostingsList();
    list.add(new PostingModel());
    expect(list.models.length).toBeGreaterThan(0);

  });

});

describe("PostingsListView",function(){
  var testCollection = [
    { id : "1", name : "posting 1"}, 
    { id : "2", name :"posting 2"}
  ];

  var list;
  beforeEach(function(){
    list = new PostingsList(testCollection) 
  });

  it("can be initialized with a model", function(){
      var view = new PostingsListView({ model : list });
      expect(view.model).not.toBeEmpty();
  });
  describe("templating", function(){
    it("default template renders h3s", function(){
      var view = new PostingsListView({ model : list});
      expect($(view.el)).toContain("h3")
    });

    it('takes a template option', function(){
      setFixtures('<script type="text/template" id="template"><span><%= name %></span></script>');
      var view = new PostingsListView({model : list, itemTemplate : $("#template").html() });
      var spans = $(view.el).find("span");
      expect(spans.length).toEqual(2);
    });


  });
});
