/**
 * 缺考标记Biz
 */

var {
	ipcMain,
	BrowserWindow,
	Menu
} = require('electron');
const logger = require('../common/logger');
const locationPoint = require('../entity/MissingMark.class');
const dateUtil = require('../utils/dateUtil');
import db from '../utils/dbPromiseUtil';
import returnMsgUtils from '../utils/returnMsgUtils';

//当前窗口
var oWin = BrowserWindow.getFocusedWindow();

logger.logconsole.info('[MissingMarkBiz.js] loading--->');

ipcMain.on('insertMissingMark', (event, data) => {
	logger.logconsole.info('[MissingMarkBiz.js]--->[insertMissingMark]----------->' + JSON.stringify(data));
	data.createDate = dateUtil.currentTime();
	let bizId = data.bizId;
	let queryParam = {};
	queryParam.bizId = bizId; 
	queryParam.markingType='MissingMark';
	
	if(bizId!=null && bizId!=undefined){
		db('navMarkingTypeData').findOne(queryParam).then(docs => {
			logger.logconsole.info('[MissingMarkBiz.j\ns]--->[DOC]----------->' + docs);
			if(docs!=null){
				logger.logconsole.info('[MissingMarkBiz.js]--->[DOC]----IS NOT NULL------UPDATE->' + docs);
				db('navMarkingTypeData').update(queryParam, { $set: data}, { multi: false }, function (err, numReplaced) {
					logger.logconsole.error('[MissingMarkBiz.js]--->[MissingMarkBiz]----------->' + numReplaced);
				});
			}else{
				logger.logconsole.info('[MissingMarkBiz.js]--->[DOC]----IS NULL------INSERT->' + data);
				let delParam = {};
				delParam.markingTaskId = data.markingTaskId;
				delParam.sheetId = data.sheetId;
				delParam.markingType='MissingMark';
				db('navMarkingTypeData').remove(delParam, {multi: true}).then(res=>{
					logger.logconsole.info(data);
					return db('navMarkingTypeData').insert(data);
				}).then(newDoc => {
					var json = returnMsgUtils.returnMsg(200, '操作成功', newDoc, 'reponseInsertMissingMark');
					logger.logconsole.info('[MissingMarkBiz.js]--->[insertMissingMark]----------->' + json);
					oWin.webContents.send('returnMsgListener', json);
				}).catch(err => {
					var json = returnMsgUtils.returnMsg(400, '操作失败', err, 'reponseInsertMissingMark');
					logger.logconsole.error('[MissingMarkBiz.js]--->[insertMissingMark]----------->' + json);
					oWin.webContents.send('returnMsgListener', json);
				})
			}
		})
	}
	
	
})