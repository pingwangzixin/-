<template>
	<div class="zy_header_page">
		<div class="header">
			<div class="g_main clearfix">
				<div class="left fl">
					<img class="logo" src="../assets/img/logo.png"/>
				</div>
				<div class="right fr">
					<div class="user_state fl">
						<span>赵艳同学</span>
						<i>[已登录]</i>
					</div>
				</div>
			</div>
			<ul class="window_set clearfix fr">
				<li class="fl" @click="min()">
					<i class="iconfont iconzuixiaohua1"></i>
				</li>
				<li class="fl" @click="max()">
					<i class="iconfont iconzuidahua1"></i>
				</li>
				<li class="fl" @click="closed()">
					<i class="iconfont iconguanbi"></i>
				</li>
			</ul>
		</div>
		<!--视图-->
		<router-view></router-view>
		<!--prompt_box public_box : 公共类名 禁止删除-->
	    <!--等待遮罩-->
	    <div class="prompt_box public_box waiting_box" v-show="promptData.loadingBox.load">	
	        <div class="hide"></div>
	        <div class="con">
	            <div class="main_cont">
	                <img src="../assets/img/loading.gif"/>
	                <p v-text="promptData.loadingBox.tipWord"></p>
	            </div>
	        </div>
	    </div>
	    
	    <!--确认删除框-->
	    <div class="prompt_box public_box confirm_box j_confirm_box" v-show="promptData.confirmBox.open">	
	        <div class="hide"></div>
	        <div class="con">
	            <div class="tit">
	                <span>提示</span>
	            </div>
	            <div class="main_cont">
	                <i class="iconfont iconjinggao1 warning"></i>
	                <!--<p>{{promptData.confirmBox.tipWord}}</p>-->
	                <p v-html="promptData.confirmBox.tipWord"></p>
	            </div>
	            <div class="btn_group">
	                <button class="sure">确认</button>
	                <button class="cancel">取消</button>
	            </div>
	        </div>
	    </div>
	    
	    <!--定时提示框-->
	    <div class="prompt_box public_box timing_box" v-show="promptData.timingBox.open">	
	        <div class="hide"></div>
	        <div class="con">
	            <div class="main_cont">
	                <i class="iconfont iconduihao2 success" v-show="promptData.timingBox.type == 'success'"></i>
	                <i class="iconfont iconjinggao1 warning" v-show="promptData.timingBox.type == 'warning'"></i>
	                <i class="iconfont iconcuowu fail" v-show="promptData.timingBox.type == 'fail'"></i>
	                <p>{{promptData.timingBox.tipWord}}</p>
	            </div>
	        </div>
	    </div>
	    
	    <!--进度提示框-->
	    <div class="prompt_box public_box speed_progress_box" v-show="promptData.speedProgressBox.open">	
	        <div class="hide"></div>
	        <div class="con">
	            <div class="speed">
	               <p ref="percent"></p>
	            </div>
	            <p>{{promptData.speedProgressBox.percent}}%</p>
	        </div>
	    </div>
	</div>
</template>

