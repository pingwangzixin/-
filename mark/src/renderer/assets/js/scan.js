import $ from 'jquery'

import Vue from 'vue'
import uploader from 'vue-simple-uploader'
import axios from 'axios'
import qs from 'qs'
import SparkMD5 from 'spark-md5'
//import App from './App.vue'

//import aaa from '@/renderer/components/assembly/aaa'
//import globalUploader from '../../components/assembly/globalUploader'
//console.log(globalUploader)

//node模块
var http = require('http');
var path = require('path');
var fs = require('fs');
var glob = require('glob');
const $http = axios;

const remote = require('electron').remote;

//接口汇总
import { api } from '@/api'
//console.log(glob)
//console.log(fs.mkdir)
var localPath = 'E:/ddd/image';
/*fs.mkdir(localPath, function(exists) {
//	console.log(exists)
	if(!exists) {
		fs.mkdir(localPath, function(err) {
			console.log(err)
			if(err) {
				console.log(err);
			} else {
				console.log('creat done!');
			}
			console.log('creat done!');
		});
	}
});*/

let updataImg = (url, name) => {
	//先访问图片
	http.get(url, (res) => {
		//用来存储图片二进制编码
		let imgData = '';
		//设置图片编码格式
		res.setEncoding("binary");
		//检测请求的数据
		res.on('data', (chunk) => {
			imgData += chunk;
		});
		//请求完成执行的回调
		res.on('end', () => {
			console.log(res)
			// 通过文件流操作保存图片
			//          fs.writeFile(localPath + '/'+name+'.jpg', imgData, 'binary', (error) => {
			fs.writeFile(localPath + `/${name}.jpg`, imgData, 'binary', (error) => {
				//          	console.log(imgData)
				console.log(error)
				if(error) {
					console.log('下载失败');
				} else {
					console.log('下载成功！')
				}
			});
		});
	})
}

//updataImg('http://edu.jetsen.cn:9009/1.jpg','11');

glob.sync(localPath + '/*.jpg*').forEach(function(entry) {
	//console.log(entry);
	var basename = path.basename(entry)
	console.log(basename)
	//alert(basename);
	if(/(jpg)$/.test(basename)) {
		//console.log("需要上传的文件:\n" + entry + "\n")
	}
})
var data = "你说说说说说说说大大大大大大的";


//console.log('1');
//fs.writeFile(localPath + '/mydata.txt', data, {encoding:'utf8'}, function(err){
/*fs.writeFile('./mydata.txt', data, {encoding:'utf8'}, function(err){
    console.log('2');
    if(!err){
        console.log("写入成功");
    }
});*/


