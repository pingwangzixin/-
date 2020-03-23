/**
 * 客观题Biz
 */

var {
	ipcMain,
	BrowserWindow,
	Menu
} = require('electron');
const logger = require('../common/logger');
const locationPoint = require('../entity/ObjectiveQuz.class');
const dateUtil = require('../utils/dateUtil');
import db from '../utils/dbPromiseUtil';
import returnMsgUtils from '../utils/returnMsgUtils';

//当前窗口
var oWin = BrowserWindow.getFocusedWindow();

logger.logconsole.info('[ObjectiveQuzBiz.js] loading--->');

ipcMain.on('insertObjectiveQuz', (event, data) => {
	logger.logconsole.info('[ObjectiveQuzBiz.js]--->[insertObjectiveQuz]----------->' + JSON.stringify(data));
	data.createDate = dateUtil.currentTime();
	
	
	let bizId = data.bizId;
	let queryParam = {};
	queryParam.bizId = bizId; 
	queryParam.markingType='ObjectiveQuz';
	
	if(bizId!=null && bizId!=undefined){
		db('navMarkingTypeData').findOne(queryParam).then(docs => {
			logger.logconsole.info('[ObjectiveQuzBiz.js]--->[DOC]----------->' + docs);
			if(docs!=null){
				db('navMarkingTypeData').update(queryParam, { $set: data}, { multi: false }, function (err, numReplaced) {
					logger.logconsole.error('[ObjectiveQuzBiz.js]--->[insertObjectiveQuz]----------->' + numReplaced);
				});
			} else{
				logger.logconsole.info(data);
				db('navMarkingTypeData').insert(data).then(newDoc => {
					var json = returnMsgUtils.returnMsg(200, '操作成功', newDoc, 'responseInsertObjectiveQuz');
					logger.logconsole.info('[ObjectiveQuzBiz.js]--->[insertObjectiveQuz]----------->' + json);
					oWin.webContents.send('returnMsgListener', json);
				}).catch(err => {
					var json = returnMsgUtils.returnMsg(400, '操作失败', err, 'responseInsertObjectiveQuz');
					logger.logconsole.error('[ObjectiveQuzBiz.js]--->[insertObjectiveQuz]----------->' + json);
					oWin.webContents.send('returnMsgListener', json);
				})
			}
		});
	}
	
})


