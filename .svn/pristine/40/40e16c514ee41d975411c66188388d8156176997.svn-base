/**
 * 答题卡上传后保存结构Biz
 */
var {
	ipcMain,
	BrowserWindow,
	Menu
} = require('electron');
const logger = require('../common/logger');
const answerSheetImage = require('../entity/ObjQuzFormatSetting.class');
import db from '../utils/dbPromiseUtil';
import returnMsgUtils from '../utils/returnMsgUtils';
const dateUtil = require('../utils/dateUtil');
const { EJSON } = require('bson');
//当前窗口
var oWin = BrowserWindow.getFocusedWindow();

logger.logconsole.info('[ObjQuzFormatSettingBiz.js] loading--->');
//saveAnswerCardList saveAnswerCardList
//保存答题卡图片


ipcMain.on('insertObjQuzFormatSetting', (event, data) => {
	logger.logconsole.info('[ObjQuzFormatSettingBiz.js]--->[insertObjQuzFormatSetting]----------->' + JSON.stringify(data));
	data.createDate = dateUtil.currentTime();
	let bizId = data.bizId;
	let queryParam = {};
	queryParam.bizId = bizId; 
	queryParam.markingType='ObjQuzFormat';
	if(bizId!=null && bizId!=undefined){
		db('navMarkingTypeData').findOne(queryParam).then(docs => {
			logger.logconsole.info('[ObjQuzFormatSettingBiz.js]--->[DOC]----------->' + docs);
			if(docs!=null){
				db('navMarkingTypeData').update(queryParam, { $set: data}, { multi: false }, function (err, numReplaced) {
					logger.logconsole.error('[ObjQuzFormatSettingBiz.js]--->[insertObjQuzFormatSetting]----------->' + numReplaced);
				});
			} else{
				let delParam = {};
				delParam.markingTaskId = data.markingTaskId;
				delParam.sheetId = data.sheetId;	
				delParam.markingType='ObjQuzFormat';
				db('navMarkingTypeData').remove(delParam, {multi: true}).then(res=>{
					logger.logconsole.info(data);
					return db('navMarkingTypeData').insert(data);
				}).then(newDoc=>{
					var json = returnMsgUtils.returnMsg(200, '操作成功', newDoc, 'responseInsertObjQuzFormatSetting');
					logger.logconsole.info('[ObjQuzFormatSettingBiz.js]--->[insertObjQuzFormatSetting]----------->' + json);
					oWin.webContents.send('returnMsgListener', json);
				}).catch(err => {
					var json = returnMsgUtils.returnMsg(400, '操作失败', err, 'responseInsertObjQuzFormatSetting');
					logger.logconsole.error('[ObjQuzFormatSettingBiz.js]--->[insertObjQuzFormatSetting]----------->' + json);
					oWin.webContents.send('returnMsgListener', json);
				});
			}
		})
	}
})



//[读取答题卡]从数据库中读取答题卡照片，返回给vue 前端
ipcMain.on('requestObjQuzFormatSetting', (event, param) => {
	
	let queryParam = {};
	queryParam.markingTaskId = param.markingTaskId;
	queryParam.markingType = 'ObjQuzFormat';
	queryParam.sheetId = param.sheetId;

	logger.logconsole.info('[ObjQuzFormatSettingBiz.js]--->[requestObjQuzFormatSetting]----------->' + JSON.stringify(queryParam));
	db('navMarkingTypeData').findOne(queryParam).then(docs => {
		let result = docs;
		console.log('111111111111111111111111111111=?'+result)
		var json = returnMsgUtils.returnMsg(200, '获取[客观题版式]操作成功', result, 'reponseObjQuzFormatSetting');
		logger.logconsole.info('[ObjQuzFormatSettingBiz.js]--->[requestObjQuzFormatSetting]----------->' + json);
		oWin.webContents.send('returnMsgListener', json);
	}).catch(err => {
		var json = returnMsgUtils.returnMsg(400, '获取[客观题版式]操作失败', err, 'reponseObjQuzFormatSetting');
		logger.logconsole.error('[ObjQuzFormatSettingBiz.js]--->[requestObjQuzFormatSetting]----------->' + json);
		oWin.webContents.send('returnMsgListener', json);
	});
});
