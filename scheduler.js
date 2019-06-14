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
  var desName = childSnapshot.val().role;
  var trainStart = childSnapshot.val().start;
  var frequency = childSnapshot.val().rate;


  console.log(trainName);
  console.log(desName);
  console.log(trainStart);
  console.log(frequency);


  var trainStartPretty = moment.unix(trainStart).format("HH:mm");

 
  var frequency = moment().diff(moment(trainStart, "X"), "minutes");
  console.log(frequency);


  var minAway = trainStart * frequency;
  console.log(minAway);


  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(desName),
    $("<td>").text(frequency),
    $("<td>").text(trainStartPretty),
    $("<td>").text(minAway)
  );

  $("#train-table > tbody").append(newRow);
});

});
