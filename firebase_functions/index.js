var functions = require('firebase-functions');
var firebaseAdmin = require("firebase-admin");
var exec = require('child_process').exec;
var app = firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(require(__dirname + "/firaga-7918c-firebase-adminsdk-rjl9n-56c9a3c36a")),
	databaseURL: "https://firaga-7918c.firebaseio.com"
});
var database = app.database();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
	response.send("Hello from Firebase!");
});

exports.sleep = functions.https.onRequest((request, response) => {
	database.ref("sleep")
		.push()
		.set({ "date": new Date().toISOString() })
		.then(() => {
			response.send("sleep");
		})
		.catch(() => {
			response.sendStatus("500").send("error");
		});;

});