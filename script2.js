var searchForm = document.querySelector("#mainSearch");
searchForm.addEventListener("submit", function(event){
  event.preventDefault();

  var searchTerm = document.querySelector("input").value;
  searchTerm = searchTerm.toLowerCase();
  searchTerm= searchTerm.split(" ").join("%20");

  var schoolName = "";
  var lon;
  var lat;
  
  function nameCorrector(str){
    str = str.split(" ");
    var newStr = [];
    for(var i = 0; i < str.length; i++){
      newStr.push(str[i].substring(0,1).toUpperCase() + str[i].substring(1));
    }
    return newStr.join(" ");
 }


  $.get("https://api.data.gov/ed/collegescorecard/v1/schools/?school.name="+searchTerm+"&api_key=Xxf2NKtwfcXUd8K2hqawnlur6c0YY93xsNFwq0Dy", function(data){
   schoolName = data.results[0].school.name;
   lon= data.results[0].location.lon;
   lat = data.results[0].location.lat;
   console.log(lon, lat);
   document.querySelector("#grid1").textContent = nameCorrector(schoolName);
   var object = data.results[0]["2014"].academics.program.degree
   var newArr= [];
    for(var key in object){
      if(object[key] == 1){

        key = key.split("_").join(" ");
        //console.log(key);
       newArr.push(key);
    }
  }
    document.querySelector("#grid4").textContent = "\n" + newArr[0] + ", " + newArr[1] + ", " + newArr[2] + ", " + newArr[3] + ", " + newArr[4];
});
});
