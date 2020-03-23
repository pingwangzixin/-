var {app,ipcMain,Menu,Tray,BrowserWindow} = require('electron'); 
const path = require('path');
import $ from 'jquery'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if(process.env.NODE_ENV !== 'development') {
	global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

console.log(process.argv)
//process.argv = ['赵艳','赵艳','-a'];
//argv[0] = sheetId
//argv[1] = markingTaskId
//process.argv = ['01391816cc4848a592801b2ae9394d6d','faf38aa8006f4956ada81711ab135a02','-a'];


//arg[0]: answer_sheet 的ID
//arg[1]: paper_marking_task 的ID
//开发用：
process.argv = ['4e3de0355f68481eb7892768ccf1f7bd','794ac6d902e440df9c33ce20ee4cda61','-a'];
//process.argv = ['1695ecc66edc49b6a1d2de50de397022','a6e767bc0174467a9bcdd386c885330c','-a'];
//打包用：
/*let a = process.argv + '';
if(a.split('~')[1]){
	let sheetId = a.split('~')[0].substring(a.split('~')[0].lastIndexOf('//')+2);
	let markingTaskId = a.split('~')[1].substring(0,a.split('~')[1].length-1);
	process.argv = [sheetId,markingTaskId];
}*/

global.kkk = {prop1: process.argv};
let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
	`http://localhost:9080` :
	`file://${__dirname}/index.html`
	

//打包路径   __static  自定义变量
var trayIcon = null;

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

const trayMenu = Menu.buildFromTemplate(tpl);     

function createWindow() {
	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		//  height : 563,
		useContentSize: true,
		//  width: 1000,
		resizable: false, //可否缩放
		movable: false, //可否移动
		frame: false, //去掉顶部导航/关闭按钮/最大最小化按钮
		webPreferences: {
			webSecurity: false
		} //跨域
	})
	mainWindow.setMenu(null); //隐藏菜单
	mainWindow.maximize(); //全屏
	mainWindow.loadURL(winURL);
	mainWindow.webContents.openDevTools();		//调试模式

	mainWindow.on('closed', () => {
		mainWindow = null
	})
	
	//接收渲染进程最小化/最大化/关闭
	ipcMain.on('window-min',(event,data)=>{
//		var date = dateUtil.currentTime()
		mainWindow.minimize();
	});
	ipcMain.on('window-max',(event,data)=>{
//		console.log(mainWindow.isMaximized())
		if(mainWindow.isMaximized()){//是否最大 进不来
			mainWindow.restore();
		}else{
			mainWindow.maximize();
		}
	});
	ipcMain.on('window-closed',(event,data)=>{
	//	console.log(oWin.isFocused())
		if(!mainWindow.isFocused()){	//窗口是否聚焦
			mainWindow = null;
		}else{
			//阻止窗口关闭事件
			event.preventDefault();
			mainWindow.hide();
		}
	//	oWin.close();
	});
	//__dirname 当前目录（一般来说是主进程main.js）
	//var trayIcon = new Tray(path.join(__dirname,'../../static/trayIcon.png'));
	//打包路径   __static  自定义变量
    trayIcon = new Tray(path.join(__static,'ico.png'));
    //悬停提示文字
	trayIcon.setToolTip('阅卷系统');
	//导入菜单
	trayIcon.setContextMenu(trayMenu);
	
	//任务栏图标双击事件监听
	trayIcon.on('double-click',()=>{
		mainWindow.show();
	});

	//引入 pcMain  主进程通信
	require('./ipcMain.js');
	//引入 tray  托盘菜单
//	require('./tray.js');
	//引入 坐标点 
	require('./biz/LocationPointBiz.js');
	//引入 缺考信息 
	require('./biz/MissingMarkBiz.js');
	//引入 主观题 
	require('./biz/ObjectiveQuzBiz.js');
	//引入 客观题 
	require('./biz/SubjectiveQuzBiz.js');
	//引入 缺考信息 
	require('./biz/StudentPageInfoBiz.js');
	//引入左侧结构树
	require('./biz/LeftModulesBiz.js');
	//引入上传回调结果
	require('./biz/AnswerSheetImageBiz.js');
	//引入客观题版式设置
	require('./biz/ObjQuzFormatSettingBiz.js');
	//引入客观题版式设置
	require('./biz/SynNedbAndSheetImgBiz.js');
	//引入扫描设置
	require('./biz/ScanMemberMarkingBiz.js');
	//获取全部数据，用于答题卡扫描
	require('./biz/MarkingModulesBiz.js');
	//接收扫描软件请求答题卡通过OPENCV及标注的信息
	require('./biz/MarkingModulesSettingBiz.js');
}


app.on('ready', createWindow)

//IOS 对于OS X系统，应用和相应的菜单栏会一直激活直到用户通过Cmd + Q显式退出
app.on('window-all-closed', () => {
	if(process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if(mainWindow === null) {
		createWindow();
	}
})



/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */