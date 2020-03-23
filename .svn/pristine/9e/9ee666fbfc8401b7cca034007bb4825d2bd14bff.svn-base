//	window.$ = window.jQuery = require('jquery');
import $ from 'jquery'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
import uuid from 'node-uuid';

import qs from 'qs'


//node模块
var http = require('http');
var path = require('path');
var fs = require('fs');
var glob = require('glob');
var mime = require('mime');  //?????
var regedit = require('regedit');

import Axios from 'axios';
const $http = Axios;

//console.log(mime)
//console.log(mime.lookup)

const remote = require('electron').remote;
/*alert(remote.process.argv[0])
alert(remote.process.argv[1])
alert(remote.process.argv[2])
alert(remote.process.argv.length)*/
console.log(remote.process.argv);
const aa = remote.getGlobal('kkk').prop1;    
console.log(aa);

const { EJSON } = require('bson');
// prints { int32: { [String: '10'] _bsontype: 'Int32', value: '10' } }

//const doc1 = '{ "aaa": "10","bbb":"20","ccc":{"aa":"1","bb":"2"}}';
//console.log(doc1)
//console.log(typeof doc1)
//console.log(EJSON.parse(doc1, { relaxed: false }));
//console.log(typeof EJSON.parse(doc1, { relaxed: false }))
//console.log(EJSON.parse(doc1))
//console.log(typeof EJSON.parse(doc1))

//const Int32 = require('mongodb').Int32;
let array1=[];
const doc1= {
				name: '定位点122222222222222',
				position: {
					x: 158,
					y: 170,
					width: 210,
					height: 126
				},
				show: false
			};
const doc2= {
				name: '定位点122222222222222',
				position: {
					x: 158,
					y: 170,
					width: 210,
					height: 126
				},
				show: false
			};
array1.push(doc1);
array1.push(doc2);


var jsonStr =  EJSON.stringify(array1, { relaxed: false });
//console.log(jsonStr);

let jsonArray = EJSON.parse(jsonStr, { relaxed: false })
//console.log(jsonArray);

//console.log(EJSON.stringify(doc1, { relaxed: false }));
//var  a= EJSON.stringify(doc1, { relaxed: false });
//console.log(EJSON.parse(a, { relaxed: false }));

//console.log(EJSON.serialize(dpageListSaveoc))
//console.log(EJSON.deserialize(doc))
//console.log(typeof EJSON.stringify(doc, { relaxed: false }));
//console.log(EJSON.stringify(doc));
//console.log(typeof EJSON.stringify(doc));


//接口汇总
import { api } from '@/api'
import { resolve } from 'url';
//import {api as ss} from '@/api'
//	import {interfaceSummary} from '../api/index.js'

