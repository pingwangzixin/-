/**
 * 学生信息Biz
 */

var {
	ipcMain,
	BrowserWindow,
	Menu
} = require('electron');
const logger = require('../common/logger');
const locationPoint = require('../entity/StudentPageInfo.class');
const dateUtil = require('../utils/dateUtil');
import db from '../utils/dbPromiseUtil';
import returnMsgUtils from '../utils/returnMsgUtils';

//当前窗口
var oWin = BrowserWindow.getFocusedWindow();

logger.logconsole.info('[StudentPageInfoBiz.js] loading--->');

ipcMain.on('insertStudentPageInfo', (event, data) => {
	logger.logconsole.info('[StudentPageInfoBiz.js]--->[insertStudentPageInfo]----------->' + JSON.stringify(data));
	data.createDate = dateUtil.currentTime();
	let bizId = data.bizId;
	let queryParam = {};
	queryParam.bizId = bizId; 
	queryParam.markingType='StudentPageInfo';
	if(bizId!=null && bizId!=undefined){
		db('navMarkingTypeData').findOne(queryParam).then(docs => {
			logger.logconsole.info('[StudentPageInfoBiz.js]--->[DOC]----------->' + docs);
			if(docs!=null){
				db('navMarkingTypeData').update(queryParam, { $set: data}, { multi: false }, function (err, numReplaced) {
					logger.logconsole.error('[StudentPageInfoBiz.js]--->[insertStudentPageInfo]----------->' + numReplaced);
				});
			} else{
				let delParam = {};
				delParam.markingTaskId = data.markingTaskId;
				delParam.sheetId = data.sheetId;
				delParam.markingType='StudentPageInfo';
				db('navMarkingTypeData').remove(delParam, {multi: true}).then(res=>{
					logger.logconsole.info(data);
					return db('navMarkingTypeData').insert(data);
				}).then(newDoc => {
					var json = returnMsgUtils.returnMsg(200, '操作成功', newDoc, 'reponseInsertStudentPageInfo');
					logger.logconsole.info('[StudentPageInfoBiz.js]--->[insertStudentPageInfo]----------->' + json);
					oWin.webContents.send('returnMsgListener', json);
				}).catch(err => {
					var json = returnMsgUtils.returnMsg(400, '操作失败', err, 'reponseInsertStudentPageInfo');
					logger.logconsole.error('[StudentPageInfoBiz.js]--->[insertStudentPageInfo]----------->' + json);
					oWin.webContents.send('returnMsgListener', json);
				})
			}
		});
		
	}
})