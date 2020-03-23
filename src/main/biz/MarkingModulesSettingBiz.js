/**
 * 识别答题卡结构Biz
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
const { EJSON } = require('bson');


import db from '../utils/dbPromiseUtil';
import returnMsgUtils from '../utils/returnMsgUtils';
import Axios from 'axios';
const $http = Axios;
//当前窗口
var oWin = BrowserWindow.getFocusedWindow();

logger.logconsole.info('[MarkingModulesSettingBiz.js] loading--->');
//保存答题卡图片


ipcMain.on('requestMarkingModulesSettingBiz', (event, param) => {
	console.log("===================================================>");
	
	logger.logconsole.info('[MarkingModulesSettingBiz.js]--->[requestMarkingModulesSettingBiz]----------->' + JSON.stringify(param));

	const saveDataMap = async() => {
		let answerSheetImageCount = 0;	//答题卡页数
		let locationPoint = [];			//定位点信息
		let absenceMark = {};			//缺考标记信息
		let userMsg = {};				//用户填涂信息
		let answerArea = [];			//客观题及主观题信息
		let arrayType = "0";				//客观题版式 横版：0|竖版:1  
		
		//1、答题卡页码
		let answerSheetQueryParam = {};
		answerSheetQueryParam.markingTaskId = param.markingTaskId;
		answerSheetQueryParam.sheetId = param.sheetId;
		//答题卡页数
		await db('answerSheetImageData').count(answerSheetQueryParam).then(function(count) {
			answerSheetImageCount = count;
		}).catch(err => {
			var json = returnMsgUtils.returnMsg(400, '获取[答题卡数据]操作失败', err, 'reponseMarkingModulesSettingBiz');
		});

		//2、定位点信息
		let locationPointQueryParam = {};
		locationPointQueryParam.markingTaskId = param.markingTaskId;
		locationPointQueryParam.sheetId = param.sheetId;
		locationPointQueryParam.markingType = 'LocationPoint';
		//定位点信息
		await db('navMarkingTypeData').sort({
			currentIndex:1,
			bizOrder: 1,
			createDate: 1
		}).find(locationPointQueryParam).then(function(locationPointDatas) {
			for(const [index, locationPointData] of locationPointDatas.entries()) {
				logger.logconsole.info('[MarkingModulesSettingBiz]--->[requestMarkingModulesSettingBiz]--->[locationPointDatas]--->[foreach locationPointDatas.entries()]--->'+index+" --->"+locationPointDatas.markingModuleName);
				let locationPointVoEntity = JSON.parse(JSON.stringify(locationPointVo));
				locationPointVoEntity.x = locationPointData.pointx;
				locationPointVoEntity.y = locationPointData.pointy;
				locationPointVoEntity.width = locationPointData.width;
				locationPointVoEntity.height = locationPointData.height;
				locationPointVoEntity.x_s = locationPointData.preciseInfo.original_x;
				locationPointVoEntity.y_s = locationPointData.preciseInfo.original_y;
				locationPointVoEntity.width_s = locationPointData.preciseInfo.width;
				locationPointVoEntity.height_s = locationPointData.preciseInfo.height;
				locationPoint.push(locationPointVoEntity);
			}
		}).catch(err => {
			var json = returnMsgUtils.returnMsg(400, '获取[导航数据]操作失败', err, 'reponseMarkingModulesSettingBiz');
		});
		
		//3、缺考信息
		let absenceMarkQueryParam = {};
		absenceMarkQueryParam.markingTaskId = param.markingTaskId;
		absenceMarkQueryParam.sheetId = param.sheetId;
		absenceMarkQueryParam.markingType = 'MissingMark';
		//缺考信息
		await db('navMarkingTypeData').sort({
			currentIndex:1,
			bizOrder: 1,
			createDate: 1
		}).findOne(absenceMarkQueryParam).then(function(doc) {
			logger.logconsole.info("==================================>"+absenceMarkQueryParam)
			logger.logconsole.info('[MarkingModulesSettingBiz.js]--->[requestMarkingModulesSettingBiz]--->[absenceMarkQueryData] --->'+doc.markingModuleName);
			logger.logconsole.info('[MarkingModulesSettingBiz.js]--->[absenceMarkQueryData] --->'+JSON.stringify(doc));
			let absenceMarkVoEntity = JSON.parse(JSON.stringify(absenceMarkVo));
			logger.logconsole.info('[MarkingModulesSettingBiz.js]--->[absenceMarkVo] --->'+JSON.stringify(absenceMarkVoEntity))
			absenceMarkVoEntity.x = doc.preciseInfo.original_x;
			absenceMarkVoEntity.y = doc.preciseInfo.original_y;
			absenceMarkVoEntity.width = doc.preciseInfo.width;
			absenceMarkVoEntity.height = doc.preciseInfo.height;
			
			absenceMark = absenceMarkVoEntity;
			logger.logconsole.info('[MarkingModulesSettingBiz.js]--->[absenceMark] --->'+absenceMark);

		}).catch(err => {
			var json = returnMsgUtils.returnMsg(400, '获取[导航数据]操作失败', err, 'reponseMarkingModulesBiz');
		});
		
		//4 用户信息
		let userMsgQueryParam = {};
		userMsgQueryParam.markingTaskId = param.markingTaskId;
		userMsgQueryParam.sheetId = param.sheetId;
		userMsgQueryParam.markingType = 'StudentPageInfo';
		//定位点信息
		await db('navMarkingTypeData').sort({
			currentIndex:1,
			bizOrder: 1,
			createDate: 1
		}).findOne(userMsgQueryParam).then(function(doc) {
			
			logger.logconsole.info('[MarkingModulesSettingBiz.js]--->[studentPageInfoData] --->'+doc.markingModuleName);
			logger.logconsole.info('[MarkingModulesSettingBiz.js]--->[studentPageInfoData] --->'+JSON.stringify(doc));

			let userMsgVoEntity = JSON.parse(JSON.stringify(userMsgVo));
			userMsgVoEntity.type = doc.testNumberType;
			userMsgVoEntity.thisPage = doc.currentIndex;
			let position = [];
			//条形码或者二维码
			if(doc.testNumberType==2){
				logger.logconsole.info('[MarkingModulesSettingBiz.js]--->[studentPageInfoData] --->[条形码或者二维码]'+JSON.stringify(doc));
				let codeRowsArray = [];
				let positionEntity = {};
				positionEntity.x = doc.pointx
				positionEntity.y = doc.pointy;
				positionEntity.width = doc.width;
				positionEntity.height = doc.height;
				codeRowsArray.push(positionEntity);
				position.push(codeRowsArray);
			}else if(doc.testNumberType==0 || doc.testNumberType==1){
				logger.logconsole.info('[MarkingModulesSettingBiz.js]--->[studentPageInfoData] --->[全封闭或者半封闭填涂框]'+JSON.stringify(doc));
				let studentFillInfoArray = doc.studentFillInfo;
				for(let i=0;i<studentFillInfoArray.length;i++){
					let vRowsArray = studentFillInfoArray[i];
					position.push(vRowsArray);
				}
			}
			userMsgVoEntity.position = position;
			userMsg = userMsgVoEntity;
		}).catch(err => {
			var json = returnMsgUtils.returnMsg(400, '获取[导航数据]操作失败', err, 'reponseMarkingModulesBiz');
		});
		
		//5 用户作答answerArea[]
		let ObjQuzParam = {};
		ObjQuzParam.markingTaskId = param.markingTaskId;
		ObjQuzParam.sheetId = param.sheetId;
		ObjQuzParam.markingType = 'ObjectiveQuz';
		
		let subQuzParam = {};
		subQuzParam.markingTaskId = param.markingTaskId;
		subQuzParam.sheetId = param.sheetId;
		subQuzParam.markingType = 'SubjectiveQuz';
		
		let objSubArrayParam = [];
		objSubArrayParam.push(ObjQuzParam);
		objSubArrayParam.push(subQuzParam);
		//定位点信息
		await db('navMarkingTypeData').sort({
			currentIndex:1,
			bizOrder: 1,
			createDate: 1
		}).find({$or:objSubArrayParam}).then(function(doc) {
			for(const [index, objAndSubData] of doc.entries()) {
				logger.logconsole.info('[MarkingModulesSettingBiz.js]--->[objAndSubDatas]--->[foreach objAndSubData.entries()]--->'+index+" --->"+objAndSubData.markingModuleName);
				//如果是主观题,获取markingModuleName
				logger.logconsole.info('[MarkingModulesSettingBiz.js]--->[objAndSubDatas]--->[foreach objAndSubData.entries()]--->'+index+" --->"+JSON.stringify(objAndSubData));

				if(objAndSubData.markingType=='SubjectiveQuz'){
					let answerAreaVoEntity = JSON.parse(JSON.stringify(answerAreaVo));
					let subDbFullNameContainsTypeName = objAndSubData.markingModuleName;
					//主观题23~24，提供给OPENCV23~24，按照此方式生成文件名称
					answerAreaVoEntity.titleNum= subDbFullNameContainsTypeName.substr(3);
					answerAreaVoEntity.titleType = "1";
					answerAreaVoEntity.thisPage = objAndSubData.currentIndex;
					let positionArray = [];
					let positionEntity = {};
					positionEntity.x = objAndSubData.pointx;
					positionEntity.y = objAndSubData.pointy;
					positionEntity.width = objAndSubData.width;
					positionEntity.height = objAndSubData.height;
					positionArray.push(positionEntity);
					answerAreaVoEntity.position = positionArray;
					answerArea.push(answerAreaVoEntity);
				}else if(objAndSubData.markingType=='ObjectiveQuz'){
					//如果是客观题，获取groupList节点
					let objGroupList = objAndSubData.groupList;
					logger.logconsole.info('[MarkingModulesSettingBiz.js]--->[objAndSubDatas] --->[objGroupList]--->'+JSON.stringify(objGroupList));

					for(let i = 0;i<objGroupList.length;i++){
						let answerAreaVoEntity = JSON.parse(JSON.stringify(answerAreaVo));
						let objTitleNum = objGroupList[i].titleNum;
						answerAreaVoEntity.titleNum = objTitleNum;
						answerAreaVoEntity.titleType = "0";
						answerAreaVoEntity.selectNum=objAndSubData.quzOptions;
						answerAreaVoEntity.thisPage = objAndSubData.currentIndex;
						answerAreaVoEntity.position = objGroupList[i].valueGroup;
						logger.logconsole.info('[MarkingModulesSettingBiz.js]--->[objAndSubDatas] --->[objGroupList]---->i:'+i+'---->valueGroup:'+JSON.stringify(objGroupList[i].valueGroup));
						answerArea.push(answerAreaVoEntity);
					}
				}
			}
		}).catch(err => {
			var json = returnMsgUtils.returnMsg(400, '获取[导航数据]操作失败', err, 'reponseMarkingModulesBiz');
		});
		
		//6、客观题版式
		let ObjQuzFormatSettingParam = {};
		ObjQuzFormatSettingParam.markingTaskId = param.markingTaskId;
		ObjQuzFormatSettingParam.sheetId = param.sheetId;
		ObjQuzFormatSettingParam.markingType = 'ObjQuzFormat';
		
		//客观题版式信息
		await db('navMarkingTypeData').sort({
			currentIndex:1,
			createDate: 1
		}).findOne(ObjQuzFormatSettingParam).then(function(doc) {
			logger.logconsole.info('[MarkingModulesSettingBiz.js]--->[ObjQuzFormatSettingData] --->'+JSON.stringify(doc));
			arrayType = doc.trimPreview.arrayType;
		});
		
		let queryOpenCVParam={};
		let sourcePath=param.sourcePath;
		let targetPath=param.targetPath;
		let markingTaskId=param.markingTaskId;
		let fuzzyCoefficient=0;	//1就是锐化了，0是不锐化
		queryOpenCVParam.sourcePath=sourcePath;
		queryOpenCVParam.targetPath=targetPath;
		queryOpenCVParam.markingTaskId=markingTaskId;
		queryOpenCVParam.fuzzyCoefficient= fuzzyCoefficient;
		queryOpenCVParam.arrayType = arrayType;
			
		let dataJson={};
		logger.logconsole.info("answerSheetImageCount===>" +answerSheetImageCount);
		logger.logconsole.info("locationPoint===>" + EJSON.stringify(locationPoint, { relaxed: true }));
		logger.logconsole.info("absenceMark===>" + EJSON.stringify(absenceMark, { relaxed: true }));
		logger.logconsole.info("userMsg===>" + EJSON.stringify(userMsg, { relaxed: true }));
		logger.logconsole.info("answerArea===>" + EJSON.stringify(answerArea, { relaxed: true }));
	
		let dataJsonData = {
			answerSheetImageCount: answerSheetImageCount,
			locationPoint: locationPoint,
			absenceMark: absenceMark,
			answerArea:answerArea,
			userMsg: userMsg
		};
		dataJson.data=dataJsonData;
		logger.logconsole.info("=================markingModulesParam===>"+JSON.stringify(dataJson));
		queryOpenCVParam.dataJson = JSON.stringify(dataJson);
		
		var json = returnMsgUtils.returnMsg(200, '操作成功', queryOpenCVParam, 'reponseMarkingModulesSettingBiz');
		logger.logconsole.info('[MarkingModulesSettingBiz.js]--->[queryOpenCVParam]----------->' + JSON.stringify(queryOpenCVParam));
		oWin.webContents.send('returnMsgListener2', json);
	}
	
	saveDataMap().catch(err => {
		logger.logconsole.error("error===>" +err);
		var json = returnMsgUtils.returnMsg(400, '获取[导航数据]操作失败', err, 'reponseMarkingModulesBiz');
		logger.logconsole.error("error===>" +json);
		console.log(err);
	})

	
})