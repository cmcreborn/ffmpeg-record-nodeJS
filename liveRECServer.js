const exec = require('child_process').exec;
const { spawn } = require('child_process');
var app = require('express')();
var getPid = '';
var myShellResult = '';

// process POST request data for express version 4+ 
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// for cross domain setting
var cors = require('cors');
var corsOption = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials":true
};
app.use(cors(corsOption));

/**
 * @api {post} /startRec 啟動錄影
 * @apiName startRec
 * @apiGroup Rec
 * @apiDescription 啟動錄影
 * @apiParamExample {json} Request-Example:
 *  {
 *      "filename":"yourFileNameString"
 *  }
 *
 * @apiSuccessExample Success-Response-PID:
 * 5566
 * @apiErrorExample Error-Response:
 * close unexpect.
 */
app.post('/startRec', function (req, res) {
    var that = this;
    console.log('data POST from startRec');
    console.log('get file name set = ' + req.body.filename);
    that.myShellResult='';
    var sh = spawn('sh', ['startRec.sh', req.body.filename],{detached: true});
    sh.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      that.myShellResult= `${data}`;
      //if(that.myShellResult.replace(/\r?\n$/, '') === 'done'){res.end('done');}
      res.end(that.myShellResult);
    });

    sh.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
      //if(data == 'done'){res.end('done');}
    });

    sh.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      res.end('close unexpect.');
    });


})

app.post('/stopRec', function (req, res) {
    var that = this;
    console.log('data POST from stopRec');
    console.log('stopRec pid = ' + req.body.pid);
    that.myShellResult='';
    var sh = spawn('sh', ['stopRec.sh', req.body.pid],{detached: true});
    sh.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
      that.myShellResult= `${data}`;
      //if(that.myShellResult.replace(/\r?\n$/, '') === 'done'){res.end('done');}
      res.end(that.myShellResult);
    });

    sh.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
      //if(data == 'done'){res.end('done');}
    });

    sh.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      res.end('close unexpect.');
    });


})

app.listen(1985);