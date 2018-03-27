// Test basic....


// youtube-dl manip
const { spawn } = require('child_process');
const { exec } = require('child_process');
default_link = 'https://www.youtube.com/watch?v=klS5bqrxve8'



class Downloader {

  constructor() {
    this.state = 'init';
    this.log_data = '';
    this.pcs = undefined;
  }

  status(link) {
    console.log('status(', link, ')', ' state', this.state, 'progress', this.downloadProgress);
    return JSON.stringify({
      status: this.state,
      progress: this.downloadProgress,
    });
  }

  analyzeDownload(str) {

    //const str = "[download]  45.2% of 11.36MiB at  1.04MiB/s ETA 00:06"
    console.log('str', str);

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

    console.log(cur_link);
    const pattern='(http.*://www.youtube.com/watch\\?)(.*)'
    const re = RegExp(pattern);

    
    let found = cur_link.match(re);
    console.log('found', found);
    
    if (found) {
      this.dir = found[2];
      console.log('this.dir', this.dir);
    } else {
      console.log('cannot determine dir. So exiting!!!!');
      this.state = "failed"
      return this.state;
    }
   
    if (this.state !== 'in_progress') {

      let cmd = `echo \'create dir ${this.dir}\' && `;
      cmd += `mkdir ${this.dir} || `;
      cmd += `cd ${this.dir} && `;
      cmd += `echo ${cur_link} > download.log &&`;
      cmd += `youtube-dl ${cur_link}`;

      this.pcs = exec(`${cmd}`);

      //this.pcs = exec(`echo \'create dir ${this.dir}\' && mkdir ${this.dir} && cd ${this.dir} && echo ${cur_link} > download.log && youtube-dl ${cur_link}`);
      //const pcs = spawn('youtube-dl', [ cur_link ]);

      let data = 'echo ';
      data += JSON.stringify(this.pcs.pid);
      data += ` >> ${this.dir}/download.log`
      console.log('data', data);
      exec(`${data}`);
  
      //console.log('pcs', pcs, 'pid', pcs.pid);
      console.log('downloading', cur_link);
      this.state = 'in_progress';
      
      this.pcs.stdout.on('data', (data) => {
        console.log(`${new Date()} : stdout: ${data}`);
        this.log_data += data;
        this.analyzeDownload(`${data}`);
      });
      
      this.pcs.stderr.on('data', (data) => {
        console.log(`${new Date()} : stderr: ${data}`);
      });
      
      this.pcs.on('close', (code) => {
        console.log(`${new Date()} : child process exited with code ${code}`);
        this.state = 'closed';
      });
      
      this.pcs.on('error', (err) => {
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


const downloader = new Downloader();

const argv = process.argv;
console.log('argv', process.argv);
if (argv[2] === 'd') {
  downloader.download('https://www.youtube.com/watch?v=4-G1JoK7VeQ');
}


module.exports = {
  Downloader,
};



//
//// fs example.
//const fs = require('fs');
//    
//fs.readFile( __dirname + "/../" + "downloads.json", 'utf8', 
//  function (err, data) {
//  console.log( data );
//});

