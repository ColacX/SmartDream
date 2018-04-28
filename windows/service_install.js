var Service = require('node-windows').Service;
var scriptPath = require('path').join(__dirname, 'main.js');
console.log(scriptPath);
var exec = require('child_process').exec;
exec(`powercfg -hibernate off`);

// Create a new service object
var svc = new Service({
	name: 'SmartDream',
	description: 'Smart Dream background service',
	script: scriptPath,
	nodeOptions: [
		'--harmony',
		'--max_old_space_size=4096'
	]
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
	svc.start();
});

svc.install();