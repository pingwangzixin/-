const moment = require('moment');
 
function currentTime(){
	var current_time =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
	return current_time;
}

exports.currentTime = currentTime;
