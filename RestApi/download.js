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
      status: this.state,
      progress: this.downloadProgress,
    });
  }

  analyzeDownload(str) {

    //const str = "[download]  45.2% of 11.36MiB at  1.04MiB/s ETA 00:06"
     //console.log('str', str);

    let line = str.split('\n');
    //console.log('line', line);
 
    const pattern='(\\[download\\])(\\s*)(\\d*\\.\\d*)(% of )(\\d*\.\\d*)(.*B)(.*at\\s*)(\\d*\.\\d*)(.*B/s)(.*ETA )(\\d*:\\d*)(.*)'
    const re = RegExp(pattern);

    str = line[0];
    
    let found = str.match(re);
    
    if (found) {
      //console.log('found', found, 'len', found.length);
      const obj = {
        type: found[1],
        percent: found[3],
        size: found[5],
        sizeUnit: found[6],
        rate: found[8],
        rateUnit: found[9],
        eta: found[11],
      }
      console.log('obj', obj);
      this.downloadProgress = obj;
    }
    
  }


  download(link) {
  
    const cur_link = link || default_link;
  
    if (this.state !== 'in_progress') {

      const pcs = spawn('youtube-dl', [ cur_link ]);
  
      console.log('downloading', cur_link);
      this.state = 'in_progress';
      
      pcs.stdout.on('data', (data) => {
        //console.log(`${new Date()} : stdout: ${data}`);
        log_data += data;
        this.analyzeDownload(`${data}`);
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


module.exports = {
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

