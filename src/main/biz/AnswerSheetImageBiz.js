/**
 * 答题卡上传后保存结构Biz
 */
var {
	ipcMain,
	BrowserWindow,
	Menu
} = require('electron');
const logger = require('../common/logger');
const answerSheetImage = require('../entity/AnswerSheetImage.class');
//import db from '../utils/dbUtil';
import db from '../utils/dbPromiseUtil';
import returnMsgUtils from '../utils/returnMsgUtils';
const { EJSON } = require('bson');
//当前窗口
var oWin = BrowserWindow.getFocusedWindow();

logger.logconsole.info('[AnswerSheetImageBiz.js] loading--->');
//saveAnswerCardList saveAnswerCardList
//保存答题卡图片
ipcMain.on('saveAnswerCardList', (event, data) => {
	logger.logconsole.info('[AnswerSheetImageBiz.js]--->[saveAnswerCardList]----------->' + JSON.stringify(data));
	//首先删除记录，然后将结果数据保存在nedb中
	let sheetId = data.sheetId;	
	let markingTaskId = data.markingTaskId;
	let uploadData = data.uploadData;
	
	let delParam = {};
	delParam.markingTaskId = markingTaskId;
	delParam.sheetId = sheetId;
	db('answerSheetImageData').remove(delParam, {multi: true})
	.then(res => {
		return db('navMarkingTypeData').remove(delParam, {multi: true})
	}).then(res => {
		return db('answerSheetImageData').insert(uploadData);
	}).then(res => {
		var json = returnMsgUtils.returnMsg(200, '操作成功', res, 'reponseSaveAnswerCardList');
		logger.logconsole.info('[AnswerSheetImageBiz.js]--->[saveAnswerCardList]----------->' + json);
		oWin.webContents.send('returnMsgListener', json);
	}).catch(err => {
		var json = returnMsgUtils.returnMsg(400, '操作失败', err, 'reponseSaveAnswerCardList');
		logger.logconsole.error('[AnswerSheetImageBiz.js]--->[saveAnswerCardList]----------->' + json);
		oWin.webContents.send('returnMsgListener', json);
	});
});

//测试用删除所有的图片test
ipcMain.on('deleteAnswerSheetImage', (event, data) => {
	logger.logconsole.info('[AnswerSheetImageBiz.js]--->[deleteAnswerSheetImage]----------->' + JSON.stringify(data));
	db('answerSheetImageData').remove({}, {
		multi: true
	}).then(res => {
		var json = returnMsgUtils.returnMsg(200, '操作成功', res, 'reponseDeleteAnswerSheetImage');
		logger.logconsole.info('[AnswerSheetImageBiz.js]--->[deleteAnswerSheetImage]----------->' + json);
		oWin.webContents.send('returnMsgListener', json);
	}).catch(err => {
		var json = returnMsgUtils.returnMsg(200, '失败', err, 'reponseDeleteAnswerSheetImage');
		logger.logconsole.error('[AnswerSheetImageBiz.js]--->[deleteAnswerSheetImage]----------->' + json);
		oWin.webContents.send('returnMsgListener', json);
	});
})

//[读取答题卡]从数据库中读取答题卡照片，返回给vue 前端
ipcMain.on('initAnswerCardList', (event, param) => {
	logger.logconsole.info('[AnswerSheetImageBiz.js]--->[initAnswerCardList]----------->' + JSON.stringify(param));
	db('answerSheetImageData').sort({
		currentIndex: 1
	}).find(param).then(docs => {
		let result = [];
		docs.forEach(function(value, i) {
			let answerSheetImageEntity = JSON.parse(JSON.stringify(answerSheetImage));
			answerSheetImageEntity.bizId = value.bizId;
			answerSheetImageEntity.sheetId = value.sheetId;
			answerSheetImageEntity.markingTaskId = value.markingTaskId;
			answerSheetImageEntity.currentSheetUrl = value.currentSheetUrl;
			answerSheetImageEntity.currentSheetFilePath = value.currentSheetFilePath;
			answerSheetImageEntity.absolutePath = value.absolutePath;
			answerSheetImageEntity.currentIndex = value.currentIndex;
			answerSheetImageEntity.scaleWidth = value.scaleWidth;
			answerSheetImageEntity.scaleHeight = value.scaleHeight;
			result.push(answerSheetImageEntity);
		});
		var json = returnMsgUtils.returnMsg(200, '获取[导入答题卡]操作成功', result, 'reponseInitAnswerCardList');
		logger.logconsole.info('[AnswerSheetImageBiz.js]--->[initAnswerCardList]----------->' + json);
		oWin.webContents.send('returnMsgListener', json);
	}).catch(err => {
		var json = returnMsgUtils.returnMsg(400, '获取[导入答题卡]操作失败', err, 'reponseInitAnswerCardList');
		logger.logconsole.error('[AnswerSheetImageBiz.js]--->[initAnswerCardList]----------->' + json);
		oWin.webContents.send('returnMsgListener', json);
	});
});



