<template>
	<div class="g_main zy_test_list">
		<div class="tit_box">
			<ul class="clearfix">
				<li :class="{active : index == listData.gradeChecked}" v-for="(item,index) in listData.grade" v-text="item.gradeName" @click="tabGrade(index)" @key="index"></li>
			</ul>
		</div>
		<div class="list_box">
			<ul class="column">
				<li class="clearfix" v-for="(item,index) in listData.detailList" @key="index">
					<div class="left fl">
						<div class="title">
							<span>语</span>
							<p v-text="item.paperMarkingName"></p>
						</div>
						<div class="details">
							<span v-text="item.createBy"></span>
							<span v-text="item.createDate"></span>
							<span v-text="item.paperSubjectHeader"></span>
							<span v-text="item.paperSubjectDealer"></span>
						</div>
						<div class="state">
							<ul class="clearfix">
								<li class="fl active">
									<i class="border1"></i>
									<i class="border2"></i>
									<i class="border3"></i>
									<p>制作答题卡</p>
								</li>
								<li class="fl">
									<i class="border1"></i>
									<i class="border2"></i>
									<i class="border3"></i>
									<p>框选锚点信息</p>
								</li>
								<li class="fl">
									<i class="border1"></i>
									<i class="border2"></i>
									<i class="border3"></i>
									<p>配置与扫描</p>
								</li>
								<li class="fl">
									<i class="border1"></i>
									<i class="border2"></i>
									<i class="border3"></i>
									<p>阅卷阶段</p>
								</li>
								<li class="fl">
									<i class="border1"></i>
									<i class="border2"></i>
									<i class="border3"></i>
									<p>合成成绩</p>
								</li>
							</ul>
						</div>
					</div>
					<div class="right fr">
						<span @click="enter(item)">进入</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	//引入页面js
	import testList from "../assets/js/testList.js"
	
	export default {
		...testList
	}
</script>

<style scoped>
	
</style>