import $ from 'jquery'

//import Vue from 'vue'
//import uploader from 'vue-simple-uploader'
//import axios from 'axios'
//import qs from 'qs'
//import SparkMD5 from 'spark-md5'
//import App from './App.vue'

//import aaa from '@/renderer/components/assembly/aaa'
//import globalUploader from '../../components/assembly/globalUploader'
//console.log(globalUploader)

//node模块
//var http = require('http');
//var path = require('path');
//var fs = require('fs');
//var glob = require('glob');
//console.log(glob)
//console.log(fs.mkdir)
const remote = require('electron').remote;

export default {
	name: 'testList',
	data() {
		return {
			commonParams: { //常用id
				sheetId: remote.process.argv[0],
				markingTaskId: remote.process.argv[1]
			}
		}
	},
	//函数
	methods: {
		enter (){
//			this.$router.push({name:'home',query: {id:'1'}})
			this.$router.push({path:'/header/programEntry',query: {sheetId:this.commonParams.sheetId,markingTaskId:this.commonParams.markingTaskId}});
//			this.$router.push({path:'/header/makeTemplate',query: {sheetId:'1',markingTaskId:'2'}});
//			this.$router.push({path:'/header/scan',query: {sheetId:'1',markingTaskId:'2'}});
		}
	},
	//结构加载之后
	mounted() {

	},
	//架构加载之前
	created() {

	},
	computed: {

	},
	sockets: {

	},
	components: {
		//		globalUploader
	},
}