/*alert(remote.process.argv[0])
alert(remote.process.argv[1])
alert(remote.process.argv[2])
alert(remote.process.argv.length)*/
console.log(remote.process.argv);
/*const aa = remote.getGlobal('kkk').prop1;
console.log(aa);*/
console.log(window.innerHeight)
export default {
	name: 'scan',
	data() {
		return {
			commonParams: { //常用id
				sheetId: remote.process.argv[0],
				markingTaskId: remote.process.argv[1]
			},
			options: {
				//https://www.jqhtml.com/20595.html
				//https://segmentfault.com/a/1190000020052336
				//https://github.com/viyog/viboot-front/blob/master/src/components/HelloWorld.vue
				// https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
				target: 'http://198.9.6.137:8080/examPaper/boot/uploader/chunk',
				testChunks: true,   //是否开启服务器分片校验
				fileParameterName: "file",//默认的文件参数名
				maxChunkRetries: 3,  //最大自动失败重试上传次数
				simultaneousUploads: 5,
				initialPaused :true,
				chunkSize: 10 * 1024 * 1024,
//			    categaryMap: { //用于限制上传的类型
//			          image: ["zip", "jpg", "jpeg", "png", "rar"]
//			    },
//				// 服务器分片校验，断点续传基础
				checkChunkUploadedByResponse: function(chunk, message) {
				    let objMessage = JSON.parse(message);
		            let chunkNumbers = objMessage.uploaded;
					if (objMessage.skipUpload) {
					      return true;
					}
		            return (chunkNumbers || []).indexOf(chunk.offset + 1) >= 0;
					// fake response
					// objMessage.uploaded_chunks = [2, 3, 4, 5, 6, 8, 10, 11, 12, 13, 17, 20, 21]
					// check the chunk is uploaded
				},
				parseTimeRemaining: function(timeRemaining, parsedTimeRemaining) {
					return parsedTimeRemaining
						.replace(/\syears?/, '年')
						.replace(/\days?/, '天')
						.replace(/\shours?/, '小时')
						.replace(/\sminutes?/, '分钟')
						.replace(/\sseconds?/, '秒')
				},
			},
			autoStart:false,
			statusText: {
				success: '上传成功',
				error: '上传失败',
				uploading: '正在上传',
				paused: '暂停',
				waiting: '等待'
			},
			attrs: {
				accept: {
					image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],
					video: ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'],
					audio: ['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'],
					document: ['doc', 'txt', 'docx', 'pages', 'epub', 'pdf', 'numbers', 'csv', 'xls', 'xlsx', 'keynote', 'ppt', 'pptx']
				}
			},
//			outputPath : this.$route.query.outputPath,	//输出路径
			
			uploadModule : {
				uploadAllBtn : true,  //上传列表全部开始/暂停
				updateUploadList : false  //更新上传列表
			},
			screenHeight: window.innerHeight, //屏幕高度
			pageTabState : 1,  //页面tab切换  1学生列表  2上传列表
			keyword : '',	//搜索查询
			discernOper : {//识别
				discern : false,	//开始识别
				save : false		//保存数据
			},
			navData : {
				list : [
					{name:'图片扫描识别设置',title:'',stepState:false},
					{name:'开始识别',title:'',stepState:false},
					{name:'上传数据',title:'',stepState:false},
					{name:'上传详情',title:'',stepState:false}
				],
				steps : -1
			},
			popups: { //弹窗类
				scanSet: { //扫描识别框
					state : false, //展示状态
					examType : 1, //考号类型  1条码考号   2填涂考号
					mappingType : 1, //填图类型  1填图模糊   2填图一般   3填图清晰
					outputLocalPath : '',	//输出路径
					inputLocalPath : ''	//输入路径
				},
				uploadData: { //上传数据
					state: false
				},
				stuNameList: { //学生名单
					state: false,
				},
				uploadDetail: { //上传详情
					state: false
				}
			},
			readPath : '',		//上传数据读取本地路径
			answerCardView: {//答题卡视图列表
				currentpge : 0,
				list : [],
				width : 0,
				height : 0,
				currentAnswerCardSrc : '', //当前展示答题卡
			},
			tableData : {
				allChecked : false,
				headQues : [1,2,3,4,5,6,7,8,9,10],		//表格头部题号
				stuList : [],
				stuListKeyword: [{
					stuId: 'G123456987456321759',
					userAbsent : true,
					stuIdEdit:false,
					state : false,
					checkedState : false,
					testImglist : [
						'Y:\\zy\\3.jpg',
						'Y:\\zy\\1.jpg'
					],
					testList: []
				}]
			},
		}
	},
	//函数
	methods: {
		//
		liebiao (){
			
		},
		listener() {
			//监听存储数据全局监听事件
			this.$electron.ipcRenderer.on('returnMsgListener2',(event,data)=>{
//				console.log(data);
				data = JSON.parse(data);
				let _this = this;
				console.log(data)
				
				switch (data.type){
					case 'reponseMarkingModulesSettingBiz':  //学生列表数据
						let formDataParam = new window.FormData();
				    	formDataParam.append('sourcePath', data.data.sourcePath);
				    	formDataParam.append('targetPath', data.data.targetPath);
				    	formDataParam.append('markingTaskId', data.data.markingTaskId);
				    	formDataParam.append('fuzzyCoefficient', data.data.fuzzyCoefficient);
				    	formDataParam.append('arrayType', data.data.arrayType);
				    	formDataParam.append('dataJson', data.data.dataJson);
				    	//
						this.$parent.loadingFn(true,'数据识别中...');	
//						

						api.stuListData(formDataParam).then(res => {
							console.log(res);
							if(res.data.ret == 200){
								console.log(res.data.data)
								_this.tableData.stuListKeyword = res.data.data;
								_this.tableData.stuList = _this.tableData.stuListKeyword;
								//答案字符串
								_this.tableData.stuList.forEach((e,i) => {
									e.answerList.forEach((listE,listI) => {
										if(listE.titleType == 0){
											listE.answerStr = '';
											listE.answer.forEach((ansE,ansI) => {
												listE.answerStr += ansE;
											});
										}
									});
								});
								//表头题号
								_this.tableData.headQues = [];
								res.data.data[0].answerList.forEach((e,i) => {
									if(e.titleType == 0){
										_this.tableData.headQues.push(e.titleNum);
									}
								});
//								_this.tableData.headQues = ;
								console.log(_this.tableData.headQues)
								console.log(_this.tableData.stuListKeyword)
								_this.$parent.loadingFn(false);	
							}else{
								_this.$parent.loadingFn(false,'数据识别中...');	
								alert(res.data.data)
							}
						}).catch(e => {
							 console.log(e);
						});
						/*$http.post('http://192.168.9.62:8088/openCV/Card/scanCards',formDataParam,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then(function (res) {
							console.log(res);
							if(res.data.ret == 200){
								console.log(res.data.data)
								_this.tableData.stuListKeyword = res.data.data;
								_this.tableData.stuList = _this.tableData.stuListKeyword;
								//答案字符串
								_this.tableData.stuList.forEach((e,i) => {
									e.answerList.forEach((listE,listI) => {
										if(listE.titleType == 0){
											listE.answerStr = '';
											listE.answer.forEach((ansE,ansI) => {
												listE.answerStr += ansE;
											});
										}
									});
								});
								//表头题号
								_this.tableData.headQues = [];
								res.data.data[0].answerList.forEach((e,i) => {
									if(e.titleType == 0){
										_this.tableData.headQues.push(e.titleNum);
									}
								});
//								_this.tableData.headQues = ;
								console.log(_this.tableData.headQues)
								console.log(_this.tableData.stuListKeyword)
								_this.$parent.loadingFn(false);	
							}else{
								_this.$parent.loadingFn(false,'数据识别中...');	
								alert(res.data.data)
							}
						}).catch(function (error) {
						    console.log(error);
						});*/
						break;
					case 'reponseScanMemberMarkingData':
						console.log(data)
						break;
					default:
						break;
				}
				
				
				
			});		
			
		},
		//设为缺考
		setMissExam (){
			if(this.tableData.allChecked){
				this.tableData.stuList.forEach((e,i) => {
					e.userAbsent = true;
				});
//				this.tableData.allChecked = false;
			}else{
				this.tableData.stuList.forEach((e,i) => {
					if(e.checkedState){
						e.userAbsent = true;
					}
				});
			}
		},
		//取消缺考
		cancelMissExam (){
			if(this.tableData.allChecked){
				this.tableData.stuList.forEach((e,i) => {
					e.userAbsent = false;
				});
//				this.tableData.allChecked = false;
			}else{
				this.tableData.stuList.forEach((e,i) => {
					if(e.checkedState){
						e.userAbsent = false;
					}
				});
			}
		},
		//搜索查询
		search (){
			if(this.keyword){
				this.tableData.stuList = this.tableData.stuListKeyword.filter((item) => {
					console.log(item);
					return item.userMsg.includes(this.keyword);
				});
			}else{
				this.tableData.stuList = this.tableData.stuListKeyword;
			}
		},
		//搜索查询回车
		searchEnter (){
			if (event.keyCode == 13) {
		        this.search();
		    }
		},
		//删除选中项
		deleteOptions (){
			if(this.tableData.allChecked){
				this.tableData.stuList = [];
				this.tableData.stuListKeyword = [];
				this.tableData.allChecked = false;
			}else{
				let newArr = this.tableData.stuList.filter((e,i) => {
					return e.checkedState == false;
				});
				this.tableData.stuList = newArr;
				this.tableData.stuListKeyword = newArr;
				console.log(newArr)
			}
			console.log(this.tableData.stuList)
			console.log(this.tableData.stuListKeyword)
		},
		//学生信息列表全选
		checkedAll (){
			this.tableData.allChecked = !this.tableData.allChecked;
			this.tableData.stuList.forEach((e,i) => {
				e.checkedState = this.tableData.allChecked;
			});
		},
		//学生信息列表多选
		checkedOption (i){
			this.tableData.stuList[i].checkedState = !this.tableData.stuList[i].checkedState;
			this.tableData.allChecked = this.tableData.stuList.every((e,i) =>{
				return this.tableData.stuList[i].checkedState == true;
			});
		},
		//学生考号/答案修改
		modify (event,type,item,quesItem){
//			console.log(event.target)
//			console.log(event.currentTarget.firstElementChild)
			let target = event.currentTarget;
			//type(学籍号/答案)  
			if(type == 'stuId'){	//学籍号
				item.stuIdEdit = true;
				console.log(event.currentTarget)
				setTimeout(()=>{
					target.querySelector('input').focus();
				});
			}else if(type == 'answer'){		//答案
				quesItem.editState = true;
				setTimeout(()=>{
					target.querySelector('input').focus();
				});
			}
		},
		//表格当前选中行切换
		currentTbodyTrTab (item,i){
//			
			console.log(item)
			this.answerCardView.list = item.imgArr;
			console.log(this.answerCardView.list[0])
//			http://localhost:8081/openCV/Card/getImgMsg?path=Y://titleNum.jpg
			api.viewImgData({path:this.answerCardView.list[0]}).then(res => {
				console.log(res)
				if(res.data.ret == 200){
					console.log(res.data.data)
					let scale = res.data.data.width / res.data.data.height;
					this.answerCardView.width = 812 * scale + 'px';
				}
			}).catch(e => {

			});
			this.answerCardView.currentAnswerCardSrc = this.answerCardView.list[0];
			this.answerCardView.currentPage = 0;
			this.tableData.stuList.forEach ((ele,index) => {
				ele.state = false;
				if(index == i){
					ele.state = true;
				}
			});
		},
		//切换答题卡页面
		answerCardtab (item,i){
			console.log(item)
			this.answerCardView.currentPage = i;
			this.answerCardView.currentAnswerCardSrc = item;
		},
		//导航切换
		navTab (i){
			console.log(this.navData.list)
			if(i == 0){
				this.ggg = false;
				this.pageTabState = 1;
				this.navData.steps = i;
				this.popups.scanSet.state = true;
			}else{
				if(this.navData.list[0].stepState == false){
					alert('请先选择输出/输入路径');
					return false;
				}
				if(i > 1){
					if(this.navData.list[1].stepState == false || this.discernOper.discern || this.discernOper.save){
						alert('请识别并保存数据');
						return false;
					}
				}
				this.navData.steps = i;
				switch (i){
					case 1://开始识别
						this.pageTabState = 1;
						break;
					case 2://上传数据
						this.pageTabState = 2;
						console.log(this.uploadModule.updateUploadList)
						console.log(this.readPath)
						if(this.uploadModule.updateUploadList){
							this.getFile();
							this.uploadModule.updateUploadList = false;
						}
						this.ggg = false;
						break;
					case 3://上传详情
						this.ggg = false;
						this.popups.uploadDetail.state = true;
						break;
					default:
						break;
				}
			}
			
		},
		//@change="selectFile($event)"
		//输出路径
		outputPath() {
			let file = this.$refs.output_path.files;
			this.popups.scanSet.outputLocalPath = file[0].path;
		},
		//输入路径
		inputPath() {
			let file = this.$refs.input_path.files;
			this.popups.scanSet.inputLocalPath = file[0].path;
		},
		//图片扫描识别设置--确认按钮
		scanSetSure() {
			this.popups.scanSet.state = false;
			if(this.popups.scanSet.inputLocalPath && this.popups.scanSet.outputLocalPath){
				this.navData.list[0].stepState = true;
				this.navData.list[1].stepState = false;
				this.discernOper.discern = true;
			}
		},
		//图片扫描识别设置--取消按钮
		scanSetCancel() {
			this.popups.scanSet.state = false;
		},
		//开始识别（识别）
		startDiscern() {
			if(this.discernOper.discern && this.navData.steps == 1){
				//请求数据
				let queryParam = {};
				queryParam.markingTaskId = this.commonParams.markingTaskId;
				queryParam.sheetId = this.commonParams.sheetId;
				queryParam.sourcePath = this.popups.scanSet.inputLocalPath;
				queryParam.targetPath = this.popups.scanSet.outputLocalPath;
				//开始识别请求
				this.$electron.ipcRenderer.send('requestMarkingModulesSettingBiz', queryParam);
				this.discernOper.discern = false;
				this.discernOper.save = true;
			}
		},
		//保存数据（识别）
		discernSave (){
			if(this.discernOper.save && this.navData.steps == 1){
				alert('请确保数据正确，保存后不可修改');
				this.discernOper.save = false;
				this.discernOper.discern = false;
				this.navData.list[1].stepState = true;
				let params = {
					sheetId : this.commonParams.sheetId,
					markingTaskId : this.commonParams.markingTaskId,
					stuList : this.tableData.stuList
				};
				//保存数据请求
				this.$electron.ipcRenderer.send('requestSaveData', params);
				console.log(this.tableData.stuList)
				let formData = new window.FormData();
				let dataList = [];
				this.tableData.stuList.forEach((e,i) => {
					let data = {
						dataAssociation : e.dataAssociation,
						userMsg : e.userMsg,
						path : e.answerList[0].subjectiveParentPath,
						msg : []
					};
					e.answerList.forEach((listE,listI) => {
						let ques = {
							titleNum : listE.titleNum,
							type : listE.titleType
						};
						if(listE.answerStr != undefined){
							ques.answer = listE.answerStr
						}else{
							ques.answer = listE.titleNum + '.jpg'
						}
						data.msg.push(ques);
					});
					dataList.push(data)
				});
				console.log(dataList)
				
				formData.append('dataJson', JSON.stringify(dataList));
				api.submitData(formData).then(res => {
					console.log(formData)
					console.log(res)
					if(res.data.ret == 200){
						console.log(res.data.data)
						this.readPath = res.data.data[0].path;
						this.uploadModule.updateUploadList = true;
						console.log(this.uploadModule.updateUploadList)
						console.log(this.readPath)
					}
				}).catch(e => {
	
				});
			}
		},
		//上传数据
		uploadData(event) {
			console.log(this.popups.scanSet.outputLocalPath)
			/*if(this.popups.scanSet.outputLocalPath == ''){
				alert('请选择输出路径');
			}else{*/
				this.steps = 3;
	//			this.popups.uploadData.state = true;
				this.$router.push({
	                path : '/header/upload',
	                query : {
	                	outputPath : this.popups.scanSet.outputLocalPath	//输出路径
	                }
	           	});
//			}
		},
		//上传列表全部开始
		allStart (){
			this.$refs.uploader.uploader.resume();
			this.uploadModule.uploadAllBtn = false;
		},
		//上传列表全部暂停
		allPause (){
			this.$refs.uploader.uploader.upload();
			this.uploadModule.uploadAllBtn = true;
		},
		//上传数据--确认按钮
		uploadSure() {
			this.popups.uploadData.state = false;
		},
		//上传数据--取消按钮
		uploadCancel() {
			this.popups.uploadData.state = false;
		},
		//上传详情--确认按钮
		uploadDetailSure() {
			this.popups.uploadDetail.state = false;
		},
		//上传详情--取消按钮
		uploadDetailCancel() {
			this.popups.uploadDetail.state = false;
		},
		//保存页面数据
		saveAllData (){
			
		},
		
		
		//读取本地文件
		readFile(path){
			return new Promise((resolve,reject)=>{
				fs.stat(path, function(err, stats){
					var index = path.lastIndexOf('\\');
					var len = path.length;
					var filename = index != -1? path.substring(index+1, len):path;
					var readStream = fs.createReadStream(path);
					var blobParts;
					readStream.on('open', function(fd){
						blobParts = new Array();
//						console.log("Read \'"+path+"\' open");
//							console.log(blobParts)
					});
					readStream.on('data', function(data){
						var blob = new Blob([data], {type: stats.type});
						blobParts.push(blob);
//							console.log(blobParts)
					});
					readStream.on('end', function(){
//						console.log("Read \'"+path+"\' end");
						var file = new File(blobParts, filename);
						resolve({"file":file});
//							console.log(blobParts)
					});
					readStream.on('close', function(){
//						console.log("Read \'"+path+"\' close");
					});
					readStream.on('error', function(err){
//						console.info('[!ERR!] Read \''+path+'\' failed!');
//							console.log(blobParts)
						// 读取过程中出错了，清空数据
//							blobParts.splice(0, blobParts.length);
						reject('错了');
					});
				});
			});
		},
			
		selectFile() {
			let _this = this;
			let file = this.$refs.upload_paper.files[0];
			console.log(file);
//			let formData = new window.FormData();
//			formData.append('files', file);
//			var reader = new FileReader();
//			reader.readAsDataURL(file);
//			console.log(formData.get("files"))
//			reader.onload = function(e) {
//				
//			}
		},	
		//测试开始暂停
		bbb(){
			this.$refs.uploader.uploader.resume();
//	    	this.$refs.uploader.uploader.upload();
		},
		//获取本地文件夹下zip文件
		getFile(){
			let _this = this;
			//this.$refs.uploader.uploader.resume();
//			let filePath = "Y:\\zy\\1.jpg";
//			let promiseFile = this.readFile(filePath);
//		    let LocalPath = "Y:\mwbb";
//		    let LocalPath = this.outputPath;
//		    let LocalPath = this.popups.scanSet.outputLocalPath;
		    let LocalPath = this.readPath;
		    //读取文件夹下所有文件
		    // (/  \  \\)
			fs.readdir(LocalPath,function (err,files) {
				files.forEach((e,i) => {
//					console.log(LocalPath + '\\' + e);
					if(/(zip)$/.test(e)) {
						console.log(e+"=============="+i)
						_this.readFile(LocalPath + '\\' + e).then(file => {
							_this.$refs.uploader.uploader.addFile(file.file);
						});
					}
					
				});
			});
			/*glob.sync(LocalPath + '/*.zip*').forEach(function(entry) {
				var basename = path.basename(entry)
			});*/
		   /* promiseFile.then(file=>{
		    	console.log(file.file)
		    	//根据设置的输出目录， 用fs模块，获取下面的所有文件
		    	//循环获取File数组
//		    	调用this.$refs.uploader.uploader.addFile(file.file)，添加到列表
//		    	this.$refs.uploader.uploader.resume();
		    	this.$refs.uploader.uploader.addFile(file.file)
		    }).catch(err => {
				console.log(err)
			});*/
		},
		onFileAdded(file) {
//	        console.log(file)
//	        console.log(this.$refs.uploader.uploader);
//	    	this.$refs.uploader.uploader.resume();
//	    	this.$refs.uploader.uploader.upload();
	    	this.computeMD5(file);
	    },
	    computeMD5(file) {
//	     	console.log('onFileAdded computeMD5：'+file);
	     	
	     	let fileReader = new FileReader();
    		let time = new Date().getTime();
    		let md5 = '';
 
    		fileReader.readAsArrayBuffer(file.file);
 
		    fileReader.onload = (e => {
		        if (file.size != e.target.result.byteLength) {
		            this.error('Browser reported success but could not read the file until the end.');
		            return
		        }
		        md5 = SparkMD5.ArrayBuffer.hash(e.target.result);
		        // 添加额外的参数
		        this.$refs.uploader.uploader.opts.query = {
		        	markingTaskId:this.commonParams.markingTaskId,
		            ...this.params
		        }
		        console.log("=======>2342342342342======>"+JSON.stringify(this.$refs.uploader.uploader.opts.query))
//		        console.log(`MD5计算完毕：${file.id} ${file.name} MD5：${md5} 用时：${new Date().getTime() - time} ms`);
		        file.uniqueIdentifier = md5;
		    });
 
		    fileReader.onerror = function () {
		        this.error('FileReader onerror was triggered, maybe the browser aborted due to high memory usage.');
		    };
	    },
	    onFileProgress(rootFile, file, chunk) {
	   		console.log( `上传中 ${file.name}，chunk：${chunk.startByte / 1024 / 1024} ~ ${chunk.endByte / 1024 / 1024}` )
   		},
		// 上传完成
		complete() {
			console.log('complete=========>', arguments)
		},
		onFileError(rootFile, file, response, chunk) {
			console.log('onFileError=========>', response)
		},
		onFileSuccess(rootFile, file, response, chunk) {
			console.log('onFileSuccess=========>', response)
			 let res = JSON.parse(response);
			 console.log(res);
		},
		// 一个根文件（文件夹）成功上传完成。
		fileComplete() {
			let _this = this;
			console.log('file complete==========>', arguments)
			const file = arguments[0].file;
			axios.post('http://198.9.6.137:8080/examPaper/boot/uploader/mergeFile', qs.stringify({
				filename: file.name,
				identifier: arguments[0].uniqueIdentifier,
				totalSize: file.size,
				markingTaskId:this.commonParams.markingTaskId,
				type: file.type
			})).then(function(response) {
//				console.log(file)   
//				console.log(_this.$refs.aaaaa.$children);
				console.log(response.data);
				if(response.data.ret!=200){
					_this.$refs.aaaaa.$children.forEach((item)=>{
						if(item.file.name == file.name){
							let innerHtmlMsg = item.$el.innerHTML;
//							console.log(innerHtmlMsg)
							let data = response.data.data;
							console.log(data);
							data = JSON.parse(data);
							console.log(data);
							let errorMsg = data[0].errorMsg;
							innerHtmlMsg = innerHtmlMsg.replace('<span style="">上传成功</span>','<span style="color:red" title="'+errorMsg+'">'+errorMsg+'</span>');
							item.$el.innerHTML = innerHtmlMsg; 
						} 
					})
				}
			}).catch(function(error) {
				_this.$refs.aaaaa.$children.forEach((item)=>{
					if(item.file.name == file.name){
						let innerHtmlMsg = item.$el.innerHTML;
//						let outeHtmlMsg = item.$el.outerHTML;
						innerHtmlMsg = innerHtmlMsg.replace('上传成功','<font color=red>文件上传失败</font>');
//						outeHtmlMsg = outeHtmlMsg.replace('status="success"','status="error"');
						item.$el.innerHTML = innerHtmlMsg;
//						item.$el.outerHTML = outeHtmlMsg; 
//						item.$el.innerText='';
					}
				})
				console.log(error);
			});
		},
	},
	//结构加载之后
	mounted() {
		console.log(fs)
		console.log($('.top').outerHeight())
	},
	//架构加载之前
	created() {
//		this.tableData.stuList = this.tableData.stuListKeyword;
		//注册监听事件
		this.listener();
		//请求数据
//		this.$electron.ipcRenderer.send('requestMarkingModulesSettingBiz', this.commonParams);
		//upload
		this.$nextTick(() => {
			window.uploader = this.$refs.uploader.uploader
		});
	},
	computed: {

	},
	sockets: {

	},
	components: {
		//		globalUploader
	},
}