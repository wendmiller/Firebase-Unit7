$(document).ready(function(){

  var firebaseConfig = {
    apiKey: "AIzaSyDzM-qV1409TehAQBMaEsjms-9l1xiuOR0",
    authDomain: "project2-1af23.firebaseapp.com",
    databaseURL: "https://project2-1af23.firebaseio.com",
    projectId: "project2-1af23",
    storageBucket: "project2-1af23.appspot.com",
    messagingSenderId: "308168833454",
    appId: "1:308168833454:web:dbbdc17f51a54aa6"
  };

  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();


$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  
  var trainName = $("#train-name-input").val().trim();
  var desName = $("#destination-input").val().trim();
  var trainStart = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val().trim();

 
  var newTrain = {
    name: trainName,
    desName: desName,
    start: trainStart,
    frequency: frequency
  };


  database.ref().push(newTrain);

  console.log(trainName.name);
  console.log(desName.role);
  console.log(trainStart.start);
  console.log(frequency.rate);


  
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});


database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());


  var trainName = childSnapshot.val().name;
  var desName = childSnapshot.val().desName;
  var trainStart = childSnapshot.val().start;
  var frequency = childSnapshot.val().frequency;


  console.log(trainName);
  console.log(desName);
  console.log(trainStart);
  console.log(frequency);


  var trainStartPretty = moment.unix(trainStart).format("HH:mm");

 
  var frequency = moment().diff(moment(trainStart, "X"), "minutes");
  console.log(frequency);


  var minAway = trainStart * frequency;
  console.log(minAway);
  
  // instead of "minAway", I used the formula in the readme.  Adding that here very quickly -- cleanup as needed?
  var tFrequency = frequency;
  var firstTime = trainStart;

  //1:00PM 
  // First Time (pushed back 1 year to make sure it comes before current time) 
  // I just copied this in and changed the "HH:mm" to "X" since firstTime is a timestamp instead
  var firstTimeConverted = moment(firstTime, "X").subtract(1, "years"); 
  console.log("FirstTimeConverted: " + firstTimeConverted); 

  // Current Time 
  var currentTime = moment(); 
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm A")); 
  // Difference between the times 
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes"); 
  console.log("DIFFERENCE IN TIME: " + diffTime); 

  // Time apart (remainder) 
  var tRemainder = diffTime % tFrequency; 
  console.log("THIS IS THE TREMAINDER VAL: "+tRemainder); 

  // Minute Until Train 
  var tMinutesTillTrain = tFrequency - tRemainder; 
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain); 
  // Next Train 
  var nextTrain = moment().add(tMinutesTillTrain, "minutes"); 
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm "));

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(desName),
    $("<td>").text(frequency),
    //$("<td>").text(trainStartPretty), // add another column for this maybe?
    $("<td>").text(nextTrain.format("hh:mm A")), // this is the NextArrival value
    $("<td>").text(tMinutesTillTrain)
  );

  $("#train-table > tbody").append(newRow);
});

});
