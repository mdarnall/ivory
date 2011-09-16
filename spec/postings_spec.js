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

});
