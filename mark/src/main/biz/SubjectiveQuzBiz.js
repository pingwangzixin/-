/**
 * 主观题Biz
 */

var {
	ipcMain,
	BrowserWindow,
	Menu
} = require('electron');
const logger = require('../common/logger');
const locationPoint = require('../entity/SubjectiveQuz.class');
const dateUtil = require('../utils/dateUtil');
import db from '../utils/dbPromiseUtil';
import returnMsgUtils from '../utils/returnMsgUtils';

//当前窗口
var oWin = BrowserWindow.getFocusedWindow();

logger.logconsole.info('[SubjectiveQuzBiz.js] loading--->');

//框选主观题定位点
ipcMain.on('insertSubjectiveQuz', (event, data) => {
	logger.logconsole.info('[SubjectiveQuzBiz.js]--->[insertSubjectiveQuz]----------->' + JSON.stringify(data));
	data.createDate = dateUtil.currentTime();
	
	let bizId = data.bizId;
	let queryParam = {};
	queryParam.bizId = bizId; 
	queryParam.markingType='SubjectiveQuz';
	
	if(bizId!=null && bizId!=undefined){
		db('navMarkingTypeData').findOne(queryParam).then(docs => {
			logger.logconsole.info('[SubjectiveQuzBiz.js]--->[DOC]----------->' + docs);
			if(docs!=null){
				db('navMarkingTypeData').update(queryParam, { $set: data}, { multi: false }, function (err, numReplaced) {
					logger.logconsole.error('[SubjectiveQuzBiz.js]--->[insertSubjectiveQuz]----------->' + numReplaced);
				});
			} else{
				db('navMarkingTypeData').insert(data).then(res => {
					var json = returnMsgUtils.returnMsg(200, '操作成功', res, 'reponseInsertSubjectiveQuz');
					logger.logconsole.info('[SubjectiveQuzBiz.js]--->[insertSubjectiveQuz]----------->' + json);
					oWin.webContents.send('returnMsgListener', json);
				}).catch(err => {
					var json = returnMsgUtils.returnMsg(400, '操作失败', err, 'reponseInsertSubjectiveQuz');
					logger.logconsole.error('[SubjectiveQuzBiz.js]--->[insertSubjectiveQuz]----------->' + json);
					oWin.webContents.send('returnMsgListener', json);
				});
			}
			
		});
	}
	
})