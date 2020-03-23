/**
 * 扫描
 */
var {
	ipcMain,
	BrowserWindow,
	Menu
} = require('electron');
const logger = require('../common/logger');
const scanMemberMarking = require('../entity/ScanMemberMarking.class');
//import db from '../utils/dbUtil';
import db from '../utils/dbPromiseUtil';
import returnMsgUtils from '../utils/returnMsgUtils';
const { EJSON } = require('bson');
//当前窗口
var oWin = BrowserWindow.getFocusedWindow();

logger.logconsole.info('[scanMemberMarkingBiz.js] loading--->');

//保存扫描后学生列表数据
ipcMain.on('requestSaveData', (event, data) => {
	logger.logconsole.info('[scanMemberMarkingBiz.js]--->[requestSaveData]----------->' + JSON.stringify(data));
	let insertData = {
		sheetId : data.sheetId,
		markingTaskId : data.markingTaskId,
		stuList : data.stuList
	};
	db('scanMemberMarkingData').insert(insertData).then(res => {
		var json = returnMsgUtils.returnMsg(200, '操作成功', res, 'reponseScanMemberMarkingData');
		logger.logconsole.info('[scanMemberMarkingBiz.js]--->[requestSaveData]----------->' + json);
		oWin.webContents.send('returnMsgListener2', json);
	}).catch(err => {
		var json = returnMsgUtils.returnMsg(400, '操作失败', err, 'reponseScanMemberMarkingData');
		logger.logconsole.error('[scanMemberMarkingBiz.js]--->[requestSaveData]----------->' + json);
		oWin.webContents.send('returnMsgListener2', json);
	});
});
