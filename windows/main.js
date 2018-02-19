var firebase = require("firebase");
var exec = require('child_process').exec;

var config = {
	apiKey: "AIzaSyDlsxF70wXFVGaCXyK9L5H7cN14vrKWHxU",
	authDomain: "firaga-7918c.firebaseapp.com",
	databaseURL: "https://firaga-7918c.firebaseio.com",
	projectId: "firaga-7918c",
	storageBucket: "firaga-7918c.appspot.com",
	messagingSenderId: "699794993761"
};
var app = firebase.initializeApp(config);
var database = app.database();

function sleep() {
	console.log("sleep");
	//exec(`powercfg -hibernate off`);
	//exec(`rundll32.exe powrprof.dll,SetSuspendState 0,1,0`);
}

function clear() {
	console.log("clear");
	return database.ref("sleep").set(null);
}

function watch() {
	console.log("watch");

	return database.ref("sleep").on("child_added", function (snapshot) {
		//console.log(snapshot.key);
		console.log(snapshot.val());

		var data = snapshot.val();
		var date = new Date(data.date);
		var start = new Date();
		start.setHours(start.getHours() - 1);

		if (start < date) {
			sleep();
		}

		//always clear
		clear();
	});
}

(async () => {
	await watch();
	console.log("waiting for remote commands");
})();