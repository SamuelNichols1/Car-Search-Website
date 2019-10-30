var requestURL = 'http://localhost:3000/vehicles';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
var db;
request.onload = function() {
   db = request.response;
}

function hover(ele){
  ele.style.backgroundColor = "Grey";
}
function leave(ele){
  ele.style.backgroundColor = "White";
}

function displayFull(ele){

  console.log(ele.id);
  var product = ele.id;
  var form = document.getElementById("details");
  document.getElementById("presentationMake").innerHTML = "Make : " + db[product].vehicleCapDetails.presentationMake;
  document.getElementById("presentationRange").innerHTML = "Range : " + db[product].vehicleCapDetails.presentationRange;
  document.getElementById("description").innerHTML = "Description : " + db[product].autotraderDescription;
  document.getElementById("mileage").innerHTML ="Mileage : " + db[product].mileage;
  document.getElementById("year").innerHTML ="Year : " + db[product].year;
  document.getElementById("transmission").innerHTML ="Transmission : " + db[product].transmission;
  document.getElementById("displayColour").innerHTML = "Colour : " + db[product].displayColour;
  document.getElementById("fuel").innerHTML ="Fuel type : " +  db[product].fuel;

  form.style.display = "block";

}

function closeForm(){
  document.getElementById("details").style.display = "none";
}

