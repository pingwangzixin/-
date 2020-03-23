var ReturnMsgUtils = {

    returnMsg:function(code,message,data,type){
    	var obj = {
    		message: message,
    		type:type,
            ret: code,
            data: data
    	}
        return JSON.stringify(obj);
    }
}
export default ReturnMsgUtils;

