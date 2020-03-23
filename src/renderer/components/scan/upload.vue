<template>
	<div class="g_main upload_wrap">
		<router-link to="{path:'/header/scan'}">
		    <button>返回</button>
		</router-link>
		
		<router-link to="{name:'scan'}">
		    <button>返回2</button>
		</router-link>
		<span @click="back()">返回</span>
		<br />
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button @click="aaa()">点击</button>
		<br />
		<br />
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button @click="bbb()">点击</button>
		<br />
		<input type="file" name="" id="upload_file" value="" ref="upload_paper" @change="selectFile($event)" />
		<button @click="sendFn()">發送請求</button>

		{{autoStart}}
		<uploader :options="options" :autoStart="autoStart" :file-status-text="statusText" class="uploader-example" ref="uploader" @complete="complete" @file-complete="fileComplete"  @file-added="onFileAdded" @file-progress="onFileProgress" @file-error="onFileError" @file-success="onFileSuccess">
		    <uploader-unsupport></uploader-unsupport>
		    <uploader-drop>
		      <p>上传列表</p>
		      <uploader-btn>select files</uploader-btn>
		      <uploader-btn :attrs="attrs">select images</uploader-btn>
		      <uploader-btn :directory="true">select folder</uploader-btn>
		    </uploader-drop>
		    <uploader-list ref='aaaaa'></uploader-list>
	  	</uploader>
			
			
			
				
	</div>
</template>

<script>
//引入页面js
import upload  from "../../assets/js/upload.js"

export default {
	...upload
}
</script>

<style>
.uploader-example {
	width: 1000px;
	padding: 20px;
	margin: 40px auto 0;
	font-size: 12px;
	box-shadow: 0 0 10px rgba(0, 0, 0, .4);
	background: #fff;
}

.uploader-example .uploader-btn {
	margin-right: 4px;
}

.uploader-example .uploader-list {
	max-height: 650px;
	overflow: auto;
	overflow-x: hidden;
	overflow-y: auto;
}
.uploader-drop{
	padding: 16px !important;
}
.uploader-drop p{font-size: 14px;}
/*@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');*/
</style>