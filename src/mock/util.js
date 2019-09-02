let fs = require("fs");
let join = require("path").join;
/**
 * @description 同步读取文件下的文件
 * @author xiaoyang
 * @date 2019-08-04
 * @param {*} startPath 开始路径
 * @returns 返回对应文件夹下的文件名
 */
function findSync(startPath) {
	let result = [];
	const finder = path => {
		let files = fs.readdirSync(path);
		files.forEach(val => {
			let fPath = join(path, val);
			let stats = fs.statSync(fPath);
			const fileName = val.split(".")[0];
			if (stats.isDirectory()) finder(fPath);
			if (stats.isFile()) result.push(fileName);
		});
	};
	finder(startPath);
	return result;
}

module.exports = findSync;
