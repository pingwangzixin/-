/**
 * 答题卡
 */
var AnswerSheetImage  = {
	bizId:'',
	sheetId:'',	
	markingTaskId:'',		//阅卷任务ID
	currentSheetUrl:'',		//http当前图片路径
	currentSheetFilePath:'',//图片相对路径 相对路径
	absolutePath:'',        //绝对路径 Y盘
	currentIndex:0, 		//当前页码
	scaleWidth:0,			//当前图片宽
	scaleHeight:0			//当前图片高
	
}
module.exports = AnswerSheetImage