

function sample(collection) {
  var n= 3;
  var result = [];
  if (collection.constructor === Array) {
    copy = collection.slice();
  }
  for (var i = copy.length, times = i - n; i > times; i--) {
    randomIndex = Math.floor(Math.random() * i);
    result.push(copy[randomIndex]);
  }
  return result;
}

var searchForm = document.querySelector("form");

searchForm.addEventListener("submit", function(event){
  event.preventDefault();

  var searchTerm3 = $("#stateSearch").val();
  console.log(searchTerm3);

  var searchTerm4 = $("#satSearch").val();
  console.log(searchTerm4);

  var searchTerm5 = $("#programSearch").val();
  console.log(searchTerm5);

  $.get("https://www.nearbycolleges.info/api/autocomplete?q=&limit=500", function(data){
 //console.log(data);
    var stateArr = [];
    var resultArr = [];
    var uniArr = data.result;

    for(var i =0; i < uniArr.length; i++){
      if(uniArr[i].state === searchTerm3){
        // console.log(uniArr[0].name);
        stateArr.push(uniArr[i].unitid);
        //console.log(resultArr);
      }
   }

   var sampleArr = sample(stateArr);
  // console.log(sampleArr);



  var cardArr = [];
  var schoolImgUrl;

  for(var j =0; j < sampleArr.length; j++){
    $.get("https://www.nearbycolleges.info/api/everything/" + sampleArr[j], function(data2){
      console.log(data2);
      cardArr.push([data2.result.location.name, "Acceptance Rate: " + data2.result.admission.acceptanceRate, "Number of Applications: " + data2.result.admission.numberApps, "Full Time Enrollment: " + data2.result.enrollment.fulltimeTotal, "Location: "+ data2.result.location.city, "Tuition: "+ data2.result.school.instateTuition,"Calendar System: "+ data2.result.school.calendarSystem]);
      schoolImgUrl= data2.result.school.img

      console.log(cardArr);
       //
       //
       var domString = "";





       for(var m=0; m<cardArr.length; m++){
         domString = domString+ "<div id='chartDiv' class='col s8 cardHere'><ul><li>"+cardArr[m][0]+"</li><li>"+cardArr[m][1]+"</li><li>"+cardArr[m][2]+"</li></ul></div>";
         console.log("This is it!!!! " +cardArr[m][0]);
       }

       var chartDiv = document.querySelector("#chartDiv");
       chartDiv.innerHTML = domString;
       console.log(domString)
     });

   }
})

});







// var list = document.createElement("ul");
// var list2 = document.createElement("ul");
// var list3 = document.createElement("ul");

//console.log("list here", list);



//  for(var l = 0; l < cardArr.length; l++){
//    var li = document.createElement("li");

 //console.log("li here:", li);
//    li.textContent = cardArr[l];
//    console.log(li.textContent)
//    if(l ===cardArr[l].length){
//      li.textContent= "";
//    }
//     list.appendChild(li);
//  }
//  var chartDiv = document.querySelector("#chartDiv");
//  chartDiv.classList.add("cardHere");
//  chartDiv.appendChild(list);
//console.log("here is first item of stateArr:", stateArr);
