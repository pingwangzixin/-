/**
 * 定位点Biz
 */

var {
	ipcMain,
	BrowserWindow,
	Menu
} = require('electron');
const locationPoint = require('../entity/LocationPoint.class');
const dateUtil = require('../utils/dateUtil');
const logger = require('../common/logger');
import db from '../utils/dbPromiseUtil';
import returnMsgUtils from '../utils/returnMsgUtils';

//当前窗口
var oWin = BrowserWindow.getFocusedWindow();

logger.logconsole.info('[LocationPointBiz.js] loading--->');

ipcMain.on('insertLocationPoint', (event, data) => {
	logger.logconsole.info('[LocationPointBiz.js]--->[insertLocationPoint]----------->' + JSON.stringify(data));
	data.createDate = dateUtil.currentTime();
	let bizId = data.bizId;
	let queryParam = {};
	queryParam.bizId = bizId; 
	queryParam.markingType='LocationPoint';
	if(bizId!=null && bizId!=undefined){
		db('navMarkingTypeData').findOne(queryParam).then(docs => {
			logger.logconsole.info('[LocationPointBiz.js]--->[DOC]----------->' + docs);
			if(docs!=null){
				db('navMarkingTypeData').update(queryParam, { $set: data}, { multi: false }, function (err, numReplaced) {
					logger.logconsole.error('[LocationPointBiz.js]--->[insertLocationPoint]----------->' + numReplaced);
				});
			} else{
				db('navMarkingTypeData').insert(data).then(res => {
					var json = returnMsgUtils.returnMsg(200, '操作成功', res, 'reponseInsertLocationPoint');
					logger.logconsole.info('[LocationPointBiz.js]--->[insertLocationPoint]----------->' + json);
					oWin.webContents.send('returnMsgListener', json);
				}).catch(err => {
					var json = returnMsgUtils.returnMsg(400, '操作失败', err, 'reponseInsertLocationPoint');
					logger.logconsole.error('[LocationPointBiz.js]--->[insertLocationPoint]----------->' + json);
					oWin.webContents.send('returnMsgListener', json);
				})
			}
		})
	}
	
	
//	db('navMarkingTypeData').insert(data).then(res => {
//		var json = returnMsgUtils.returnMsg(200, '操作成功', res, 'reponseInsertLocationPoint');
//		logger.logconsole.info('[LocationPointBiz.js]--->[insertLocationPoint]----------->' + json);
//		oWin.webContents.send('returnMsgListener', json);
//	}).catch(err => {
//		var json = returnMsgUtils.returnMsg(400, '操作失败', err, 'reponseInsertLocationPoint');
//		logger.logconsole.error('[LocationPointBiz.js]--->[insertLocationPoint]----------->' + json);
//		oWin.webContents.send('returnMsgListener', json);
//	})
})

/**
 * 删除定位点
 */
//ipcMain.on('deleteLocationPoint', (event, data) => {
//	logger.logconsole.info('[LocationPointBiz.js]--->[deleteLocationPoint]----------->' + JSON.stringify(data));
//	db('vueData').remove({}, {
//		multi: true
//	}).then(res => {
//		var json = returnMsgUtils.returnMsg(200, '操作成功', res, 'reponseDeleteLocationPoint');
//		logger.logconsole.info('[LocationPointBiz.js]--->[deleteLocationPoint]----------->' + json);
//		oWin.webContents.send('returnMsgListener', json);
//	}).catch(err => {
//		var json = returnMsgUtils.returnMsg(400, '操作失败', err, 'reponseDeleteLocationPoint');
//		logger.logconsole.error('[LocationPointBiz.js]--->[deleteLocationPoint]----------->' + json);
//		oWin.webContents.send('returnMsgListener', json);
//	})
//
//})
