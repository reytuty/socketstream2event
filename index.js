/**
 * @author Renato Miawaki
 * @email renato.miawaki@gmail.com 
 * @date Nov/2018
 * @version 1.0.1
 * 
 * To cache socket bytes and verify when it ends
 */


class Stream2event{
    /**
     * bytes to separate messages
     * @param {*} p_this._bytesSeparetor 
     */
    constructor(p_bytesSeparetor){
        this._arraySeparetor  = false ;
        this._arraySeparetor = Array.isArray( p_bytesSeparetor ) ;
        
        this._dataListeners   = [] ;
        this._poolBytes       = [] ;
        this._bytesSeparetor  = p_bytesSeparetor ;
        
        this._poolEndByte     = [] ;
        this._lastIndexByte   = 0 ;
    }

    _isEnd(i){
        if(this._arraySeparetor){
            //if is array, need to cache last to check sequence
            return this._checkIsEndFromArray(i);
        }
        return i == this._bytesSeparetor ;
    }
    
    _checkIsEndFromArray(i){
        if(i==this._bytesSeparetor[lastIndexByte++]){
            if( this._lastIndexByte >= this._bytesSeparetor.length ){
                //it was the last byte
                return true ;
            }
            return false ;
        }
        this._lastIndexByte = 0 ;
        return false ;
    }
    /**
     * dispatch data
     * @param {*} data 
     */
    _dispatchMessages (data){
        if(!this._dataListeners || this._dataListeners.length < 1){
            return ;
        }
        this._dataListeners.forEach((listener)=>{
            listener(data);
        }) ;
    }
    /**
     * 
     * @param {*} data 
     * @return null|array of data
     */
    _doParse (data) {
        var dataResult = [] ;
        data.forEach((i)=>{
            this._poolBytes.push(i) ;
            if(this._isEnd(i)){
                dataResult.push( Buffer.from( this._poolBytes )  );
                this._poolBytes = [];
            }
        });
        if(dataResult.length>0){
            return dataResult ;
        }
        return null ;
    }
    /**
     * Call every stream data recived
     * @param {*} data 
     * @return {array} array of data
     */
    parseData(data){
        let arrayData = this._doParse(data) ;
        if(arrayData && arrayData.length > 0){
            arrayData.forEach((d)=>{
                this._dispatchMessages( d ) ;
            })
        }
        return arrayData ;
    }
    addOnData(e){
        if(typeof e === "function"){
            this._dataListeners.push(e) ;
        }
    }
}

module.exports = Stream2event ;