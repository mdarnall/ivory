describe("Posting Model", function(){
  
  var model;
  beforeEach(function(){
    model = new PostingModel();
  });
  it("should contain a selected property", function(){
    expect(model.get('selected')).toBeFalsy();


  });

});
