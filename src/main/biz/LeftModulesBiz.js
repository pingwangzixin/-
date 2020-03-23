/**
 * 左侧结构Biz
 */
var {
	ipcMain,
	BrowserWindow,
	Menu
} = require('electron');
const logger = require('../common/logger');
const leftData = require('../entity/vo/LeftData.class')
const pointData = require('../entity/vo/PointData.class')
const secondLevel = require('../entity/vo/SecondLevel.class')

import db from '../utils/dbPromiseUtil';
import returnMsgUtils from '../utils/returnMsgUtils';

//当前窗口
var oWin = BrowserWindow.getFocusedWindow();

logger.logconsole.info('[LeftModulesBiz.js] loading--->');





/**
 * 封装查询左侧树导航结构方法
 * @param {Object} navMarkingTypeDatas :  通过await阻塞查询数据库nedb中相关的节点信息 await db('navMarkingTypeData').find(objectiveQueryParams)
 */
function findSecLevelNavMarkingTypeData(navMarkingTypeDatas){
	let pointDataEntityArray = [];
	for(const [index, navMarkingTypeData] of navMarkingTypeDatas.entries()) {
		logger.logconsole.info('[LeftModulesBiz.js]--->[pageResultFun]--->[foreach navMarkingTypeDatas.entries()]--->'+index+" --->"+navMarkingTypeData.markingModuleName);
		console.log(navMarkingTypeData.markingModuleName);
		let pointDataEntity = JSON.parse(JSON.stringify(pointData));
		pointDataEntity.name = navMarkingTypeData.markingModuleName;
		pointDataEntity.bizId = navMarkingTypeData.bizId;
		pointDataEntity.position = {
			x: navMarkingTypeData.pointx,
			y: navMarkingTypeData.pointy,
			width: navMarkingTypeData.width,
			height: navMarkingTypeData.height
		};
		pointDataEntity.show = false;
		if(navMarkingTypeData.markingType=='ObjectiveQuz'){
			pointDataEntity.pointSecondList = navMarkingTypeData.groupList;
		}else if(navMarkingTypeData.markingType=='StudentPageInfo'){
			pointDataEntity.pointSecondList = navMarkingTypeData.studentFillInfo;
		}
		
		pointDataEntityArray.push(pointDataEntity);
	}
	return pointDataEntityArray;
}

/**
 * 左侧树结构，按照类别分别获取答题卡一共多少页，针对于每一页进行循环迭代，分别依次获取定位点、缺考标记、学生信息、主观题、客观题结构
 */
