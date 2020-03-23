/**
 * 1 从渲染js传递param、sheetId: ，markingTaskId通过浏览器传递的参数，
 * 1-1  接口下载图片 存本地：获取注册表（） F:/soft/marking/+markingTaskId/sheetId.jpg （√）
 * 1-2  发送接口，从接口中获取到接口数据（JSON），JSON用NedbUtil insert(JSONDATA->BSONDATA);
 * 成功完成后，将数据loading 消失
 */

var {
	ipcMain,
	BrowserWindow,
	Menu
} = require('electron');
const logger = require('../common/logger');
const dateUtil = require('../utils/dateUtil');
import db from '../utils/dbPromiseUtil';
import returnMsgUtils from '../utils/returnMsgUtils';



//当前窗口
var oWin = BrowserWindow.getFocusedWindow();
logger.logconsole.info('[SynNedbAndSheetImgBiz.js] loading--->');


ipcMain.on('requestPullOutData', (event, data) => {
	
	let markingTaskId = data.markingTaskId;
	let sheetId = data.sheetId;
	let dataList = data.dataList;
	
	let navmarkingtypedata = data.navmarkingtypedata;
	let answersheetimagedata = data.answersheetimagedata;
	
	let delParam = {};
	delParam.markingTaskId = markingTaskId;
	delParam.sheetId = sheetId;
	const saveDataMap = async() => {
		
		//1、删除答题卡表、
		await db('answerSheetImageData').remove(delParam, {multi: true}).then(res=>{
			
		}).catch(err=>{
			var json = returnMsgUtils.returnMsg(400, '失败', err, 'reponsePullOutData');
			logger.logconsole.error('[SynNedbAndSheetImgBiz.js]--->[requestPullOutData]----------->' + json);
			oWin.webContents.send('returnMsgListener', json);
		});
		//2、删除数据表（定位点、考试信息、缺考标记、主观题、客观题、客观题版式eg）
		await db('navMarkingTypeData').remove(delParam, {multi: true}).then(res=>{
			
		}).catch(err=>{
			var json = returnMsgUtils.returnMsg(400, '失败', err, 'reponsePullOutData');
			logger.logconsole.error('[SynNedbAndSheetImgBiz.js]--->[requestPullOutData]----------->' + json);
			oWin.webContents.send('returnMsgListener', json);
		});
		//3、将远程数据插入本地Nedb数据库
		await db('answerSheetImageData').insert(answersheetimagedata).then(res=>{
			
		}).catch(err=>{
			var json = returnMsgUtils.returnMsg(400, '失败', err, 'reponsePullOutData');
			logger.logconsole.error('[SynNedbAndSheetImgBiz.js]--->[requestPullOutData]----------->' + json);
			oWin.webContents.send('returnMsgListener', json);
		});
		
		await db('navMarkingTypeData').insert(navmarkingtypedata).then(res=>{
			
		}).catch(err=>{
			var json = returnMsgUtils.returnMsg(400, '失败', err, 'reponsePullOutData');
			logger.logconsole.error('[SynNedbAndSheetImgBiz.js]--->[requestPullOutData]----------->' + json);
			oWin.webContents.send('returnMsgListener', json);
		});
		//4、如果成功，返回200，Loading消失，识别前端提示错误，操作终端
		
		var json = returnMsgUtils.returnMsg(200, '成功', 'success', 'reponsePullOutData');
		logger.logconsole.error('[SynNedbAndSheetImgBiz.js]--->[requestPullOutData]----------->' + json);
		oWin.webContents.send('returnMsgListener', json);
	}
	
	
	saveDataMap().catch(err => {
		console.log(err);
	})
	

});