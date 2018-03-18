// Test basic....


// youtube-dl manip
const { spawn } = require('child_process');
default_link = 'https://www.youtube.com/watch?v=klS5bqrxve8'

var log_data = '';
var state = 'init';


class Downloader {

	constructor() {
		this.state = 'init';
	}

	status(link) {
		return JSON.stringify({
			status: this.state
		});
	}

	download(link) {
	
		const cur_link = link || default_link;
	
		if (this.state === 'init' ||
				this.state === 'closed') {

			const pcs = spawn('youtube-dl', [ cur_link ]);
	
			console.log('downloading', cur_link);
			this.state = 'in_progress';
			
			pcs.stdout.on('data', (data) => {
			  console.log(`${new Date()} : stdout: ${data}`);
				log_data += data;
			});
			
			pcs.stderr.on('data', (data) => {
			  console.log(`${new Date()} : stderr: ${data}`);
			});
			
			pcs.on('close', (code) => {
			  console.log(`${new Date()} : child process exited with code ${code}`);
				this.state = 'closed';
			});
			
			pcs.on('error', (err) => {
				this.state = 'error';
			  console.log(`${new Date()} : Failed to start subprocess.`);
			});
	
			console.log('state?:', this.state);
			return this.state;	
		} else {
			console.log('download while not init:', this.state);
		}
	}

}


function download(link) {

	const cur_link = link || default_link;

	pcs = spawn('youtube-dl', [ cur_link ]);

	console.log('downloading', cur_link);
	
	pcs.stdout.on('data', (data) => {
	  console.log(`${new Date()} : stdout: ${data}`);
		log_data += data;
	});
	
	pcs.stderr.on('data', (data) => {
	  console.log(`${new Date()} : stderr: ${data}`);
	});
	
	pcs.on('close', (code) => {
	  console.log(`${new Date()} : child process exited with code ${code}`);
		state = 'init';
	});
	
	pcs.on('error', (err) => {
		state = 'init';
	  console.log(`${new Date()} : Failed to start subprocess.`);
	});
	
	return

};

module.exports = {
	download,
	Downloader,
};

// json manip
const obj = { 
	'addr': [
		'coco',
		'tata',
	]
};

const str = JSON.stringify(obj);
console.log('obj', obj);
console.log('str', str);


// fs example.
const fs = require('fs');
		
fs.readFile( __dirname + "/../" + "downloads.json", 'utf8', 
	function (err, data) {
	console.log( data );
});

