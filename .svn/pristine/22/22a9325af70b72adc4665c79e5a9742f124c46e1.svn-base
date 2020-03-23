var {app,ipcMain,Menu,Tray,BrowserWindow} = require('electron'); 

const path = require('path');
const dateUtil = require('./utils/dateUtil');
const logger = require('./common/logger');
//const db = require('./utils/dbUtil');

import db from './utils/dbUtil';

//__dirname 当前目录（一般来说是主进程main.js）
//var trayIcon = new Tray(path.join(__dirname,'../../static/trayIcon.png'));

//打包路径   __static  自定义变量
//var trayIcon = new Tray(path.join(__static,'ico.png'));


//创建右键菜单
let tpl = [
	{
		label : '退出',
		click : function (){
//			BrowserWindow.getFocusedWindow().webContents().send('close-main-window');
			//IOS  process:全局的
			if(process.platform !== 'darwin') {
				app.quit();
			}
		}
	}
];

//const trayMenu = Menu.buildFromTemplate(tpl);

//悬停提示文字
//trayIcon.setToolTip('阅卷系统');
//导入菜单
//trayIcon.setContextMenu(trayMenu);
//console.log(trayIcon)

//接收渲染进程最小化/最大化/关闭
//当前操作窗口
var position = {
					pointx : 100,
					pointy : 100,
					width:300,
					height:100,
					status:false
				};
//logger.logconsole.info("12345678======>")			
//logger.logconsole.info(db) 


/*var oWin = BrowserWindow.getFocusedWindow();
ipcMain.on('window-min',(event,data)=>{
	var date = dateUtil.currentTime()
	oWin.minimize();
});
ipcMain.on('window-max',(event,data)=>{
	if(oWin.isMaximized()){//是否最大 进不来
		oWin.restore();
	}else{
		oWin.maximize();
	}
});*/
/*ipcMain.on('window-closed',(event,data)=>{
//	console.log(oWin.isFocused())
	if(!oWin.isFocused()){	//窗口是否聚焦
		oWin = null;
	}else{
		//阻止窗口关闭事件
		event.preventDefault();
		oWin.hide();
	}
//	oWin.close();
});*/

//任务栏图标双击事件监听
/*trayIcon.on('double-click',()=>{
	oWin.show();
});*/