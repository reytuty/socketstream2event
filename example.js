const net = require('net');
const StreamSocket2Eevent = require('socketstream2event') ;

const client = new net.Socket();
client.connect( 81, '192.168.0.1', ()=> { /* connected... */});
//setting byte zero to separate message
let byteSeparate = 0 ;
//you can use sequence to define end of messages
//let byteSeparate = [13,10]
const ss2e = new StreamSocket2Eevent( byteSeparate ) ;
ss2e.addOnData((d)=>{
    //here just recive one data at a time
    console.log("You can add more listeners", d) ;
}) ;
ss2e.addOnData((data)=>{
    //here just recive one data at a time
}) ;

client.on('data', function(data) {
    //here you receve many data messages mixed
    stream.parseData(data) ;
});
