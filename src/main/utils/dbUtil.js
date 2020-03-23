import Datastore from 'nedb'
import path from 'path'
import remote from 'electron'

/**
 * 异步执行
 */
//import =====>export
//require =======>module.
//创建多个数据存储
//带有autoload配置项的本地存储
const db = {
	answerSheetImageData: new Datastore({
		autoload: true,
		filename: path.join(remote.app.getPath('userData'), '/answerSheetImageData.db')
	}),
	navMarkingTypeData: new Datastore({
		autoload: true,
		filename: path.join(remote.app.getPath('userData'), '/navMarkingTypeData.db')
	}),
	scanMemberMarkingData: new Datastore({
		autoload: true,
		filename: path.join(remote.app.getPath('userData'), '/scanMemberMarkingData.db')
	})
}


// 如果不配置autoload，需要加载数据库(该方法是异步的)
//db.vueData.loadDatabase();
//db.javaData.loadDatabase();
export default db;