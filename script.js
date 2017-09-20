var searchForm = document.querySelector("form");
searchForm.addEventListener("submit", function(event){
  event.preventDefault();


  var searchTerm = document.querySelector("input").value;
  searchTerm = searchTerm.split(" ");
  var searchTerm2 = document.querySelector("input").value;
  searchTerm2 = searchTerm2.toLowerCase();
  searchTerm2= searchTerm2.split(" ").join("%20");

    for(var i =0; i < searchTerm.length; i++){
      if(searchTerm[i][0] && searchTerm[i] !== "of" && searchTerm[i] !== "and"){
        searchTerm[i] =searchTerm[i].substring(0,1).toUpperCase() + searchTerm[i].substring(1);
      }
    }
  searchTerm = searchTerm.join(" ");
  console.log(searchTerm);
  function monetize(num){
    var string = num.toString();
    var newStr = "";
    var money = ""
    for(var i = string.length -1; i >= 0; i--){
     //console.log(i, string[i], i % 2 === 0);
     if(string.length % 2 === 1){
       if(i !== string.length -1 && i !== 0 && i % 2 === 0){
         newStr+= string[i] + ","
       } else{
         newStr+= string[i];
       }
     } else{
       if(i !== string.length -1 && i !== 0 && i % 2 !== 0){
         newStr+= string[i] + ","
       } else{
         newStr+= string[i];
       }
     }
    }
    for(var j = newStr.length -1; j >=0; j--){
      money+= newStr[j];
    }
    return money;
  }


  $.get("https://api.data.gov/ed/collegescorecard/v1/schools/?school.name="+searchTerm2+"&api_key=Xxf2NKtwfcXUd8K2hqawnlur6c0YY93xsNFwq0Dy", function(data){
   //schoolName = data.results[0].school.name;
   var object = data.results[0]["2014"].academics.program.degree
   var list = document.querySelector("#degrees");
   if(searchTerm2 !== ""){
     list.innerHTML = "";
   }

   function nameCorrector(str){
     str = str.split(" ");
     var newStr = [];
     for(var i = 0; i < str.length; i++){
       newStr.push(str[i].substring(0,1).toUpperCase() + str[i].substring(1));
     }
     return newStr.join(" ");
  }

  var programs = document.createElement("h5");

    for(var key in object){
      if(object[key] == 1){

        key = key.split("_").join(" ");
        console.log("key:", key);
        var li = document.createElement("li");

        if(Object.keys(object)[0] === key){
          programs.textContent = "Programs Offered: ";
          list.appendChild(programs);
          li.textContent += "* " + nameCorrector(key);
        }else{
          li.textContent += "* " + nameCorrector(key);
        }

        list.appendChild(li);
    }
  }

  //degrees.textContent = "Programs offered are: " + newArr[0] + ", " + newArr[1] + ", " + newArr[2] + ", " + newArr[3] + ", " + newArr[4];
 });


  //console.log(searchTerm);
  var schoolStats = document.querySelector("#blurb");
  var collegeName;
  var collegeId;
    if(searchTerm !== ""){
      schoolStats.innerHTML = "";
    }

  if(searchTerm === "NYU" || searchTerm === "nyu"){
    searchTerm = "New York University";
  }

  $.get("https://www.nearbycolleges.info/api/autocomplete?q=&limit=3000", function(data){
    console.log("alias data script: ", data)

    var collegeArr = data.result;
      for(var i = 0; i < collegeArr.length; i++){
        if(collegeArr[i].name.startsWith(searchTerm)){
          collegeName = collegeArr[i].name;
          collegeId =  collegeArr[i].unitid;
         //console.log(collegeId);
       }
       }
     console.log("How about this one?" + collegeName + ":" + collegeId);
      if(collegeName && collegeId){
        $.get("https://www.nearbycolleges.info/api/everything/" + collegeId, function(data){
         console.log("everything data script;", data)
          var searchResult = document.querySelector("h4");
          searchResult.textContent = collegeName;

          var list = document.createElement("ul");

          var statArray = [];
          var acceptance = "Acceptance rate: " + data.result.admission.acceptanceRate + "%";
          var fee =  "Application fee: $" + data.result.admission.applicationFee;
          var fulltimeUndergradRaw = data.result.enrollment.fulltimeUndergrad;
          var fulltimeUndergrad = "Fulltime Undergrad Student Population: " + monetize(fulltimeUndergradRaw);
          var fulltimeGradRaw =  data.result.enrollment.fulltimeGrad;
          var fulltimeGrad = "Fulltime Grad Student Population: " + monetize(fulltimeGradRaw);
          var location = "Main campus: " + data.result.location.city + ", " + data.result.location.state;
          var tuitionRaw = data.result.school.instateTuition;


          var tuition = "Annual Tuition: $" + monetize(tuitionRaw);

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
             console.log("alias data: script", collegeName2 + ":" + collegeId2);

             if(collegeName2 && collegeId2){
              //  $.get("http://cors-proxy.htmldriven.com/?url=https://www.nearbycolleges.info/api/everything/" + collegeId2, function(data){
               $.get("https://www.nearbycolleges.info/api/everything/" + collegeId2, function(data){

                 var searchResult2 = document.querySelector("h4");
                 searchResult2.textContent = collegeName2;
                 var schoolStats2 = document.querySelector("#blurb");
                 var list2 = document.createElement("ul");

                 var statArray2 = [];
                 var acceptance2 = "Acceptance rate: " + data.result.admission.acceptanceRate + "%";
                 var fee2 =  "Application fee: $" + data.result.admission.applicationFee;
                 var fulltimeUndergrad2Raw = data.result.enrollment.fulltimeUndergrad;
                 var fulltimeUndergrad2 = "Fulltime Undergrad Student Population: " + monetize(fulltimeUndergrad2Raw);
                 var fulltimeGrad2Raw  = data.result.enrollment.fulltimeGrad
                 var fulltimeGrad2 = "Fulltime Grad Student Population: " + monetize(fulltimeGrad2Raw);
                 var location2 = "Main campus: " + data.result.location.city + ", " + data.result.location.state;
                 var tuitionRaw2 = data.result.school.instateTuition;
                 var tuition2 = "Annual Tuition: $" + monetize(tuitionRaw2);
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
