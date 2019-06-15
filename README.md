# Firebase-Unit7

Simple page that displays the input and calculates the minutes until arrival.


Input not appearing on chart.  How to link?

am I missing moment.js code for caluclating time left.

























<!-- 
</html>

<!DOCTYPE html>

<html lang="en-us">

<head>

  <meta charset="UTF-8">

  <title>Example of Time Telling</title>

  <!-- Added Moment JS -->
  <script src="https://cdn.jsdelivr.net/momentjs/2.12.0/moment.min.js"></script>

</head>

<body>

  <!-- Script -->

  <script>
    // Assume the following situations.

    // (TEST 1)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 3 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:18 -- 2 minutes away

    // (TEST 2)
    // First Train of the Day is 3:00 AM
    // Assume Train comes every 7 minutes.
    // Assume the current time is 3:16 AM....
    // What time would the next train be...? (Use your brain first)
    // It would be 3:21 -- 5 minutes away


    // ==========================================================

    // Solved Mathematically
    // Test case 1:
    // 16 - 00 = 16
    // 16 % 3 = 1 (Modulus is the remainder)
    // 3 - 1 = 2 minutes away
    // 2 + 3:16 = 3:18

    // Solved Mathematically
    // Test case 2:
    // 16 - 00 = 16
    // 16 % 7 = 2 (Modulus is the remainder)
    // 7 - 2 = 5 minutes away
    // 5 + 3:16 = 3:21

    // Assumptions
    var tFrequency = 30;
    //30min

    // Time is 3:30 AM
    var firstTime = "03:30";
    //1:00PM

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    //1:30PM
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm A"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    console.log("DIFFERENCE IN TIME: " + diffTime);
    //30mins

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log("THIS IS THE TREMAINDER VAL: "+tRemainder);

    //30/30 = 1 Remainder =0
 

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm "));
  </script>

</body>

</html> 