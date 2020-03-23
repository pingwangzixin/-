import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import index from '../components/index.vue'
import header from '../components/header.vue'
import testList from '../components/testList.vue'
import programEntry from '../components/programEntry.vue'
import makeTemplate from '../components/makeTemplate/makeTemplate.vue'
import scan from '../components/scan/scan.vue'
import upload from '../components/scan/upload.vue'
import preview from '../components/popups/preview.vue'

const remote = require('electron').remote;
/*alert(remote.process.argv[0])
alert(remote.process.argv[1])
alert(remote.process.argv[2])
alert(remote.process.argv.length)*/

let defaultJump = remote.process.argv[2] == '-1' ? 'header/makeTemplate' : 'header/programEntry';

export default new Router({
  routes: [
  	{//首页
    	name: 'index',
      path: '/index',
      component: index
    },
  	{//头部
    	name: 'header',
      path: '/header',
      component: header,
      children : [
      	{//列表页
		      name: 'testList',
		      path: '/header/testList',
		//    component: require('@/components/makeTemplate').default
		      component: testList
		    },
      	{//选择功能
		      name: 'programEntry',
		      path: '/header/programEntry',
		//    component: require('@/components/makeTemplate').default
		      component: programEntry
		    },
		    {//模版制作
		    	name: 'makeTemplate',
		      path: '/header/makeTemplate',
		//    component: require('@/components/makeTemplate').default
		      component: makeTemplate
		    },
		     {//扫描补充
		    	name: 'scan',
		      path: '/header/scan',
		      component: scan
		    },
		     {//上传文件列表
		    	name: 'upload',
		      path: '/header/upload',
		      component: upload
		    },
		    {//cccc、
		    	name: 'preview',
		      path: '/header/preview',
		      component: preview
		    }
      ]
    },
    {//默认打开
      path: '*',
//    redirect: 'header/makeTemplate'
//    redirect: defaultJump
      redirect: testList
    }
  ]
})