export default {
	name: 'makeTemplate',
	data() {
		return {
			commonParams: { //常用id
				sheetId: remote.process.argv[0],
				markingTaskId: remote.process.argv[1]
			},
			regeditParams : {	//注册表参数
				localPath : ''		//用户安装目录
			},
			cropObj: null, //裁剪框对象
//			coordinateInfo: null, //坐标信息
			canvasRelated: { //画布相关
				//回显框选区域
				currentCtx: null, //当前画布画笔
				currentImg: null, //当前画面
				//初始画布宽高
				width: 0,
				height: 0
			},
			popups: { //弹窗类
				preview: { //答题卡列表预览图框
					state: false, //状态
					viewSrc: '', //当前图片网络地址
					localhostSrc: '', //当前图片本地地址
					deg: 0, //旋转角度
					scaling: 1 //缩放比例
				},
				subjectiveQues: { //主观题选项框
					operationState: 'new',	//new 新建  edit编辑
					state: false, //状态
					boxTit: '', //弹框标题
					modulePos: '', //模块位置
					moduleName: '主观题1', //模块名称
					testNoIndex: 1, //单题试题题号下标
					type: 1,	//单题1 多题2
					quesNum: 1,	//多题号题目数量
					startNoIndex: 0,	//多题号开始题号下标
					quesArr: null,	//题目数量
					drawWidth : 0,
					drawHeight : 0,
					drawX : 0,
					drawY : 0,
				},
				objectiveQues: { //客观题选项框
					operationState: 'new',	//new 新建  edit编辑
					state: false, //状态
					boxTit: '', //弹框标题
					modulePos: '', //模块位置
					moduleName: '客观题1', //模块名称
					quesNum: 4, //题目数量
					optionNum: 4, //选项个数
					startNoIndex: 0, //开始题号下标
					type: 1, //选择题1  判断题2
					optionsArr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'], //选择全部选项
					optionsCurrent: ['A', 'B', 'C', 'D'],
					quesNoArr: [0], //题号
					chooseQues: false, //是否选做题
					quesArr: null,	//题目数量
//					quesArr: [1,2,3,4]	//题目数量
					height : 0,
					width : 0,
					x : 0,
					y : 0,
					quzCount : 0,
					objTypeStore: false,	//版式是否已选
					markingType : '' //類型  提交數據用
					
				},
				otherPoints: { //定位点/缺考标记/学生信息
					operationState: 'new',	//new 新建  edit编辑
					state: false, //状态
					boxTit: '', //弹框标题
					modulePos: '', //模块位置
					moduleName: '', //模块名称
					testNumberType: 0,	//学生信息 考试号类型  0:全框  1：半框  2：条形码
					testNumberNumArr: ['4','5','6','7','8','9','10','11','12'],	//考试号位数区间
					testNumberNum : 4,    //考试号位数
					aliveData : null,		//学生信息用位置大小  调接口
					testNumberNum : 0		//学生信息用考號嗎  调接口
				},
				trimPreview: {	//校准定位点框
					operationState: 'new',	//new 新建  edit编辑
					state : false,	//状态
					imgState : false,	//裁剪后图片状态
					imgSrc : '',		//裁剪后图片路径
					posData : null,		//框选点数据
					frameType : 0,		//框选类别  0:全框  1：半框
					arrayType : 0,		//排列顺序 0：横排  1：竖排
					width : 0,
					height : 0,
					x : 0,
					y : 0,
					bizid : '',			//传参用谢谢
					initWidth : 0,
					initHeight : 0,
					initArea : 0,
					maxWidth : 0,
					maxHeight : 0,
					maxArea : 0,
					minWidth : 0,
					minHeight : 0,
					minArea : 0,
					borderInitWidth : 0,
					borderInitHeight : 0,
					borderInitTop : 0,
					borderInitLeft : 0,
					borderMaxWidth : 0,
					borderMaxHeight : 0,
					borderMaxTop : 0,
					borderMaxLeft : 0,
					borderMinWidth : 0,
					borderMinHeight : 0,
					borderMinTop : 0,
					borderMinLeft : 0
				}
			},
			bbb:123,
			trimPreview : {		//左侧树客观题板式相关
				state : true,		//提示信息状态
				infoState : false,   //客观题版式当前状态
			},
			navData: { //导航
				nav: [
					//["importAnswerCard","trimPreview","locationPoint", "missExam", "studentInfo", "subjectiveQues", "objectiveQues"]
					{
						name: '导入答题卡',
						key: '',
						title: 'importAnswerCard',
						num : 0,
						stepState: false
					},{
						name: '客观题版式',
						key: 'trimPreview',
						title: '客观题版式',
						num : 0,
						stepState: false
					},
					{
						name: '框选定位点',
						key: 'locationPoint',
						title: '如答题卡上没有定位点，请框选每张试卷的一行文字作为文字定位区域',
						num : 0,
						stepState: false
					},
					{
						name: '框选缺考标记',
						key: 'missExam',
						title: '如答题卡上有缺考标记，请框选每张试卷上的缺考标记。',
						num : 0,
						stepState: false
					},
					{
						name: '框选学生信息',
						key: 'studentInfo',
						title: '学生信息类型包含考试号、二维码/条形码，只需框选一次即可',
						num : 0,
						stepState: false
					},
					{
						name: '框选客观题',
						key: 'objectiveQues',
						title: '请框选每张答题卡上的客观题区域',
						num : 0,
						stepState: false
					},
					{
						name: '框选主观题',
						key: 'subjectiveQues',
						title: '请框选每张答题卡上的主观题区域',
						num : 0,
						stepState: false
					}
				],
				currentIndex: 0, //导航当前下标
				editState: false //框选状态 true  上传图片 false  展示切换
			},
			uploadData: [ //上传答题卡列表
				/*{
					bizId:'',					
					markingTaskId:'赵艳',		//阅卷任务ID
					currentSheetUrl:'',		//http当前图片路径
					currentSheetFilePath:'',//图片相对路径 相对路径
					absolutePath:'',        //绝对路径 Y盘
					currentIndex:0 			//当前页码
				}*/
			], 
			chooseArea: -2, //框选区域（解决诡异问题）	
			//裁剪框参数
			clipParams: {
				checkCrossOrigin: true, //检查当前图像是否为跨域图像
//				initialAspectRatio : 20,
//				aspectRatio : 30 / 10,
				//				aspectRatio: 750 / 1334, //最终生成图片的常高比
				viewMode: 2, //0：没有限制;1:裁剪框必须在图片内移动；2：2图片 不全部铺满1；3：图片填充整个裁剪框
				//				dragMode  :'move',	//拖拽模式，只能移动裁剪框  'crop': 可以产生一个新的裁剪框3 'move': 只可以移动3  'none': 什么也不处理
				responsive: true, //调整窗口大小时，重新渲染cropper
				cropBoxResizable: true, //调整裁剪框大小
				autoCropArea: 1, //自动裁剪面积大小和图片的对比
				center: true, //裁剪框在图片正中心
				cropBoxMovable: true, //是否允许移动裁剪框
				autoCrop: false, //初始化时，自动生成裁剪框
				background: true, //显示裁剪区域的背景方格
				modal: false,
				guides: false, //显示在裁剪框上方的虚线   
				highlight: true, //在裁剪框上方显示白色的区域(突出裁剪框)
				zoomOnWheel: false, //是否可以通过移动鼠标放大图像
				zoomOnTouch: false, //是否可以通过拖动触摸放大图像
				zoomable: true, //是否允许放大图像
				movable: true, //是否允许移动后面的图片
				rotatable: true, //是否允许旋转图像
				scalable: true, //是否允许缩放图像
				resizable: true,
				restore: true, //在调整窗口大小后恢复裁剪的区域
				preview: '.img-preview',
				// 					minContainerWidth:200,//容器的最小宽度
				// 					minContainerHeight:100,//容器的最小高度
				// 					minCropBoxWidth:100,//裁剪层的最小宽度
				// 					minCropBoxHeight:50, //裁剪层的最小高度
				// 					wheelZoomRatio:0.1, //鼠标移动图像时，定义缩放比例
			},
			leftData: { //左侧树
				pageNum: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
				currentPage: 0, //当前页
				page: []
			},
			saveAnswerCardImg :[// 答题卡图片（页面保存用）
//				{filePath:'',bizId:''}
			],
			saveData: { //进库数据格式
				bizId: '', //独立id
				bizOrder : '',	//自增排序
				sheetId: remote.process.argv[0], //答题卡ID、
				markingTaskId: remote.process.argv[1], //阅卷任务ID
				answerSheetImageId: '', //答题卡当前页ID
				currentIndex: '', //当前页码
				currentSheetUrl: '', //当前图片http路径
//				currentSheetFilePath: '', //图片相对路径 相对路径
//				absolutePath:'',        //绝对路径 Y盘
				markingType: '', //LocationPoint,MissingMark,ObjectiveQuz,StudentPageInfo,SubjectiveQuz
				markingModuleName: '', //左侧树标记点名称
				sheetScaleX: 0.5, //缩放
				sheetScaleY: 0.5,
				createBy: '赵艳', //操作人
				createDate: '今天', //操作时间
				pointx: 0, //
				pointy: 0, //
				width: 0, //
				height: 0,
			},
			ggg : {},	//测试框选点校准信息
			leftRefreshParam : {
				objectiveQuesConfirm : false,		//客观题确认框提交
				subjectiveQuesConfirm : false,		//主观题确认框提交
				studentInfoConfirm : false,			//学生信息
			},
			sendName: '', //发送存储框选点请求名字
			contextMenuMsg: { //左侧树节点删除数据信息
				data: null, //删除数据
				index: -1, //删除下标
				type: '',   //框选点类型
				bizId:'',	//bizId
				name: '',
				sendName : ''
			}
		}
	},
	//函数
	methods: {
		//获取注册表信息
		gainRegedit (){
			return new Promise((resolve,reject)=>{
				let _this = this;
				//HKEY_CLASSES_ROOT\marking_install_path
				regedit.list(['HKCR\\marking_install_path'],function(err, result) {
	//				var a = result['HKCR\\marking_install_path'].values['marking_install_path'].value;
	//				console.log(result)
	//				console.log(a)
					_this.regeditParams.localPath = result['HKCR\\marking_install_path'].values['marking_install_path'].value;
					console.log(_this.regeditParams.localPath)
					resolve(_this.regeditParams.localPath);
				});	
			});
			
			/*regedit.list(['HKCR\\marking_install_path']).on('data', function(entry) {
			    console.log(entry.key)
			    console.log(entry.data)
			})*/
		},
		insert() {
			var position = {
				pointx: 100,
				pointy: 100,
				width: 300,
				height: 100,
				status: false
			};
			//				this.$db.vueData.insert(position,function(err,newDoc){
			//					console.log(newDoc);
			//				})
			//向主进程发送存储请求
			//			this.$electron.ipcRenderer.send('insertData', position);
			//监听主进程存储状态
			//				this.$electron.ipcRenderer.on('insertDataSucc',(event,data)=>{
			//					console.log(data);
			//				});
		},
		update() {
			//db.update(query, update, options, callback)
			//@update ：可用的修饰符有$set(改变字段值), $unset(删除某一字段), $inc(增加某一字段), $min/$max(改变字段值，传入值需要小于/大于当前值), 
			//, 还有一些用在数组上的修饰符，$push, $pop, $addTopSet, $pull, $each, $slice，
//			this.$db.vueData.update({}, {
//				$set: {
//					status: true
//				}
//			}, {
//				multi: true
//			}, function(err, numReplaced) {
//				console.log(numReplaced)
//			});
		},
		remove() {
			//			this.$db.vueData.remove({}, {
			//				multi: true
			//			}, function(err, numRemoved) {
			//				console.log(numRemoved)
			//			});

			this.$electron.ipcRenderer.send('deleteLocationPoint', '');
			this.$electron.ipcRenderer.send('deleteAnswerSheetImage', '');
		},
		find() {
			//			this.$db.vueData.find({
			//				_id: "8Od0Xac7oiUfwb66",
			//				pointx: 100
			//			}).sort({
			//				pointx: 1
			//			}).exec(function(err, docs) {
			//				console.log(docs);
			//			});
			//			this.$db.vueData.find({}, (function(err, docs) {
			//				console.log(docs);
			//			}));
			this.$electron.ipcRenderer.send('requestLeftModulesBiz', '');
		},
		listener() {
			let _this = this;
			//监听存储数据全局监听事件
			this.$electron.ipcRenderer.on('returnMsgListener', (event, data) => {
				data = JSON.parse(data);
				console.log(data)
				//定位点/缺考标记/学生信息/主观题/客观题调用
				let insertPoint = () => {
					let i = -1;
					this.leftData.page.forEach((ele, index) => {
						if(ele.show) i = index;
					});
//					console.log(this.leftData.currentPage)
					if(data.ret == 200) {
						console.log(data.data)
						console.log(i)
						this.leftData.page[i].secondLevel[this.chooseArea].show = true;
						if(this.leftData.page[i].secondLevel[this.chooseArea].value == 'missExam' || this.leftData.page[i].secondLevel[this.chooseArea].value == 'studentInfo'){
							this.leftData.page[i].secondLevel[this.chooseArea].pointList.splice(0,1,{
								bizId:data.data.bizId,
								name: data.data.markingModuleName,
								position: {
									x: data.data.pointx,
									y: data.data.pointy,
									width: data.data.width,
									height: data.data.height
								},
								show: true
							});
						}else{
							this.leftData.page[i].secondLevel[this.chooseArea].pointList.push({
								bizId:data.data.bizId,
								name: data.data.markingModuleName,
								position: {
									x: data.data.pointx,
									y: data.data.pointy,
									width: data.data.width,
									height: data.data.height
								},
								show: true
							});
						}
						//页面数据数量
						this.$electron.ipcRenderer.send('requestMarkingModulesBiz', this.commonParams);
					}
				}
				switch(data.type) {
					case 'reponseLeftModulesBiz': //左侧树数据
						if(data.ret == 200) {
//							alert('左侧树')
							this.leftData.page = data.data;
							console.log(this.leftData.page)
							/*//接收客观题增加数据
							if(this.leftRefreshParam.objectiveQuesConfirm){
								this.leftData.page[this.leftData.currentPage].show = true;
								this.leftData.page[this.leftData.currentPage].secondLevel[4].show = true;
								let len = this.leftData.page[this.leftData.currentPage].secondLevel[4].pointList.length == 0 ? 0 : this.leftData.page[this.leftData.currentPage].secondLevel[4].pointList.length - 1;
								this.leftData.page[this.leftData.currentPage].secondLevel[4].pointList[len].show = true;
								this.leftRefreshParam.objectiveQuesConfirm = false;
							}
							console.log(this.leftRefreshParam.subjectiveQuesConfirm)
							//接收主观题增加数据
							if(this.leftRefreshParam.subjectiveQuesConfirm){
								this.leftData.page[this.leftData.currentPage].show = true;
								this.leftData.page[this.leftData.currentPage].secondLevel[3].show = true;
								let len = this.leftData.page[this.leftData.currentPage].secondLevel[3].pointList.length - 1;
								this.leftData.page[this.leftData.currentPage].secondLevel[3].pointList[len].show = true;
								this.leftRefreshParam.subjectiveQuesConfirm = false;
							}
							//接收学生信息增加数据
							if(this.leftRefreshParam.studentInfoConfirm){
								this.leftData.page[this.leftData.currentPage].show = true;
								this.leftData.page[this.leftData.currentPage].secondLevel[2].show = true;
								let len = this.leftData.page[this.leftData.currentPage].secondLevel[2].pointList.length - 1;
								this.leftData.page[this.leftData.currentPage].secondLevel[2].pointList[len].show = true;
								this.leftRefreshParam.studentInfoConfirm = false;
							}*/
							
							let dataIndex = -1;
							//接收客观题增加数据
							if(this.leftRefreshParam.objectiveQuesConfirm) dataIndex = 4;
							//接收主观题增加数据
							else if(this.leftRefreshParam.subjectiveQuesConfirm) dataIndex = 3;
							//接收学生信息增加数据
							else if(this.leftRefreshParam.studentInfoConfirm) dataIndex = 2;
							if(dataIndex > -1){
								this.leftData.page[this.leftData.currentPage].show = true;
								this.leftData.page[this.leftData.currentPage].secondLevel[dataIndex].show = true;
								let len = this.leftData.page[this.leftData.currentPage].secondLevel[dataIndex].pointList.length == 0 ? 0 : this.leftData.page[this.leftData.currentPage].secondLevel[dataIndex].pointList.length - 1;
								this.leftData.page[this.leftData.currentPage].secondLevel[dataIndex].pointList[len].show = true;
								this.leftRefreshParam.objectiveQuesConfirm = false;
							}
							
						}
						break;
					case 'reponseQuestionsMsg':	//试题信息获取
						if(data.ret == 200){
							console.log(data.data)
							this.popups.objectiveQues.quesArr = data.data.data;
							this.popups.subjectiveQues.quesArr = data.data.data;
							console.log(this.popups.objectiveQues.quesArr)
						}
					    break;
					case 'reponseInitAnswerCardList': //答题卡上传列表获取
						if(data.ret == 200) {
//							alert('答题卡上传列表')
							this.uploadData = data.data;
							if(data.data.length){
								//上传答题卡步骤完成
								this.navData.nav[0].stepState = true;
								let network = "http://192.168.9.62";
								let local = "http://localhost";
								this.uploadData.forEach((e,i) => {
									e.currentSheetUrl = e.currentSheetUrl.replace(network,local);
	//								this.saveAnswerCardImg.push({"filePath":e.absolutePath,"bizId":e.bizId,"sheetId":e.sheetId,"markingTaskId":e.markingTaskId});
									this.saveAnswerCardImg.push({"bizId":e.bizId,"sheetId":e.sheetId,"markingTaskId":e.markingTaskId});
								});
							}
						}
						break;
					case 'reponseInsertLocationPoint': //定位点数据插入
//							alert('定位点数据')
						if(this.popups.otherPoints.operationState == 'new'){
							insertPoint();
						}
						break;
					case 'reponseInsertMissingMark': //缺考标记数据插入
//							alert('缺考标记数据')
						if(this.popups.otherPoints.operationState == 'new'){
							insertPoint();
						}
						break;
					case 'reponseInsertStudentPageInfo': //学生信息数据插入
//							alert('学生信息数据')
						if(this.popups.otherPoints.operationState == 'new'){
							insertPoint();
						}
						break;
					case 'reponseInsertSubjectiveQuz': //主观题数据插入
//							alert('主观题数据')
						if(this.popups.subjectiveQues.operationState == 'new'){
							insertPoint();
						}
						break;
					case 'responseInsertObjectiveQuz': //客观题数据插入
//							alert('客观题数据')
						if(this.popups.objectiveQues.operationState == 'new'){
							insertPoint();
						}
						console.log(this.leftData.page)
						break;
					case 'responseInsertObjQuzFormatSetting': //客观题版式数据插入
						console.log(data)
						if(data.ret == 200){
							if(data.data){
								this.popups.trimPreview = data.data.trimPreview;
							}
						}
						//页面数据数量
						this.$electron.ipcRenderer.send('requestMarkingModulesBiz', this.commonParams);
						break;
					case 'reponseObjQuzFormatSetting': //客观题版式数据获取
						console.log(data.data)
						if(data.ret == 200){
							if(data.data){
								//客观题板式步骤完成后余下步骤全部可操作
								this.navData.nav.forEach((e,i) => {
									e.stepState = true;
								});
								this.trimPreview.tipState = false;
								this.popups.trimPreview = data.data.trimPreview;
								this.popups.objectiveQues.objTypeStore = true;
								console.log(data.data)
							}else{
								this.trimPreview.tipState = true;
							}
						}
						break;
					case 'reponseSaveData':		//页面整体保存
						if(data.ret == 200){
							let serviceParam = data.data;
							$http.post('http://198.9.6.137:8080/examPaper/paperMarkingTaskScaninfo/uploadSubNavMarkingTypeNedbs', serviceParam).then(function (res) {
							    console.log(res);
							    if(res.data.ret == 200){
							    	_this.$parent.timingFn('success','保存成功');	
							    }
							}).catch(function (error) {
							    console.log(error);
							});
						}
					break;
					case 'reponseContextMenuDel': //右键删除
						if(data.ret == 200) {
//							alert('右键删除')
							console.log(data)
							console.log(this.contextMenuMsg)
							//客观题版式
							if(this.contextMenuMsg.type == 'trimPreview'){
								/*for (i in this.popups.trimPreview) {
//								    console.log(i)
//								    console.log(this.popups.trimPreview[i])
								    if(i == 'state' || i == 'imgState'){
								    	this.popups.trimPreview[i] = false;
								    }else if(i == 'imgSrc' || i == 'bizid'){
								    	this.popups.trimPreview[i] = '';
								    }else if(i == 'posData'){
								    	this.popups.trimPreview[i] = null;
								    }else{
								    	this.popups.trimPreview[i] = 0;
								    }
								}*/
								
								this.navData.nav.forEach((e,i) => {
									if(i) e.stepState = false;
								});
								this.trimPreview.tipState = true;
								this.popups.objectiveQues.objTypeStore = false;
							}else{
								this.contextMenuMsg.data.splice(this.contextMenuMsg.index, 1);
								/*switch (this.contextMenuMsg.type){
									case "studentInfo":
										break;
									default:
										break;
								}*/
							}
							//清除画布
							this.clearCanvas();
						}
						break;
					case 'reponseMarkingModulesBiz':	//获取页面所有数据数量
						console.log(9999)
						console.log(data)
						//答题卡
						this.navData.nav[0].num = data.data.answerSheetImageCount;
						//版式
						this.navData.nav[1].num = data.data.arrayTypeCount;
						//定位点
						this.navData.nav[2].num = data.data.locationPointCount;
						//缺考标记
						this.navData.nav[3].num = data.data.absenceMarkCount;
						//学生信息
						this.navData.nav[4].num = data.data.userMsgCount;
						//客观题
						this.navData.nav[5].num = data.data.objQuzCount;
						//主观题
						this.navData.nav[6].num = data.data.subQuzCount;
						console.log(this.navData.nav)
						break;
					default:
						break;
				}

			});
			
			//监听右键菜单编辑回显
			this.$electron.ipcRenderer.on('reponseContextMenuEdit', (event, data) => {
				data = JSON.parse(data);
				console.log(data)
				/*console.log(this.contextMenuMsg.type)
				console.log(this.contextMenuMsg.data)
				console.log(this.contextMenuMsg.index)*/
//				console.log(this.leftData.currentPage)
				//["locationPoint", "missExam", "studentInfo", "subjectiveQues", "objectiveQues","trimPreview"]
				switch (this.contextMenuMsg.type){
					case 'objectiveQues':	//客观
						/*objectiveQues: { //客观题选项框
						 	operationState: 'new',	//new 新建  edit编辑
						 	boxTit: '', //弹框标题
							state: false, //状态
							modulePos: '', //模块位置
							moduleName: '客观题1', //模块名称
							quesNum: 4, //题目数量
							optionNum: 4, //选项个数
							startNoIndex: 0, //开始题号下标
							type: 1, //选择题1  判断题2
							optionsArr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'], //选择全部选项
							optionsCurrent: ['A', 'B', 'C', 'D'],
							quesNoArr: [0], //题号table用
							chooseQues: false, //是否选做题
							quesArr: null	//题目数量
							height ： 0,
							width : 0,
							x : 0,
							y : 0,
							quzCount : 0,
							markingType : '' //類型  提交數據用
							
						},*/
						this.popups.objectiveQues.operationState = 'edit';
						this.popups.objectiveQues.boxTit = data.data.boxTit;
						this.popups.objectiveQues.modulePos = data.data.modulePos;
						this.popups.objectiveQues.moduleName = data.data.markingModuleName;
						this.popups.objectiveQues.quesNum = data.data.quzCount;
						this.popups.objectiveQues.optionNum = data.data.quzOptions;
						this.popups.objectiveQues.startNoIndex = data.data.quzStartSeqIndex;
						this.popups.objectiveQues.type = data.data.quzObjType;
						this.popups.objectiveQues.quesNoArr = this.popups.objectiveQues.quesArr.slice(0,data.data.quzCount);
						this.popups.objectiveQues.width = data.data.width;
						this.popups.objectiveQues.height = data.data.height;
						this.popups.objectiveQues.x = data.data.pointx;
						this.popups.objectiveQues.y = data.data.pointy;
						this.popups.objectiveQues.quzCount = data.data.quzCount;
						this.popups.objectiveQues.markingType = data.data.markingType;
						this.popups.objectiveQues.optionsCurrent = JSON.parse(JSON.stringify(this.popups.objectiveQues.optionsArr)).splice(0, data.data.quzOptions);
						console.log(this.popups.objectiveQues)
						
						this.popups.objectiveQues.state = true;
						break;
					case 'subjectiveQues':	//主观
						/*subjectiveQues: { //主观题选项框
						 	operationState: 'new',	//new 新建  edit编辑
							state: false, //状态
							boxTit: '', //弹框标题
							modulePos: '', //模块位置
							moduleName: '主观题1', //模块名称
							testNoIndex: 1, //单题试题题号
							type: 1,	//单题1 多题2
							quesNum: 1,	//多题号题目数量
							startNoIndex: 0,	//多题号开始题号
							quesArr: null,	//题目数量
							drawWidth : 0,
							drawHeight : 0,
							drawX : 0,
							drawY : 0,
						},*/
						this.popups.subjectiveQues.operationState = 'edit';
						this.popups.subjectiveQues.boxTit = data.data.boxTit;
						this.popups.subjectiveQues.modulePos = data.data.modulePos;
						this.popups.subjectiveQues.moduleName = data.data.markingModuleName;
						this.popups.subjectiveQues.type = data.data.modeltype;
						this.popups.subjectiveQues.testNoIndex = data.data.quzStartSeqIndex;
						this.popups.subjectiveQues.startNoIndex = data.data.quzStartSeqIndex;
						this.popups.subjectiveQues.quesNum = data.data.quzCount;
						this.popups.subjectiveQues.drawWidth = data.data.width;
						this.popups.subjectiveQues.drawHeight = data.data.height;
						this.popups.subjectiveQues.drawX = data.data.pointx;
						this.popups.subjectiveQues.drawY = data.data.pointy;
						
						this.popups.subjectiveQues.state = true;
						
						break;
					case 'trimPreview':	//客观题版式
						
					
						this.popups.trimPreview.operationState = 'edit';
						this.popups.trimPreview.imgState = true;
						this.popups.trimPreview.state = true;
						
						break;
					default:
						/*otherPoints: { //定位点/缺考标记/学生信息
						 	operationState: 'new',	//new 新建  edit编辑
							state: false, //状态
							boxTit: '', //弹框标题
							modulePos: '', //模块位置
							moduleName: '', //模块名称
							testNumberType: 0,	//学生信息 考试号类型  0:全框  1：半框  2：条形码
							testNumberNumArr: ['4','5','6','7','8','9','10','11','12'],	//考试号位数区间
							testNumberNum : 4,    //考试号位数
							aliveData : null,		//学生信息用位置大小  调接口
							testNumberNum : 0		//学生信息用考號嗎  调接口
							drawWidth : 0,
							drawHeight : 0,
							drawX : 0,
							drawY : 0,
						},*/
						this.popups.otherPoints.operationState = 'edit';
						this.popups.otherPoints.boxTit = data.data.boxTit;
						this.popups.otherPoints.modulePos = data.data.modulePos;
						this.popups.otherPoints.moduleName = data.data.markingModuleName;
						this.popups.otherPoints.testNumberType = data.data.testNumberType;
						this.popups.otherPoints.testNumberNum = data.data.testNumberNum;
						if(data.data.aliveData){
							this.popups.otherPoints.aliveData = data.data.aliveData;
							this.popups.otherPoints.testNumberNum = data.data.testNumberNum;
						}else{
							this.popups.otherPoints.drawWidth = data.data.width;
							this.popups.otherPoints.drawHeight = data.data.height;
							this.popups.otherPoints.drawX = data.data.pointx;
							this.popups.otherPoints.drawY = data.data.pointy;
						}
						this.popups.otherPoints.state = true;
						break;
				}
			});
			
		},
		toto() {
			let eee = path.join('/aaa', 'xxx');
			console.log(eee)
		},
		//发送消息给主进程 
		sendMsg() {
			this.$electron.ipcRenderer.send('xiaoxi', 'zzzzzzzzzzzz999999');
		},
		//框选点右键事件（删除/编辑）
		rightClickPoint(event, i, dataF, pointType, bizId) {
			//事件对象  当前下标  当前父级  框选点类型   bizId:客观题版式
			//取消默认事件
			event.preventDefault();
			console.log(this.leftData.page)
			console.log(i)  
			console.log(dataF)  
			console.log(pointType)
			console.log(bizId)
			if(bizId != undefined){
				console.log('版式')
				this.contextMenuMsg.type = 'trimPreview';
				this.contextMenuMsg.data = '';
				this.contextMenuMsg.index = -1;
				this.contextMenuMsg.bizId = bizId;
				this.contextMenuMsg.sendName = '';
				console.log(this.contextMenuMsg)
				if(this.trimPreview.infoState){
					this.$electron.ipcRenderer.send('contextMenuDel', bizId);
				}
			}else{
				console.log('其它')
				this.contextMenuMsg.data = dataF;
				this.contextMenuMsg.index = i;
				this.contextMenuMsg.type = pointType;
				this.contextMenuMsg.bizId = dataF[i].bizId;
		//			LocationPoint,MissingMark,ObjectiveQuz,StudentPageInfo,SubjectiveQuz,ObjQuzFormat
				switch (pointType){
					case 'locationPoint':
						this.contextMenuMsg.sendName = 'insertLocationPoint';
						break;
					case 'missExam':
						this.contextMenuMsg.sendName = 'insertMissingMark';
						break;
					case 'studentInfo':
						this.contextMenuMsg.sendName = 'insertStudentPageInfo';
						break;
					case 'subjectiveQues':
						this.contextMenuMsg.sendName = 'insertSubjectiveQuz';
						break;
					case 'objectiveQues':
						this.contextMenuMsg.sendName = 'insertObjectiveQuz';
						break;
					default:
						break;
				}
				console.log(this.contextMenuMsg)
				//			dataF[i].bizId = '0bfaaa50077011ea925b9305a95d119e';
				if(dataF[i].show) {
					//发送查询消息
					this.$electron.ipcRenderer.send('contextMenuDel', dataF[i].bizId);
					//				this.$electron.ipcRenderer.send('contextMenuDel',listData);
				} else {
					return false;
				}
			}
		},
		//清除裁剪框
		clearClippingBox (){
			let _this = this;
			if(_this.cropObj) {
//				console.log(this.cropObj)
				let box = $(".cropper-crop-box");
				box.css({
					"width": 0,
					"height": 0,
					"transform": "translateX(-2000px) translateY(-2000px)"
				});
			}
		},
		//导航切换
		changeNav(i, item) {
//			console.log(this.$refs.canvas[this.leftData.currentPage])
//			console.log(this.popups.trimPreview.arrayType)
//			console.log(this.popups.objectiveQues.objTypeStore)
			//去除客观题版式选中状态
			this.trimPreview.infoState = false;
			console.log(i)
			if(this.navData.nav[0].stepState == false){
				this.$parent.timingFn('warning','请上传答题卡并保存');	
				return false;
			}else if(this.navData.nav[0].stepState && this.navData.nav[1].stepState == false && i > 1){
				this.$parent.timingFn('warning','请选择客观题板式');	
				return false;
			} 
			
			//清除裁剪框
			this.clearClippingBox();
			//当前下标 当前项
			let _this = this;
			this.navData.currentIndex = i;
			let n = -1;
			//-1 导入答题卡   >-1 非导入答题卡
			n = this.navData.editState == 0 ? -1 : i
			//导入、框选tab切换
			this.navData.editState = i == 0 ? false : true;
			this.navData.nav.forEach((ele, index) => {
				if(item.key == ele.key) {		//(导入答题卡/客观题版式 前俩个下标)
					this.chooseArea = index - 2; //框选位置保存 解决诡异问题
				}
			});
			
			//canvas容器
			let container = $('.container');
			//左侧树
			let leftContainer = $('.left_view.flow-box');
			if(n == -1) { //从导入图片-->到框选
				this.leftData.page.forEach((e, i) => {
					e.show = false;
				});
				//				console.log(this.leftData.page)
				this.leftData.currentPage = 0;
				this.leftData.page[0].show = true;

				container.css({
					'width': this.leftData.page[0].scaleWidth + 'px',
					'height': this.leftData.page[0].scaleHeight + 'px'
				});
				leftContainer.css({'height': this.leftData.page[0].scaleHeight + 'px'});

				this.imgSrc = this.leftData.page[0].src;
				//canvas   0:第一页
				this.imgLoad(0);
			} else { //非导入显示
				if(this.navData.editState) { //框选状态
					this.leftData.page.forEach((ele, index) => {
						if(ele.show) { //去除左侧回显的当前状态
							ele.state = false;
							ele.secondLevel.forEach((secE, secI) => {
								secE.show = false;
								secE.pointList.forEach((pointE, pointI) => {
									pointE.show = false;
								});
							});
							container.css({
								'width': ele.scaleWidth + 'px',
								'height': ele.scaleHeight + 'px'
							});
							leftContainer.css({'height': this.leftData.page[0].scaleHeight + 'px'});
							//canvas
							this.imgLoad(index);
						}
					});
					//裁剪框出来
					$(this.canvasRelated.currentCtx.canvas).eq(0).addClass('cropper-hidden');
				}
			}
		},
		//客观题版式左侧
		showInfo (){
			this.trimPreview.infoState = true;
			//清除导航当前选中状态
			this.navData.currentIndex = -1;
			$(this.canvasRelated.currentCtx.canvas).eq(0).removeClass('cropper-hidden');
//			this.popups.trimPreview.state = true;
			//发送查询消息
//			this.$electron.ipcRenderer.send('', );
		},
		//切换页面所有框选点
		pagePoint(e) {
			//			console.log(this.canvasRelated.currentCtx.strokeStyle);
			this.canvasRelated.currentCtx.strokeStyle = "red";
			let _this = this;
			e.secondLevel.forEach((secE, secI) => {
				secE.pointList.forEach((pointE, pointI) => {
					_this.canvasRelated.currentCtx.strokeRect(pointE.position.x, pointE.position.y, pointE.position.width, pointE.position.height);
					if(secE.value == 'objectiveQues'){	//客观
						//客观题小框及文字回显
						pointE.pointSecondList.forEach((sPointE,sPointI) => {
							_this.canvasRelated.currentCtx.fillText(sPointE.titleNum, sPointE.titlePosition.x, sPointE.titlePosition.y);
							sPointE.valueGroup.forEach((sPointEE,sPointII) => {
								_this.canvasRelated.currentCtx.strokeRect(sPointEE.x, sPointEE.y, sPointEE.width, sPointEE.height);
							});
						});
					}else if(secE.value == 'studentInfo' && pointE.pointSecondList){	//学生信息
						pointE.pointSecondList.forEach((sPointE,sPointI) => {
							sPointE.forEach((sPointEE,sPointII) => {
								_this.canvasRelated.currentCtx.strokeRect(sPointEE.x, sPointEE.y, sPointEE.width, sPointEE.height);
							});
						});
					}
					if(secE.value == 'subjectiveQues'){
						//主观题文字回显
			          	let textX = pointE.position.x + (pointE.position.width / 2);
			          	let textY = pointE.position.y + (pointE.position.height / 2);
			          	_this.canvasRelated.currentCtx.fillText(pointE.name, textX, textY);
					}
				});
			});
		},
		//树结构
		showStructure(level, index, indexF, indexFF) {
			//层级  层级下标  父级层级下标  父级父级层级下标
			//			console.log($(this.canvasRelated.currentCtx.canvas))
			//			console.log($(this.canvasRelated.currentCtx.canvas)[0])
			//清除导航当前选中状态
			this.navData.currentIndex = -1;
			$(this.canvasRelated.currentCtx.canvas).eq(0).removeClass('cropper-hidden');
//			$(this.canvasRelated.currentCtx.canvas).eq(0).css({'border':'10px solid red;'})
			this.chooseArea = -2; //框选位置保存 解决诡异问题
			this.canvasRelated.currentCtx.strokeStyle = "red";
			this.canvasRelated.currentCtx.lineWidth = 1;
			
			let _this = this;
			//canvas容器
			let container = $('.container');
			//左侧树
			let leftContainer = $('.left_view.flow-box');
			if(level == 1) { //页面切换
				//清除框点
				this.clearCanvas();
				this.leftData.page.forEach((e, i) => {
					if(i == index) {
						//当前页
						_this.leftData.currentPage = i;
//						console.log(e.absolutePath)
//						_this.cropObj.replace(e.absolutePath,true)
//						_this.cropObj.replace("../../assets/img/Koala.jpg",true)
//						console.log(e.scaleWidth)
						container.css({
							'width': e.scaleWidth + 'px',
							'height': e.scaleHeight + 'px'
						});
						leftContainer.css({'height': e.scaleHeight + 'px'});
						
						if(e.state) {
							e.state = false;
						} else {
							e.show = true;
							e.state = true;
							//canvas
							_this.imgLoad(index, e);
						}
					} else {
						e.show = false;
						e.state = false;
						e.secondLevel.forEach((secE, secI) => {
							secE.show = false;
							secE.pointList.forEach((pointE, pointI) => {
								pointE.show = false;
							});
						});
					}
				});
			} else if(level == 2) { //框选类型切换
				//清除框点
				this.clearCanvas();
				this.leftData.page[indexF].secondLevel.forEach((secE, secI) => {
//					console.log(secE)
					if(secI == index) {
						if(secE.show) {
							secE.show = false;
							secE.pointList.forEach((pointE, pointI) => {
								pointE.show = false;
							});
						} else {
							secE.show = true;
							secE.pointList.forEach((pointE, pointI) => {
								_this.canvasRelated.currentCtx.strokeRect(pointE.position.x, pointE.position.y, pointE.position.width, pointE.position.height);
								if(secE.value == 'objectiveQues'){	//客观
									//客观题小框及文字回显
									pointE.pointSecondList.forEach((sPointE,sPointI) => {
										_this.canvasRelated.currentCtx.fillText(sPointE.titleNum, sPointE.titlePosition.x, sPointE.titlePosition.y);
										sPointE.valueGroup.forEach((sPointEE,sPointII) => {
											_this.canvasRelated.currentCtx.strokeRect(sPointEE.x, sPointEE.y, sPointEE.width, sPointEE.height);
										});
									});
								}else if(secE.value == 'studentInfo' && pointE.pointSecondList){	//学生信息
									pointE.pointSecondList.forEach((sPointE,sPointI) => {
										sPointE.forEach((sPointEE,sPointII) => {
											_this.canvasRelated.currentCtx.strokeRect(sPointEE.x, sPointEE.y, sPointEE.width, sPointEE.height);
										});
									});
								}
								if(secE.value == 'subjectiveQues'){
									//主观题文字回显
						          	let textX = pointE.position.x + (pointE.position.width / 2);
						          	let textY = pointE.position.y + (pointE.position.height / 2);
						          	_this.canvasRelated.currentCtx.fillText(pointE.name, textX, textY);
					            }
							});
						}
					} else {
						secE.show = false;
						secE.pointList.forEach((pointE, pointI) => {
							pointE.show = false;
						});
					}
				});
			} else if(level == 3) { //框选点切换
				//清除框点
				this.clearCanvas();
				this.leftData.page[indexFF].secondLevel.forEach((secE, secI) => {
//					console.log(secE)
					if(secI == indexF) {
						secE.show = true;
						secE.pointList.forEach((pointE, pointI) => {
							if(pointI == index) {
								if(pointE.show) {
									pointE.show = false;
									secE.show = false;
								} else {
									pointE.show = true;
									_this.canvasRelated.currentCtx.strokeRect(pointE.position.x, pointE.position.y, pointE.position.width, pointE.position.height);
//									console.log(pointE.position.x, pointE.position.y, pointE.position.width, pointE.position.height)
//									console.log(pointE)
									if(secE.value == 'objectiveQues'){	//客观
										//客观题小框及文字回显
										pointE.pointSecondList.forEach((sPointE,sPointI) => {
											_this.canvasRelated.currentCtx.fillText(sPointE.titleNum, sPointE.titlePosition.x, sPointE.titlePosition.y);
											sPointE.valueGroup.forEach((sPointEE,sPointII) => {
												_this.canvasRelated.currentCtx.strokeRect(sPointEE.x, sPointEE.y, sPointEE.width, sPointEE.height);
											});
										});
									}else if(secE.value == 'studentInfo' && pointE.pointSecondList){	//学生信息
										pointE.pointSecondList.forEach((sPointE,sPointI) => {
											sPointE.forEach((sPointEE,sPointII) => {
												_this.canvasRelated.currentCtx.strokeRect(sPointEE.x, sPointEE.y, sPointEE.width, sPointEE.height);
											});
										});
									}
									if(secE.value == 'subjectiveQues'){
										//主观题文字回显
							          	let textX = pointE.position.x + (pointE.position.width / 2);
							          	let textY = pointE.position.y + (pointE.position.height / 2);
							          	_this.canvasRelated.currentCtx.fillText(pointE.name, textX, textY);
						          	}
								}
							} else {
								pointE.show = false;
							}
						})
					} else {
						secE.show = false;
						secE.pointList.forEach((pointE, pointI) => {
							pointE.show = false;
						})
					}
				});
			}
		},
		jjj() {
			//canvas
			//				this.imgLoad(0);

			this.$router.push({
				name: "preview"
			});
		},
		//canvas加载图片
		imgLoad(i, e) {
//			alert(999)
			//i:第几    e：页码（左侧树点击第X页会传）
			let _this = this;
			//			console.log(e)
			this.$nextTick(() => {
				let canvasObj = 'canvas' + i;
				//					console.log(this.leftData.page[i].src)
				canvasObj = document.getElementById(this.leftData.page[i].src);
				//				console.log(canvasObj)
				if(canvasObj) {
					let parentEle = canvasObj.parentElement;
					console.log(parentEle.offsetWidth)
					canvasObj.width = parentEle.offsetWidth;
					canvasObj.height = parentEle.offsetHeight;

					let ctx = canvasObj.getContext('2d');

					let img = new Image();
					img.crossOrigin = 'Anonymous';
					img.src = this.leftData.page[i].src;

					//存库信息
					//当前页
					this.saveData.currentIndex = i - 0 + 1;
					//当前页面id
					this.saveData.answerSheetImageId = this.leftData.page[i].answerSheetImageId;
					//当前页图片http路径
					this.saveData.currentSheetUrl = this.leftData.page[i].src;
					//当前页图片本地路径
//					console.log(this.leftData.currentPage)

//					console.log(_this.$refs.canvas[0].className)

//					this.saveData.currentSheetFilePath = this.leftData.page[this.leftData.currentPage].absolutePath;
//					console.log(_this.$refs.canvas[0])   
					//					console.log($(_this.$refs.canvas[i][0]))
//					console.log($(_this))

					img.onload = function() {
						ctx.drawImage(img, 0, 0, canvasObj.width, canvasObj.height);
						//   			    		_this.init = canvasObj.toDataURL();
						_this.canvasRelated.currentImg = img;
						_this.canvasRelated.currentCtx = ctx;
						
						_this.canvasRelated.currentCtx.font = "14px Microsoft YaHei";
						// 更改字号后，必须重置对齐方式，否则居中麻烦。设置文本的垂直对齐方式
				        _this.canvasRelated.currentCtx.textBaseline = 'middle';
				        _this.canvasRelated.currentCtx.textAlign = 'center';
				        // 文字颜色
			          	_this.canvasRelated.currentCtx.fillStyle = "green";
			          	
						if(e) { //切换页面 
							console.log($(_this.canvasRelated.currentCtx.canvas))
							_this.pagePoint(e);
							setTimeout(() => {
								$(_this.canvasRelated.currentCtx.canvas).eq(0).removeClass('cropper-hidden');
							});
							
						}
//						this.cropObj.replace(e.absolutePath,true)
//						this.cropObj.replace("../../assets/img/Koala.jpg",true)
						//销毁
						if(_this.cropObj){
							_this.cropObj.destroy();
						}
						this.cropper = new Cropper(_this.$refs.canvas[i], {
							..._this.clipParams,
							ready: () => {
								
							},
							cropstart: () => {
//								console.log("cropstart")
							},
							cropmove: () => {
//								console.log("cropmove")
							},
							crop: (event) => {
							},
							cropend: () => { //裁剪区域划分结束
//								console.log(_this.$refs.canvas[0])
//								console.log(_this.$refs.canvas[i])
								const cropParam = this.cropper.getData();
								console.log(cropParam)
								//locationPoint
								console.log(_this.chooseArea)
								if(_this.chooseArea > -2) {
									//类型（判断）["importAnswerCard","trimPreview","locationPoint", "missExam", "studentInfo", "subjectiveQues", "objectiveQues"]
									//类型（传）： LocationPoint,MissingMark,ObjectiveQuz,StudentPageInfo,SubjectiveQuz,ObjQuzFormat(客观题版式)
//									let value = _this.leftData.page[i].secondLevel[_this.chooseArea] == undefined ? 'trimPreview' : _this.leftData.page[i].secondLevel[_this.chooseArea].value;
									let value = _this.navData.nav[_this.navData.currentIndex].key;
									console.log(value)
									
//									Y:\exe\test7\install\marking\faf38aa8006f4956ada81711ab135a02\01391816cc4848a592801b2ae9394d6d\temp\small_box.jpg?123
			
									//bizId
									//_this.saveData.bizId = uuid.v1().replace(/-/g, '');
									//坐标点信息
									_this.saveData.pointx = Math.round(cropParam.x);
									_this.saveData.pointy = Math.round(cropParam.y);
									_this.saveData.width = Math.round(cropParam.width);
									_this.saveData.height = Math.round(cropParam.height);
									
									//定位点/缺考标记/学生信息调用接口需要
									let filePath = _this.regeditParams.localPath + '\\' + _this.commonParams.markingTaskId + '\\' + _this.commonParams.sheetId + '\\' + 'upload\\' + _this.leftData.page[_this.leftData.currentPage].answerSheetImageId + '.jpg';
									let data = {
										sheetId : _this.commonParams.sheetId,
										markingTaskId : _this.commonParams.markingTaskId,
										sourcePath : filePath,
										x1 : Math.round(cropParam.x),
										y1 : Math.round(cropParam.y),
										width : Math.round(cropParam.width),
										height : Math.round(cropParam.height)
									};
									console.log(value)
									switch(value) {
										case 'trimPreview':	//客观题版式校准
											if(cropParam.width > 70 || cropParam.height > 60){
												_this.$parent.timingFn('warning','宽高太大');
											}else{
												_this.popups.trimPreview.operationState = 'new';
												_this.popups.trimPreview.imgState = false;
												_this.popups.trimPreview.state = true;
												//拖拽后恢复默认样式
												$('.zy_trim_preview_box .con').css({'left':0,'top':0,'right':0,'bottom':0});
												_this.drag(document.querySelector('.zy_trim_preview_box .con'));
												
												_this.popups.trimPreview.posData = cropParam;
	//											console.log(_this.leftData.currentPage)
												_this.popups.trimPreview.x = Math.round(cropParam.x);
												_this.popups.trimPreview.y = Math.round(cropParam.y);
												_this.popups.trimPreview.width = Math.round(cropParam.width);
												_this.popups.trimPreview.height = Math.round(cropParam.height);
												//初始
												_this.popups.trimPreview.initWidth = 0;
												_this.popups.trimPreview.initHeight = 0;
												_this.popups.trimPreview.initArea = 0;
												
												//max赋值
												_this.popups.trimPreview.maxWidth = 0;
												_this.popups.trimPreview.maxHeight = 0;
												_this.popups.trimPreview.maxArea = 0;
												
												//min赋值
												_this.popups.trimPreview.minWidth = 0;
												_this.popups.trimPreview.minHeight = 0;
												_this.popups.trimPreview.minArea = 0;
												
												//init赋值
												_this.popups.trimPreview.borderInitWidth = "",
												_this.popups.trimPreview.borderInitHeight = "";
												_this.popups.trimPreview.borderInitTop = "";
												_this.popups.trimPreview.borderInitLeft = "";
												//max border赋值
												_this.popups.trimPreview.borderMaxWidth = "";
												_this.popups.trimPreview.borderMaxHeight = "";
												_this.popups.trimPreview.borderMaxTop = "";
												_this.popups.trimPreview.borderMaxLeft = "";
												//min border赋值
												_this.popups.trimPreview.borderMinWidth = "";
												_this.popups.trimPreview.borderMinHeight = "";
												_this.popups.trimPreview.borderMinTop = "";
												_this.popups.trimPreview.borderMinLeft = "";
											}
											
											
										break;
										case 'locationPoint': //定位点
											if(cropParam.width > 70 || cropParam.height > 60){
												_this.$parent.timingFn('warning','宽高太大');
											}else{
												_this.popups.otherPoints.operationState = 'new';
												_this.popups.otherPoints.state = true;
												
												//获取精确大小位置
												api.positionCalibration(data).then(res => {
													if(res.data.ret == 200){
														console.log(res.data.data)
														//宽高大小位置
														_this.saveData.preciseInfo = res.data.data;
													}
												}).catch(e => {
									
												});
												
												//拖拽后恢复默认样式
												$('.zy_other_points_box .con').css({'left':0,'top':0,'right':0,'bottom':0});
												setTimeout(()=>{
													_this.drag(document.querySelector('.zy_other_points_box .con'));
												});
												
												_this.popups.otherPoints.boxTit = '定位点';
												_this.popups.otherPoints.modulePos = '(x:' + Math.round(cropParam.x) + ',y:' + Math.round(cropParam.y) + ') (width:' + Math.round(cropParam.width) + ',height:' + Math.round(cropParam.height) + ')';
												
												_this.popups.otherPoints.moduleName = _this.popups.otherPoints.boxTit + (_this.leftData.page[i].secondLevel[_this.chooseArea].pointList.length - 0 + 1);
												
												//框选类型
												_this.saveData.markingType = 'LocationPoint';
												//左侧树标记点名称
												_this.saveData.markingModuleName = _this.popups.otherPoints.moduleName;
												//储存请求名称
												_this.sendName = 'insertLocationPoint';
											}
											break;
										case 'missExam': //缺考标记
											if(cropParam.width > 70 || cropParam.height > 60){
												_this.$parent.timingFn('warning','宽高太大');
											}else{
												_this.popups.otherPoints.state = true;
												_this.popups.otherPoints.operationState = 'new';
												
												//获取精确大小位置
												api.positionCalibration(data).then(res => {
													if(res.data.ret == 200){
	//													console.log(res.data.data)
														//宽高大小位置
														_this.saveData.preciseInfo = res.data.data;
													}
												}).catch(e => {
									
												});
												
												//拖拽后恢复默认样式
												$('.zy_other_points_box .con').css({'left':0,'top':0,'right':0,'bottom':0});
												setTimeout(()=>{
													_this.drag(document.querySelector('.zy_other_points_box .con'));
												});
												
												_this.popups.otherPoints.boxTit = '缺考标记';
												_this.popups.otherPoints.moduleName = _this.popups.otherPoints.boxTit + (_this.leftData.page[i].secondLevel[_this.chooseArea].pointList.length - 0 + 1);
												_this.popups.otherPoints.modulePos = '(x:' + Math.round(cropParam.x) + ',y:' + Math.round(cropParam.y) + ') (width:' + Math.round(cropParam.width) + ',height:' + Math.round(cropParam.height) + ')';
												//框选类型
												_this.saveData.markingType = 'MissingMark';
												//左侧树标记点名称
												_this.saveData.markingModuleName = _this.popups.otherPoints.moduleName;
												//储存请求名称
												_this.sendName = 'insertMissingMark';
											}
											break;
										case 'studentInfo': //学生信息
											_this.popups.otherPoints.posData = cropParam;
											_this.popups.otherPoints.operationState = 'new';
											_this.popups.otherPoints.state = true;
											//拖拽后恢复默认样式
											$('.zy_other_points_box .con').css({'left':0,'top':0,'right':0,'bottom':0});
											setTimeout(()=>{
												_this.drag(document.querySelector('.zy_other_points_box .con'));
											});
											
											//考试号类型 0 1 2  全半码
											_this.saveData.testNumberType = 0;
											//考试号位数 默认4
											_this.saveData.testNumberNum = 4;
											_this.popups.otherPoints.testNumberNum = 4;
											_this.popups.otherPoints.boxTit = '学生信息';
											_this.popups.otherPoints.moduleName = _this.popups.otherPoints.boxTit + (_this.leftData.page[i].secondLevel[_this.chooseArea].pointList.length - 0 + 1);
											_this.popups.otherPoints.modulePos = '(x:' + Math.round(cropParam.x) + ',y:' + Math.round(cropParam.y) + ') (width:' + Math.round(cropParam.width) + ',height:' + Math.round(cropParam.height) + ')';
											//框选类型
											_this.saveData.markingType = 'StudentPageInfo';
											//左侧树标记点名称
											_this.saveData.markingModuleName = _this.popups.otherPoints.moduleName;
											//储存请求名称
											_this.sendName = 'insertStudentPageInfo';
											break;
										case 'objectiveQues': //客观题
											_this.popups.objectiveQues.operationState = 'new';
											_this.popups.objectiveQues.state = true;
											//拖拽后恢复默认样式
											$('.zy_objective_box .con').css({'left':0,'top':0,'right':0,'bottom':0});
											setTimeout(()=>{
												_this.drag(document.querySelector('.zy_objective_box .con'));
											});
											
											//提示框默认信息
											console.log(_this.popups.objectiveQues.quesArr)
											console.log(_this.popups.objectiveQues.quesArr[0].quzLabel)
											_this.popups.objectiveQues.startNoIndex = 0;
											_this.popups.objectiveQues.quesNum = 4;		//题目数量
											_this.popups.objectiveQues.optionNum = 4;	//选项个数
											_this.popups.objectiveQues.type	= 1;	//1选择 2判断
											//模块名称初始值
											_this.popups.objectiveQues.moduleName = '客观题' + _this.popups.objectiveQues.quesArr[Number(_this.popups.objectiveQues.startNoIndex)].quzLabel  + '~' + _this.popups.objectiveQues.quesArr[_this.popups.objectiveQues.quesNum - 1].quzLabel;
											//位置
											_this.popups.objectiveQues.modulePos = '(x:' + Math.round(cropParam.x) + ',y:' + Math.round(cropParam.y) + ') (width:' + Math.round(cropParam.width) + ',height:' + Math.round(cropParam.height) + ')';
											//框选类型
											_this.saveData.markingType = 'ObjectiveQuz';
											//储存请求名称
											_this.sendName = 'insertObjectiveQuz';
											//table题号
											_this.popups.objectiveQues.quesNoArr = _this.popups.objectiveQues.quesArr.slice(0,_this.popups.objectiveQues.quesNum);
											break;
										case 'subjectiveQues': //主观题
											_this.popups.subjectiveQues.operationState = 'new';
											_this.popups.subjectiveQues.state = true;
											//拖拽后恢复默认样式
											$('.zy_subjective_box .con').css({'left':0,'top':0,'right':0,'bottom':0});
											setTimeout(()=>{
												_this.drag(document.querySelector('.zy_subjective_box .con'));
											});
											
											//提示框默认信息
											_this.popups.subjectiveQues.startNoIndex = 0;
											_this.popups.subjectiveQues.testNoIndex = 0;
											_this.popups.subjectiveQues.moduleName = '主观题' + _this.popups.subjectiveQues.quesArr[Number(_this.popups.subjectiveQues.startNoIndex)].quzLabel;
											_this.popups.subjectiveQues.type = 1;
											_this.popups.subjectiveQues.modulePos = '(x:' + Math.round(cropParam.x) + ',y:' + Math.round(cropParam.y) + ') (width:' + Math.round(cropParam.width) + ',height:' + Math.round(cropParam.height) + ')';
											//框选类型
											_this.saveData.markingType = 'SubjectiveQuz';
											//储存请求名称
											_this.sendName = 'insertSubjectiveQuz';
											//试题隐藏ID
											_this.saveData['quzId'] = '试题隐藏ID';
											console.log(_this.saveData)
											break;
										default:
											break;
									}
								}
							}
						});
						//裁剪框对象
						_this.cropObj = this.cropper;
//				 			    		console.log(this.cropper)
						 			    		
					};
				}
			});
			return 1;
		},
		//清除框选点 重新绘制
		clearCanvas() {
			let container = $('.container');
			let width = container.css('width').substring(0,container.css('width').length - 2);
			let height = container.css('height').substring(0,container.css('height').length - 2);
			this.canvasRelated.currentCtx.clearRect(0, 0, width, height);
			this.canvasRelated.currentCtx.drawImage(this.canvasRelated.currentImg, 0, 0, width, height);
		},
		//上传答题卡文件
		selectFile() {
			let _this = this;
			let file = this.$refs.upload_paper.files[0];
			let formData = new window.FormData();
			
			formData.append('files', file);
			formData.append('sheetId', this.commonParams.sheetId);	//mwb sheetId zyupdate
			formData.append('markingTaskId', this.commonParams.markingTaskId);//mwb markingTaskId zyupdate
			
			//			console.log(file.path);
			//			console.log(file.name);
			//			this.imgSrc = file.path;
			var reader = new FileReader();
			reader.readAsDataURL(file);
			console.log(formData.get("files"))
			reader.onload = function(e) {
				api.uploadAnswardCard(formData).then(res => {
					console.log(res.data.data[0])
					if(res.data.ret == 200) {
						_this.uploadData.push({
//							bizId: uuid.v1().replace(/-/g, ''), //独立id   
							bizId: res.data.data[0].bizId, //独立id   //mwb bizId zyupdate
							markingTaskId: _this.commonParams.markingTaskId, //阅卷任务ID
							sheetId: _this.commonParams.sheetId, //答题卡ID
							currentSheetUrl: res.data.data[0].networkPath, //http当前图片路径
//							currentSheetFilePath: res.data.data[0].currentSheetFilePath, //图片相对路径 相对路径
//							absolutePath: res.data.data[0].absolutePath,	//绝对路径 Y盘
							currentIndex: 0, //当前页码 ??
							scaleWidth: res.data.data[0].scale_width, //当前图片宽
							scaleHeight: res.data.data[0].scale_height //当前图片高
						});
						console.log(_this.uploadData)
					}
				}).catch(e => {

				});
				//				console.log(_this.uploadData)
			}
		},
		//上传文件删除
		deleteFile(i) {
			this.uploadData.splice(i, 1);
		},
		//预览图展示
		previewShow(src) {
//		previewShow(src, srcL) {
			let _this = this;
			this.popups.preview.viewSrc = src; //网络
//			this.popups.preview.localhostSrc = srcL; //本地
			this.popups.preview.state = true;
			/*this.uploadData.forEach((e,i)=>{
				if(e.currentSheetUrl.indexOf(_this.popups.preview.viewSrc) > -1 && e.currentSheetUrl.indexOf('?') > -1){
					console.log(e.currentSheetUrl)
					e.currentSheetUrl = e.currentSheetUrl.substring(0,e.currentSheetUrl.indexOf('?'));
					console.log(e.currentSheetUrl)
				}
			});*/
		},
		//预览图取消按钮
		previewCancel() {
			this.popups.preview.state = false;
		},
		//预览图确认按钮
		previewSure() {
			let _this = this;
			console.log(this.popups.preview)
			let data = {
				sheetId : this.commonParams.sheetId,
				markingTaskId : this.commonParams.markingTaskId,
				sourcePath : this.popups.preview.localhostSrc,
				examId : '123',
				angle : this.popups.preview.deg,
				scaling : this.popups.preview.scaling
			}
			//图片旋转角度
			api.correctDeg(data).then(res => {
				if(res.data.ret == 200) {
					this.uploadData.forEach((e, i) => {
						//currentSheetUrl:'',		//http当前图片路径
						//currentSheetFilePath:'',//图片本地路径
						if(e.currentSheetUrl == _this.popups.preview.viewSrc) {
							//new Date().getTime()
							e.currentSheetUrl = e.currentSheetUrl + '?' + Math.random();
							console.log(e.currentSheetUrl)
						}
					});
					this.popups.preview.state = false;
					console.log(this.uploadData)
				}
			}).catch(e => {

			});
		},
		//预览图旋转
		previewRotate(point) {
			//			console.log(this.$refs.preview_img)
			switch(point) {
				case 'left':
					this.popups.preview.deg--;
					break;
				case 'right':
					this.popups.preview.deg++;
					break;
				case 'clockwise': //顺时针
					this.popups.preview.deg += 90;
					break;
				case 'anti-clockwise': //逆时针
					this.popups.preview.deg -= 90;
					break;
				default:
					break;
			}
			this.$refs.preview_img.style.transform = 'rotate(' + this.popups.preview.deg + 'deg) scale(' + this.popups.preview.scaling + ')';
		},
		//预览图缩放
		previeZoom(point) {
			if(point == 'big') {
				this.popups.preview.scaling += 0.05;
			} else if(point == 'small') {
				this.popups.preview.scaling -= 0.05;
			}
			//			console.log(this.$refs.preview_img.parentNode.style)
			//			let w = window.getComputedStyle(this.$refs.preview_img).width.slice(0,window.getComputedStyle(this.$refs.preview_img).width.length-2);
			//			this.$refs.preview_img.style.width = (w - 0)  + this.popups.preview.scaling + 'px';
			this.$refs.preview_img.style.transform = 'scale(' + this.popups.preview.scaling + ') rotate(' + this.popups.preview.deg + 'deg)';
		},
		//答题卡列表保存按钮
		pageListSave() {
			this.$parent.confirmFn('将置空所有数据袄',(state) => {
				if(state == 'sure'){	
					//页码
					this.uploadData.forEach((e, i) => {
						e.currentIndex = i + 1;
					});
					
					let saveParam ={};
					saveParam.sheetId = this.commonParams.sheetId;//答题卡ID、
					saveParam.markingTaskId = this.commonParams.markingTaskId; //阅卷任务ID
					saveParam.uploadData = this.uploadData;
					//向主进程发送存储请求
					this.$electron.ipcRenderer.send('saveAnswerCardList', saveParam);
					this.$parent.timingFn('success','保存成功');
					console.log(saveParam)
					setTimeout(() => {
						//刷新页面数据
						location.reload();
					},1500);
		//			this.$router.go(0);
					/*this.$router.push({
		                path : '/index/makeTemplate',
		                query : {}
		           	});*/
				}
			});
		},
		//客观题版式弹框--识别按钮
		positionDistinguish (){
			//原图相对地址
//			console.log(this.leftData.page)
//			let filePath = this.regeditParams.localPath + '\\' + this.leftData.page[this.leftData.currentPage].filePath;
			let filePath = this.regeditParams.localPath + '\\' + this.commonParams.markingTaskId + '\\' + this.commonParams.sheetId + '\\' + 'upload\\' + this.leftData.page[this.leftData.currentPage].answerSheetImageId + '.jpg';
//			console.log(filePath)
			let data = {
				sheetId : this.commonParams.sheetId,
				markingTaskId : this.commonParams.markingTaskId,
				sourcePath : filePath,
				x1 : Math.round(this.popups.trimPreview.posData.x),
				y1 : Math.round(this.popups.trimPreview.posData.y),
				width : Math.round(this.popups.trimPreview.posData.width),
				height : Math.round(this.popups.trimPreview.posData.height)
			};
			
			let src = '';
			api.positionCalibration(data).then(res => {
				console.log(res);
				console.log(res.data);
				if(res.data.ret == 200){
					this.ggg = res.data.data;
					src = this.regeditParams.localPath + '\\' + data.markingTaskId + '\\' + data.sheetId + '\\temp\\small_box.jpg?' + Math.random();
					src = src.substring(0,src.indexOf('?') + 1) + Math.random();
//													console.log(src)
					this.popups.trimPreview.imgSrc = src;
					this.popups.trimPreview.imgState = true;
//					this.$nextTick(() => {
					setTimeout( ()=>{
						$('.img_real')[0].onload = () => {
//															console.log($('.img_real').width())
							let imgWidth = $('.img_real').width();
							let imgHeight = $('.img_real').height();
							$('.preview_auto').css({'width':imgWidth,'height':imgHeight});
						};
					});
					
					//数字回显
					this.popups.trimPreview.initWidth = res.data.data.width;
					this.popups.trimPreview.initHeight = res.data.data.height;
					this.popups.trimPreview.initArea = res.data.data.area;
					
					this.popups.trimPreview.maxWidth = this.popups.trimPreview.initWidth + 4;
					this.popups.trimPreview.maxHeight = this.popups.trimPreview.initHeight + 4;
					this.popups.trimPreview.maxArea = this.popups.trimPreview.maxWidth * this.popups.trimPreview.maxHeight;
					
					this.popups.trimPreview.minWidth = this.popups.trimPreview.initWidth - 4;
					this.popups.trimPreview.minHeight = this.popups.trimPreview.initHeight - 4;
					this.popups.trimPreview.minArea = this.popups.trimPreview.minWidth * this.popups.trimPreview.minHeight;
					
					//边框
					//init赋值		1： border 宽度
					this.popups.trimPreview.borderInitWidth = this.popups.trimPreview.initWidth + 'px';
					this.popups.trimPreview.borderInitHeight = this.popups.trimPreview.initHeight + 'px';
					this.popups.trimPreview.borderInitTop = res.data.data.y - 1 + 'px';
					this.popups.trimPreview.borderInitLeft = res.data.data.x - 1 + 'px';
					//max赋值
					this.popups.trimPreview.borderMaxWidth = this.popups.trimPreview.initWidth + 4 + 'px';
					this.popups.trimPreview.borderMaxHeight = this.popups.trimPreview.initHeight + 4 + 'px';
					this.popups.trimPreview.borderMaxTop = res.data.data.y - 1 - 2 + 'px';
					this.popups.trimPreview.borderMaxLeft = res.data.data.x - 1 - 2 + 'px';
					//min赋值
					this.popups.trimPreview.borderMinWidth = this.popups.trimPreview.initWidth - 4 + 'px';
					this.popups.trimPreview.borderMinHeight = this.popups.trimPreview.initHeight - 4 + 'px';
					this.popups.trimPreview.borderMinTop = res.data.data.y - 1 + 2 + 'px';
					this.popups.trimPreview.borderMinLeft = res.data.data.x - 1 + 2 + 'px';

					/*//清除裁剪框
					this.clearClippingBox();
					$(this.canvasRelated.currentCtx.canvas).eq(0).removeClass('cropper-hidden');
					
					//清除框点
//													this.clearCanvas();
					this.canvasRelated.currentCtx.strokeStyle = "red";
					this.canvasRelated.currentCtx.lineWidth = 1;
					this.canvasRelated.currentCtx.strokeRect(res.data.data.original_x, res.data.data.original_y, res.data.data.width, res.data.data.height);
					this.canvasRelated.currentCtx.strokeStyle = "#0077AA";
					this.canvasRelated.currentCtx.strokeRect(res.data.data.original_x - 5, res.data.data.original_y - 5, res.data.data.width + 10, res.data.data.height + 10);
					this.canvasRelated.currentCtx.strokeStyle = "#1BBC9B";
					this.canvasRelated.currentCtx.strokeRect(res.data.data.original_x + 2, res.data.data.original_y + 2, res.data.data.width - 4, res.data.data.height - 4);*/
				}
				
			}).catch(e => {

			});
			
			
//			this.popups.trimPreview.state = false;
			//清除裁剪框
//			this.clearClippingBox();
//			
//			//清除框点
////													this.clearCanvas();
//			this.canvasRelated.currentCtx.strokeStyle = "red";
//			this.canvasRelated.currentCtx.lineWidth = 1;
//          
//			this.canvasRelated.currentCtx.strokeRect(0, 0, 50, 50);
//			$(this.canvasRelated.currentCtx.canvas).eq(0).removeClass('cropper-hidden');
		},
		//客观题版式最大/最小值输入
		inputPosition (type){
			//maxWidth maxHeight
			switch (type){
				case 'maxWidth':
//						console.log(this.popups.trimPreview.borderMaxWidth.slice(0,this.popups.trimPreview.borderMaxWidth.length - 2))
					break;
				case 'maxHeight':
					
					break;
				default:
					break;
			}
		},
		//客观题版式弹框确认按钮
		trimPreviewSure (){
			this.popups.trimPreview.state = false;
			this.popups.trimPreview.imgState = false;
			this.trimPreview.tipState = false;
			//可勾选客观题
			this.popups.objectiveQues.objTypeStore = true;
			
			let bizId = this.popups.trimPreview.operationState == 'new' ? uuid.v1().replace(/-/g, '') : this.contextMenuMsg.bizId;
//			document.querySelector('.zy_trim_preview_box .con');
			
			//回显位置
			this.canvasRelated.currentCtx.lineWidth = 1;
			//init
			this.canvasRelated.currentCtx.strokeStyle = "red";
			this.canvasRelated.currentCtx.strokeRect(this.ggg.original_x, this.ggg.original_y, this.ggg.width, this.ggg.height);
			//max
			this.canvasRelated.currentCtx.strokeStyle = "#0077AA";
			this.canvasRelated.currentCtx.strokeRect(this.ggg.original_x - 5, this.ggg.original_y - 5, this.ggg.width + 10, this.ggg.height + 10);
			//min
			this.canvasRelated.currentCtx.strokeStyle = "#1BBC9B";
			this.canvasRelated.currentCtx.strokeRect(this.ggg.original_x + 2, this.ggg.original_y + 2, this.ggg.width - 4, this.ggg.height - 4);
			
			let data = {
				markingType : 'ObjQuzFormat',
				sheetId : this.commonParams.sheetId,
				markingTaskId : this.commonParams.markingTaskId,
				bizId : bizId,
				createBy : '赵艳',
				createDate : '',
				trimPreview : this.popups.trimPreview
			}
			this.popups.trimPreview.bizid = data.bizId;
			console.log(this.popups.trimPreview.bizid)
			console.log(data)
			//向主进程发送存储请求
			this.$electron.ipcRenderer.send('insertObjQuzFormatSetting', data);
			
			//客观题板式步骤完成后余下步骤全部可操作
			this.navData.nav.forEach((e,i) => {
				e.stepState = true;
			});
			//清除导航当前选中状态
			this.navData.currentIndex = -1;
			//清除裁剪框
			this.clearClippingBox();
			$(this.canvasRelated.currentCtx.canvas).eq(0).removeClass('cropper-hidden');
		},
		//客观题版式弹框取消按钮
		trimPreviewCancel (){
			this.popups.trimPreview.state = false;
			this.popups.trimPreview.imgState = false;
		},
		//客观题版式弹框取消按钮
		objectiveCancel() {
			//清除裁剪框
			this.clearClippingBox();
			this.popups.objectiveQues.state = false;
			this.popups.trimPreview.imgState = false;
		},
		//客观题框确认按钮
		objectiveSure() {
			let submitData = {};
			let submitType = '';
			if(this.popups.objectiveQues.operationState == 'new'){ //新建
				this.saveData.bizId = uuid.v1().replace(/-/g, '');
				submitData.width =  this.saveData.width;
				submitData.height =  this.saveData.height;
				submitData.x =  this.saveData.pointx;
				submitData.y =  this.saveData.pointy;
				submitType = this.saveData.markingType;
			}else{
				this.saveData.bizId = this.contextMenuMsg.bizId;
				submitData.width =  this.popups.objectiveQues.width;
				submitData.height =  this.popups.objectiveQues.height;
				submitData.x =  this.popups.objectiveQues.x;
				submitData.y =  this.popups.objectiveQues.y;
				submitType = this.popups.objectiveQues.markingType;
			}
			//左侧树标记点名称
			this.saveData.markingModuleName = this.popups.objectiveQues.moduleName;
			//题目数量
			this.saveData['quzCount'] = Number(this.popups.objectiveQues.quesNum);
			//选项个数
			this.saveData['quzOptions'] = this.popups.objectiveQues.type == 1 ? this.popups.objectiveQues.optionNum : 2;
			
			console.log(this.saveData);
			let filePath = this.regeditParams.localPath + '\\' + this.commonParams.markingTaskId + '\\' + this.commonParams.sheetId + '\\' + 'upload\\' + this.leftData.page[this.leftData.currentPage].answerSheetImageId + '.jpg';
			let data = {
				sheetId: this.commonParams.sheetId,
				markingTaskId: this.commonParams.markingTaskId,
				existVerticalRow: this.popups.trimPreview.arrayType,		//横0版竖1版
				modelType: submitType,
				startQuzNum: this.popups.objectiveQues.quesArr[Number(this.popups.objectiveQues.startNoIndex)].quzLabel,
//				startQuzNum: this.popups.objectiveQues.startNoIndex,
//				startQuzNum: this.saveData.quzStartSeqLabel,
				quzCount: this.saveData.quzCount,
				selectNum: this.popups.objectiveQues.type == 1 ? this.saveData.quzOptions : 2,		//1选择  2判断
				sourcePath: filePath,
				width: submitData.width,
				height: submitData.height,
				x1: submitData.x,
				y1: submitData.y,
				minArea: this.popups.trimPreview.minArea,
				maxArea: this.popups.trimPreview.maxArea,
				sheetScaleX: 0.5, //缩放
				sheetScaleY: 0.5,
			}
			console.log(data)
			console.log(this.saveData.bizId)
			api.objectiveQuesPos(data).then(res => {
				console.log(res.data);
				if(res.data.ret == 200) {
					//
					this.saveData['quzLabels'] = [];
					this.saveData['quzIds'] = [];
					let quesNumCount = Number(this.popups.objectiveQues.quesNum);
					let startNoCount = Number(this.popups.objectiveQues.startNoIndex);
					let totalCount = quesNumCount+startNoCount;
					let selectArr = this.popups.objectiveQues.quesArr.slice(startNoCount,totalCount);
					for(var i = 0; i < selectArr.length; i++) {
						this.saveData['quzLabels'].push(selectArr[i].quzLabel);
						this.saveData['quzIds'].push(selectArr[i].quzId);	
					}
					//自增顺序
					this.saveData.bizOrder = selectArr[0].bizOrder;
					//开始题号
					this.saveData['quzStartSeqLabel'] = this.popups.objectiveQues.quesArr[Number(this.popups.objectiveQues.startNoIndex)].quzLabel;
					//开始题号下标
					this.saveData['quzStartSeqIndex'] = Number(this.popups.objectiveQues.startNoIndex);
					//类型 选择1 判断2
					this.saveData['quzObjType'] = this.popups.objectiveQues.type;
					//小框坐标
					this.saveData['groupList'] = res.data.data.groupList;
					//模块位置  回显用
					this.saveData['modulePos'] = this.popups.objectiveQues.modulePos;
					//弹框标题  回显用
					this.saveData['boxTit'] = '客观题';
					//客观题存储请求
					console.log(this.saveData)
					this.$electron.ipcRenderer.send(this.sendName, this.saveData);
//					editName = this.sendName;
					
					if(this.saveData.studentFillInfo){	//缺考标记/定位点接口返回值  不需要
						delete this.saveData.studentFillInfo;
					}
					
					//左侧树请求
					this.$electron.ipcRenderer.send('requestLeftModulesBiz', this.commonParams);
					this.leftRefreshParam.objectiveQuesConfirm = true;
					//清除框点
					this.clearCanvas();
					this.canvasRelated.currentCtx.strokeStyle = "red";
					this.canvasRelated.currentCtx.lineWidth = 1;
					$(this.canvasRelated.currentCtx.canvas).eq(0).removeClass('cropper-hidden');
					this.canvasRelated.currentCtx.strokeRect(submitData.x, submitData.y, submitData.width, submitData.height);
					
					res.data.data.groupList.forEach((e,i) => {     
						this.canvasRelated.currentCtx.fillText(e.titleNum, e.titlePosition.x, e.titlePosition.y);
						e.valueGroup.forEach((ee,ii)=>{
							this.canvasRelated.currentCtx.strokeRect(ee.x, ee.y, ee.width, ee.height);
						});
					});
				}else if(res.data.ret == 400){
//					alert(res.data.message)
					this.$parent.timingFn('warning',res.data.message);
				}
			}).catch(e => {
				
			});
			//清除导航当前选中状态
			this.navData.currentIndex = -1;
			this.popups.objectiveQues.state = false;
			//清除裁剪框
			this.clearClippingBox();
		},
		//客观题选项个数
		choiceOptionNum() {
			this.popups.objectiveQues.optionsCurrent = JSON.parse(JSON.stringify(this.popups.objectiveQues.optionsArr)).splice(0, this.popups.objectiveQues.optionNum);
//			console.log(this.popups.objectiveQues.optionsCurrent)
		},
		//客观题题目数量
		objectiveInputQuesNum(e) {
//			console.log(window)
//			window.event.cancelBubble = true;
//			 e.stopPropagation()
//			let reg = /^[1-9]{1,2}$/;
			this.popups.objectiveQues.quesNoArr = [];
			this.popups.objectiveQues.moduleName = '';
			if(this.popups.objectiveQues.quesNum > 30){
				this.popups.objectiveQues.quesNum = 30;
			}else if(this.popups.objectiveQues.quesNum < 1){
				this.popups.objectiveQues.quesNum = "";
			}
//			console.log(this.popups.objectiveQues.quesNum)
			if(this.popups.objectiveQues.startNoIndex > -1) {
				//table题号
//				console.log(this.popups.objectiveQues.startNoIndex + (this.popups.objectiveQues.quesNum - 1))
				this.popups.objectiveQues.quesNoArr = this.popups.objectiveQues.quesArr.slice(Number(this.popups.objectiveQues.startNoIndex),Number(this.popups.objectiveQues.startNoIndex) + Number(this.popups.objectiveQues.quesNum));
				console.log(this.popups.objectiveQues.quesNoArr)
				//模块名称赋值
				let totalIndex = this.popups.objectiveQues.quesArr.length - 1;
				let startIndex = Number(this.popups.objectiveQues.startNoIndex);
				let endIndex = startIndex + (this.popups.objectiveQues.quesNum - 1);
				if(endIndex > totalIndex){
					endIndex = totalIndex;
					this.popups.objectiveQues.quesNum = totalIndex - startIndex + 1;
				}
				if(this.popups.objectiveQues.quesNum < 1) {
					this.popups.objectiveQues.moduleName = '客观题';
				}else if(this.popups.objectiveQues.quesNum < 2) {
					this.popups.objectiveQues.moduleName = '客观题' + this.popups.objectiveQues.quesArr[startIndex].quzLabel;
				}else{
					this.popups.objectiveQues.moduleName = '客观题' + this.popups.objectiveQues.quesArr[startIndex].quzLabel + '~' + this.popups.objectiveQues.quesArr[endIndex].quzLabel;
				}
			}
		},
		//客观题开始题号			???????  input ————> select  需要改方法
		objectiveInputQuesStartNo() {	
//			let reg = /^[1-9]{1,3}$/;
			this.popups.objectiveQues.quesNoArr = [];
			this.popups.objectiveQues.moduleName = '';
			if(this.popups.objectiveQues.startNoIndex > -1) {
				//table题号
				this.popups.objectiveQues.quesNoArr = this.popups.objectiveQues.quesArr.slice(Number(this.popups.objectiveQues.startNoIndex),Number(this.popups.objectiveQues.startNoIndex) + Number(this.popups.objectiveQues.quesNum));
				//模块名称赋值
				let totalIndex = this.popups.objectiveQues.quesArr.length - 1;
				let startIndex = Number(this.popups.objectiveQues.startNoIndex);
				let endIndex = startIndex + (this.popups.objectiveQues.quesNum - 1);
				console.log(this.popups.objectiveQues.startNoIndex)
				console.log(endIndex)
				console.log(totalIndex)
				if(endIndex > totalIndex){
					endIndex = totalIndex;
					this.popups.objectiveQues.quesNum = totalIndex - startIndex + 1;
				}
				if(this.popups.objectiveQues.quesNum < 2) {
					this.popups.objectiveQues.moduleName = '客观题' + this.popups.objectiveQues.quesArr[startIndex].quzLabel;
				} else {
					this.popups.objectiveQues.moduleName = '客观题' + this.popups.objectiveQues.quesArr[startIndex].quzLabel + '~' + this.popups.objectiveQues.quesArr[endIndex].quzLabel;
				}
			}
		},
		//主观题框取消按钮
		subjectiveCancel() {
			//清除裁剪框
			this.clearClippingBox();
			this.popups.subjectiveQues.state = false;
		},
		//主观题框确认按钮
		subjectiveSure() {
			if(this.popups.subjectiveQues.operationState == 'new'){ //新建
				this.saveData.bizId = uuid.v1().replace(/-/g, '');
			}else{
				this.saveData.bizId = this.contextMenuMsg.bizId;
			}
			if(this.popups.subjectiveQues.type == 1){//单题
				let i = Number(this.popups.subjectiveQues.testNoIndex);
				this.saveData['quzLabels'] = [];
				this.saveData['quzIds'] = [];
				///自增顺序
//				console.log(this.popups.subjectiveQues.quesArr[i])
				this.saveData.bizOrder = this.popups.subjectiveQues.quesArr[i].bizOrder;
				//开始题号
				this.saveData['quzStartSeqLabel'] = this.popups.subjectiveQues.quesArr[i].quzLabel;
				//开始题号下标
				this.saveData['quzStartSeqIndex'] = i;
				this.saveData['quzLabels'].push(this.popups.subjectiveQues.quesArr[i].quzLabel);
				this.saveData['quzIds'].push(this.popups.subjectiveQues.quesArr[i].quzId);
				//试题数量
				this.saveData['quzCount'] = 1;
				
			}else if(this.popups.subjectiveQues.type == 2){//多题
//				this.saveData.bizOrder = this.popups.subjectiveQues.startNoIndex - 0;
				this.saveData['quzLabels'] = [];
				this.saveData['quzIds'] = [];
				let quesNumCount = Number(this.popups.subjectiveQues.quesNum);
				let startNoCount = Number(this.popups.subjectiveQues.startNoIndex);
				let totalCount = quesNumCount+startNoCount;
				let selectArr = this.popups.subjectiveQues.quesArr.slice(startNoCount,totalCount);
//				console.log(selectArr)
				for(var i = 0; i < selectArr.length; i++) {
					this.saveData['quzLabels'].push(selectArr[i].quzLabel);
					this.saveData['quzIds'].push(selectArr[i].quzId);	
				}
				//自增顺序
				this.saveData.bizOrder = selectArr[0].bizOrder;
				//开始题号
				this.saveData['quzStartSeqLabel'] = this.popups.subjectiveQues.quesArr[Number(this.popups.subjectiveQues.startNoIndex)].quzLabel;
				//开始题号下标
				this.saveData['quzStartSeqIndex'] = Number(this.popups.subjectiveQues.startNoIndex);
				//试题数量
				this.saveData['quzCount'] = this.popups.subjectiveQues.quesNum - 0;
				console.log(this.saveData)
			}
			
			//模块位置  回显用
			this.saveData['modulePos'] = this.popups.subjectiveQues.modulePos;
			//单题1 多题2  回显用
			this.saveData['modeltype'] = this.popups.subjectiveQues.type;
			
			//弹框标题  回显用
			this.saveData['boxTit'] = '主观题';
			
			//左侧树标记点名称
			this.saveData.markingModuleName = this.popups.subjectiveQues.moduleName;
			if(this.saveData.groupList){//客观题小题列表 不需要
				delete this.saveData.groupList;
			}
			if(this.saveData.quzObjType){//客观题类型（选择判断）不需要
				delete this.saveData.quzObjType;
			}
			if(this.saveData.studentFillInfo){	//缺考标记/定位点接口返回值  不需要
				delete this.saveData.studentFillInfo;
			}
			
			console.log(this.saveData)
			//清除框点
			this.clearCanvas();
			this.canvasRelated.currentCtx.strokeStyle = "red";
			this.canvasRelated.currentCtx.lineWidth = 1;
            console.log(this.saveData.pointx)
            if(this.popups.subjectiveQues.operationState == 'new'){ //新建
            	//文字回显位置
	            let textX = this.saveData.pointx + (this.saveData.width / 2);
	            let textY = this.saveData.pointy + (this.saveData.height / 2);
	            this.canvasRelated.currentCtx.fillText(this.popups.subjectiveQues.moduleName, textX, textY);
            	this.canvasRelated.currentCtx.strokeRect(this.saveData.pointx, this.saveData.pointy, this.saveData.width, this.saveData.height);
			}else{
				//文字回显位置
	            let textX = this.popups.subjectiveQues.drawX + (this.popups.subjectiveQues.drawWidth / 2);
	            let textY = this.popups.subjectiveQues.drawY + (this.popups.subjectiveQues.drawHeight / 2);
	            this.canvasRelated.currentCtx.fillText(this.popups.subjectiveQues.moduleName, textX, textY);
            	this.canvasRelated.currentCtx.strokeRect(this.popups.subjectiveQues.drawX, this.popups.subjectiveQues.drawY, this.popups.subjectiveQues.drawWidth, this.popups.subjectiveQues.drawHeight);
			}
			$(this.canvasRelated.currentCtx.canvas).eq(0).removeClass('cropper-hidden');
			
			//向主进程发送存储请求
			this.$electron.ipcRenderer.send(this.sendName, this.saveData);
			//左侧树请求
			this.$electron.ipcRenderer.send('requestLeftModulesBiz', this.commonParams);
			this.leftRefreshParam.subjectiveQuesConfirm = true;
			//清除导航当前选中状态
			this.navData.currentIndex = -1;
			this.popups.subjectiveQues.state = false;
			//清除裁剪框  
			this.clearClippingBox();
		},
		//主观题题目数量
		subjectiveInputQuesNum (){
			this.popups.subjectiveQues.moduleName = '';
			if(this.popups.subjectiveQues.quesNum > 30){
				this.popups.subjectiveQues.quesNum = 30;
			}else if(this.popups.subjectiveQues.quesNum < 1){
				this.popups.subjectiveQues.quesNum = "";
			}
			//模块名称赋值
			let totalIndex = this.popups.subjectiveQues.quesArr.length - 1;
			let startIndex = Number(this.popups.subjectiveQues.startNoIndex);
			let endIndex = startIndex + (this.popups.subjectiveQues.quesNum - 1);
			if(endIndex > totalIndex){
				endIndex = totalIndex;
				this.popups.subjectiveQues.quesNum = totalIndex - startIndex + 1;
			}
			if(this.popups.subjectiveQues.quesNum < 1) {
					this.popups.subjectiveQues.moduleName = '主观题';
			}else if(this.popups.subjectiveQues.quesNum < 2) {
				this.popups.subjectiveQues.moduleName = '主观题' + this.popups.subjectiveQues.quesArr[startIndex].quzLabel;
			}else{
				this.popups.subjectiveQues.moduleName = '主观题' + this.popups.subjectiveQues.quesArr[startIndex].quzLabel + '~' + this.popups.subjectiveQues.quesArr[endIndex].quzLabel;
			}
		},
		//主观题开始题号  
		subjectiveInputQuesStartNo() {
			this.popups.subjectiveQues.moduleName = '';
			//模块名称赋值
			let totalIndex = this.popups.subjectiveQues.quesArr.length - 1;
			let startIndex = Number(this.popups.subjectiveQues.startNoIndex);
			let endIndex = startIndex + (this.popups.subjectiveQues.quesNum - 1);
			if(endIndex > totalIndex){
				endIndex = totalIndex;
				this.popups.subjectiveQues.quesNum = totalIndex - startIndex + 1;
			}
			if(this.popups.subjectiveQues.quesNum < 2) {
				this.popups.subjectiveQues.moduleName = '主观题' + this.popups.subjectiveQues.quesArr[startIndex].quzLabel;
			} else {
				this.popups.subjectiveQues.moduleName = '主观题' + this.popups.subjectiveQues.quesArr[startIndex].quzLabel + '~' + this.popups.subjectiveQues.quesArr[endIndex].quzLabel;
			}
		},
		//主观题选择试题题号
		choiceQuesNo() {
			this.popups.subjectiveQues.moduleName = '主观题' + this.popups.subjectiveQues.quesArr[Number(this.popups.subjectiveQues.testNoIndex)].quzLabel;
		},
		//定位点/缺考标记/学生信息框取消按钮
		otherPointsCancel() {
			//清除裁剪框
			this.clearClippingBox();
			this.popups.otherPoints.state = false;
		},
		//定位点/缺考标记/学生信息框确认按钮
		otherPointsSure() {
			let submitData = null;
			console.log(this.popups.otherPoints.posData)
			if(this.popups.otherPoints.operationState == 'new'){ //新建
				this.saveData.bizId = uuid.v1().replace(/-/g, '');
//				//模块位置  回显用
				this.saveData['aliveData'] = this.popups.otherPoints.posData;
				submitData = this.popups.otherPoints.posData;
			}else{
				this.saveData.bizId = this.contextMenuMsg.bizId;
				submitData = this.popups.otherPoints.aliveData;
			}
			//自增顺序
			this.saveData.bizOrder = this.popups.otherPoints.moduleName.substring(this.popups.otherPoints.moduleName.indexOf(this.popups.otherPoints.boxTit) + this.popups.otherPoints.boxTit.length) - 0;
			//弹框标题  回显用
			this.saveData['boxTit'] = this.popups.otherPoints.boxTit;
			//模块名称  回显用
			this.saveData['modulePos'] = this.popups.otherPoints.modulePos;
			
			//考试号类型
			this.saveData['testNumberType'] = this.popups.otherPoints.testNumberType - 0;
			//学生信息
			if(this.popups.otherPoints.boxTit == '学生信息'){
				if(this.saveData.preciseInfo){	//缺考标记/定位点接口返回值  学生信息不需要
					delete this.saveData.preciseInfo;
				}
				let filePath = this.regeditParams.localPath + '\\' + this.commonParams.markingTaskId + '\\' + this.commonParams.sheetId + '\\' + 'upload\\' + this.leftData.page[this.leftData.currentPage].answerSheetImageId + '.jpg';
				
				//全/半框填涂类型testNumberType
				if(this.popups.otherPoints.testNumberType == 0 || this.popups.otherPoints.testNumberType == 1){//填涂类型
					//考试号位数
					this.saveData['testNumberNum'] = this.popups.otherPoints.testNumberNum - 0;
					//http://localhost:8088/openCV/module/getUserMsgPositionAreaMsg?sourcePath=Y://usermsg.png&x1=4&y1=4&width=334&height=231&markingTaskId=gyc&sheetId=888&userMsgCols=12
					let data = {
						markingTaskId : this.commonParams.markingTaskId,
						sheetId : this.commonParams.sheetId,
						sourcePath : filePath,
						x1 : Math.round(submitData.x),
						y1 : Math.round(submitData.y),
						width : Math.round(submitData.width),
						height : Math.round(submitData.height),
						userMsgCols : this.popups.otherPoints.testNumberNum,
						minArea: this.popups.trimPreview.minArea,
						maxArea: this.popups.trimPreview.maxArea,
					};
					api.studentInfoFill(data).then(res => {
						console.log(res)
						if(res.data.ret == 200){
							this.saveData['studentFillInfo'] = res.data.data;
							console.log(res.data.data)
							res.data.data.forEach((e,i)=>{
								e.forEach((ee,ii) => {
									this.canvasRelated.currentCtx.strokeRect(ee.x, ee.y, ee.width, ee.height);
								});
							});
							//向主进程发送存储请求
//							console.log(this.saveData)
							this.$electron.ipcRenderer.send(this.sendName, this.saveData);
							//左侧树请求
							this.$electron.ipcRenderer.send('requestLeftModulesBiz', this.commonParams);
							this.leftRefreshParam.studentInfoConfirm = true;
						}
					}).catch(e => {
	
					});
				}else{
					//考试号位数
					if(this.saveData.testNumberNum){
						delete this.saveData.testNumberNum;
					}
					//向主进程发送存储请求
					this.$electron.ipcRenderer.send(this.sendName, this.saveData);
					//左侧树请求
					this.$electron.ipcRenderer.send('requestLeftModulesBiz', this.commonParams);
					this.leftRefreshParam.studentInfoConfirm = true;
				}
			}else{
				//考试号位数框选点位置信息  定位点/缺考标记不需要
				if(this.saveData.testNumberNum){
					delete this.saveData.testNumberNum;
				}
				console.log(this.saveData)
				//向主进程发送存储请求
				this.$electron.ipcRenderer.send(this.sendName, this.saveData);
			}
			console.log(this.popups.otherPoints.testNumberType)
			console.log(this.saveData)
			//清除框点
			this.clearCanvas();
			this.canvasRelated.currentCtx.strokeStyle = "red";
			this.canvasRelated.currentCtx.lineWidth = 1;
			$(this.canvasRelated.currentCtx.canvas).eq(0).removeClass('cropper-hidden');
			if(this.popups.otherPoints.boxTit == '学生信息'){
				this.canvasRelated.currentCtx.strokeRect(submitData.x, submitData.y, submitData.width, submitData.height);
			}else{
				if(this.popups.otherPoints.operationState == 'new'){ //新建
					this.canvasRelated.currentCtx.strokeRect(this.saveData.pointx, this.saveData.pointy, this.saveData.width, this.saveData.height);
				}else{
					this.canvasRelated.currentCtx.strokeRect(this.popups.otherPoints.drawX, this.popups.otherPoints.drawY, this.popups.otherPoints.drawWidth, this.popups.otherPoints.drawHeight);
				}
			}
			//清除导航当前选中状态
			this.navData.currentIndex = -1;
			this.popups.otherPoints.state = false;
			
			//清除裁剪框
			this.clearClippingBox();
			
		},
		//页面保存按钮 保存所有数据
		saveAllData (){
			let params = JSON.parse(JSON.stringify(this.commonParams));
//			params.createBy = this.saveData.createBy;
			let _this = this;
			//new File(array, name [, options])
//			let aa = new File("http://edu.jetsen.cn:9009/1.jpg");
			
			function readFile(path,bizId){
				return new Promise((resolve,reject)=>{
					fs.stat(path, function(err, stats){
						var index = path.lastIndexOf('\\');
						var len = path.length;
						var filename = index != -1? path.substring(index+1, len):path;
	//	                var mimetype = mime.lookup(path)
//			                callback(null, {size:stats.size, name:filename, path:path, type:mimetype});
	//	                callback(null, {size:stats.size, name:filename, path:path});
						var readStream = fs.createReadStream(path);
						var blobParts;
						readStream.on('open', function(fd){
							blobParts = new Array();
							console.log("Read \'"+path+"\' open");
							console.log(blobParts)
						});
						readStream.on('data', function(data){
							var blob = new Blob([data], {type: stats.type});
							blobParts.push(blob);
							console.log(blobParts)
						});
						readStream.on('end', function(){
							console.log("Read \'"+path+"\' end");
							var file = new File(blobParts, filename);
							console.log(bizId)
							resolve({"file":file,"bizId":bizId});
							console.log(blobParts)
						});
						readStream.on('close', function(){
							console.log("Read \'"+path+"\' close");
						});
						readStream.on('error', function(err){
							console.info('[!ERR!] Read \''+path+'\' failed!');
							console.log(blobParts)
							// 读取过程中出错了，清空数据
//							blobParts.splice(0, blobParts.length);
							reject('错了');
						});
					})
				})
			}
			//absolutePath
//			let b = ["Y:\\zy\\1.jpg","Y:\\zy\\2.jpg","Y:\\zy\\3.jpg"];
			this.saveAnswerCardImg.forEach((e,i) => {
				let filePath = this.regeditParams.localPath + '\\' + e.markingTaskId + '\\' + e.sheetId + '\\' + 'upload\\' + e.bizId + '.jpg';
				console.log(filePath)
				e['filePath'] = filePath;
			});
			
			let promiseObjArr = this.saveAnswerCardImg.map((e,i) => {
				return readFile(e.filePath,e.bizId);
			});
			
		    Promise.all(promiseObjArr).then(res => {
		    	console.log(res)
		    	let formDataParam = new window.FormData();
		    	formDataParam.append('id', this.commonParams.sheetId);	
				formDataParam.append('answerSheetOriginTypeId', this.commonParams.markingTaskId);
				res.forEach(function (file) {
	                formDataParam.append('files', file.file);
	            })
				res.forEach(function (file) {
	                formDataParam.append('bizIds', file.bizId);
	            })
				console.log(typeof formDataParam.get("files"))
				$http.post('http://198.9.6.137:8080/examPaper/paperMarkingTaskScaninfo/uploadSubNavMarkingTypeImages', formDataParam,{headers:{'Content-Type':'multipart/form-data'}}).then(function (res) {				    console.log(res);
				    if(true){
				    	//向主进程发送存储请求
						params.groupQuzArray = _this.popups.objectiveQues.quesArr;
						_this.$electron.ipcRenderer.send('saveData', params);
				    }
				}).catch(function (error) {
				    console.log(error);
				});
				
			}).catch(err => {
				console.log(err)
			});
		
			
		},
		//加载框
		load (){
			this.$parent.loadingFn(true,'jjjjj');	
		setTimeout(()=>{
			this.$parent.loadingFn(false,'jjjjj');	
		},1000)
			
		},
		//拖拽
		drag (obj){
			obj.onmousedown=function (ev){
				//解决子级冒泡问题
				if(ev.target.nodeName == 'BUTTON'){
					return;
				}else if(ev.target.nodeName == 'INPUT' && ev.target.type == 'number'){
					return;
				}else if(ev.target.nodeName == 'SELECT'){
					return;
				}
				var oEvent=ev || event;
				var disY=oEvent.clientY-obj.offsetTop;
				var disX=oEvent.clientX-obj.offsetLeft;
				
				var nMaxLeft=document.documentElement.clientWidth-obj.offsetWidth;
				var nMaxTop=document.documentElement.clientHeight-obj.offsetHeight;
				
				document.onmousemove=function (ev){
					var oEvent=ev || event;
					var left=oEvent.clientX-disX;
					var top=oEvent.clientY-disY;
					if (top < 0){
						top=0;
					}else if (top > nMaxTop){
						top=nMaxTop;
					}
				
					if (left < 0){
						left=0;
					}else if (left > nMaxLeft){
						left=nMaxLeft;
					}
					obj.style.right = 'auto';
					obj.style.bottom = 'auto';
					obj.style.left=left+'px';
					obj.style.top=top+'px';
				};
				
				document.onmouseup=function (){
					document.onmousemove=null;
					document.onmouseup=null;
					
//					obj.releaseCapture && obj.releaseCapture();
				};
				
//				obj.setCapture && obj.setCapture();
				
				return false;
			};
		}
	},
	//结构加载之后
	mounted() {   
//		console.log(this.uploadData)		
//		console.log(this.uploadData.length)		
	},
	//架构加载之前
	created() {
		console.log(this.$route.query)
			console.log(fs)
		//
		//调用获取注册表信息
		this.gainRegedit().then(res => {
			//注册表信息this.regeditParams.localPath
			console.log(res)
			
		});
		//注册监听事件
		this.listener();
		//答题卡列表数据请求
		this.$electron.ipcRenderer.send('initAnswerCardList', this.commonParams);
		//左侧树数据请求
		//此处调用参数需要传递浏览器启动时传递的阅卷任务ID及答题卡ID
		this.$electron.ipcRenderer.send('requestLeftModulesBiz', this.commonParams);
		//卷面题号等信息请求
		this.$electron.ipcRenderer.send('requestQuestionsMsg', this.commonParams);
		//客观题版式数据请求
		this.$electron.ipcRenderer.send('requestObjQuzFormatSetting', this.commonParams);
		//页面数据数量
		this.$electron.ipcRenderer.send('requestMarkingModulesBiz', this.commonParams);
		//load框调用
//		this.load();

		//			console.log(Vue)
		//			console.log(this)
		//			console.log(Jcrop)
		//			console.log($)
		//			console.log(Cropper)
		//			console.log(interfaceSummary)
		//			console.log(interfaceSummary.wordData)
		//			this.decode(this.imgSrc)
	},
	computed: {
		
	},
	sockets: {

	},
	components: {
		//			SystemInformation
	},
}