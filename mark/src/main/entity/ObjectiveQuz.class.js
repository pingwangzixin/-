/**
 * 客观题
 */

var ObjectiveSelectQuz  = {
	bizId:'',
	bizOrder:0,			//自增排序			mwb 服务器数据库返回 quzStartSeqLabel开始题号返回的group_quz_seq 4
	markingTaskId:'',	//阅卷任务ID
	sheetId:'',			//答题卡ID
	answerSheetImageId:'',//答题卡当前页ID
	pointx:0,			//
	pointy:0,			//
	width:0,			//
	height:0,			//
//	selectPoints:[],	//返回的坐标
	groupList:[],		//titlePosition标题坐标，titleNum标题名称，valueGroup[] 代表分组坐标集合
	currentIndex:0, 	//当前页码
	currentSheetUrl:'',	//http当前图片路径
	currentSheetFilePath:'',//图片本地路径
	markingType:'ObjectiveQuz',  /*//LocationPoint,MissingMark,ObjectiveQuz,StudentPageInfo,SubjectiveQuz*/
	markingModuleName:'',   //标记点左侧树名称'
	sheetScaleX:0.5,	    //原始图片缩放
	sheetScaleY:0.5,		//原始图片缩放
	quzIds:[],				//mwb 试题隐藏IDs [12341,23423423,23423423,
	quzLabels:[],			//mwb pre:quzNums--->quzLabels 试题题号['4-1','4-2','4-3'] 题号
	createBy:'',
	createDate:'',
	quzStartSeqLabel:'1',	//mwb 开始题号：[4-1]
	quzStartSeqIndex:0,   // 数组下标从0开始
	quzObjType:'',		  //判断题2，选择题1
	quzCount:0,			//题目数量： 
	quzOptions:0,		//选项个数： 
	modulePos:''		//模块位置  回显用
}
module.exports = ObjectiveSelectQuz

