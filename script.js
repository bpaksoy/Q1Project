var searchForm = document.querySelector("form");
searchForm.addEventListener("submit", function(event){
  event.preventDefault();


  var searchTerm = document.querySelector("input").value;
  searchTerm = searchTerm.split(" ");

    for(var i =0; i < searchTerm.length; i++){
      if(searchTerm[i][0] && searchTerm[i] !== "of" && searchTerm[i] !== "and"){
        searchTerm[i] =searchTerm[i].substring(0,1).toUpperCase() + searchTerm[i].substring(1);
      }
    }
  searchTerm = searchTerm.join(" ");

  console.log(searchTerm);

  $.get("https://www.nearbycolleges.info/api/autocomplete?q=&limit=3000", function(data){
    var collegeArr = data.result;
      for(var i = 0; i < collegeArr.length; i++){
        if(collegeArr[i].name.startsWith(searchTerm)){
          var collegeName = (collegeArr[i].name);
          var collegeId =  collegeArr[i].unitid;
         //console.log(collegeId);
       }
       }
     console.log(collegeName + ":" + collegeId)
      if(collegeName && collegeId){
        $.get("https://www.nearbycolleges.info/api/everything/" + collegeId, function(data){

          var searchResult = document.querySelector("h1");
          searchResult.textContent = collegeName;
          var schoolStats = document.querySelector("#schoolName");
          var list = document.createElement("ul");

          var statArray = [];
          var acceptance = "Acceptance rate: " + data.result.admission.acceptanceRate;
          var fee =  "Application fee: " + data.result.admission.applicationFee;
          var fulltimeUndergrad = "Fulltime Undergrad Student Population: "+ data.result.enrollment.fulltimeUndergrad;
          var fulltimeGrad = "Fulltime Grad Student Population: " + data.result.enrollment.fulltimeGrad;
          var location = "Main campus: " + data.result.location.city;
          var tuition = "Annual Tuition: " + data.result.school.instateTuition;
          var ratio = "Student to Faculty Ratio: " + data.result.school.studentFacultyRatio
          var actScore = "ACT Average: " + data.result.test.act25;
          var satScore = "SAT Average: " + data.result.test.sat25;
          statArray.push(acceptance, fee, fulltimeGrad, location, tuition, ratio, actScore, satScore);
          //console.log("acceptance", acceptance, "fee", fee, "tuition", tuition, statArray);
          for(var k = 0; k < statArray.length; k++){
            var li = document.createElement("li");
            li.textContent = statArray[k];
            list.appendChild(li);
          }
          console.log(list);
          schoolStats.appendChild(list);
          var photoImg = data.result.school.img;


        });
      }
      if(collegeId === undefined){
        searchTerm = searchTerm.toUpperCase();
        console.log("uppercased", searchTerm);
           $.get("https://www.nearbycolleges.info/api/alias?q="+ searchTerm, function(data){
             //console.log("here is alias:", data.result[0].alias, data.result[0].unitid);
             var collegeName2 = data.result[0].name;
             var collegeId2 = data.result[0].unitid;
             console.log(collegeName2 + ":" + collegeId2)
           });
       }

    //return collegeId;
  });

});
