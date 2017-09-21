
var searchForm = document.querySelector("form");
searchForm.addEventListener("submit", function(event){
 event.preventDefault();

 var searchTerm3 = $("#stateSearch").val();
 console.log(searchTerm3);

 var searchTerm4 = $("#satSearch").val();
console.log(searchTerm4);

var searchTerm5 = $("#programSearch").val();
console.log(searchTerm5);

});
