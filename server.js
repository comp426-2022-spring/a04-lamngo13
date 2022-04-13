import { coinFlip, coinFlips, countFlips, flipACoin} from './modules/coin.mjs'
import { createRequire } from 'module'
import { isArgumentsObject } from 'util/types'

const require = createRequire(import.meta.url)
const express = require('express')
const app = express()
const db = require("./database.js")
const morgan = require('morgan')
const fs = require('fs')
//make require bettersqulite3?

// Make Express use its own built-in body parser for both urlencoded and JSON body data.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const argv = require('minimist')(process.argv.slice(2))
argv['port']
const port = argv['port'] || process.env.PORT || 5555

//start an app server
const server = app.listen(port, () => { 
    console.log('App listening on port %PORT%'.replace('%PORT%',port)) 
});

//help stuff
const help = (`
server.js [options]
  --por		Set the port number for the server to listen on. Must be an integer
              	between 1 and 65535.
  --debug	If set to true, creates endlpoints /app/log/access/ which returns
              	a JSON access log from the database and /app/error which throws 
              	an error with the message "Error test successful." Defaults to 
		false.
  --log		If set to false, no log files are written. Defaults to true.
		Logs are always written to database.
  --help	Return this message and exit.
`);
// If --help or -h, echo help text to STDOUT and exit
if (argv.help || argv.h) {
    console.log(help)
    process.exit(0)
}

//log stuff
if (argv.log == true) {
    let zlog = fs.createWriteStream('access.log', { flags: 'a' })
    app.use(morgan('combined', { stream: mylog }))
} else {
    app.use(morgan('combined'))
}

//fields
app.use((req, res, next) => {
    let logdata = {
      remoteaddr: req.ip,
      remoteuser: req.user,
      time: Date.now(),
      method: req.method,
      url: req.url,
      protocol: req.protocol,
      httpversion: req.httpVersion,
      status: res.statusCode,
      referer: req.headers['referer'],
      useragent: req.headers['user-agent']
    }

    const stmt = db.prepare('INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, status, referer, useragent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    const info = stmt.run(logdata.remoteaddr, logdata.remoteuser, logdata.time, logdata.method, logdata.url, logdata.protocol, logdata.httpversion, logdata.status, logdata.referer, logdata.useragent)
    
    next();
})

//more log stuff
app.get('app/log/access', (req, res) => {
    try {
        const stmt = db.prepare('SELECT * FROM accesslog').all()
        res.status(200).json(stmt)
    } catch {
        console.error(e)
    }
});

app.get('/app/error', (req, res) => {
    throw new Error('ERRO BUCKO')
}); 

app.get('/app/', (req, res) => { //CHECKPOINTT
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    });

//RANDOM COIN FLIP ENDPOINT /app/flip/
app.get('/app/flip/', (req, res) => {
    // Respond with status 200
    res.statusCode = 200;
    res.statusMessage = 'OK';
    let outcome = coinFlip();

    //sending the data
    if (outcome == "heads") {
        res.json({"flip":"heads"});
    } else {
        res.json({"flip":"tails"});
    }
    //res.json(coinFlip())
});
    
//MANY FLIPS
app.get('/app/flips/:number', (req, res) => {
	// Respond with status 200
    res.statusCode = 200;
    res.statusMessage = 'OK';
    let theNum = req.params.number;
    let zraw = coinFlips(theNum);
    //use the outcomes - only run coinFlips ONCE
    let zsummary = countFlips(zraw)

    //send the data
    res.json({"raw":zraw, "summary":zsummary})

});

//guess heads
app.get('/app/flip/call/heads', (req, res) => {
    // Respond with status 200
    res.statusCode = 200;
    res.statusMessage = 'OK';
    let abstraction = flipACoin('heads')
    res.json(abstraction);
    //res.json(flipACoin("heads"))
});

//guess tails
app.get('/app/flip/call/tails', (req, res) => {
    // Respond with status 200
    res.statusCode = 200;
    res.statusMessage = 'OK';
    let abstraction = flipACoin('tails');
    res.json(abstraction);
    //res.json(flipACoin("tails"))
});


// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

//END STUFF MAYBE PUTIN ANOTHER PLACE
// Check status code endpoint
app.get('/app/', (req, res) => {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, { 'Content-Type' : 'text/plain'});
    res.end(res.statusCode+ ' ' +res.statusMessage) });

// If not recognized request (other requests)
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});