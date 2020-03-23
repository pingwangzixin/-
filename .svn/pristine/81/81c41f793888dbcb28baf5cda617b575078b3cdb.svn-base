<template>
	<div class="">
		<router-link to='/programEntry'>
		    <button>返回</button>
		</router-link>
		<!--<uploader></uploader>-->
		<!--<global-uploader></global-uploader>-->
		<div class="zy_scan_wrap">
			<div class="top">
				<div class="tit">
					<!--<img src="E:/ddd/image/66.jpg"/>-->
					<b>试卷名称：</b>
					<p>拉萨快乐的精灵可撒娇的法律SD卡介绍上的发生的法接口是的撒发了</p>
				</div>
				<ul class="test_paper_msg clearfix">
					<!--<li>
						<b>试卷名称：</b>
						<p>拉萨快乐的精灵可撒娇的法律SD卡介绍上的发生的法接口是的撒发了</p>
					</li>-->
					<li>
						<b>试卷ID：</b>
						<p>20180406</p>
					</li>
					<li>
						<b>学科：</b>
						<p>英语</p>
					</li>
					<li>
						<b>考试名称：</b>
						<p>期中考试</p>
					</li>
					<li>
						<b>考试ID：</b>
						<p>20191006</p>
					</li>
				</ul>
				<ul class="operation_btn clearfix">
					<li class="fl" :class="{'active':i == navData.steps}" v-for="(item,i) in navData.list" @click="navTab(i)" :key="i">
						<span :class="{'active':item.stepState}">
							<b v-text="i + 1" v-if="true"></b>
							<i class="iconfont iconduihao" v-if="item.num"></i>
						</span>
						<p v-text="item.name"></p>
					</li>
					<!--<li class="fr" title="保存当前所有操作" @click="saveAllData()">保存 </li>-->
				</ul>
			</div>
			<div class="bottom clearfix">
				<div class="" v-show="pageTabState == 1">
					<div class="left fl">
						<div class="plus clearfix">
							<span class="fl" :class="{'active': navData.steps == 1 && discernOper.discern}" @click="startDiscern()">开始识别</span>
							<span class="fl" :class="{'active': navData.steps == 1 && discernOper.save}" @click="discernSave()">保存数据</span>
							<div class="search fr">
								<b>输入考号：</b>
								<input type="text" name="" id="" value="" v-model="keyword" @keyup="searchEnter()" />
								<button @click="search()">查询</button>
							</div>
						</div>
						<div class="screen clearfix">
							<select name="" class="fl">
								<option value="">全部数据</option>
								<option value="">正确数据</option>
								<option value="">错误数据</option>
							</select>
							<select name="" class="fl">
								<option value="">全部学生</option>
								<option value="">0406班</option>
								<option value="">2046班</option>
							</select>
							<select name="" class="fl">
								<option value="">全部状态</option>
								<option value="">缺考</option>
								<option value="">不缺考</option>
							</select>
							<!--<ul class="fl clearfix">
								<li class="fl" @click="setMissExam()">设为缺考</li>
								<li class="fl" @click="cancelMissExam()">取消缺考</li>
							</ul>-->
							
							<button class="fr" @click="deleteOptions()">删除选中项</button>
							<button class="fr" @click="cancelMissExam()">取消缺考</button>
							<button class="fr" @click="setMissExam()">设为缺考</button>
						</div>
						<div class="table_head flow-box_x">
							<table border="" cellspacing="" cellpadding="" style="" :style="{'width':334 +( 40 * tableData.headQues.length) + 'px'}">
								<thead>
									<tr>
										<th><input type="checkbox" name="" id="" value="" v-model="tableData.allChecked" @click="checkedAll()" /></th>
										<th>序号</th>
										<th>缺考状态</th>
										<th>学生考号</th>
										<th v-for="i in tableData.headQues" v-text="i">1</th>
										<!--<th width="30"><input type="checkbox" name="" id="" value="" /></th>
										<th width="40">序号</th>
										<th width="60">缺考状态</th>
										<th width="200">学生考号</th>
										<th width="20" v-for="i in 15" v-text="i">1</th>-->
									</tr>
								</thead>
								<!--<div class="table_body flow-box">-->
									<tbody class="flow-box" style="">
										<tr :class="{'active' : item.state}" v-for="(item,i) in tableData.stuList" :key="i" @click="currentTbodyTrTab(item,i)">
											<td><input type="checkbox" name="" id="" value="" :checked="item.checkedState" @click="checkedOption(i)" /></td>
											<td v-text="item.dataAssociation">1</td>
											<td>
												<span v-if="item.userAbsent">缺考</span>	
												<span v-if="!item.userAbsent">不缺考</span>	
											</td>
											<td @dblclick="modify($event,'stuId',item)">
												<input type="text" name="" id="" value="" v-model="item.userMsg" v-if="item.stuIdEdit" @blur="item.stuIdEdit = false" />
												<span v-text="item.userMsg" v-if="!item.stuIdEdit"></span>
											</td>
											<td :class="{'active':quesItem.answerStr == '' || quesItem.answerStr.length > 1}" v-for="(quesItem,quesI) in item.answerList" @dblclick="modify($event,'answer',item,quesItem)" v-if="quesItem.titleType == 0" :key="quesI">
												<input type="text" name="" id="" value="" v-model="quesItem.answerStr" v-if="quesItem.editState" @blur="quesItem.editState = false" />
												<span v-text="quesItem.answerStr" v-if="!quesItem.editState">C</span>
											</td>
										</tr>
									</tbody>
								<!--</div>-->
							</table>
						</div>
					</div>
					<div class="right fr">
						<div class="right_header clearfix">
							<ul class="page_list fr clearfix">
								<li :class="{'active' : answerCardView.currentPage == i}" v-for="(item,i) in answerCardView.list" v-text="'第' + (i + 1) + '页'" @click="answerCardtab(item,i)"></li>
							</ul>
						</div>
						<!-- 216 !! ?? -->
						<div class="view_display flow-box_x" :style="{'height':(screenHeight - 216) + 'px'}">
							<div class="" :style="{'height':(screenHeight - 225) + 'px','width':answerCardView.width}">
								<img :src="answerCardView.currentAnswerCardSrc" alt="" style="height: 812px;" />
								<!--<img :src="answerCardView.currentAnswerCardSrc" alt="" style="height: calc(100% - 20px); width: auto;" />-->
							</div>
						</div>
					</div>
				</div>
				<!--上传数据列表tab切换-->
				<div class="upload_list" v-show="pageTabState == 2">
					<div class="tit clearfix">
						<p class="fl">上传列表</p>
						<span class="fr" v-if="uploadModule.uploadAllBtn">
							全部开始：
							<i class="iconfont iconkaishi" @click="allStart()"></i>
						</span>
						<span class="fr" v-if="!uploadModule.uploadAllBtn">
							全部暂停：
							<i class="iconfont iconzantingtingzhi" @click="allPause()"></i>
						</span>
					</div>
					<uploader :options="options" :autoStart="autoStart" :file-status-text="statusText" class="uploader-example" ref="uploader" @complete="complete" @file-complete="fileComplete"  @file-added="onFileAdded" @file-progress="onFileProgress" @file-error="onFileError" @file-success="onFileSuccess">
					    <uploader-unsupport></uploader-unsupport>
					    <uploader-drop>
					      <uploader-btn>select files</uploader-btn>
					      <uploader-btn :attrs="attrs">select images</uploader-btn>
					      <uploader-btn :directory="true">select folder</uploader-btn>
					    </uploader-drop>
					    <uploader-list ref='aaaaa'></uploader-list>
				  	</uploader>
				</div>
			</div>
		</div>
		<!--上传数据弹框-->
		<div class="prompt_box public_box zy_upload_data_box" v-if="popups.uploadData.state">	
			<div class="hide"></div>
			<div class="con">
				<div class="tit">
	            	<span>上传数据</span>
				</div>
				<div class="main_cont">
					<div class="detect">
						<p>检测到已上传数据</p>
						<p>14/98</p>
						<!--<div class="speed">
			               <p ref="percent"></p>
			            </div>-->
					</div>
				</div>
				<div class="btn_group">
					<button class="sure" @click="uploadSure()">继续上传</button>
					<button class="cancel" @click="uploadCancel()">取消</button>
				</div>
			</div>
		</div>
		<!--图片扫描识别弹框-->
		<div class="prompt_box public_box zy_scan_set_box" v-if="popups.scanSet.state">	
			<div class="hide"></div>
			<div class="con">
				<div class="tit">
	            	<span>扫描识别设置</span>
				</div>
				<div class="main_cont">
					<ul>
						<li>
							<b>图片清晰度：&nbsp;&nbsp;&nbsp;</b>
							<select name="" id="" v-model="popups.scanSet.mappingType">
								<option value="1">填图模糊</option>
								<option value="2">填图一般</option>
								<option value="3">填图清晰</option>
							</select>
						</li>
						<li>
							<b>填写考号类型：</b>
							<select name="" id="" v-model="popups.scanSet.examType">
								<option value="1">条码考号</option>
								<option value="2">填涂考号</option>
							</select>
						</li>
						<li>
							<b>图片输出路径：</b>
							<input type="text" name="" id="" value="" disabled="disabled" v-model="popups.scanSet.outputLocalPath" />
							<label for="output">
								浏览
								<!--<input type="file" name="" id="output" value="" ref="up" @change="lujing()" />-->
								<input type="file" name="" id="output" value="" ref="output_path" webkitdirectory="webkitdirectory" @change="outputPath()" />
							</label>
						</li>
						<li>
							<b>图片输入路径：</b>
							<input type="text" name="" id="" value="" disabled="disabled" v-model="popups.scanSet.inputLocalPath" />
							<label for="input">
								浏览
								<input type="file" name="" id="input" value="" ref="input_path" webkitdirectory="webkitdirectory" @change="inputPath()" />
							</label>
						</li>
					</ul>
				</div>
				<div class="btn_group">
					<button class="sure" @click="scanSetSure()">确认</button>
					<button class="cancel" @click="scanSetCancel()">取消</button>
				</div>
			</div>
		</div>
		<!--学生名单弹框-->
		<div class="prompt_box public_box zy_list_box zy_name_list_box" v-if="popups.stuNameList.state">	
			<div class="hide"></div>
			<div class="con">
				<div class="tit">
	            	<span>学生名单</span>
				</div>
				<div class="main_cont">
					<ul class="clearfix">
						<li>
							<select name="">
								<option value="">显示全部学生</option>
								<option value="">0406班</option>
								<option value="">2046班</option>
							</select>
						</li>
						<li>
							<select name="">
								<option value="">全部学生</option>
								<option value="">缺考学生</option>
								<option value="">非缺考学生</option>
							</select>
						</li>
						<li><p>设为缺考</p></li>
						<li><p>取消设为缺考</p></li>
					</ul>
					<div class="table_wrap">
						<table border="" cellspacing="" cellpadding="">
							<tr>
								<th width="20"><input type="checkbox" name="" id="" value="" /></th>
								<th width="20">序号</th>
								<th width="60">姓名</th>
								<th width="110">账号</th>
								<th width="60">班级</th>
								<th width="30">缺考</th>
							</tr>
							<tr>
								<td><input type="checkbox" name="" id="" value="" /></td>
								<td>1</td>
								<td>
									张说了算
								</td>
								<td>
									J123456789159321654
								</td>
								<td>
									128班
								</td>
								<td>
									是
								</td>
								</tr>
						</table>
					</div>
				</div>
				<div class="btn_group">
					<button class="sure" @click="stuListSure()">确认</button>
					<button class="cancel" @click="stuListCancel()">取消</button>
				</div>
			</div>
		</div>
		<!--上传详情弹框-->
		<div class="prompt_box public_box zy_list_box zy_upload_detail_box" v-if="popups.uploadDetail.state">	
			<div class="hide"></div>
			<div class="con">
				<div class="tit">
	            	<span>上传详情</span>
				</div>
				<div class="main_cont">
					<ul class="clearfix">
						<li>
							<select name="">
								<option value="">显示全部学生</option>
								<option value="">0406班</option>
								<option value="">2046班</option>
							</select>
						</li>
						<li>
							<select name="">
								<option value="">全部状态</option>
								<option value="">已上传</option>
								<option value="">未上出</option>
							</select>
						</li>
					</ul>
					<div class="table_wrap">
						<table border="" cellspacing="" cellpadding="">
							<tr>
								<th width="20"><input type="checkbox" name="" id="" value="" /></th>
								<th width="20">序号</th>
								<th width="60">姓名</th>
								<th width="110">账号</th>
								<th width="60">班级</th>
								<th width="30">已上传</th>
							</tr>
							<tr class="active">
								<td><input type="checkbox" name="" id="" value="" /></td>
								<td>1</td>
								<td>
									张说了算
								</td>
								<td>
									J123456789159321654
								</td>
								<td>
									128班
								</td>
								<td>
									是
								</td>
							</tr>
							<tr>
								<td><input type="checkbox" name="" id="" value="" /></td>
								<td>1</td>
								<td>
									张说了算
								</td>
								<td>
									J123456789159321654
								</td>
								<td>
									128班
								</td>
								<td>
									是
								</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="btn_group">
					<button class="sure" @click="uploadDetailSure()">确认</button>
					<button class="cancel" @click="uploadDetailCancel()">取消</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
//引入页面js
import scan  from "../../assets/js/scan.js"

export default {
	...scan
}
</script>

<style>
.uploader-example {
	width: 1000px;
	padding: 20px;
	margin: 10px auto 0 !important;
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