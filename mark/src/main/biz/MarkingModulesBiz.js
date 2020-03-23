/**
 * 导航头逻辑数量
 */
var {
	ipcMain,
	BrowserWindow,
	Menu
} = require('electron');
const logger = require('../common/logger');
const absenceMarkVo = require('../entity/vo/setting/AbsenceMarkVo.class');
const answerAreaVo = require('../entity/vo/setting/AnswerAreaVo.class');
const locationPointVo = require('../entity/vo/setting/LocationPointVo.class');
const userMsgVo = require('../entity/vo/setting/UserMsgVo.class');
const {
	EJSON
} = require('bson');

import db from '../utils/dbPromiseUtil';
import returnMsgUtils from '../utils/returnMsgUtils';
import Axios from 'axios';
const $http = Axios;
//当前窗口
var oWin = BrowserWindow.getFocusedWindow();

logger.logconsole.info('[MarkingModulesBiz.js] loading--->');
//保存答题卡图片

/**
 * 导航头逻辑数量
 */

let requestMarkingModulesBizFunction = function (param) {
	 return new Promise((resolve, reject) => {
	 	let resultMap ={};
		logger.logconsole.info('[MarkingModulesBiz.js]--->[requestMarkingModulesBiz]----------->' + JSON.stringify(param));
		saveDataMap(param).then(result => {
			logger.logconsole.info('[MarkingModulesBiz.js]--->[requestMarkingModulesBiz]--->[dataJsonData]--->[result]--->' + JSON.stringify(result));
			resultMap = result;
			return resolve(resultMap);
		}).catch(err => {
			var json = returnMsgUtils.returnMsg(400, '获取[导航数据]操作失败', err, 'reponseMarkingModulesBiz');
			logger.logconsole.error("error===>" + json);
		});
	 });
};
 
export default requestMarkingModulesBizFunction;

ipcMain.on('requestMarkingModulesBiz', (event, param) => {
	requestMarkingModulesBizFunction(param).then(res => {
		let result = res;
		logger.logconsole.info('[MarkingModulesBiz.js]--->[requestMarkingModulesBiz]----------->[requestMarkingModulesBizFunction]--------------------------->' + JSON.stringify(result));
		var json = returnMsgUtils.returnMsg(200, '操作成功', result, 'reponseMarkingModulesBiz');
		logger.logconsole.info('[MarkingModulesBiz.js]--->[requestMarkingModulesBiz]-------[reponseMarkingModulesBiz]---->' + json);
		oWin.webContents.send('returnMsgListener', json);
	});
});

const saveDataMap = async(param) => {
	
//		let result = await new Promise((resolve, reject) => {});
//		return result;

	
	let answerSheetImageCount = 0; //答题卡页数
	let locationPointCount = 0; //定位点数量
	let absenceMarkCount = 0; //缺考标记数量
	let userMsgCount = 0; //用户填涂数量
	let objQuzCount = 0; //客观题数量
	let subQuzCount = 0; //主观题数量
	let arrayTypeCount = 0; //客观题版式数量
	
	
	//1、答题卡页码
	let answerSheetQueryParam = {};
	answerSheetQueryParam.markingTaskId = param.markingTaskId;
	answerSheetQueryParam.sheetId = param.sheetId;
	//答题卡页数
	await db('answerSheetImageData').count(answerSheetQueryParam).then(function(count) {
		answerSheetImageCount = count;
	}).catch(err => {
		var json = returnMsgUtils.returnMsg(400, '获取[答题卡数据]操作失败', err, 'reponseMarkingModulesBiz');
	});

	//2、定位点信息
	let locationPointQueryParam = {};
	locationPointQueryParam.markingTaskId = param.markingTaskId;
	locationPointQueryParam.sheetId = param.sheetId;
	locationPointQueryParam.markingType = 'LocationPoint';
	//定位点信息
	await db('navMarkingTypeData').count(locationPointQueryParam).then(function(count) {
		locationPointCount=count;
	}).catch(err => {
		var json = returnMsgUtils.returnMsg(400, '获取[导航数据]操作失败', err, 'reponseMarkingModulesBiz');
	});
	
	//3、缺考信息
	let absenceMarkQueryParam = {};
	absenceMarkQueryParam.markingTaskId = param.markingTaskId;
	absenceMarkQueryParam.sheetId = param.sheetId;
	absenceMarkQueryParam.markingType = 'MissingMark';
	//缺考信息
	await db('navMarkingTypeData').count(absenceMarkQueryParam).then(function(count) {
		absenceMarkCount = count;
	}).catch(err => {
		var json = returnMsgUtils.returnMsg(400, '获取[导航数据]操作失败', err, 'reponseMarkingModulesBiz');
	});
	
	//4 用户信息
	let userMsgQueryParam = {};
	userMsgQueryParam.markingTaskId = param.markingTaskId;
	userMsgQueryParam.sheetId = param.sheetId;
	userMsgQueryParam.markingType = 'StudentPageInfo';
	//用户信息
	await db('navMarkingTypeData').count(userMsgQueryParam).then(function(count) {
		userMsgCount=count;
	}).catch(err => {
		var json = returnMsgUtils.returnMsg(400, '获取[导航数据]操作失败', err, 'reponseMarkingModulesBiz');
	});
	
	//5 客观题信息
	let ObjQuzParam = {};
	ObjQuzParam.markingTaskId = param.markingTaskId;
	ObjQuzParam.sheetId = param.sheetId;
	ObjQuzParam.markingType = 'ObjectiveQuz';
	await db('navMarkingTypeData').count(ObjQuzParam).then(function(count) {
		objQuzCount = count;
	}).catch(err => {
		var json = returnMsgUtils.returnMsg(400, '获取[导航数据]操作失败', err, 'reponseMarkingModulesBiz');
	});
	
	//6主观题信息
	let subQuzParam = {};
	subQuzParam.markingTaskId = param.markingTaskId;
	subQuzParam.sheetId = param.sheetId;
	subQuzParam.markingType = 'SubjectiveQuz';
	await db('navMarkingTypeData').count(subQuzParam).then(function(count) {
		subQuzCount = count;
	}).catch(err => {
		var json = returnMsgUtils.returnMsg(400, '获取[导航数据]操作失败', err, 'reponseMarkingModulesBiz');
	});
	
	//7、客观题版式
	let ObjQuzFormatSettingParam = {};
	ObjQuzFormatSettingParam.markingTaskId = param.markingTaskId;
	ObjQuzFormatSettingParam.sheetId = param.sheetId;
	ObjQuzFormatSettingParam.markingType = 'ObjQuzFormat';
	//客观题版式信息
	await db('navMarkingTypeData').count(ObjQuzFormatSettingParam).then(function(count) {
		arrayTypeCount = count;
	});
	
	let dataJsonData = {
		answerSheetImageCount: answerSheetImageCount,
		locationPointCount: locationPointCount,
		absenceMarkCount: absenceMarkCount,
		userMsgCount: userMsgCount,
		objQuzCount: objQuzCount,
		subQuzCount: subQuzCount,
		arrayTypeCount: arrayTypeCount
	};
	logger.logconsole.info('[MarkingModulesBiz.js]--->[requestMarkingModulesBiz]--->[dataJsonData]-------->' + JSON.stringify(dataJsonData));
	return dataJsonData;
}

