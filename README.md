# Socket Stream to Event

get stream data and parse splitting messages by byte or byte sequence and callback event.

Resolve this problems: 
* How can I separate messages socket?
* Socket split messages.
* TCP/IP split messages.
* FIX TCP split bug.


# Exemple

```

const net = require('net');
const StreamSocket2Eevent = require('socketstream2event') ;

const client = new net.Socket();
client.connect( 81, '192.168.0.1', ()=> { /* connected... */});
//setando 13 e 10 padrão nmea que estamos usando
let byteSeparete = 0 ;
//let byteSeparete = [13,10]
const ss2e = new StreamSocket2Eevent( byteSeparete ) ;
ss2e.addOnData((d)=>{
    console.log("You can add more listeners", d) ;
}) ;
ss2e.addOnData((data)=>{
    //here just recive one data once
}) ;

client.on('data', function(data) {
    //here you receve many data messages
    stream.parseData(data) ;
});



```
