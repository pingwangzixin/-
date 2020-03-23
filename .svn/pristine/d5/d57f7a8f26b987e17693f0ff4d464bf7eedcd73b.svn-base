//import Vue from 'vue'
import Axios from 'axios';
const $http = Axios;

/*let axios = Axios.create({
    baseURL: 'http://127.0.0.1:8761/',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    transformRequest: [function (data) {
        //在data当中存在数组的话需要加上{arrayFormat: 'brackets'} 否则提交时数组会显示下标
        data = Qs.stringify(data,{arrayFormat: 'brackets'});
        return data;
    }],
    withCredentials: true

});
*/
//console.log(Vue)
//console.log(this.$http)
//console.log($http)
//ip
const configure = {
	marking : 'http://192.168.9.62:8088/',
//	marking : 'http://localhost:8088/',
};


	
export let api = {
	//导入答题卡列表上传
	uploadAnswardCard : (data) => {
		return $http({
			method : 'post',
			url : configure.marking + 'openCV/module/uploads',
			data : data,
//			headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
//			headers:{"content-type":"application/x-www-form-urlencoded"}
			headers:{'Content-Type':'multipart/form-data'}
//			headers:{"content-type":"application/json"}
		})
	},
	//根据度数矫正图片
	correctDeg : (data) => {
		return $http({
			method : 'get',
			url : configure.marking + 'openCV/utils/hand',
			params : data,
//			data : data,
			headers:{"content-type":"application/json"}
		})
	},
	//客观题（选择题选项小框）
	objectiveQuesPos : (data) => {
		return $http({
			method : 'get',
			url : configure.marking + 'openCV/module/getSelectPositionAreaMsg',
			params : data,
//			data : data,
			headers:{"content-type":"application/json"}
		})
	},
	//客观题版式校准
	positionCalibration : (data) => {
		return $http({
			method : 'get',
			url : configure.marking + 'openCV/module/getBoxPositionAreaMsg',
			params : data,
//			data : data,
			headers:{"content-type":"application/json"}
		})
	},
	
	//http://localhost:8088/openCV/module/getUserMsgPositionAreaMsg?sourcePath=Y://usermsg.png&x1=4&y1=4&width=334&height=231&markingTaskId=gyc&sheetId=888&userMsgCols=12
	//学生信息填涂
	studentInfoFill : (data) => {
		return $http({
			method : 'get',
			url : configure.marking + 'openCV/module/getUserMsgPositionAreaMsg',
			params : data,
//			data : data,
			headers:{"content-type":"application/json"}
		})
	},
	//http://192.168.9.62:8080/openCV/Card/uploadData
	//保存数据（2）（扫描用）
	submitData : (data) => {
		return $http({
			method : 'post',
			url : configure.marking + 'openCV/Card/uploadData',
			data : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{'Content-Type':'multipart/form-data'}
//			headers:{"content-type":"application/json"}
//			headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
		})
	},
	//学生列表数据（扫描用）
	stuListData : (data) => {
		return $http({
			method : 'post',
			url : configure.marking + 'openCV/Card/scanCards',
			data : data,
//			data : data,
			headers:{'Content-Type':'application/x-www-form-urlencoded'}
		})
	},
	//学生列表图片信息（扫描用）
	viewImgData : (data) => {
		return $http({
			method : 'get',
			url : configure.marking + 'openCV/Card/getImgMsg',
			params : data,
//			data : data,
			headers:{"content-type":"application/json"}
		})
	},
	
}	