//[读取答题卡]从数据库中读取答题卡照片，返回给vue 前端
ipcMain.on('initQuzNum', (event, param) => {
	let json={};
	oWin.webContents.send('reponseInitQuzNum', json);
});

//[答题卡整体保存]从数据库中读取[answerSheetImageData][navMarkingTypeData]数据，将数据转换为JSON格式上传服务器
//上传答题卡图片至指定的服务器
//http://198.9.6.137:8080/examPaper/answerSheet/uploadSubNavMarkingTypeImages
//files[] 
import Axios from 'axios';
const $http = Axios;
ipcMain.on('saveData', (event, queryParam) => {
	logger.logconsole.info('[AnswerSheetImageBiz.js]--->[saveData]----------->' + JSON.stringify(queryParam));
	
	let param = {};
	param.markingTaskId = queryParam.markingTaskId;
	param.sheetId = queryParam.sheetId;
	let groupQuzArray = queryParam.groupQuzArray;
	

	const saveDataMap = async() => {
		let answerSheetImageDataArray = [];
		let navMarkingTypeDataArray = [];
		let subjectiveQuzDataArray=[];	//主观题
		let objectiveQuzDataArray=[];	//客观题
		let OjbOrderInt = 1;
		let subOrderInt = 1;

		//答题卡数据
		await db('answerSheetImageData').sort({
			currentIndex: 1
		}).find(param).then(function(docs) {
			answerSheetImageDataArray = docs;
		}).catch(err => {
			var json = returnMsgUtils.returnMsg(400, '获取[答题卡数据]操作失败', err, 'reponseLeftModulesBiz');
		});

		//导航类型数据
		await db('navMarkingTypeData').sort({
			bizOrder: 1,
			createDate: 1
		}).find(param).then(function(docs) {
			navMarkingTypeDataArray = docs;
		}).catch(err => {
			var json = returnMsgUtils.returnMsg(400, '获取[导航数据]操作失败', err, 'reponseLeftModulesBiz');
		});
		
		
		let paramSub = param;
		paramSub.markingType='SubjectiveQuz';
		//主观题数据
		await db('navMarkingTypeData').sort({
			bizOrder: 1,
			createDate: 1
		}).find(paramSub).then(function(subjectiveQuzDocs) {
			
			for(const [index, subjectiveQuzDoc] of subjectiveQuzDocs.entries()) {
					logger.logconsole.info('[AnswerSheetImageBiz.js]--->[saveData]--->[foreach subjectiveQuzDocs.entries()]--->'+index+" --->"+subjectiveQuzDoc.markingModuleName);
					console.log(subjectiveQuzDoc.markingModuleName);
					let subjectiveQuzData = {};
					let arrayStartIndex = subjectiveQuzDoc.quzStartSeqIndex-0;
					subjectiveQuzData.bizId = subjectiveQuzDoc.bizId;
					subjectiveQuzData.markingModuleName = subjectiveQuzDoc.markingModuleName;
					subjectiveQuzData.quzIds = subjectiveQuzDoc.quzIds;
					subjectiveQuzData.quzLabels = subjectiveQuzDoc.quzLabels;
					subjectiveQuzData.quzStartSeqLabel=subjectiveQuzDoc.quzStartSeqLabel;
					subjectiveQuzData.quzCount = subjectiveQuzDoc.quzCount;
					subjectiveQuzData.quzSeq = groupQuzArray[arrayStartIndex].bizOrder;
					subjectiveQuzDataArray.push(subjectiveQuzData);
			}
		}).catch(err => {
			var json = returnMsgUtils.returnMsg(400, '获取[导航数据]操作失败', err, 'reponseLeftModulesBiz');
		});


		let paramObj = param;
		paramObj.markingType='ObjectiveQuz';
		//主观题数据
		await db('navMarkingTypeData').sort({
			bizOrder: 1,
			createDate: 1
		}).find(paramObj).then(function(objectiveQuzDocs) {
			for(const [index, objectiveQuzDoc] of objectiveQuzDocs.entries()) {
					logger.logconsole.info('[AnswerSheetImageBiz.js]--->[saveData]--->[foreach objectiveQuzDocs.entries()]--->'+index+" --->"+objectiveQuzDoc.markingModuleName);
					let quzIdsArray = objectiveQuzDoc.quzIds;
					let groupList = [];
					groupList =objectiveQuzDoc.groupList;
					let arrayStartIndex = objectiveQuzDoc.quzStartSeqIndex-0;
					let objQuzCount = objectiveQuzDoc.quzCount-0;
					let selectArr = groupQuzArray.slice(arrayStartIndex,arrayStartIndex+objQuzCount);
					let quzObjType = objectiveQuzDoc.quzObjType;
					logger.logconsole.info('[AnswerSheetImageBiz.js]--->[saveData]--->[foreach objectiveQuzDocs.entries()]--->'+index+" --->"+objectiveQuzDoc.markingModuleName+'groupList.length='+groupList.length);
					for(let j=0;j<groupList.length;j++){
						let objectiveQuzData = {};
						objectiveQuzData.quzId = quzIdsArray[j];
						objectiveQuzData.quzLabel = groupList[j].titleNum;
						let valueGroup = groupList[j].valueGroup;
						objectiveQuzData.optionCount = valueGroup.length;
						objectiveQuzData.quzSeq = selectArr[j].bizOrder;
						objectiveQuzData.quzObjType = quzObjType;
						objectiveQuzDataArray.push(objectiveQuzData);
					}

			}
		}).catch(err => {
			var json = returnMsgUtils.returnMsg(400, '获取[导航数据]操作失败', err, 'reponseLeftModulesBiz');
		});

		logger.logconsole.info("answerSheetImageDataArray===>" + EJSON.stringify(answerSheetImageDataArray, { relaxed: true }));
		logger.logconsole.info("navMarkingTypeDataArray===>" + EJSON.stringify(navMarkingTypeDataArray, { relaxed: true }));
		logger.logconsole.info("subjectiveQuzDataArray===>" + EJSON.stringify(subjectiveQuzDataArray, { relaxed: true }));
		logger.logconsole.info("objectiveQuzDataArray===>" + EJSON.stringify(objectiveQuzDataArray, { relaxed: true }));
	
	
		let serviceParam = {
			answersheetimagedata: EJSON.stringify(answerSheetImageDataArray, { relaxed: true }),
			navmarkingtypedata: EJSON.stringify(navMarkingTypeDataArray, { relaxed: true }),
			subjectivequzdata: subjectiveQuzDataArray,
			objectivequzdata: objectiveQuzDataArray,
			paperMarkingTaskId : queryParam.markingTaskId
		};
		logger.logconsole.info("=================serviceParam===>"+JSON.stringify(serviceParam));
		
		
		var json = returnMsgUtils.returnMsg(200, '获取[制作答题卡保存]操作成功', serviceParam, 'reponseSaveData');
		logger.logconsole.info(json);
		oWin.webContents.send('returnMsgListener', json);
	}
	saveDataMap().catch(err => {
		console.log(err);
	})

});

