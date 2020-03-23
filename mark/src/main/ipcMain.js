var {
	ipcMain,
	BrowserWindow,
	Menu
} = require('electron');

var path = require('path');
const logger = require('./common/logger');
import db from './utils/dbPromiseUtil';
import requestMarkingModulesBizFunction from './biz/MarkingModulesBiz';
import returnMsgUtils from './utils/returnMsgUtils';
console.log(process.argv)

//新窗口
var win = null;

//当前窗口
var oWin = BrowserWindow.getFocusedWindow();
//接收c测试
ipcMain.on('xiaoxi', (event, data) => {
	//	console.log(data)

	//获取当前窗口对象(父级1)
	let winId = oWin.id;
	//	console.log('id'+winId)

	//调用 BrowserWindow 打开新窗口
	win = new BrowserWindow({
		webPreferences: { //解决 require is not defined
			nodeIntegration: true
		},
		width: 700,
		height: 300
	});
	//	win.loadURL(path.join('file:',__dirname,'../news.html'));

	//	let windowsHref = window.location.href;
	//	const locationURL = windowsHref.substring(0,windowsHref.indexOf("#")+1);
	win.loadURL('http://localhost:9080/#/index/preview');

	//开启新窗口的调试模式
	win.webContents.openDevTools();

	//通过 win.webContents.send 把当前数据广播给 news 进程
	win.webContents.on('did-finish-load', () => {
		//		win.webContents.send('toXR',data,winId);
		win.webContents.send('toXR', 'xxxxxxxxxxxxxxxx00000000', winId);
	});
});

///////////////////////
//渲染进程左侧树删除节点右键菜单
//接收渲染进程左侧树 删除点
ipcMain.on('contextMenuDel', (event, data) => {
	let pointMenu = Menu.buildFromTemplate([{
			label: '删除',
			click: function() {
				console.log('删除' + data)
				//			oWin.webContents.send('deleteOk',delData);
				logger.logconsole.info('[ipcMain.js]--->[contextMenuDel]----------->' + JSON.stringify(data));
				let param = {}
				param.sheetId = process.argv[0];
				param.markingTaskId = process.argv[1];
				
				db('navMarkingTypeData').remove({
					bizId: data
				}, {
					multi: true
				}).then(res => {
					requestMarkingModulesBizFunction(param).then(res => {
						let result = res;
						logger.logconsole.info('[ipcMain.js]--->[contextMenuDel]----------->[requestMarkingModulesBizFunction]--------------------------->' + JSON.stringify(result));
						var json = returnMsgUtils.returnMsg(200, '操作成功', result, 'reponseMarkingModulesBiz');
						logger.logconsole.info('[ipcMain.js]--->[contextMenuDel]-------[reponseMarkingModulesBiz]---->' + json);
						oWin.webContents.send('returnMsgListener', json);
					})
				}).then(res => {
					var json = returnMsgUtils.returnMsg(200, '操作成功', res, 'reponseContextMenuDel');
					logger.logconsole.info('[ipcMain.js]--->[contextMenuDel]--------[reponseContextMenuDel]--->' + json);
					oWin.webContents.send('returnMsgListener', json);
					
				}).catch(err => {
					var json = returnMsgUtils.returnMsg(400, '操作失败', err, 'reponseContextMenuDel');
					logger.logconsole.error('[ipcMain.js]--->[contextMenuDel]--------[reponseContextMenuDel]--->' + json);
					oWin.webContents.send('returnMsgListener', json);
				});
				
				
				
				
				/*requestMarkingModulesBizFunction(param).then(res => {
					let result = res;
					logger.logconsole.info('[ipcMain.js]--->[contextMenuDel]----------->[requestMarkingModulesBizFunction]--------------------------->' + JSON.stringify(result));
					var json = returnMsgUtils.returnMsg(200, '操作成功', result, 'reponseMarkingModulesBiz');
					logger.logconsole.info('[ipcMain.js]--->[contextMenuDel]-------[reponseMarkingModulesBiz]---->' + json);
					oWin.webContents.send('returnMsgListener', json);
					
				}).then(res => {
					db('navMarkingTypeData').remove({
						bizId: data
					}, {
						multi: true
					});
				}).then(res => {
					var json = returnMsgUtils.returnMsg(200, '操作成功', res, 'reponseContextMenuDel');
					logger.logconsole.info('[ipcMain.js]--->[contextMenuDel]--------[reponseContextMenuDel]--->' + json);
					oWin.webContents.send('returnMsgListener', json);
					
				}).catch(err => {
					var json = returnMsgUtils.returnMsg(400, '操作失败', err, 'reponseContextMenuDel');
					logger.logconsole.error('[ipcMain.js]--->[contextMenuDel]--------[reponseContextMenuDel]--->' + json);
					oWin.webContents.send('returnMsgListener', json);
				})*/
			}
		},
		{
			label: '编辑',
			click: function() {
				console.log('编辑' + data)
				logger.logconsole.info('[ipcMain.js]--->[contextMenuEdit]----------->' + JSON.stringify(data));
				db('navMarkingTypeData').findOne({
					bizId: data
				}).then(docs => {
					let result = docs;
					var json = returnMsgUtils.returnMsg(200, '操作成功', result, 'reponseContextMenuEdit');
					logger.logconsole.info('[ipcMain.js]--->[contextMenuEdit]----------->' + json);
					oWin.webContents.send('reponseContextMenuEdit', json);
				}).catch(err => {
					var json = returnMsgUtils.returnMsg(400, '操作失败', err, 'reponseContextMenuEdit');
					logger.logconsole.error('[ipcMain.js]--->[contextMenuEdit]----------->' + json);
					oWin.webContents.send('reponseContextMenuEdit', json);
				});
			}
		}
	]);
	//右键菜单
	pointMenu.popup(oWin);
});