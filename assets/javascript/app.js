var config = {
apiKey: "AIzaSyCyHkHZKkfOMAxtuL5wscVitr_s2ESfSlo",
authDomain: "trainscheduler-b18a9.firebaseapp.com",
databaseURL: "https://trainscheduler-b18a9.firebaseio.com",
projectId: "trainscheduler-b18a9",
storageBucket: "",
messagingSenderId: "627287702653",
appId: "1:627287702653:web:bc04074be21c2093"
};
     
firebase.initializeApp(config);

var database = firebase.database();
    
$("#addNewTrain").on("click", function(event) {

    event.preventDefault();

    var trainName = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    var newTrain = {
    
        trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
    };

    database.ref().push(newTrain);
        
    $("#name").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");
}); 

database.ref().on("child_added", function(childSnapshot) {
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;
    var trainTime = moment(firstTime, "hh:mm").subtract(1, "years");
    var difference =  moment().diff(moment(trainTime),"minutes");
    var remainder = difference % frequency;
    var minsAway = frequency - remainder;
    var nextTrain = moment().add(minsAway, "minutes").format("hh:mm a");
            
    $("#trainTable").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + minsAway + "</td></tr>");
});