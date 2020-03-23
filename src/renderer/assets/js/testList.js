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
//接口汇总
import { api } from '@/api'

export default {
	name: 'testList',
	data() {
		return {
			commonParams: { //常用id
				sheetId: remote.process.argv[0],
				markingTaskId: remote.process.argv[1]
			},
			listData : {
				grade : [],   //年级列表
				gradeChecked : 0,  //年级列表默认选中项
				detailList : []		//列表数据
			}
		}
	},
	//函数
	methods: {
		//进入下级页面
		enter (item){
//			this.$router.push({name:'home',query: {id:'1'}})
			this.$router.push({path:'/header/programEntry',query: {sheetId:item.id,markingTaskId:item.answerSheetId}});
//			this.$router.push({path:'/header/makeTemplate',query: {sheetId:'1',markingTaskId:'2'}});
//			this.$router.push({path:'/header/scan',query: {sheetId:'1',markingTaskId:'2'}});
		},
		//导航年级切换
		tabGrade (index){
			this.listData.gradeChecked = index;
			this.getMarkingList(index);
			
		},
		//获取年级列表数据
		getGradeData (){
			api.getGradeData({ levelId: "level_2" }).then(res => {
				if(res.data.ret == 200){
					console.log(res.data.data)
					this.listData.grade = res.data.data.list;
					this.tabGrade(4);
				}
			}).catch(e => {

			});
		},
		//获取年级阅卷数据列表
		getMarkingList (index){
			//{pageSize: 10, termId: "", pageNo: 1}
			let data = {
				pageSize: 10,
                termId: this.listData.grade[index].id,
                pageNo: 1,
			};
			console.log(data)
			api.getMarkingList(data).then(res => {
				console.log(res)
				if(res.data.ret == 200){
					console.log(res.data.data.list)
					this.listData.detailList = res.data.data.list;
				}
			}).catch(e => {

			});
		}
	},
	//结构加载之后
	mounted() {
		
	},
	//架构加载之前
	created() {
		//获取年级列表
		this.getGradeData();
		
	},
	computed: {

	},
	sockets: {

	},
	components: {
		//		globalUploader
	},
}