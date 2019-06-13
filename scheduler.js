// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
  authDomain: "time-sheet-55009.firebaseapp.com",
  databaseURL: "https://time-sheet-55009.firebaseio.com",
  storageBucket: "time-sheet-55009.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var desName = $("#destination-input").val().trim();
  var trainStart = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    desName: desName,
    start: trainStart,
    frequency: frequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(trainName.name);
  console.log(desName.role);
  console.log(trainStart.start);
  console.log(frequency.rate);


  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var desName = childSnapshot.val().role;
  var trainStart = childSnapshot.val().start;
  var frequency = childSnapshot.val().rate;

  // Employee Info
  console.log(trainName);
  console.log(desName);
  console.log(trainStart);
  console.log(frequency);

  // Prettify the employee start
  var trainStartPretty = moment.unix(trainStart).format("HH:mm");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var frequency = moment().diff(moment(trainStart, "X"), "minutes");
  console.log(frequency);

  // Calculate the total billed rate
  var minAway = trainStart * frequency;
  console.log(minAway);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(desName),
    $("<td>").text(frequency),
    $("<td>").text(trainStartPretty),
    $("<td>").text(minAway)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
