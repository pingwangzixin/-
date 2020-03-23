/**
 * 学生信息
 */


var StudentPageInfo  = {
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
	markingType:'StudentPageInfo',  /*//LocationPoint,MissingMark,ObjectiveQuz,StudentPageInfo,SubjectiveQuz*/
	markingModuleName:'', //标记点左侧树名称'
	sheetScaleX:0.5,	//原始图片缩放
	sheetScaleY:0.5,		//原始图片缩放
	createBy:'',
	createDate:'',
	studentFillInfo:null,		//获取接口填涂信息
	testNumberType:0,	//考试号类型  Num  0:全框  1：半框  2：条形码
	testNumberNum:4,		//考试号位数4~12  Num
	modulePos:'',		//模块位置  回显用
	boxTit:'',			//弹框标题  定位点/缺考标记/学生信息  回显用
}
module.exports = StudentPageInfo
