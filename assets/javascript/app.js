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

  $("#add-train").on("click", function(event){
    event.preventDefault();
    var trainName = $("#train-name").val().trim();
    var trainDestination  = $("#train-destination").val();
    var firstTrainTime = $("#train-time").val();
    var trainFrequency = $("#train-frequency").val();
    
    var newTrain = {
      name: trainName,
      place: trainDestination,
      time: firstTrainTime, 
      often: trainFrequency,
    }
    database.ref().push(newTrain);
  });

  database.ref().on("child_added", function(childSnapshot){
    var trainName = childSnapshot.val().name;
    var trainDestination= childSnapshot.val().place;
    var firstTrainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().often;
    var nexArrival = "next";
    var minutesAway = "minute";
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(nexArrival),
      $("<td>").text(minutesAway),
      
    ); 
    $("#new-train").append(newRow);
  });