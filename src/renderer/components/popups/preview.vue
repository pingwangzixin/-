<template>
	<div>
		西的内饰见到佛世界
		<button @click="jieshou()">接收主进程消息</button>
	</div>
</template>

<script>
//	alert()
	export default {
		name : '',
		data (){
			return {
				
			}
		},
		//函数
		methods: {
			jieshou (){
				console.log(this.$electron.ipcRenderer)
				this.$electron.ipcRenderer.on('toXR',(event,data,id)=>{
					console.log(data)
					console.log(id)
				});
			},
		},
		//结构加载之后
		mounted() {
			
		},
		//架构加载之前
		created() {
			this.jieshou()
		},
		computed: {
		
		},
		sockets: {

		},
		components: {
//			SystemInformation
		},
	}
</script>

<style>
</style>