let pageResultFun = async function(res, param) {
	let pageResult = [];
	for(const [i, value] of res.entries()) {
		let leftDataEntity = JSON.parse(JSON.stringify(leftData));
		let pageNo = i + 1;
		leftDataEntity.name = '第' + pageNo + '页';
		leftDataEntity.answerSheetImageId = value.bizId;
		leftDataEntity.src = value.currentSheetUrl;
		leftDataEntity.filePath = value.currentSheetFilePath;
		leftDataEntity.absolutePath=value.absolutePath;
		leftDataEntity.show = false;
		leftDataEntity.state = false;
		leftDataEntity.scaleWidth = value.scaleWidth;
		leftDataEntity.scaleHeight = value.scaleHeight;

		//第二层结构开始
		let secondLevelArray = [];
		let locationPoint = JSON.parse(JSON.stringify(secondLevel));
		locationPoint.show = false;
		locationPoint.name = '定位点';
		locationPoint.value = 'locationPoint';
		locationPoint.text = '框选定位点';
		let locationPointQueryParams = {};
		locationPointQueryParams.answerSheetImageId = value.bizId;
		locationPointQueryParams.sheetId = param.sheetId;
		locationPointQueryParams.markingType='LocationPoint';
		locationPointQueryParams.markingTaskId = param.markingTaskId;
		const locationPointNavMarkingTypeDatas = await db('navMarkingTypeData').sort({
			createDate: 1
		}).find(locationPointQueryParams);
		locationPoint.pointList = findSecLevelNavMarkingTypeData(locationPointNavMarkingTypeDatas);
		secondLevelArray.push(locationPoint);

		let missExam = JSON.parse(JSON.stringify(secondLevel));
		missExam.show = false;
		missExam.name = '缺考标记';
		missExam.value = 'missExam';
		missExam.text = '框选缺考标记';
		let missExamQueryParams = {};
		missExamQueryParams.answerSheetImageId = value.bizId;
		missExamQueryParams.sheetId = param.sheetId;
		missExamQueryParams.markingType='MissingMark';
		missExamQueryParams.markingTaskId = param.markingTaskId;
		const missExamNavMarkingTypeDatas = await db('navMarkingTypeData').sort({
			createDate: 1
		}).find(missExamQueryParams);
		missExam.pointList = findSecLevelNavMarkingTypeData(missExamNavMarkingTypeDatas);
		secondLevelArray.push(missExam);

		let studentInfo = JSON.parse(JSON.stringify(secondLevel));
		studentInfo.show = false;
		studentInfo.name = '学生信息';
		studentInfo.value = 'studentInfo';
		studentInfo.text = '框选学生信息';
		let studentInfoQuesParams = {};
		studentInfoQuesParams.answerSheetImageId = value.bizId;
		studentInfoQuesParams.sheetId = param.sheetId;
		studentInfoQuesParams.markingType='StudentPageInfo';
		studentInfoQuesParams.markingTaskId = param.markingTaskId;
		const stuInfoNavMarkingTypeDatas = await db('navMarkingTypeData').sort({
			createDate: 1
		}).find(studentInfoQuesParams);
		studentInfo.pointList = findSecLevelNavMarkingTypeData(stuInfoNavMarkingTypeDatas);
		secondLevelArray.push(studentInfo);

		let subjectiveQues = JSON.parse(JSON.stringify(secondLevel));
		subjectiveQues.show = false;
		subjectiveQues.name = '主观题';
		subjectiveQues.value = 'subjectiveQues';
		subjectiveQues.text = '框选主观题';
		let subjectiveQuesParams = {};
		subjectiveQuesParams.answerSheetImageId = value.bizId;
		subjectiveQuesParams.sheetId = param.sheetId;
		subjectiveQuesParams.markingType='SubjectiveQuz';
		subjectiveQuesParams.markingTaskId = param.markingTaskId;
		const subNavMarkingTypeDatas = await db('navMarkingTypeData').sort({
			createDate: 1
		}).find(subjectiveQuesParams);
		subjectiveQues.pointList = findSecLevelNavMarkingTypeData(subNavMarkingTypeDatas);
		secondLevelArray.push(subjectiveQues);

		let objectiveQues = JSON.parse(JSON.stringify(secondLevel));
		objectiveQues.show = false;
		objectiveQues.name = '客观题';
		objectiveQues.value = 'objectiveQues';
		objectiveQues.text = '框选客观题';
		let objectiveQueryParams = {};
		objectiveQueryParams.answerSheetImageId = value.bizId;
		objectiveQueryParams.sheetId = param.sheetId;
		objectiveQueryParams.markingType='ObjectiveQuz';
		objectiveQueryParams.markingTaskId = param.markingTaskId;
		const objNavMarkingTypeDatas = await db('navMarkingTypeData').sort({
			createDate: 1
		}).find(objectiveQueryParams);
		console.log("aaaaaaaaaaaaa")
		console.log(objectiveQueryParams)
		console.log(objNavMarkingTypeDatas);		
		objectiveQues.pointList = findSecLevelNavMarkingTypeData(objNavMarkingTypeDatas);
		secondLevelArray.push(objectiveQues);

		leftDataEntity.secondLevel = secondLevelArray;
		//第二层结构结束
		pageResult.push(leftDataEntity);
	}

	var json = returnMsgUtils.returnMsg(200, '获取[左侧树]操作成功', pageResult, 'reponseLeftModulesBiz');
	logger.logconsole.info(json);
	oWin.webContents.send('returnMsgListener', json);
}

ipcMain.on('requestLeftModulesBiz', (event, param) => {
	logger.logconsole.info('[LeftModulesBiz.js]--->[requestLeftModulesBiz]----------->' + JSON.stringify(param));

	//获取一共有几张答题卡
	db('answerSheetImageData').sort({
		currentIndex: 1
	}).find(param).then(function(docs) {
		pageResultFun(docs, param);
	}).catch(err => {
		var json = returnMsgUtils.returnMsg(400, '获取[左侧树]操作失败', err, 'reponseLeftModulesBiz');
		oWin.webContents.send('returnMsgListener', json);
	});
})