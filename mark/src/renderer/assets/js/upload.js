import $ from 'jquery'

import Vue from 'vue'
import uploader from 'vue-simple-uploader'
import axios from 'axios'
import qs from 'qs'
import SparkMD5 from 'spark-md5'

const $http = axios;

const remote = require('electron').remote;

//node模块
var http = require('http');
var path = require('path');
var fs = require('fs');
var glob = require('glob');
//console.log(glob)
//console.log(fs.mkdir)

export default {
	name: 'upload',
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
			outputPath : this.$route.query.outputPath	//输出路径
		}
	},
	//函数
	methods: {
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
		bbb(){
			this.$refs.uploader.uploader.resume();
//	    	this.$refs.uploader.uploader.upload();
		},
		aaa(){
			let _this = this;
			//this.$refs.uploader.uploader.resume();
//			let filePath = "Y:\\zy\\1.jpg";
//			let promiseFile = this.readFile(filePath);
//		    let LocalPath = "Y:\mwbb";
		    let LocalPath = this.outputPath;
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
						innerHtmlMsg = innerHtmlMsg.replace('上传成功','<font color=red>文件上传合并失败</font>');
//						outeHtmlMsg = outeHtmlMsg.replace('status="success"','status="error"');
						item.$el.innerHTML = innerHtmlMsg;
//						item.$el.outerHTML = outeHtmlMsg; 
//						item.$el.innerText='';
					}
				})
				console.log(error);
			});
		},
		sendFn (){
		
			//请求
			this.$electron.ipcRenderer.send('requestMarkingModulesSettingBiz', this.commonParams);
		},
		recive (){
			this.$electron.ipcRenderer.on('returnMsgListener',(event,data)=>{
				console.log(data);
				data = JSON.parse(data);
				let formDataParam = new window.FormData();
		    	formDataParam.append('sourcePath', data.data.sourcePath);
		    	formDataParam.append('targetPath', data.data.targetPath);
		    	formDataParam.append('markingTaskId', data.data.markingTaskId);
		    	formDataParam.append('fuzzyCoefficient', data.data.fuzzyCoefficient);
		    	formDataParam.append('arrayType', data.data.arrayType);
		    	formDataParam.append('dataJson', data.data.dataJson);
				$http.post('http://192.168.9.62:8080/openCV/Card/scanCards',formDataParam,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then(function (res) {
					console.log(res);
				}).catch(function (error) {
				    console.log(error);
				});
				
			});			
		},
		//返回上一步
		back (){
			this.$router.push({
                path : '/header/scan',
                /*query : {
                	outputPath : this.popups.scanSet.outputLocalPath	//输出路径
                }*/
           	});
		}
	},
	//结构加载之后
	mounted() {
		
	},
	//架构加载之前
	created() {
		console.log(this.$route.query.outputPath);
		this.aaa();
		this.$nextTick(() => {
			window.uploader = this.$refs.uploader.uploader
		});
		this.recive();
		
	},
	computed: {

	},
	sockets: {

	},
	components: {
		//		globalUploader
	},
}