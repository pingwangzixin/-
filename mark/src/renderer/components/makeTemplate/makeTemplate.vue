<template>
	<div id="wrapper">
		<!--<button  @click="jjj()">走走走走</button>-->
		<!--<button @click="sureCropper()">坐标- </button> coordinateInfo:{{coordinateInfo}}-->
		<!--<button @click="sendMsg()">发给主进程</button>-->
		<!--<button @click="toto()">node/path</button>-->
		
		<!--<button @click="insert()">增加</button>-->
		<!--<button @click="update()">修改</button>-->
		<!--<button @click="remove()">删除</button>-->
		<!--<button @click="find()">查询</button>-->
		<!--<button></button>-->
		
		<router-link to='/programEntry'>
		    <button>返回</button>
		</router-link>
		
		<br />
		<div class="zy_operation_nav">
			<!--<img src="E:/ddd/image/66.jpg"/>-->
			<ul class="clearfix">
				<li class="fl" v-for="(item,index) in navData.nav" :title="item.title" :class="{'active' : index == navData.currentIndex}" @click="changeNav(index,item)" :key="index">		
					<span :class="{'active':item.stepState}">
						<b v-text="index + 1" v-if="!item.num"></b>
						<i class="iconfont iconduihao" v-if="item.num"></i>
					</span>
					<p v-text="item.name"></p>
				</li>
				<li class="fr" title="保存当前所有操作" @click="saveAllData()">保存</li>
			</ul>
		</div>
		<!--上传答题卡-->
		<div class="zy_upload_card" v-show="!navData.editState">
			<div class="top_info clearfix">
				<p class="fl">答题卡页数：<span v-text="uploadData.length"></span> 张</p>
				<p class="fr">
					请按答题卡顺序导入
					<label for="upload_file">
						本地上传
						<input type="file" name="" id="upload_file" value="" ref="upload_paper" @change="selectFile($event)" />
					</label>
				</p>
			</div>
			<div class="card_preview">
				<ul class="img_list clearfix">
					<li class="fl" v-for="(item,index) in uploadData" :key="index">
						<div class="" @click="previewShow(item.currentSheetUrl)">
						<!--<div class="" @click="previewShow(item.currentSheetUrl,item.currentSheetFilePath)">-->
							<img :src="item.currentSheetUrl"/>
							<!--<img src="http://edu.jetsen.cn:9009/1.jpg"/>-->
						</div>
						<p class="clearfix">
							第<span v-text="index - 0 + 1"></span>页
							<b class="fr" @click="deleteFile(index)">删除</b>
						</p>
					</li>
				</ul>
			</div>
			<div class="sub_operation">
				<button class="save" @click="pageListSave()">保存</button>
			</div>
		</div>
		<!--左侧树-->
		<div class="zy_operation_region clearfix" v-show="navData.editState">
			<div class="left_view flow-box fl">
				<h3></h3>
				<div class="info">
					<p>客观题版式</p>
					<div class="tip" v-if="trimPreview.tipState">请先选择客观题板式~~</div>
					<div class="data" v-if="!trimPreview.tipState" :class="{'active':trimPreview.infoState}" @click="showInfo()" @contextmenu="rightClickPoint($event,0,0,0,popups.trimPreview.bizid)">客观题版式数据</div>
				</div>
				<ul class="page_list">
					<li v-for="(item,index) in leftData.page" :class="{'active': item.show}" :key="index">
						<h3 v-text="item.name" @click="showStructure(1,index)"></h3>
						<div>
							<div class="data_list" v-for="(type,typeIndex) in item.secondLevel" :class="{'active':type.show}" :key="typeIndex">
								<h4 v-text="type.text" @click="showStructure(2,typeIndex,index)"></h4>
								<div class="spot_list">
									<div class="choice" v-if="type.value == 'objectiveQues'">
										<!--<b>设置客观题识别框</b>
										<p>
											<label for="objective_whole">
												<input type="radio" name="objective_radio" id="objective_whole" value="" />
												全封闭框 
												（例如：<i class="iconfont iconweibiaoti-4"></i>）
											</label>
											<label for="objective_half">
												<input type="radio" name="objective_radio" id="objective_half" value="" />
												半封闭框
												（例如：<i class="iconfont iconweibiaoti-3"></i>）
											</label>
										</p>-->
									</div>
									<ol>
										<li class="clearfix" v-for="(point,pointIndex) in type.pointList" :class="{'active':point.show}" @click="showStructure(3,pointIndex,typeIndex,index)" @contextmenu="rightClickPoint($event,pointIndex,type.pointList,type.value)" :key="pointIndex">
											<p :id="point.bizId" class="fl" v-text="point.name"></p>
										</li>
									</ol>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="right_view fl">
				<!--<div class="container" id="container" style="width: calc(3271px / 2); height: calc(2347px / 2)">-->
				<div class="container" id="container">
					<ul>
						<!--<li v-for="(item,index) in leftData.page" v-show="item.show">
							<img :src="item.src" alt="" style="" v-if="true" style="width: 100px;" />
							<canvas :id="item.src" ref="canvas"></canvas>
						</li>-->
						<li style="position: relative;" v-for="(item,index) in leftData.page" v-show="item.show">
							<!--<img class="aaa" :src="item.src" alt="" style="" v-if="true" style="width: 100px;" />-->
							<canvas :id="item.src" ref="canvas"></canvas>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!--<img src="C:\Users\Public\Pictures\Sample Pictures\Koala.jpg" alt="" style="width: 200px; height: 200px; display: inline-block;" />
		<!--<div styl/e="width: 1635.5px; height:1173px">-->
		
		<!--预览图-->
		<div class="prompt_box public_box zy_preview_box" v-if="popups.preview.state">	
			<div class="hide"></div>
			<div class="con">
				<div class="tit">
					<ul class="clearfix">
						<li class="fl" @click="previewRotate('left')">左旋1°</li>
						<li class="fl" @click="previewRotate('right')">右旋1°</li>
						<li class="fl" @click="previewRotate('clockwise')">顺时针90°</li>
						<li class="fl" @click="previewRotate('anti-clockwise')">逆时针90°</li>
						<li class="fl" @click="previeZoom('big')">放大</li>
						<li class="fl" @click="previeZoom('small')">缩小</li>
						<li class="fl">智能纠正</li>
					</ul>
				</div>
				<div class="main_cont">
					<img :src="popups.preview.viewSrc" ref="preview_img" />
				</div>
				<div class="btn_group">
					<button class="sure" @click="previewSure()">确认</button>
					<button class="cancel" @click="previewCancel()">取消</button>
				</div>
			</div>
		</div>
		<!--定位点/缺考标记/学生信息-->
		<div class="prompt_box public_box zy_question_box zy_other_points_box" v-if="popups.otherPoints.state">	
			<div class="hide"></div>
			<div class="con" :style="{'height':popups.otherPoints.boxTit == '学生信息' ?( popups.otherPoints.testNumberType == 2 ? '380px' :'414px') : '260px'}">
				<div class="tit">
	            	<span v-text="popups.otherPoints.boxTit"></span>
				</div>
				<div class="main_cont">
					<ul>
						<li>
							<b>模块编号：</b>
							<span>0406</span>
						</li>
						<li>
							<b>模块位置：</b>
							<span v-text="popups.otherPoints.modulePos"></span>
						</li>
						<li>
							<b>模块名称：</b>
							<input type="text" name="" id="" value="" v-model="popups.otherPoints.moduleName" disabled="disabled" />
						</li>
						<li v-if="popups.otherPoints.boxTit == '学生信息'">
							<b>选择考试号类型：</b>
							<p>
								<label for="stu_info_whole">
									<input type="radio" name="stu_info_test_number" id="stu_info_whole" v-model="popups.otherPoints.testNumberType" value="0" />
									全封闭填涂框 
									（例如：<i class="iconfont iconweibiaoti-4"></i>）
								</label>
								<label for="stu_info_half">
									<input type="radio" name="stu_info_test_number" id="stu_info_half" v-model="popups.otherPoints.testNumberType" value="1" />
									半封闭填涂框
									（例如：<i class="iconfont iconweibiaoti-3"></i>）
								</label>
								<label for="stu_info_code">
									<input type="radio" name="stu_info_test_number" id="stu_info_code" v-model="popups.otherPoints.testNumberType" value="2" />
									二维码/条形码
								</label>
							</p>
						</li>
						<li v-if="popups.otherPoints.boxTit == '学生信息' && (popups.otherPoints.testNumberType == 0 || popups.otherPoints.testNumberType == 1)">
							<b>考试号位数：</b>
							<select name="" id="" v-model="popups.otherPoints.testNumberNum">
								<option :value="item" v-for="(item,i) in popups.otherPoints.testNumberNumArr" v-text="item"></option>
							</select>
						</li>
					</ul>
				</div>
				<div class="btn_group">
					<button class="sure" @click="otherPointsSure()">确认</button>
					<button class="cancel" @click="otherPointsCancel()">取消</button>
				</div>
			</div>
		</div>
		<!--主观题-->
		<div class="prompt_box public_box zy_question_box zy_subjective_box" v-if="popups.subjectiveQues.state">	
			<div class="hide"></div>
			<div class="con" :style="{'height':popups.subjectiveQues.type == 1 ? '332px' : '370px'}">
				<div class="tit">
	            	<span>主观题</span>
				</div>
				<div class="main_cont">
					<ul>
						<li>
							<b>模块编号：</b>
							<span>0406</span>
						</li>
						<li>
							<b>模块位置：</b>
							<span v-text="popups.subjectiveQues.modulePos"></span>
						</li>
						<li>
							<b>模块名称：</b>
							<input type="text" name="" id="" value="" v-model="popups.subjectiveQues.moduleName" disabled="disabled" />
						</li>
						<li>
							<b>选择类型：</b>
							<select name="" id="" v-model="popups.subjectiveQues.type">
								<option value="1">单一题目</option>
								<option value="2">多题目</option>
							</select>
						</li>
						<li v-if="popups.subjectiveQues.type == 1">
							<b>试题题号：</b>
							<select name="" id="" v-model="popups.subjectiveQues.testNoIndex" @change="choiceQuesNo()">
                            <!--<option v-for="" v-bind:value="" v-text="" :key=""></option>-->
                           		<option :value="i" v-for="(item,i) in popups.subjectiveQues.quesArr" v-text="item.quzLabel"></option>
							</select>
						</li>
						<li v-if="popups.subjectiveQues.type == 2">
							<b>题目数量：</b>
							<input type="number" name="" id="" value="" v-model="popups.subjectiveQues.quesNum" maxlength="2" @input="subjectiveInputQuesNum()" />
						</li>
						<li v-if="popups.subjectiveQues.type == 2">
							<b>开始题号：</b>
							<select name="" id="" v-model="popups.subjectiveQues.startNoIndex" @change="subjectiveInputQuesStartNo()">
								<!--<option :value="i" v-for="(item,i) in popups.subjectiveQues.quesArr" v-text="i + 1"></option>-->
								<option :value="i" v-for="(item,i) in popups.subjectiveQues.quesArr" v-text="item.quzLabel"></option>
								<!--<option :value="i" v-for="i in 30" v-text="i"></option>-->
							</select>
						</li>
					</ul>
				</div>
				<div class="btn_group">
					<button class="sure" @click="subjectiveSure()">确认</button>
					<button class="cancel" @click="subjectiveCancel()">取消</button>
				</div>
			</div>
		</div>
		<!--客观题-->
		<div class="prompt_box public_box zy_question_box zy_objective_box" v-if="popups.objectiveQues.state">	
			<div class="hide"></div>
			<div class="con">
				<div class="tit">
	            	<span>客观题</span>
				</div>
				<div class="main_cont clearfix">
					<ul class="fl">
						<li>
							<b>模块编号：</b>
							<span>0406</span>
						</li>
						<li>
							<b>模块位置：</b>
							<span v-text="popups.objectiveQues.modulePos"></span>
						</li>
						<li>
							<b>模块名称：</b>
							<input type="text" name="" id="" value="客观题" v-model="popups.objectiveQues.moduleName" disabled="disabled" />
						</li>
						<li>
							<b>题目数量：</b>
							<input type="number" name="" id="" value="" v-model="popups.objectiveQues.quesNum" maxlength="2" @input="objectiveInputQuesNum($event)" />
						</li>
						<li  v-if="popups.objectiveQues.type == 1">
							<b>选项个数：</b>
							<select name="" id="" v-model="popups.objectiveQues.optionNum" @change="choiceOptionNum()">
								<option value="4">4</option>
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
							</select>
						</li>
						<li>
							<b>开始题号：</b>
							<select name="" id="" v-model="popups.objectiveQues.startNoIndex" @change="objectiveInputQuesStartNo()">
								<option :value="i" v-for="(item,i) in popups.objectiveQues.quesArr" v-text="item.quzLabel"></option>
							</select>
						</li>
					</ul>
					<ul class="fr">
						<li>
							<b>选择类型：</b>
							<select name="" id="" v-model="popups.objectiveQues.type">
								<option value="1">选择题</option>
								<option value="2">判断题</option>
							</select>
						</li>
						<li>
							<b>选项字符：</b>
							<!--选择题-->
							<div class="flow-box" v-if="popups.objectiveQues.type == 1">
								<table border="" cellspacing="" cellpadding="">
									<tr>
										<th width="40"></th>
										<th>选项</th>
									</tr>
									<tr v-for="(option,optionIndex) in popups.objectiveQues.optionsCurrent" :key="optionIndex">
										<td v-text="optionIndex - 0 + 1">1</td>
										<td v-text="option"></td>
									</tr>
								</table>
							</div>
							<!--判断题-->
							<div class="flow-box" v-if="popups.objectiveQues.type == 2">
								<table border="" cellspacing="" cellpadding="">
									<tr>
										<th width="40"></th>
										<th>选项</th>
									</tr>
									<tr>
										<td>1</td>
										<td>T</td>
									</tr>
									<tr>
										<td>2</td>
										<td>F</td>
									</tr>
								</table>
							</div>
						</li>
						<li>
							<input type="checkbox" name="" id="chooseQue" value="" v-model="popups.objectiveQues.chooseQues" /><label for="chooseQue">本题不是选做题</label>
						</li>
						<li>
							<div class="flow-box">
								<table border="" cellspacing="" cellpadding="">
									<tr>
										<th width="40"></th>
										<th>题号</th>
									</tr>
									<tr v-for="(quesNo,quesNoIndex) in popups.objectiveQues.quesNoArr" :key="quesNoIndex">
										<td v-text="quesNoIndex - 0 + 1"></td>
										<td v-text="quesNo.quzLabel"></td>
									</tr>
								</table>
							</div>
						</li>
					</ul>
				</div>
				<div class="btn_group">
					<button class="sure" @click="objectiveSure()">确认</button>
					<button class="cancel" @click="objectiveCancel()">取消</button>
				</div>
			</div>
		</div>
		<!--客观题版式弹框-->
		<div class="prompt_box public_box zy_question_box zy_trim_preview_box" :class="{'active': !popups.trimPreview.state}">	
			<div class="hide"></div>
			<div class="con">
				<div class="tit">
	            	<span>客观题版式</span>
				</div>
				<div class="main_cont clearfix">
					<div class="left fl">
						<div class="preview_wrap">
							<div class="preview_bg">
								<div class="preview_auto" >
									<div class="img-preview" style="width: 100px; height: 100px;" v-if="!popups.trimPreview.imgState"></div>
									<div class="img_real_box">
										<div class="preview_border preview_min" :style="{width:popups.trimPreview.borderMinWidth,height:popups.trimPreview.borderMinHeight,top:popups.trimPreview.borderMinTop,left:popups.trimPreview.borderMinLeft}"></div>
										<div class="preview_border preview_max" :style="{width:popups.trimPreview.borderMaxWidth,height:popups.trimPreview.borderMaxHeight,top:popups.trimPreview.borderMaxTop,left:popups.trimPreview.borderMaxLeft}"></div>
										<div class="preview_border preview_init" :style="{width:popups.trimPreview.borderInitWidth,height:popups.trimPreview.borderInitHeight,top:popups.trimPreview.borderInitTop,left:popups.trimPreview.borderInitLeft}"></div>
										<img :src="popups.trimPreview.imgSrc" class="img_real" alt="" v-if="popups.trimPreview.imgState" />
										<!--<img :src="popups.trimPreview.imgSrc" class="img_real" alt="" v-if="popups.trimPreview.imgState || popups.trimPreview.operationState == 'edit'" />-->
									</div>
									
								</div>
							</div>
						</div>
						<ul>
							<li>
								<b>X：</b>
								<span v-text="popups.trimPreview.x"></span>
								<strong>PX</strong>
							</li>
							<li>
								<b>Y：</b>
								<span v-text="popups.trimPreview.y"></span>
								<strong>PX</strong>
							</li>
							<li>
								<b>WIDTH：</b>
								<span v-text="popups.trimPreview.width"></span>
								<strong>PX</strong>
							</li>
							<li>
								<b>HEIGHT：</b>
								<span v-text="popups.trimPreview.height"></span>
								<strong>PX</strong>
							</li>
						</ul>
						<div class="choice">
							<b>设置客观题识别框类型：</b>
							<p>
								<label for="position_whole">
									<input type="radio" name="distinguish_type" id="position_whole" v-model="popups.trimPreview.frameType" value="0" />
									全封闭框 
									（例如：<i class="iconfont iconweibiaoti-4"></i>）
								</label>
								<label for="position_half">
									<input type="radio" name="distinguish_type" id="position_half" v-model="popups.trimPreview.frameType" value="1" />
									半封闭框
									（例如：<i class="iconfont iconweibiaoti-3"></i>）
								</label>
							</p>
						</div>
						<div class="choice">
							<b>设置客观题排列类型：</b>
							<p>
								<label for="position_transverse">
									<input type="radio" name="order_type" id="position_transverse" v-model="popups.trimPreview.arrayType" value="0" />
									横排 
								</label>
								<label for="position_vertical">
									<input type="radio" name="order_type" id="position_vertical" v-model="popups.trimPreview.arrayType" value="1" />
									竖排
								</label>
							</p>
						</div>
						<div class="obtain">
							<button @click="positionDistinguish()">识别</button>
						</div>
					</div>
					<ul class="fr">
						<li class="initial_set">
							<b>初始：</b>
							<div>
								<b>宽：</b>
								<input type="number" name="" id="" value="" v-model="popups.trimPreview.initWidth" disabled="disabled" />
								<b>高：</b>
								<input type="number" name="" id="" value="" v-model="popups.trimPreview.initHeight" disabled="disabled" />
								<b>面积：</b>
								<input type="number" name="" id="" value="" v-model="popups.trimPreview.initArea" disabled="disabled" />
							</div>
							<div>
								<b>边框：</b>
								<span></span>
							</div>
						</li>
						<li class="maximum_set">
							<b>最大：</b>
							<div>
								<b>宽：</b>
								<input type="number" name="" id="" value="" v-model="popups.trimPreview.maxWidth" @input="inputPosition('maxWidth')" disabled="disabled" />
								<b>高：</b>
								<input type="number" name="" id="" value="" v-model="popups.trimPreview.maxHeight" @input="inputPosition('maxHeight')" disabled="disabled" />
								<b>面积：</b>
								<input type="number" name="" id="" value="" v-model="popups.trimPreview.maxArea" disabled="disabled" />
							</div>
							<div>
								<b>边框：</b>
								<span></span>
							</div>
						</li>
						<li class="minimum_set">
							<b>最小：</b>
							<div>
								<b>宽：</b>
								<input type="number" name="" id="" value="" v-model="popups.trimPreview.minWidth" @input="inputPosition()" disabled="disabled" />
								<b>高：</b>
								<input type="number" name="" id="" value="" v-model="popups.trimPreview.minHeight" @input="inputPosition()" disabled="disabled" />
								<b>面积：</b>
								<input type="number" name="" id="" value="" v-model="popups.trimPreview.minArea" disabled="disabled" />
							</div>
							<div>
								<b>边框：</b>
								<span></span>
							</div>
						</li>
						
						
					</ul>
				</div>
				<div class="btn_group">
					<button class="sure" @click="trimPreviewSure()">确认</button>
					<button class="cancel" @click="trimPreviewCancel()">取消</button>
				</div>
			</div>
		</div>
		
		<!--<div class="img-preview" style="position: absolute; top: 0; left: 0; width: 200px; height: 200px; border: 1px solid red; overflow: hidden;">
			
		</div>-->
		
	</div>
</template>


<script>
//	import $ from 'jquery'
//	import { wordRelevant } from "@/api";
//	import SystemInformation from './LandingPage/SystemInformation'
	
//	import Vue from 'vue'
//	import { Jcrop } from 'vue-jcrop'
//	Vue.component('Jcrop', Jcrop)
	
	//接口
//	import {interfaceSummary} from '../api/index.js'

//引入页面js
import makeTemplate  from "../../assets/js/makeTemplate.js"

export default {
	...makeTemplate
}
	
</script>

<style>
	/*@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');*/
	

    /*img {
      max-width: 100%;
    }*/
   
    /*body{background-color: #f1f2f3;}*/
    .cropper-point.point-se {
	    height: 5px !important;
	    width: 5px !important;
	}
</style>