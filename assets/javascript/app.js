var config = {
  apiKey: "AIzaSyDUPBudKVJ5Hd-iB4Wsz6MOHuRSHlOg6as",
  authDomain: "project-1-2c47d.firebaseapp.com",
  databaseURL: "https://project-1-2c47d.firebaseio.com",
  projectId: "project-1-2c47d",
  storageBucket: "project-1-2c47d.appspot.com",
  messagingSenderId: "1050312004807",
  appId: "1:1050312004807:web:4ed05c62c6fa7189411ae2"
};
  firebase.initializeApp(config);
  var database = firebase.database();

  // add new train to database
  $("#add-train").on("click", function(event){
    event.preventDefault();
    var trainName = $("#train-name").val();
    var trainDestination  = $("#train-destination").val();
    var firstTrainTime = $("#train-time").val();
    var trainFrequency = $("#train-frequency").val();

    var tFrequency = trainFrequency;
    var firstTime = firstTrainTime;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm A").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm A"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var minutesAway = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);

    // Next Train
    var trainNext = moment().add(minutesAway, "minutes");
    var nextTrain = moment(trainNext).format("hh:mm A");
    console.log (nextTrain);
    console.log(typeof nextTrain);
    
    var newTrain = {
      name: trainName,
      place: trainDestination,
      time: firstTrainTime, 
      often: trainFrequency,
      arrival: nextTrain,
      away: minutesAway,
    }
    database.ref().push(newTrain);

    $("#train-name").val("");
    $("#train-destination").val("");
    $("#train-time").val("");
    $("#train-frequency").val("");
  });

  // take out the new train's data from database to web page
  database.ref().on("child_added", function(childSnapshot){
    var trainName = childSnapshot.val().name;
    var trainDestination= childSnapshot.val().place;
    var tFrequency = childSnapshot.val().often;
    var nextTrain = childSnapshot.val().arrival;
    var minutesAway = childSnapshot.val().away;
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(tFrequency),
      $("<td>").text(nextTrain),
      $("<td>").text(minutesAway),
      
    ); 
    $("#new-train").append(newRow);
  });