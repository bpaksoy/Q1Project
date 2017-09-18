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
  var schoolStats = document.querySelector("#blurb");

    if(searchTerm !== ""){
      schoolStats.innerHTML = "";
    }
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
          //statArray.length = 0;

          var searchResult = document.querySelector("h4");
          searchResult.textContent = collegeName;

          var list = document.createElement("ul");

          var statArray = [];
          var acceptance = "Acceptance rate: " + data.result.admission.acceptanceRate;
          var fee =  "Application fee: " + data.result.admission.applicationFee;
          var fulltimeUndergrad = "Fulltime Undergrad Student Population: "+ data.result.enrollment.fulltimeUndergrad;
          var fulltimeGrad = "Fulltime Grad Student Population: " + data.result.enrollment.fulltimeGrad;
          var location = "Main campus: " + data.result.location.city + ", " + data.result.location.state;
          var tuitionRaw = data.result.school.instateTuition;
          function monetize(num){
            num = num.toString();
            var newStr = "";
            var money = ""
            for(var i = num.length -1; i >= 0; i--){
             console.log(i, num[i], i % 2 === 0);
             if(i !== num.length -1 && i !== 0 && i % 2 === 0){
               newStr+= num[i] + ","
             } else{
               newStr+= num[i];
             }
            }
            for(var j = newStr.length -1; j >=0; j--){
              money+= newStr[j];
            }
            return "$" + money;
          }

          var tuition = "Annual Tuition: " + monetize(tuitionRaw);

          var ratio = "Student to Faculty Ratio: " + data.result.school.studentFacultyRatio
          var actScore = "ACT Average: " + data.result.test.act25;
          var satScore = "SAT Average: " + data.result.test.sat25;
          statArray.push(acceptance, fee, fulltimeUndergrad, fulltimeGrad, location, tuition, ratio, actScore, satScore);
          //console.log("acceptance", acceptance, "fee", fee, "tuition", tuition, statArray);
          for(var k = 0; k < statArray.length; k++){
            var li = document.createElement("li");
            li.textContent = statArray[k];
            list.appendChild(li);
          }
          console.log(list);
          schoolStats.appendChild(list);
          var photoImgUrl = data.result.school.img;
          var schoolImg = document.querySelector("#schoolImg");
          schoolImg.setAttribute("src", photoImgUrl);

          });

      }
      if(collegeId === undefined){
        searchTerm = searchTerm.toUpperCase();
        console.log("uppercased", searchTerm);
           $.get("https://www.nearbycolleges.info/api/alias?q="+ searchTerm, function(data){
             //console.log("here is alias:", data.result[0].alias, data.result[0].unitid);
             var collegeName2 = data.result[0].name;
             var collegeId2 = data.result[0].unitid;
             console.log(collegeName2 + ":" + collegeId2);

             if(collegeName2 && collegeId2){
               $.get("https://www.nearbycolleges.info/api/everything/" + collegeId2, function(data){

                 var searchResult2 = document.querySelector("h4");
                 searchResult2.textContent = collegeName2;
                 var schoolStats2 = document.querySelector("#blurb");
                 var list2 = document.createElement("ul");

                 var statArray2 = [];
                 var acceptance2 = "Acceptance rate: " + data.result.admission.acceptanceRate;
                 var fee2 =  "Application fee: " + data.result.admission.applicationFee;
                 var fulltimeUndergrad2 = "Fulltime Undergrad Student Population: "+ data.result.enrollment.fulltimeUndergrad;
                 var fulltimeGrad2 = "Fulltime Grad Student Population: " + data.result.enrollment.fulltimeGrad;
                 var location2 = "Main campus: " + data.result.location.city + ", " + data.result.location.state;
                 var tuitionRaw2 = data.result.school.instateTuition;
                 function monetize2(num){
                   num = num.toString();
                   var newStr = "";
                   var money = ""
                   for(var i = num.length -1; i >= 0; i--){
                    console.log(i, num[i], i % 2 === 0);
                    if(i !== num.length -1 && i !== 0 && i % 2 === 0){
                      newStr+= num[i] + ","
                    } else{
                      newStr+= num[i];
                    }
                   }
                   for(var j = newStr.length -1; j >=0; j--){
                     money+= newStr[j];
                   }
                   return "$" + money;
                 }

                 var tuition2 = "Annual Tuition: " + monetize2(tuitionRaw2);
                 var ratio2 = "Student to Faculty Ratio: " + data.result.school.studentFacultyRatio
                 var actScore2 = "ACT Average: " + data.result.test.act25;
                 var satScore2 = "SAT Average: " + data.result.test.sat25;
                 statArray2.push(acceptance2, fee2, fulltimeUndergrad2, fulltimeGrad2, location2, tuition2, ratio2, actScore2, satScore2);

                 for(var l = 0; l < statArray2.length; l++){
                   var li2 = document.createElement("li");
                   li2.textContent = statArray2[l];
                   list2.appendChild(li2);
                 }
                 console.log(list2);
                 schoolStats2.appendChild(list2);

                 var photoImgUrl2 = data.result.school.img;
                 var schoolImg2 = document.querySelector("#schoolImg");
                 schoolImg2.setAttribute("src", photoImgUrl2);

               });
             }
           });
       }

  });

});