function search(){

  var resultsContainer;
  resultsContainer = document.getElementById("results");
  while(resultsContainer.firstChild){
    resultsContainer.removeChild(resultsContainer.firstChild);
  }


  var filteredResults = [];
  var valYear = $( "#slider-rangeYear" ).slider( "option", "values" );
  var valMileage = $( "#slider-rangeMilage" ).slider( "option", "values" );
  var valPrice = $( "#slider-rangePrice" ).slider( "option", "values" );
  var valEngine = $( "#slider-rangeEngine" ).slider( "option", "values" );
  var valMPG = $( "#slider-rangeMpg" ).slider( "option", "values" );
  var valSeats = $( "#slider-rangeSeats" ).slider( "option", "values" );

  var fueltypeDD = document.getElementById("fuelTypeDD");
  var colourDD = document.getElementById("colourDD");
  var transmissionDD = document.getElementById("transmissionDD");
  var variRef;


  for (i = 0; i < db.length; i++){
      //applies filters and outputs position of the remaining results.
      if (db[i].year >= valYear[0] && db[i].year <= valYear[1] || db[i].year == undefined){
        if (db[i].mileage >= (1000 * valMileage[0]) && db[i].mileage <= (1000 * valMileage[1]) || db[i].mileage == undefined){
          if (db[i].vehiclePrice.salePrice >= (1000 * valPrice[0]) && db[i].vehiclePrice.salePrice <= (1000 * valPrice[1]) || db[i].vehiclePrice.salePrice == undefined){
            if (db[i].vehicleCapDetails.engineSize >= (1000 * valEngine[0]) && db[i].vehicleCapDetails.engineSize <= (1000* valEngine[1]) || db[i].vehicleCapDetails.engineSize == undefined ){
              if (db[i].statistics.mpg >= valMPG[0] && db[i].statistics.mpg <= valMPG[1] || db[i].statistics.mpg == undefined){
                if(db[i].statistics.seats >= valSeats[0] && db[i].statistics.seats <= valSeats[1] || db[i].statistics.seats == undefined){
                  if ((db[i].fuel).toUpperCase() === (fuelTypeDD.value).toUpperCase() || fuelTypeDD.value == "any" || db[i].fuel == undefined){
                    if(db[i].displayColour == undefined || (db[i].displayColour).toUpperCase() === (colourDD.value).toUpperCase()|| colourDD.value == "any"){
                      if((db[i].transmission).toUpperCase() === (transmissionDD.value).toUpperCase()|| transmissionDD.value == "any" || db[i].transmission == undefined){
                        try{
                          variRef = document.getElementById((db[i].vehicleCapDetails.bodyStyle).toLowerCase() + "CB");
                          if(variRef.checked == true){
                            variRef = document.getElementById((db[i].doors).toLowerCase() + "CB");
                              if(variRef.checked == true){
                                filteredResults.push(i);
                                console.log("Reached");
                              }
                          }
                        }catch{
                          filteredResults.push(i);
                          console.log("Reached");

                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    var productContainer;
    var textContainer;
    var img;
    var title;
    var description;
    var price;
    for (i = 0; i < filteredResults.length ; i++){
      productContainer = document.createElement("div");
      textContainer = document.createElement("p");
      title = document.createElement("h3");
      description = document.createElement("h5");
      price = document.createElement("h4");

      productContainer.id = filteredResults[i];
      try{
        title.innerHTML = db[filteredResults[i]].vehicleCapDetails.presentationMake + " " + db[filteredResults[i]].vehicleCapDetails.presentationRange;
        description.innerHTML = db[filteredResults[i]].autotraderDescription;
        price.innerHTML ="£" + db[filteredResults[i]].vehiclePrice.salePrice;
        productContainer.style.backgroundImage = "url(bgImage.jpg)";//db[filteredResults[i]].displayImage.medium;
      } catch{

      }

      if (description.innerHTML == ""){
        description.innerHTML = "Year : " + db[filteredResults[i]].year;
      }

      textContainer.appendChild(title);
      textContainer.appendChild(description);
      textContainer.appendChild(price);
      productContainer.appendChild(textContainer);
      resultsContainer.appendChild(productContainer);

      productContainer.setAttribute('onclick','displayFull(this)');
      productContainer.setAttribute('onmouseover','hover(this)');
      productContainer.setAttribute('onmouseleave','leave(this)');

      window.scrollTo(0,1300);
    }
  }


$( function() {
    $( "#slider-rangeYear" ).slider({
      range: true,
      min: 1950,
      max: 2019,
      values: [ 1950, 2019 ],
      slide: function( event, ui ) {
        $( "#yearAmount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
      }
    });
    $( "#yearAmount" ).val($( "#slider-rangeYear" ).slider( "values", 0 ) +
      " - " + $( "#slider-rangeYear" ).slider( "values", 1 ) );
  } );


  $( function() {
      $( "#slider-rangeMilage" ).slider({
        range: true,
        min: 0,
        max: 100,
        values: [ 0, 100 ],
        slide: function( event, ui ) {
          if(ui.values[0] != 0){
            $( "#milageAmount" ).val( ui.values[ 0 ] + ",000 - " + ui.values[ 1 ] + ",000" );
          }else{
            $( "#milageAmount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] + ",000" );
          }
        }
      });
      $( "#milageAmount" ).val($( "#slider-rangeMilage" ).slider( "values", 0 ) +
        " - " + $( "#slider-rangeMilage" ).slider( "values", 1 ) + ",000" );
    } );

  $( function() {
      $( "#slider-rangePrice" ).slider({
        range: true,
        min: 0,
        max: 50,
        values: [ 0, 50 ],
        slide: function( event, ui ) {
          if(ui.values[0] != 0){
            $( "#priceAmount" ).val( "£" + ui.values[ 0 ] + ",000 - £" + ui.values[ 1 ] + ",000" );
          }else{
            $( "#priceAmount" ).val( "£" + ui.values[ 0 ] + " - £" + ui.values[ 1 ] + ",000" );
          }
        }
      });
      $( "#priceAmount" ).val( "£" + $( "#slider-rangePrice" ).slider( "values", 0 ) +
        " - £" + $( "#slider-rangePrice" ).slider( "values", 1 ) + ",000" );
    } );


  $( function() {
      $( "#slider-rangeEngine" ).slider({
        range: true,
        min: 1,
        max: 40,
        values: [ 1, 40 ],
        slide: function( event, ui ) {
          $( "#engineAmount" ).val( ui.values[ 0 ]/10 + " litre - " + ui.values[ 1 ]/10 + " litre");
        }
      });
      $( "#engineAmount" ).val($( "#slider-rangeEngine" ).slider( "values", 0 )/10 +
        " litre - " + $( "#slider-rangeEngine" ).slider( "values", 1 )/10 + " litre");
    } );

  $( function() {
      $( "#slider-rangeMpg" ).slider({
        range: true,
        min: 10,
        max: 100,
        values: [ 10, 100 ],
        slide: function( event, ui ) {
          $( "#mpgAmount" ).val( ui.values[ 0 ] + " mpg - " + ui.values[ 1 ] + " mpg");
        }
      });
      $( "#mpgAmount" ).val($( "#slider-rangeMpg" ).slider( "values", 0 ) +
        " mpg - " + $( "#slider-rangeMpg" ).slider( "values", 1 ) + " mpg" );
    } );

  $( function() {
      $( "#slider-rangeSeats" ).slider({
        range: true,
        min: 2,
        max: 9,
        values: [ 2, 9 ],
        slide: function( event, ui ) {
          $( "#seatsAmount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        }
      });
      $( "#seatsAmount" ).val($( "#slider-rangeSeats" ).slider( "values", 0 ) +
        " - " + $( "#slider-rangeSeats" ).slider( "values", 1 ) );
    } );