//
ipcMain.on('requestQuestionsMsg', (event, param) => {
	//添加网络接口，访问试卷结构接口
	//http://198.9.6.137:8080/examPaper/markingTask/findAnswerSheetSectionGroupQuzConfig?id=091b848cd62a463a854114cebdac6754
//	$http.post('http://198.9.6.137:8080/examPaper/markingTask/findAnswerSheetSectionGroupQuzConfig', param.markingTaskId).then(function (res) {
	$http.get('http://198.9.6.137:8080/examPaper/markingTask/findAnswerSheetSectionGroupQuzConfig?id=' + param.markingTaskId).then(function (res) {
	    var json = returnMsgUtils.returnMsg(200, '获取[试题信息]操作成功', res.data, 'reponseQuestionsMsg');
	    logger.logconsole.info(json);
	    oWin.webContents.send('returnMsgListener', json);  
	}).catch(function (error) {
	    console.log(error);
	});
	
});


//https://www.npmjs.com/package/bson 
//1、答题卡整体保存]从服务器中读取[answerSheetImageData][navMarkingTypeData]数据，将本地相关数据情况后，JSON格式转换为BSON插入数据NEDB服务器
//2、下载答题卡图片放置在指定的文件目录中【注册表鸿文件的按照目录】+【图片的相对路径】
ipcMain.on('loadData', (event, param) => {
	logger.logconsole.info('[AnswerSheetImageBiz.js]--->[loadData]----------->' + JSON.stringify(param));

	db('answerSheetImageData').remove(param, {
		multi: true
	}).then(res => {
		var json = returnMsgUtils.returnMsg(200, '操作成功', res, 'reponseContextMenuDel');
		logger.logconsole.info('[ipcMain.js]--->[loadData]----------->' + json);
	}).catch(err => {
		var json = returnMsgUtils.returnMsg(400, '操作失败', err, 'reponseContextMenuDel');
		logger.logconsole.error('[ipcMain.js]--->[loadData]----------->' + json);
	});

	db('navMarkingTypeData').remove(param, {
		multi: true
	}).then(res => {
		var json = returnMsgUtils.returnMsg(200, '操作成功', res, 'reponseContextMenuDel');
		logger.logconsole.info('[ipcMain.js]--->[loadData]----------->' + json);
	}).catch(err => {
		var json = returnMsgUtils.returnMsg(400, '操作失败', err, 'reponseContextMenuDel');
		logger.logconsole.error('[ipcMain.js]--->[loadData]----------->' + json);
	})

});