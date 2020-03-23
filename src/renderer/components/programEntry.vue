<template>
	<div class="">
		<router-link to='/testList'>
		    <button>返回</button>
		</router-link>
		<div class="g_main zy_choose_wrap">
			<ul class="select_type clearfix">
				<li class="fl" @click="jumpMake()">
					<img src="../assets/img/mark.png"/>
					<!--<p>制作</p>
					<div>哦阿斯顿ois活动时间地方是否会的事</div>-->
				</li>
				<li class="fl" @click="jumpScan()">
					<img src="../assets/img/scan.png"/>
					<!--<p>扫描</p>
					<div>哦阿斯顿ois活动时间地方是否会的事</div>-->
				</li>
			</ul>
		</div>
		<div class="prompt_box public_box r_b_timing_box" v-show="popups.tipBox.state">	
	        <div class="con">
	            <div class="main_cont">
	            	<div class="title">
		                <!--<span>提示</span>-->
		                <i class="iconfont iconguanbi1" @click="popups.tipBox.state = false"></i>
		            </div>
	                <p class="count">将重置所有数据</p>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<script>
	//引入页面js
	import programEntry  from "../assets/js/programEntry.js"
	
	export default {
		...programEntry
	}
</script>

<style>
	/*body{background-color: #daf1ff;}*/
	
</style>