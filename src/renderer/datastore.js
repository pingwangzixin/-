import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'


console.log(remote.app.getPath('userData'))

//创建多个数据存储
//带有autoload配置项的本地存储
//const dbUtil = {
//  vueData: new Datastore({autoload: true,filename: path.join(remote.app.getPath('userData'), '/vueData.db')}),
//  javaData: new Datastore({autoload: true,filename: path.join(remote.app.getPath('userData'), '/javaData.db')})
//}
//
//
//// 如果不配置autoload，需要加载数据库(该方法是异步的)
////dbUtil.vueData.loadDatabase();
////dbUtil.javaData.loadDatabase();
//
//export default {
//	dbUtil
//}


/*export default new Datastore({
	autoload: true,
	filename: path.join(remote.app.getPath('userData'), '/data.db'),
	autoload: true
})*/