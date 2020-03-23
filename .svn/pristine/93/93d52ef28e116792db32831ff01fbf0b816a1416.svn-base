import $ from 'jquery'

//import Vue from 'vue'
//import uploader from 'vue-simple-uploader'
//import axios from 'axios'
//import qs from 'qs'

import Axios from 'axios';
const $http = Axios;

//node模块
var http = require('http');
var path = require('path');
var fs = require('fs');
var glob = require('glob');
var regedit = require('regedit');
const remote = require('electron').remote;
const { EJSON } = require('bson');

export default {
	name: 'programEntry',
	data() {
		return {
			commonParams: { //常用id
				sheetId: remote.process.argv[0],
				markingTaskId: remote.process.argv[1]
			},
			regeditParams : {	//注册表参数
				localPath : ''		//用户安装目录
			},
			popups: { //弹窗类
				tipBox : {	//提示框
					state : true
				}
			}
		}
	},
	//函数
	methods: {
		//
		aaa (){
			/*this.$router.push({
				name: "makeTemplate"
			});*/
			this.$router.push({
                path : '/header',
                query : {}
           	});
		},
		//跳转制作
		jumpMake (){
			/*this.$router.push({
				name: "makeTemplate"
			});*/
			this.$router.push({
                path : '/header/makeTemplate',
                query : {}
           	});
		},
		//跳转扫描
		jumpScan (){
			this.$router.push({
                path : '/header/scan',
                query : {}
           	});
		},
		//监听
		listener() {
			this.$electron.ipcRenderer.on('returnMsgListener', (event, data) => {
				data = JSON.parse(data);
				switch (data.type){
					case 'reponsePullOutData':	//同步页面数据
						if(data.ret == 200){
							this.$parent.loadingFn(false);	
							console.log(data.data)
						}
						break;
					default:
						break;
				}
			});
		},
		//获取注册表信息
		gainRegedit (){
			return new Promise((resolve,reject)=>{
				let _this = this;
				console.log(regedit);
				//HKEY_CLASSES_ROOT\marking_install_path
				regedit.list(['HKCR\\marking_install_path'],function(err, result) {
	//				var a = result['HKCR\\marking_install_path'].values['marking_install_path'].value;
					console.log(result);
					console.log(err);
					_this.regeditParams.localPath = result['HKCR\\marking_install_path'].values['marking_install_path'].value;
					console.log('注册表信息'+_this.regeditParams.localPath)
					
					resolve(_this.regeditParams.localPath);
				});	
			});
			
			/*regedit.list(['HKCR\\marking_install_path']).on('data', function(entry) {
			    console.log(entry.key)
			    console.log(entry.data)
			})*/
		},
		//创建目录
		/*createDirectory(path){
			
			console.log('创建目录'+path)
//			var localPath = 'E:/ddd/image';
//			var localPath = this.regeditParams.localPath;
//			console.log(localPath)
			fs.mkdir(path, function(exists) {
				console.log('111111'+exists)
				if(!exists) {
					fs.mkdir(path, function(err) {
						console.log('22222'+err);
						if(err) {
							console.log('3333'+err)
						} else {
							console.log('creat done!');
						}
						console.log('creat done!');
					});
				}
			});

		},*/
		createDirectory(firstLevel,secondLevel,thirdLevel){
			console.log('创建目录'+firstLevel)
			console.log('创建目录'+secondLevel)
			console.log('创建目录'+thirdLevel)
			if (!fs.existsSync(thirdLevel)) {
				if (!fs.existsSync(secondLevel)) {
					if (!fs.existsSync(firstLevel)) {
						fs.mkdir(firstLevel, function(err1) {
							if(err1) {
								console.log('firstLevel'+err1+"path="+firstLevel)
							}else{
								fs.mkdir(secondLevel, function(err2) {
									if(err2) {
										console.log('secondLevel'+err2+"path="+secondLevel);
									} else {
										console.log('creat done secondLevel!'+"path="+secondLevel);
										fs.mkdir(thirdLevel, function(err3) {
											if(err3) {
												console.log('thirdLevel'+err3+"path="+thirdLevel);
											}else{
												console.log('creat done thirdLevel!'+"path="+thirdLevel);
											}
										})
									}
								})
							}
						})
					}else{
						fs.mkdir(secondLevel, function(err2) {
							if(err2) {
								console.log('secondLevel'+err2+"path="+secondLevel);
							} else {
								console.log('creat done secondLevel!'+"path="+secondLevel);
								fs.mkdir(thirdLevel, function(err3) {
									if(err3) {
										console.log('thirdLevel'+err3+"path="+thirdLevel);
									}else{
										console.log('creat done thirdLevel!'+"path="+thirdLevel);
									}
								})
							}
						})
					}
				}else{
					fs.mkdir(thirdLevel, function(err3) {
						if(err3) {
							console.log('thirdLevel'+err3+"path="+thirdLevel);
						}else{
							console.log('creat done thirdLevel!'+"path="+thirdLevel);
						}
					})
				}
			}
		},
		//下载更新答题卡图片
		updataImg(localPath, url, name){
			return new Promise((resolve,reject)=>{
				console.log(localPath)
	//			let updataImg = (url, name) => {
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
	//			          	console.log(imgData)
								if(error) {
									console.log('下载失败');
								} else {
									console.log('下载成功！')
									resolve('chenggong');
								}
							});
						});
					})
	//			}
			});
		},
		//获取数据
		pullOutData(){
			let _this = this;
			console.log(this.commonParams.markingTaskId)
			console.log(this.commonParams.sheetId)
			$http.get('http://198.9.6.137:8080/examPaper/paperMarkingTaskScaninfo/findNavMarkingTypeNedbsAndNavMarkingTypeImages', {
				params : {
					markingTaskId : this.commonParams.markingTaskId,
					sheetId : this.commonParams.sheetId
				}
			}).then(function (res) {
				if(res.data.ret == 200){
					console.log(_this)
					console.log(_this.regeditParams.localPath)
					console.log(res.data.data);
					if(res.data.data.imageNameList){//编辑
						let downloadimgArr = res.data.data.imageNameList.map((e,i) => {
							let localPath = _this.regeditParams.localPath + '\\' + _this.commonParams.markingTaskId + '\\' + _this.commonParams.sheetId + '\\upload';
							
							let imgUrl = 'http://198.9.6.137:8080\\examPaper\\f\\' + _this.commonParams.markingTaskId + '\\' + _this.commonParams.sheetId + '\\' + e;
							
							let name = e.substring(0,e.indexOf('.jpg'));
							
							return _this.updataImg(localPath,imgUrl,name);
						});
						Promise.all(downloadimgArr).then(successs => {
							console.log(successs)
							let navmarkingtypedata = EJSON.parse(res.data.data.navmarkingtypedata, { relaxed: true})
							let answersheetimagedata = EJSON.parse(res.data.data.answersheetimagedata, { relaxed: true})
							
							let requestParam = {};
							requestParam.markingTaskId = _this.commonParams.markingTaskId;
							requestParam.sheetId = _this.commonParams.sheetId;
							requestParam.navmarkingtypedata = navmarkingtypedata;
							requestParam.answersheetimagedata = answersheetimagedata;
							console.log("=====================================================>"+requestParam)
							_this.$electron.ipcRenderer.send('requestPullOutData', requestParam);
						});
					}else{//新建
						_this.$parent.loadingFn(false,'');	
					}
					
				}
			}).catch(function (error) {
			    console.log(error);
			});
		},
		
		//加载框
		load (){
			this.$parent.loadingFn(true,'数据加载中...');	    
			/*setTimeout(()=>{
				this.$parent.loadingFn(false,'jjjjj');	
			},1000)*/
		},
		//确认/取消框
		confirm (){
			let _this = this;
			this.$parent.confirmFn('按时肯德基刻录机',function (state){
				if(state == 'sure'){	
					_this.$parent.timingFn('success','3');
				}
			});
		},
	},
	//结构加载之后
	mounted() {
		//确认框
//		this.confirm();
	},
	//架构加载之前
	created() {
		console.log('架构加载之前'+remote.process.argv)
		//调用获取注册表信息
		this.gainRegedit().then(res => {
			//注册表信息this.regeditParams.localPath
			console.log(this.commonParams.markingTaskId)
			console.log(res)
			console.log(res + '\\' + this.commonParams.markingTaskId + '\\' + this.commonParams.sheetId + '\\upload')
			let catalog = res + '\\' + this.commonParams.markingTaskId + '\\' + this.commonParams.sheetId + '\\upload';
			
		
			console.log("catalog:==========================>"+catalog)
			let firstLevel = res + '\\' + this.commonParams.markingTaskId + '\\';
			let secondLevel = res + '\\' + this.commonParams.markingTaskId + '\\' + this.commonParams.sheetId + '\\';
			let thirdLevel =catalog;
			if(res){
				//创建本地目录
				this.createDirectory(firstLevel,secondLevel,thirdLevel);
				//获取页面数据
				this.pullOutData();
			}
		});
		//调用页面监听
		this.listener();
		//load框调用
		this.load();
		
	},
	computed: {

	},
	sockets: {

	},
	components: {
		//		globalUploader
	},
}