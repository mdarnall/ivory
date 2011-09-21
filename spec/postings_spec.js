describe("Posting Model", function(){
  
  var model;
  beforeEach(function(){
    model = new PostingModel();
  });
  it("should default to not selected", function(){
    expect(model.get('selected')).toBeFalsy();


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

describe("Postings List View", function(){

  var view;
  beforeEach(function(){
    view = new PostingsListView();
  });

  it("should create a root element", function(){
    expect(view.el.nodeName).toEqual("LI");
  });
});
