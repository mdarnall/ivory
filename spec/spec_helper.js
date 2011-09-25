var testList;
beforeEach(function(){
  var testCollection = [
    { id : "1", name : "posting 1"}, 
    { id : "2", name :"posting 2"}
  ];
  testList = new PostingsList(testCollection);

});

var testResponses = {
  unpost : {
    success : {
      status : 200, 
      responseText : '{"postings" : [{"id" : "1", "status" : "foo"}, {"id" : "2", "status" : "bar" }]}'
    }
  }
};
