var Service = require('node-windows').Service;
var scriptPath = require('path').join(__dirname, 'main.js');
console.log(scriptPath);

// Create a new service object
var svc = new Service({
	name: 'SmartDream',
	script: scriptPath
});

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall', function () {
	console.log('Uninstall complete.');
	console.log('The service exists: ', svc.exists);
});

// Uninstall the service.
svc.uninstall();