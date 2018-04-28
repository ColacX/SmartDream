var Service = require('node-windows').Service;
var scriptPath = require('path').join(__dirname, 'service_main.js');
console.log(scriptPath);
const spawn = require('child_process').spawn;

// you must run this command as system administrator
const command = spawn('powercfg', ['-hibernate', 'off']);

command.stdout.on('data', (data) => {
	console.log(`stdout: ${data}`);
});

command.stderr.on('data', (data) => {
	console.log(`stderr: ${data}`);
});

command.on('close', (code) => {
	console.log(`child process exited with code ${code}`);

	if (code !== 0) {
		return;
	}

	installService();
});

function installService() {
	console.log('installing service');
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
		console.log('service started');
	});

	svc.install();
	console.log('installation complete');
}