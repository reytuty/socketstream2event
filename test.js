const Stream2event = require('./index') ;

const ss2e = new Stream2event( 10 ) ;
ss2e.addOnData((d)=>{
    //here just recive one data at a time
    console.log("You can add more listeners", d.toString()) ;
}) ;

let data = new Uint8Array([1,2,3,4,5,6,7,8,9,10,1,2,3,42,3,4,5,6,7,8,9,10,1,2,3,42,3,4,5,6,7,8,9,10,1,2,3,4]);
ss2e.parseData(data) ;
