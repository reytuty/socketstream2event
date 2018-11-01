/**
 * @author Renato Miawaki
 * @email renato.miawaki@gmail.com 
 * @date Nov/2018
 * @version 1.0.0
 * 
 * To cache socket bytes and verify when it ends
 */

var dataListeners   = [] ;
var poolBytes       = [] ;
var bytesSeparetor  = 0 ;
var arraySeparetor  = false ;


const isEnd = (i)=>{
    if(arraySeparetor){
        //if is array, need to cache last to check sequence
        return checkIsEndFromArray(i);
    }
    return i == bytesSeparetor ;
}
var poolEndByte     = [] ;
var lastIndexByte   = 0 ;
const checkIsEndFromArray = (i)=>{
    if(i==bytesSeparetor[lastIndexByte++]){
        if( lastIndexByte >= bytesSeparetor.length ){
            //it was the last byte
            return true ;
        }
        return false ;
    }
    lastIndexByte = 0 ;
    return false ;
}
/**
 * dispatch data
 * @param {*} data 
 */
const dispatchMessages = (data)=>{
    if(!dataListeners || dataListeners.length < 1){
        return ;
    }
    dataListeners.forEach((listener)=>{
        listener(data);
    }) ;
}
/**
 * 
 * @param {*} data 
 * @return null|array of data
 */
const doParse = (data) =>{
    var dataResult = [] ;
    data.forEach((i)=>{
        poolBytes.push(i) ;
        if(isEnd(i)){
            dataResult.push( Buffer.from( poolBytes )  );
            poolBytes = [];
        }
    });
    if(dataResult.length>0){
        return dataResult ;
    }
    return null ;
}
class Stream2event{
    /**
     * bytes to separate messages
     * @param {*} p_bytesSeparetor 
     */
    constructor(p_bytesSeparetor){
        bytesSeparetor = p_bytesSeparetor ;
        arraySeparetor = Array.isArray( bytesSeparetor ) ;
    }
    /**
     * Call every stream data recived
     * @param {*} data 
     */
    parseData(data){
        let arrayData = doParse(data) ;
        if(arrayData && arrayData.length > 0){
            arrayData.forEach((d)=>{
                dispatchMessages( d ) ;
            })
        }
    }
    addOnData(e){
        if(typeof e === "function"){
            dataListeners.push(e) ;
        }
    }
}

module.exports = Stream2event ;