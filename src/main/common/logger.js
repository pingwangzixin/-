var log4js = require('log4js');

log4js.configure({
	appenders: {
		std: {
			type: "stdout",
			level: "all",
			layout: {
				type: "basic",
			}
		},
		file: {
			type: "dateFile",
			filename: "log_file",
			pattern: "yyyy-MM-dd.log",
			maxLogSize: 10 * 1000 * 1000,
			numBackups: 3,
			alwaysIncludePattern: true
		}
	},
	categories: {
		default: {
			appenders: ["std"],
			level: "debug"
		},
		custom: {
			appenders: ["std", "file"],
			level: "all"
		}
	}
});
var logger = log4js.getLogger("custom");

exports.logconsole = logger;