<script>
	import $ from 'jquery'
	export default {
		name : 'customHead',
		data (){
			return {
				//弹框类数据
	    		promptData : {
	    			//定时提示框
					timingBox : {
						open : false,
						type : '',
						tipWord : ''
					},
					//确认框
					confirmBox : {
						open : false,
						tipWord : '',
						callBack : null
					},
					//等待加载框
					loadingBox : {
						load : false,
						tipWord : ''
					},
					//进度提示框
					speedProgressBox : {
						open:false,
						percent:0
					}
	            }
			}
		},
		methods : {
			/*
		     * 提示框1.5ms
		     * @param  {string} type  提示图片  success/fail/warning
			 * @param  {string} tipWord 提示框文字
			 */
	    	timingFn (type,tipWord){
				this.promptData.timingBox.open = true;
				this.promptData.timingBox.type = type;
				this.promptData.timingBox.tipWord = tipWord;
				let _this = this;
				setTimeout(function (){
					_this.promptData.timingBox.open = false;
				},1500);
			},
			/* 
		     * 确认框
		     * @param  {string} tipWord 提示框文字
		     * @param  {function}  callback  回调函数
		     */
		    confirmFn (tipWord,callback){
		    	console.log(tipWord)
		    	console.log(callback)
				this.promptData.confirmBox.open = true;
				this.promptData.confirmBox.tipWord = tipWord;
				let _this = this;
				$('.j_confirm_box .btn_group button').off('click').on('click',function(){
		            _this.promptData.confirmBox.open = false;
					callback($(this).attr('class'));
		        });
		    },
		   	/* 
		     * 加载框
		     * @param  {boolean}  load  成功/失败 true/false
		     * @param  {string}  tipWord  提示文字
		     */
		    loadingFn (load,tipWord){
				this.promptData.loadingBox.load = load;
				this.promptData.loadingBox.tipWord = tipWord;
			},
			/* 
		     * 进度框
		     * @percent  {number}  percent  进度(%)
		     * @speed  {number}  speed  速度/时间(ms)
		     */
			speedProgressFn(percent,speed){
				this.promptData.speedProgressBox.open = true;
				let period = speed ||  20;
				if(percent == 100){
					let progress  = setInterval(() => {
						this.promptData.speedProgressBox.percent += 1;
						this.$refs.percent.style.width = this.promptData.speedProgressBox.percent + "%";
						if(this.promptData.speedProgressBox.percent >= 99){
							clearInterval(progress);
							setTimeout(() => {
								this.promptData.speedProgressBox.open = false;
							}, 500);
						}
					}, period);
				}else{
					this.promptData.speedProgressBox.percent = percent;
					let progress  = setInterval(() => {
						this.promptData.speedProgressBox.percent += 1;
						this.$refs.percent.style.width = this.promptData.speedProgressBox.percent + "%";
						if(this.promptData.speedProgressBox.percent >= 99){
							clearInterval(progress)
						}
					}, period);
				}
				
			},
			min (){
				this.$electron.ipcRenderer.send('window-min',()=>{
					
				});
			},
			max (){
				this.$electron.ipcRenderer.send('window-max',()=>{
					
				});
			},
			closed (){
				this.$electron.ipcRenderer.send('window-closed',()=>{
					
				});
			}
		}
	}
</script>

<style scoped>
	/*.zy_header{}
	.zy_header>div{}
	.zy_header>div ul{}
	.zy_header>div ul li{margin: 0 10px;}*/
	.zy_header_page{}
	.zy_header_page .header{position: relative; height: 46px; background: #fff; box-shadow: 0 0px 10px 0px #8487a4;}
	.zy_header_page .header .g_main{padding: 0; margin-top: 0;}
	.zy_header_page .header .window_set{position: absolute; top: -1px; right: 0; background: #fff; border: 1px solid #ddd; border-bottom-left-radius: 5px;}
	.zy_header_page .header .window_set li{margin: 2px 6px; cursor: pointer;}
	.zy_header_page .header .window_set li:hover i{box-shadow: 0 0 6px 2px #5093e1;}
	.zy_header_page .header .window_set li i{}
	.zy_header_page .header .window_set li i.iconzuixiaohua1{}
	.zy_header_page .header .window_set li i.iconzuidahua1{font-size: 14px;}
	.zy_header_page .header .window_set li i.iconguanbi{}
	.zy_header_page .header .left{padding: 0 16px;}
	.zy_header_page .header .left img.logo{vertical-align: -20px;}
	.zy_header_page .header .right{}
	.zy_header_page .header .right .user_state{line-height: 46px; margin: 0 16px;}
	.zy_header_page .header .right .user_state span{position: relative; color: #5093e1; padding: 0 20px; margin: 0 10px;}
	.zy_header_page .header .right .user_state span:after{position: absolute; top: 44%; right: 0; display: block; content: ""; width: 0; height: 0; border: 6px solid transparent; border-top-color: #5093e1;}
	.zy_header_page .header .right .user_state i{font-style: normal;}
	
</style>