/**
 * 缺考标记
 */

var MissingMark  = {
	bizId:'',
	bizOrder:0,			//自增排序
	markingTaskId:'',	//阅卷任务ID
	sheetId:'',			//答题卡ID
	answerSheetImageId:'',//答题卡当前页ID
	pointx:0,			//
	pointy:0,			//
	width:0,			//
	height:0,			//
	currentIndex:0, 	//当前页码
	currentSheetUrl:'',	//http当前图片路径
	currentSheetFilePath:'',//图片本地路径
	markingType:'MissingMark',  /*//LocationPoint,MissingMark,ObjectiveQuz,StudentPageInfo,SubjectiveQuz*/
	markingModuleName:'', //标记点左侧树名称'
	sheetScaleX:0.5,	//原始图片缩放
	sheetScaleY:0.5,		//原始图片缩放
	createBy:'',
	createDate:'',
	preciseInfo:{},		//获取接口宽高大小面积
	modulePos:'',		//模块位置  回显用
	boxTit:''		//弹框标题  定位点/缺考标记/学生信息  回显用
}
module.exports = MissingMark
