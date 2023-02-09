const fs=require('fs');
const rateLogPath='../config/rateLog.json';
const { performance } = require('perf_hooks');
const moment = require('moment');
const { Mutex } = require('async-mutex');


function readFile(){
    fs.readFile(rateLogPath,'utf-8',(err,jsonData)=>{
        if(err) {
            console.log(err);
            return;
        }
        try {
            let log=JSON.parse(jsonData);
            console.log(log);
        }
        catch (err){
            console.log('Parsing Error');
        }
    })
}
function writeFile(){
    const user={
        userId:{
            lastRequest: Date.now().valueOf()
        }
    }
    const jsonString = JSON.stringify(user,null,2);
    fs.writeFile(rateLogPath, jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}
//
// const LIMIT = 10;
// const REQUEST_PER_SEC = 100;
// const counter = {};
// const lock = new Mutex();

// async function process() {
//     const currentTime = moment();
//     const currentWindowKey = currentTime.format('HH:mm:ss');
//     const prevWindowKey = moment(currentTime).subtract(1, 'seconds').format('HH:mm:ss');
//     const prevWindowWeight = (1000000 - currentTime.millisecond()) / 1000000;
//     const release = await lock.acquire();
//     try {
//         let requestCount = Math.floor(counter[prevWindowKey] * prevWindowWeight + counter[currentWindowKey]);
//         if (requestCount >= LIMIT) {
//             return false;
//         }
//         counter[currentWindowKey]++;
//         return true;
//     } finally {
//         release();
//     }
// }
//
// async function requestInSec() {
//     while (true) {
//         await new Promise(resolve => setTimeout(resolve, 1000 / REQUEST_PER_SEC));
//         const result = await process();
//         if (result) {
//             console.log(moment().format('HH:mm:ss'), 'request success');
//         }
//     }
// }
//
// requestInSec();
