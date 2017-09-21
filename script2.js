
var searchForm = document.querySelector("#stateSearch");
searchForm.addEventListener("change", function(event){
 event.preventDefault();

 var searchTerm3 = $("#stateSearch").val();
 console.log(searchTerm3);


});

var searchForm2 = document.querySelector("#satSearch");
searchForm2.addEventListener("change", function(event){
 event.preventDefault();


 var searchTerm4 = $("#satSearch").val();
console.log(searchTerm4);


});


var searchForm3 = document.querySelector("#programSearch");
searchForm3.addEventListener("change", function(event){
 event.preventDefault();


var searchTerm5 = $("#programSearch").val();
console.log(searchTerm5);

});
